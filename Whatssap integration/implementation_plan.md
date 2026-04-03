# ── MVP: WhatsApp Prescription Preview Test ──

## GOAL

Test if WhatsApp shows image preview reliably when a link is shared.

---

## Proposed Changes

### STEP 1 — SET UP CLOUDINARY (free)

- [x] Create free account at [cloudinary.com](https://cloudinary.com)
- [x] Upload/Use test prescription image: <https://res.cloudinary.com/dharxchac/image/upload/v1774522651/WhatsApp_Image_2026-03-24_at_9.05.53_PM_spqksr.jpg>
- [x] Copy the direct image URL (provided by user)

---

### STEP 2 — CREATE A NEXT.JS PROJECT

- `npx create-next-app@latest prescription-mvp`
- Choose: App Router, no TypeScript (keep simple)

---

### STEP 3 — CREATE THE OG PAGE

**File: `app/prescription/[id]/page.js`**

- This page does one job only
- It renders Open Graph meta tags server-side
- `og:image`  → your Cloudinary image URL
- `og:title`  → "Prescription"
- `og:description` → "From your doctor"
- Also shows the image visibly on the page so patient can tap and download

---

### STEP 4 — DEPLOY TO VERCEL (free)

- Push project to GitHub
- Connect GitHub repo to [vercel.com](https://vercel.com)
- Deploy — Vercel gives you a live HTTPS URL
- Example: `prescription-mvp.vercel.app`

> [!NOTE]
> WhatsApp needs a real public HTTPS URL. Localhost will NOT work for preview testing.

---

### STEP 5 — BUILD THE SEND BUTTON PAGE

**File: `app/page.js`**

- One input field: patient phone number
- One input field: prescription image URL
- One button: "Send on WhatsApp"
- Button generates this link and opens it:
  `wa.me/{phone}?text=https://prescription-mvp.vercel.app/prescription/test1`

---

## Verification Plan

### STEP 6 — TEST

- Open your deployed site
- Enter any phone number (your own for testing)
- Click Send on WhatsApp
- WhatsApp opens with the link in message
- Send it to yourself
- Check if big image preview appears ✅ or ❌

### SUCCESS CRITERIA

- ✅ WhatsApp shows image preview without manual refresh
- ✅ Patient can tap link and see full image
- ✅ Doctor only taps one button

---

### NEXT (after MVP works)

- Connect real patient DB
- Auto-fill phone number from DB
- Auto-upload prescription photo to Cloudinary
- Add to doctor's existing webpage
