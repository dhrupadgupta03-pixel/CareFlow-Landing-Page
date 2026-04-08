# Combined Implementation Plan v2 — WhatsApp Prescription MVP

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
    page.js                        ← Doctor UI (3-step flow, 'use client')
    layout.js                      ← App title/metadata
    not-found.js                   ← Global 404 page
    prescription/
      [id]/
        page.js                    ← Patient page, Server Component + generateMetadata
    api/
      upload/
        route.js                   ← POST: Cloudinary upload + Supabase insert
      download/
        [id]/
          route.js                 ← GET: streams image with Content-Disposition header
  constants/
    doctor.js                      ← Hardcoded doctor name, clinic, registration no.
  lib/
    supabase.js                    ← Supabase client
    cloudinary.js                  ← Cloudinary config
    phone.js                       ← Phone sanitization + validation logic
  .env.local                       ← All secrets
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

## Doctor Constants (`constants/doctor.js`)

Hardcode the single doctor's identity here. Used across the doctor UI, patient page, and OG metadata.

```
DOCTOR_NAME        = "Dr. Reynaldo O. Joson"
CLINIC_NAME        = "Manila Doctors Hospital"
CLINIC_ADDRESS     = "Suite 301, Medical Arts Center, U.N. Avenue Ermita, Manila"
DOCTOR_PHONE       = "+63 2 524-30-11"
REGISTRATION_NO    = "PRC Reg. No. XXXXX"
AVATAR_URL         = "/doctor-avatar.png"
```

These appear on:
- The doctor UI header (all 3 steps)
- The patient prescription page (above the image)
- The OG title and description tags

---

## Phase 1 — Supabase Setup

```sql
CREATE TABLE prescriptions (
  id               TEXT PRIMARY KEY,          -- nanoid(7), unguessable
  patient_name     TEXT NOT NULL,
  patient_phone    TEXT NOT NULL,             -- stored as sanitized E.164 format
  image_url        TEXT NOT NULL,             -- full-res original Cloudinary URL
  og_image_url     TEXT NOT NULL,             -- padded 1200x630 OG version URL
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
```

Two image URLs are stored:
- `image_url` — original upload, used for download and display on the patient page
- `og_image_url` — 1200×630 padded version, used exclusively for OG meta tags

No RLS. The unguessable nanoid is the access control for this MVP.

---

## Phase 2 — Phone Sanitization (`lib/phone.js`)

Centralize all phone logic here. Rules in order:

```
1. Strip all non-digit characters (spaces, dashes, plus, brackets)
2. If result starts with "0", remove the leading zero
3. If result is 10 digits, prepend "91" (Indian country code)
4. If result is 11 digits and starts with "91", accept as-is
5. If result is 12 digits and starts with "091", remove leading "0"
6. Valid result must be exactly 12 digits starting with "91"
7. If invalid, return null → show inline error, block Continue
```

Display the formatted number back to the doctor before they proceed:
`"We'll send to +91 98765 43210 — correct?"`

This confirmation prevents wrong-number sends.

---

## Phase 3 — Upload API (`app/api/upload/route.js`)

**POST `/api/upload`**

Receives `multipart/form-data`: `image` (file), `patientName`, `patientPhone`

> ⚠️ Upload is only triggered when the doctor taps "Send to WhatsApp" on Step 3,
> not at photo capture time. This prevents uploading blurry/retaken photos.

Flow:
```
receive confirmed image blob
  → upload ONCE to Cloudinary with two eager transformations:
      [1] original: f_auto, q_auto (fast CDN delivery, no crop)
      [2] og_version: w_1200, h_630, c_pad, b_white, f_jpg, q_auto
          (letterbox into OG frame — no content cropped)
  → get back: imageUrl (original), ogImageUrl (padded)
  → generate prescriptionId = nanoid(7)
  → insert into Supabase: { id, patient_name, patient_phone, image_url, og_image_url }
  → return JSON: { prescriptionId, imageUrl }
```

### Why `c_pad` not `c_fill`

`c_fill` center-crops. A portrait prescription in a landscape frame will lose the top and bottom — cutting off medications and the doctor's signature.

`c_pad` with `b_white` letterboxes the image: the full prescription fits inside the frame with white padding on the sides. The OG preview card is clean and the content is fully readable.

### HEIC Handling

Cloudinary automatically converts HEIC to JPEG server-side. However, the local `createObjectURL` preview on the doctor's screen may not render HEIC correctly on some Android devices.

On the client side: check `file.type` after capture. If `image/heic` or `image/heif`, show a notice:
`"Image captured. Preview may not display on this device — your patient will still receive it correctly."`

Do not block the flow. Cloudinary handles the conversion.

---

## Phase 4 — Download API (`app/api/download/[id]/route.js`)

**GET `/api/download/[id]`**

Required for iOS Safari compatibility. Safari ignores the `download` attribute on anchor tags for cross-origin URLs (Cloudinary is a different origin). Without this route, tapping "Download" on iOS just opens the image in a new tab.

Flow:
```
fetch prescription from Supabase by id
  → fetch image from Cloudinary URL server-side
  → stream response back to client with headers:
      Content-Type: image/jpeg
      Content-Disposition: attachment; filename="prescription-[id].jpg"
```

The patient page "Download" button links to `/api/download/[id]` — same origin, so iOS Safari respects the download.

---

## Phase 5 — Patient Prescription Page (`app/prescription/[id]/page.js`)

**Server Component** — no `'use client'`. OG tags must be in the HTML so WhatsApp's crawler (which does not run JavaScript) can read them.

### generateMetadata

```
fetch prescription from Supabase by id
  → if null: call notFound() — renders proper 404, not a crash
  → return OG tags:
      og:title       = "Prescription for {patient_name} · {DOCTOR_NAME}"
      og:description = "From {CLINIC_NAME} · Tap to view and download"
      og:image       = og_image_url (1200×630 padded Cloudinary URL)
      og:image:width  = 1200
      og:image:height = 630
      og:url         = {APP_URL}/prescription/{id}
```

### Page Body

```
[DOCTOR_NAME]
[CLINIC_NAME]  [CLINIC_ADDRESS]  [DOCTOR_PHONE]  [REGISTRATION_NO]
─────────────────────────────────────────────────────────────────
Prescription for: {patient_name}

[prescription image — loaded from image_url (original, not OG crop)]
  → use Cloudinary URL with w_800, q_auto, f_auto for fast mobile load
  → wrap in <Suspense> with skeleton placeholder

[Download Prescription]   ← links to /api/download/[id]
```

### Error States

- **ID not found:** `notFound()` → renders `app/not-found.js` with a clean message
- **Image slow to load:** Suspense skeleton prevents blank white area
- **Supabase down:** try/catch → render a graceful error message, not a 500

---

## Phase 6 — Doctor UI (`app/page.js`)

`'use client'` — single page, 3-step state machine.

### State

```js
step            // 1 | 2 | 3
patientName     // string
patientPhone    // raw string (sanitized on Continue)
sanitizedPhone  // E.164 string, set after validation
phoneError      // string | null — inline error message
capturedFile    // File object from camera
previewUrl      // local object URL for <img> preview
uploading       // boolean
uploadError     // string | null
prescriptionId  // string | null — set after successful upload
```

### sessionStorage Persistence

On Step 1, write `patientName` and `patientPhone` to `sessionStorage` on every keystroke.
On mount, read from `sessionStorage` to restore if the doctor refreshed the page.
Clear `sessionStorage` after a successful send.

---

### Step 1 — Patient Info

**UI:**
```
[avatar]  Doctor's Portal
──────────────────────────
Patient Name
[________________________]

Whatsapp Number           ← type="tel" — opens numeric keyboard on mobile
[________________________]
  ↳ inline error if phone invalid: "Enter a valid 10-digit mobile number"
  ↳ confirmation if valid:  "Sending to +91 98765 43210"

[        Continue        ]  ← disabled if name empty or phone invalid
```

**Key fixes:**
- `type="tel"` on the phone input — opens numeric/phone keyboard automatically, no manual switch needed
- Validate phone on blur (not on every keystroke — too aggressive)
- Show formatted number confirmation below the input when valid
- "Continue" stays disabled until both fields pass validation

---

### Step 2 — Camera Capture

**UI:**
```
[avatar]  Doctor's Portal
Active Now
{patientName}
──────────────────────────
┌─────────────────────────┐
│                         │
│   Take Prescription     │  ← placeholder until photo taken
│        Photo            │
│                         │
└─────────────────────────┘
[  Take Photo  📷  ]
[  ← Back          ]        ← returns to Step 1 without clearing state
```

**Hidden file input:**
```
type="file"
accept="image/*"
capture="environment"    ← rear camera
```

Tapping "Take Photo" triggers `.click()` on this input — opens native camera app.

**On capture:**
```
file = e.target.files[0]
setPreviewUrl(URL.createObjectURL(file))   ← instant local preview, no upload yet
setCapturedFile(file)
setStep(3)
```

> Upload does NOT fire here. The doctor must confirm on Step 3.

---

### Step 3 — Preview + Send

**UI:**
```
[avatar]  Doctor's Portal
Active Now
{patientName}
──────────────────────────
┌─────────────────────────┐
│                         │
│   [prescription image]  │  ← previewUrl (local, instant)
│                         │
└─────────────────────────┘

[  Retake Photo  ]          ← resets capturedFile + previewUrl, goes to Step 2
[  Send to Whatsapp  ]      ← triggers upload, then opens wa.me link
    ↳ shows spinner + "Uploading…" while upload in progress
    ↳ disabled until upload completes
    ↳ if upload fails: shows retry button + error message
```

**Send logic:**
```
tap "Send to WhatsApp"
  → setUploading(true)
  → POST /api/upload with capturedFile, patientName, sanitizedPhone
  → on success: setPrescriptionId(id), setUploading(false)
  → build URL: {APP_URL}/prescription/{prescriptionId}
  → build message: "Here is your prescription from {DOCTOR_NAME}:\n\n{url}"
  → window.open(`https://wa.me/{sanitizedPhone}?text={encoded message}`, '_blank')
  → if window.open returns null or fails: show "Copy Link" fallback UI
  → clear sessionStorage
```

**WhatsApp not installed fallback:**
If `window.open()` fails silently (WhatsApp not installed, popup blocked), detect this and show:
```
"Could not open WhatsApp. Share this link manually:"
[https://yourapp.vercel.app/prescription/abc1234]   [Copy Link]
```

**Resend to different number:**
Below the Send button, show:
`"Wrong number? Send to a different number →"`
Opens an inline input pre-filled with the current phone, allows correction without retaking the photo.

---

## Phase 7 — Styling

Match the mockup:

| Element | Style |
|---|---|
| Primary color | `#00897B` (teal) |
| Background | `#ffffff` |
| Inputs | Gray filled, rounded (`border-radius: 8px`, `background: #f0f0f0`, no border) |
| Error text | `#d32f2f` red, small, below the input |
| Confirmation text | `#00897B` teal, small, below phone input when valid |
| Buttons (primary) | Full-width, rounded pill, teal background, white text |
| Buttons (secondary) | Full-width, rounded pill, white background, teal text, teal border |
| "Active Now" badge | Small pill, green text on light green background |
| Patient name | Bold, large (~22px) |
| Age/gender | Muted gray, smaller |
| Gray photo placeholder | `background: #e8e8e8`, rounded, ~50% screen height |
| Spinner | White, inline in button, replaces button text during upload |
| Skeleton loader | Animated gray pulse, same dimensions as prescription image |

---

## Phase 8 — Edge Case Reference

| Case | Root Cause | Fix |
|---|---|---|
| Prescription content cropped in OG preview | `c_fill` crops portrait images | Use `c_pad, b_white` — letterboxes without cutting content |
| Upload fires on blurry/retaken photo | Upload triggered at capture not confirm | Upload only on "Send to WhatsApp" tap |
| WhatsApp shows stale OG preview | Crawler caches by URL | nanoid per prescription = unique URL per send, no cache conflict |
| Leading zero in phone number | `09876543210` → wrong E.164 | Strip leading zero before prepending country code |
| Patient page crashes on bad ID | No null check after Supabase fetch | Call `notFound()` on null → clean 404 page |
| Download opens new tab on iOS Safari | `download` attr ignored for cross-origin URLs | Route download through `/api/download/[id]` (same origin) |
| Numeric keyboard doesn't open | `type="text"` on phone input | Use `type="tel"` |
| State lost on accidental refresh | No persistence | `sessionStorage` for Step 1 fields, cleared after send |
| No way to fix wrong number after Step 3 | No resend option | "Send to different number" inline option on Step 3 |
| WhatsApp not installed on doctor's device | `window.open` silently fails | Detect failure → show copyable link fallback |
| HEIC image from iPhone | iOS camera format setting | Cloudinary converts server-side; show client notice if preview fails |
| Patient on slow 2G/3G connection | Full-res image too large | Use `w_800, q_auto, f_auto` Cloudinary URL on patient page display |
| No doctor identity on patient page | Plan had "From your doctor" generic text | Hardcode all doctor details in `constants/doctor.js`, show on page and in OG tags |
| Bad image silently uploaded | Doctor uploads blurry photo | "Retake" button on Step 3 before confirming send |

---

## Build Order

```
1.  constants/doctor.js                   ← hardcode doctor identity
2.  Supabase table (with og_image_url col)
3.  Set env vars (local + Vercel)
4.  lib/phone.js                          ← sanitization + validation
5.  /api/upload route                     ← c_pad transform, two URLs stored
6.  /api/download/[id] route              ← iOS-safe download
7.  /prescription/[id] page              ← OG tags, notFound(), Suspense
8.  app/not-found.js                      ← global 404
9.  Doctor UI Step 1                      ← type="tel", validation, sessionStorage
10. Doctor UI Step 2                      ← camera capture, no upload yet
11. Doctor UI Step 3                      ← upload on send, retake, fallback
12. Styling to match mockup
13. End-to-end test: capture → upload → WhatsApp send → patient page → download
14. Deploy to Vercel + verify OG tags with WhatsApp send on real device
```

---

## OG Preview QA Checklist

Before shipping, verify the WhatsApp preview card on a real device:

```
□ Send the /prescription/[id] link to yourself on WhatsApp
□ Preview card appears (not just a plain URL)
□ Prescription image visible in the card thumbnail
□ Title shows patient name + doctor name
□ Description shows clinic name
□ Tapping the card opens the patient page
□ Patient page shows full prescription image (uncropped)
□ Download works on Android Chrome
□ Download works on iOS Safari (saves to Photos or Files)
□ Opening an invalid /prescription/[badid] shows 404, not a crash
```
