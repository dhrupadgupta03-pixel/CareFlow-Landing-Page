# Combined Implementation Plan — WhatsApp Prescription MVP

---

## Stack

| Layer | Choice |
|---|---|
| Frontend + Backend | Next.js 14 (App Router) on Vercel |
| Image storage | Cloudinary (free tier) |
| Database | Supabase (Postgres) |
| WhatsApp | `wa.me` deep link — no API needed |

---

## File Structure

```
prescription-mvp/
  app/
    page.js                  ← Doctor UI (3-step flow, 'use client')
    layout.js                ← Update app title/metadata
    prescription/
      [id]/
        page.js              ← Patient page, Server Component + generateMetadata
    api/
      upload/
        route.js             ← POST: Cloudinary upload + Supabase insert
  .env.local                 ← All secrets
```

---

## Environment Variables

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_APP_URL=https://prescription-mvp.vercel.app
```

Set locally in `.env.local` and in production via `vercel env add`.

---

## Phase 1 — Supabase Setup

Create table:

```sql
CREATE TABLE prescriptions (
  id            TEXT PRIMARY KEY,
  patient_name  TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

No RLS needed. The unguessable nanoid is the access control for this MVP.

---

## Phase 2 — Upload API (`app/api/upload/route.js`)

**POST `/api/upload`**

Receives `multipart/form-data`: `image` (file), `patientName`, `patientPhone`

Flow:
```
receive image blob
  → upload to Cloudinary with transformation: crop to 1200×630, JPEG quality auto
  → get back imageUrl
  → generate prescriptionId = nanoid(7)
  → insert into Supabase: { id, patient_name, patient_phone, image_url }
  → return JSON: { prescriptionId, imageUrl }
```

Cloudinary upload transformation (ensures correct OG image ratio):
```js
transformation: [{ width: 1200, height: 630, crop: 'fill', quality: 'auto' }]
```

Install:
```bash
npm install cloudinary @supabase/supabase-js nanoid
```

---

## Phase 3 — Patient Prescription Page (`app/prescription/[id]/page.js`)

**Server Component** — no `'use client'`. OG tags must be in the HTML so WhatsApp's crawler (which does not run JavaScript) can read them.

```
request arrives at /prescription/[id]
  → generateMetadata() fetches prescription from Supabase by id
  → returns OG tags: title, description, og:image (1200×630 Cloudinary URL)
  → page body renders: prescription image + "Download / Save Image" button
```

OG tags generated:
```js
export async function generateMetadata({ params }) {
  const rx = await getPrescriptionById(params.id);
  return {
    title: `Prescription for ${rx.patient_name}`,
    openGraph: {
      title: `Prescription for ${rx.patient_name}`,
      description: 'From your doctor · Tap to view and download',
      images: [{ url: rx.image_url, width: 1200, height: 630 }],
      url: `${process.env.NEXT_PUBLIC_APP_URL}/prescription/${params.id}`,
    },
  };
}
```

---

## Phase 4 — Doctor UI (`app/page.js`)

`'use client'` — single page, 3-step state machine.

### State

```js
const [step, setStep] = useState(1);
const [patientName, setPatientName] = useState('');
const [patientPhone, setPatientPhone] = useState('');
const [previewUrl, setPreviewUrl] = useState(null);   // local object URL for <img>
const [uploading, setUploading] = useState(false);
const [prescriptionId, setPrescriptionId] = useState(null);
```

---

### Step 1 — Patient Info

**UI:**
```
[avatar]  Doctor's Portal
──────────────────────────
Patient Name
[________________________]

Whatsapp Number
[________________________]

[        Continue        ]
```

**Logic:**
- "Continue" disabled if either field empty
- On Continue: sanitize phone (strip spaces/dashes, prepend `91` if no country code) → `setStep(2)`

---

### Step 2 — Camera Capture

**UI:**
```
[avatar]  Doctor's Portal
Active Now
Chunnu
Age: 11 • Boy
┌─────────────────────────┐
│                         │
│   Take Prescription     │  ← static placeholder (not live stream)
│        Photo            │
│                         │
└─────────────────────────┘
[  Take Photo  📷  ]
```

**Hidden file input (drives native camera):**
```jsx
<input
  type="file"
  accept="image/*"
  capture="environment"    // rear camera
  ref={fileInputRef}
  style={{ display: 'none' }}
  onChange={handleCapture}
/>
```

**On "Take Photo" button click:** `fileInputRef.current.click()` — opens native camera app.

**On capture (`handleCapture`):**
```js
const file = e.target.files[0];
setPreviewUrl(URL.createObjectURL(file));
setStep(3);
uploadImage(file);  // fire immediately, runs in background
```

**`uploadImage(file)`:**
```js
async function uploadImage(file) {
  setUploading(true);
  const form = new FormData();
  form.append('image', file);
  form.append('patientName', patientName);
  form.append('patientPhone', patientPhone);
  const res = await fetch('/api/upload', { method: 'POST', body: form });
  const { prescriptionId } = await res.json();
  setPrescriptionId(prescriptionId);
  setUploading(false);
}
```

Upload fires at the Step 2→3 transition — so by the time the doctor taps "Send to WhatsApp", it's usually already done.

---

### Step 3 — Preview + Send

**UI:**
```
[avatar]  Doctor's Portal
Active Now
Chunnu
Age: 11 • Boy
┌─────────────────────────┐
│                         │
│   [prescription image]  │  ← previewUrl shown immediately
│                         │
└─────────────────────────┘
[  Send to Whatsapp  ]       ← spinner + disabled while uploading
```

**Send logic:**
```js
function handleSend() {
  const url = `${window.location.origin}/prescription/${prescriptionId}`;
  const message = `Here is your prescription:\n\n${url}`;
  window.open(
    `https://wa.me/${patientPhone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}
```

---

## Phase 5 — Styling

Match the mockup:

| Element | Style |
|---|---|
| Primary color | `#00897B` (teal) |
| Background | `#ffffff` |
| Inputs | Gray filled, rounded (`border-radius: 8px`, `background: #f0f0f0`, no border) |
| Buttons | Full-width, rounded pill, teal background, white text |
| "Active Now" badge | Small pill, green text on light green background |
| Patient name | Bold, large (~22px) |
| Age/gender | Muted gray, smaller |
| Gray photo box | `background: #e8e8e8`, rounded, takes up ~50% of screen height |

---

## Phase 6 — Edge Cases

| Case | Fix |
|---|---|
| Doctor taps Send before upload finishes | Button disabled + spinner until `prescriptionId` is set |
| Camera permission denied | Show error message in gray box with instructions |
| Large image (>5MB) | Already handled — Cloudinary compresses on upload |
| Wrong/missing country code | Sanitize on Continue: strip non-digits, prepend `91` if < 10 digits |
| Blurry photo | "Retake" button on Step 3 resets to Step 2 |
| WhatsApp OG cache | nanoid IDs are unique per send — no cache conflict |

---

## Build Order

```
1. Supabase table
2. Set env vars (local + Vercel)
3. /api/upload route  →  test with curl
4. /prescription/[id] server page  →  verify OG tags with a WhatsApp send
5. Doctor UI Step 1 (form)
6. Doctor UI Step 2 (camera capture)
7. Doctor UI Step 3 (preview + send, wired to upload)
8. Styling to match mockup
9. Edge case handling
10. Deploy + full end-to-end test
```
