# Doctor's Portal — Single Combined UI Prompt
## For Stitch / AI UI Builder · Material Design 3 · Mobile-First PWA

---

> INSTRUCTIONS FOR STITCH:
> This is a single prompt describing a complete multi-screen mobile web application.
> Generate all screens as a connected prototype. Every screen listed is a distinct state.
> Wire them using the SCREEN FLOW MAP at the bottom of this prompt.
> Do not invent screens not described here. Do not add navigation chrome not specified.

---

## PART 1 — PROJECT IDENTITY

Build a mobile-first progressive web app (PWA) called **"Doctor's Portal"** for a single
doctor to photograph handwritten prescriptions and deliver them to patients via WhatsApp
as a rich link preview. The app has two audiences:

- **Doctor** — uses a 3-step flow to enter patient info, capture the prescription, and send it
- **Patient** — receives a WhatsApp link that opens a clean prescription view page

The product must feel **clinical, trustworthy, and fast**. It is used by a doctor mid-consultation,
so every screen must be completable in under 10 seconds. No unnecessary steps, no decorative
friction. This is a utility that must look credible and professional.

---

## PART 2 — MATERIAL DESIGN 3 SPECIFICATIONS

Apply Material Design 3 (Material You) standards throughout all screens. All of the following
are non-negotiable and must be consistent across every screen.

### Color System (MD3 Tonal Palette)

```
Primary:            #00897B   (Teal 600)
On Primary:         #FFFFFF
Primary Container:  #E0F2F1   (Teal 50)
On Primary Cont.:   #004D40

Secondary:          #546E7A   (Blue Grey 600)
On Secondary:       #FFFFFF
Secondary Container:#ECEFF1
On Secondary Cont.: #263238

Error:              #B3261E   (MD3 standard error)
On Error:           #FFFFFF
Error Container:    #F9DEDC
On Error Cont.:     #410E0B

Surface:            #FAFAFA
On Surface:         #1C1B1F
Surface Variant:    #F4F6F8
On Surface Variant: #49454F

Outline:            #CAC4D0
Outline Variant:    #E7E0EC

Background:         #F4F6F8
On Background:      #1C1B1F

Warning (custom):   #E65100
Warning Container:  #FFF3E0
On Warning Cont.:   #BF360C

Info (custom):      #0277BD
Info Container:     #E1F5FE
On Info Cont.:      #01579B
```

### Elevation (MD3 Surface Tones)

```
Level 0 — 0dp:   Background #F4F6F8
Level 1 — 1dp:   #F0F4F4  (cards, sheets)
Level 2 — 3dp:   #EBF1F1  (floating elements)
Level 3 — 6dp:   #E5EDED  (menus, dialogs)
Shadow: never use heavy box-shadow — use tonal elevation only, per MD3 spec
```

### Typography (MD3 Type Scale)

```
Display Large:    400 weight, 57px, -0.25px tracking  — not used in this app
Headline Large:   400 weight, 32px, 0px tracking       — page headings
Headline Medium:  400 weight, 28px, 0px tracking       — patient name on doctor screens
Headline Small:   600 weight, 24px, 0px tracking       — patient name on patient page
Title Large:      500 weight, 22px, 0px tracking       — card section headings
Title Medium:     500 weight, 16px, 0.15px tracking    — button labels, input labels
Title Small:      500 weight, 14px, 0.1px tracking     — badge text, section sub-labels
Body Large:       400 weight, 16px, 0.5px tracking     — primary body content
Body Medium:      400 weight, 14px, 0.25px tracking    — secondary body, descriptions
Body Small:       400 weight, 12px, 0.4px tracking     — captions, inline notices
Label Large:      500 weight, 14px, 0.1px tracking     — input labels above fields
Label Medium:     500 weight, 12px, 0.5px tracking     — helper text, error text
Label Small:      500 weight, 11px, 0.5px tracking     — overlines, legal footnotes
Font family: Roboto (MD3 standard). Fallback: system-ui, sans-serif.
```

### Shape (MD3 Shape Scale)

```
Extra Small:   4px border-radius   — chips, small tags
Small:         8px border-radius   — input fields, cards level 2
Medium:        12px border-radius  — cards, dialogs, image containers
Large:         16px border-radius  — bottom sheets, larger cards
Extra Large:   28px border-radius  — FABs, featured cards
Full:          100px border-radius — pills, badges, ALL buttons in this app
```

### Spacing System

```
Base unit: 4px
Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
Card padding: 20px all sides
Section gaps inside cards: 16px
Label-to-input gap: 6px
Input-to-helper-text gap: 4px
Button height: 56px (MD3 large touch target)
Input height: 56px (MD3 filled text field)
Horizontal page margin: 16px (screen edge to card edge)
Card-to-card gap: 12px
Header height: 64px
```

### Component Specs (MD3 Components)

**Buttons:**
```
Filled Button (primary action):
  Background: Primary #00897B
  Label: On Primary #FFFFFF, Title Medium (500 16px 0.1px)
  Height: 56px, border-radius: 100px (pill)
  Padding: 24px horizontal
  Width: 100% (full-width in this app — all buttons are full-width)
  Leading icon: 18px, white, 8px gap to label
  Disabled: surface #E0E0E0, label #9E9E9E, no elevation

Outlined Button (secondary action):
  Background: transparent
  Border: 1.5px #00897B
  Label: #00897B, Title Medium
  Height: 56px, border-radius: 100px
  Disabled: border #BDBDBD, label #9E9E9E

Text Button (tertiary/link action):
  No background, no border
  Label: #00897B, Title Medium
  Height: 40px
  Underline: only on hover/focus, not default
  Used only for "Back", "Retake", "Wrong number" micro-actions

Loading state (any button):
  Replace label with: white circular MD3 progress indicator (20px) + label text
  Background: same as active state but 70% opacity
  Not tappable
```

**Text Fields (MD3 Filled style):**
```
Container: #EEEEEE background, border-radius 8px top, 0px bottom (MD3 filled)
Active indicator: 2px bottom line, Primary #00897B when focused
Error indicator: 2px bottom line, Error #B3261E
Height: 56px
Label: floating label behavior (MD3 standard)
  Resting position: vertically centered, Label Large style, On Surface Variant color
  Floating position: top of field, Label Small style, Primary color when focused
Input text: Body Large, On Surface color
Helper text: Label Medium, 4px below field, On Surface Variant color
Error text: Label Medium, Error color, 4px below field, with error icon (12px) prefix
type="tel" on all phone number inputs — enforces numeric keyboard on mobile
Input mode: "numeric" on phone fields as additional mobile keyboard hint
```

**Cards (MD3 Filled Card):**
```
Background: Surface #FAFAFA
Border-radius: Large 16px
Elevation: Level 1 tonal (no shadow — tonal color only)
Padding: 20px
The main content card on doctor screens fills horizontally (16px margin each side)
and grows vertically with content — never scroll within the card
```

**Badges / Chips:**
```
"Active Now" badge:
  MD3 Assist Chip style
  Background: Primary Container #E0F2F1
  Label: "Active Now", Title Small 500 12px, On Primary Container #004D40
  Leading dot: 8px circle, #00C853 (green — live indicator)
  Height: 28px, border-radius: 100px (pill), padding: 0 12px
  Border: 1px solid Primary #00897B at 30% opacity
```

**Dividers:**
```
MD3 standard divider: 1px, Outline Variant #E7E0EC
Full-bleed within card (edge to edge, not inset)
Margin: 12px top, 12px bottom
```

**Progress Indicators:**
```
Linear: MD3 Determinate Linear Progress
  Track: Primary Container #E0F2F1, 4px height, border-radius 100px
  Indicator: Primary #00897B
  Used for upload progress on Screen 3A

Circular: MD3 Indeterminate Circular Progress
  20px diameter, stroke 2.5px, Primary #00897B
  White variant inside colored buttons
  Used: inside loading buttons, image overlay on Screen 3A
```

**Snackbars:**
```
Only used for "Copied!" confirmation after Copy Link action
MD3 Snackbar: bottom of screen, 8px margin all sides
Background: #313131 (dark surface), On Surface white text, Body Medium
Action label: Primary Container #E0F2F1, Label Large
Height: 48px, border-radius: 4px
Auto-dismiss: 2 seconds
```

**Bottom Sheets (MD3):**
```
Not used in this app — all dialogs are inline within cards
```

---

## PART 3 — GLOBAL LAYOUT

### Viewport
```
Max-width: 430px, centered on desktop with Surface Variant background outside the max-width
On mobile: full viewport width
Orientation: portrait only
Overflow: scroll on the Y axis only — never horizontal scroll
```

### App Header (Doctor Screens Only — Screens 1A through 3F)
```
Position: sticky top:0, z-index 100
Background: Surface #FAFAFA with Level 1 tonal elevation
Height: 64px
Padding: 0 16px
Contents (left to right, vertically centered):
  [Doctor Avatar] 40px circle, doctor in white coat, teal stethoscope, no ring/border
  [12px gap]
  "Doctor's Portal" — Title Large 500 22px On Surface #1C1B1F
No back button. No menu icon. No overflow menu. No notification bell.
No divider — the tonal elevation creates separation naturally.
```

### Page Structure (Doctor Screens)
```
[Sticky Header 64px]
[Surface Variant background #F4F6F8]
  [16px horizontal margin]
  [Content Card — grows with content, border-radius 16px, Surface #FAFAFA]
    [20px padding inside]
    [All step content here]
  [16px bottom padding below card]
```

### Page Structure (Patient Screens 4A–4C)
```
No Doctor's Portal header — completely different chrome.
Background: Surface Variant #F4F6F8 full page
Content in a centered column max-width 430px
Different sections are separated white Surface cards stacked vertically
16px gap between section cards
16px page margin
```

---

## PART 4 — ALL SCREENS

---

### SCREEN 1A — Step 1: Patient Info · Empty State

**Purpose:** Doctor enters patient name and WhatsApp number before the consultation ends.

**Card contents (top to bottom):**

Section heading row:
- "New Prescription" — Title Large 500, On Surface, left-aligned
- Below it: "Enter patient details to continue" — Body Small, On Surface Variant, left-aligned
- 20px gap below this row

Patient Name field:
- MD3 Filled Text Field
- Floating label: "Patient Name"
- Input: empty
- No helper text, no error
- 16px gap below

WhatsApp Number field:
- MD3 Filled Text Field
- Floating label: "WhatsApp Number"
- Input type: tel, inputmode: numeric
- Helper text below (always visible, not an error): "Include country code if outside India"
  Label Medium, On Surface Variant color
- 24px gap below helper text

Continue button:
- Filled Button, DISABLED state
- Label: "Continue"
- No leading icon
- 56px height, full width, pill

**State rules:**
- Continue is disabled — both fields empty, nothing to validate yet
- No validation errors shown — user has not interacted yet
- No step indicator or progress bar anywhere on the screen

---

### SCREEN 1B — Step 1: Patient Info · Name Filled, Phone Empty

**Card contents:** Same structure as 1A with:

Patient Name field:
- Floating label has risen to top (Label Small, Primary color)
- Input shows: "Chunnu" — Body Large, On Surface
- Active indicator: 2px Primary bottom line (field was focused, now blurred — keep filled style)

WhatsApp Number field:
- Floating label at rest position (not yet touched)
- Still empty
- Helper text visible as normal

Continue button:
- Still DISABLED — phone field is required and empty

---

### SCREEN 1C — Step 1: Patient Info · Phone Validation Error

**Purpose:** Doctor typed an invalid phone number and tapped away (onBlur triggered).

**Card contents:** Same structure with:

Patient Name field:
- "Chunnu" filled, settled state

WhatsApp Number field:
- Floating label: risen, Error color (#B3261E)
- Active indicator: 2px Error bottom line
- Input shows the invalid value: "9876" — Body Large, Error color
- Error text below field:
  Leading error icon (12px exclamation circle, Error color) + space +
  "Enter a valid 10-digit mobile number" — Label Medium, Error color
- Error text replaces helper text (same position, 4px below field)

Continue button:
- DISABLED — phone field has an error

**Edge case detail:** If the doctor types a number starting with "0" (e.g. "09876543210"),
the error text changes to:
"Remove the leading 0 — enter 10 digits only (e.g. 9876543210)"

---

### SCREEN 1D — Step 1: Patient Info · Both Fields Valid

**Purpose:** Both fields pass validation. Doctor can proceed.

**Card contents:**

Patient Name field:
- "Chunnu" — filled, settled

WhatsApp Number field:
- Floating label risen, Primary color (teal) to signal valid
- Active indicator: 2px Primary bottom line
- Input: "9876543210" — Body Large, On Surface
- Helper text replaced by confirmation line:
  Leading checkmark icon (12px, Primary #00897B) + space +
  "Sending to +91 98765 43210 — correct?" — Label Medium, Primary color
  The phone number is formatted with a space after the STD code for readability.

Continue button:
- ACTIVE — Filled Button, Primary background #00897B, white label "Continue"
- Full width, 56px, pill

**Micro-detail:** The formatted number in the confirmation string uses a space
("98765 43210") to make it easy to verify at a glance. The "+91" prefix is prepended
automatically by the validation logic.

---

### SCREEN 1E — Step 1: Patient Info · Session Restored (Auto-fill from sessionStorage)

**Purpose:** Doctor accidentally closed the browser tab or refreshed the page.
sessionStorage had saved their previous Step 1 entries.

**Layout addition — Info Banner (above the card, not inside it):**
```
Full width, 8px horizontal margin
Background: Info Container #E1F5FE
Border-radius: Small 8px
Padding: 12px 16px
Height: auto
Contents (horizontal row, vertically centered):
  Info icon — 18px, Info #0277BD, left
  8px gap
  "Your previous patient info was restored." — Body Medium, On Info Cont. #01579B
No close button — disappears when the doctor edits either field
Margin below: 12px (gap before the card)
```

Card contents: Same as 1D (both fields pre-filled, Continue active).

The doctor can verify the restored data before continuing.

---

### SCREEN 2A — Step 2: Camera · Default Placeholder

**Purpose:** Doctor is on the camera step. No photo taken yet.

**Card contents:**

Patient Identity Block (MD3 List Item style, not a separate card):
```
Row 1: "Active Now" badge — Assist Chip, left-aligned, 8px below card top
Row 2: Patient name "Chunnu" — Headline Medium 400 28px, On Surface, left-aligned, 4px below badge
Row 3: "Age: 11 • Boy" — Body Medium, On Surface Variant, 4px below name
Full-bleed MD3 Divider — 16px below age/gender row
```

Photo placeholder box:
```
Full width (fills card width minus 40px total padding)
Height: 260px
Background: Surface Variant #F4F6F8
Border-radius: Medium 12px
Border: 1.5px dashed Outline #CAC4D0
Contents (centered vertically and horizontally):
  Camera outline icon — 40px, Outline color #CAC4D0
  12px gap
  "Take Prescription Photo" — Body Large, On Surface Variant #49454F, center-aligned
  8px gap
  "Position the prescription flat and in good light" — Body Small, On Surface Variant, center-aligned
```

16px gap below placeholder

Take Photo button:
```
Filled Button, Primary, full width, 56px, pill
Leading icon: camera outlined (18px white)
Label: "Take Photo"
```

12px gap

Back text button:
```
Text Button, full width
Label: "← Back to patient info" — Title Medium, Primary color
```

**Implementation note for Stitch:** Tapping "Take Photo" triggers a hidden
`<input type="file" accept="image/*" capture="environment">` click — opens native camera.
The camera viewfinder is not shown in the app — the native camera OS UI handles it.

---

### SCREEN 2B — Step 2: Camera · Permission Denied

**Purpose:** Doctor tapped Take Photo but denied camera access in the browser.

**Card contents:**

Patient Identity Block — same as 2A
Divider

Error placeholder box (replaces photo placeholder):
```
Full width, 260px height
Background: Error Container #F9DEDC
Border-radius: Medium 12px
Border: 1.5px dashed Error #B3261E at 40% opacity
Contents (centered):
  Camera off icon (camera with X) — 40px, Error #B3261E
  12px gap
  "Camera access denied" — Title Medium 500, Error #B3261E, bold, center
  8px gap
  "Go to browser Settings → Site Settings → Camera
   and allow access for this site.
   Then reload the page." — Body Small, On Error Cont. #410E0B, center, line-height 1.6
  Line wraps: max 260px width
```

16px gap

Reload Page button:
```
Filled Button, Primary, full width: "Reload Page"
Leading icon: refresh (18px white)
```

12px gap

Back text button: "← Back to patient info"

---

### SCREEN 2C — Step 2: Camera · HEIC Format Warning (iPhone)

**Purpose:** Photo was captured on iPhone in HEIC format. Local preview cannot render.

**Card contents:**

Patient Identity Block → Divider

Photo preview box:
```
Full width, 260px height
Background: Surface Variant #F4F6F8
Border-radius: Medium 12px
Border: 1.5px solid Outline Variant #E7E0EC
Contents (centered):
  Broken image icon — 40px, On Surface Variant #49454F
  12px gap
  "Preview unavailable" — Body Large, On Surface Variant, center
```

Warning banner (directly below photo box, 8px gap):
```
Background: Warning Container #FFF3E0
Border-radius: Small 8px
Padding: 12px 16px
Contents (row):
  Warning icon — 18px, Warning #E65100
  8px gap
  "Image captured in HEIC format.
   Preview won't show here — your patient will receive it correctly." — Body Small, On Warning Cont. #BF360C, line-height 1.5
```

16px gap

Continue to Preview button:
```
Filled Button, Primary, full width: "Use This Photo"
```

12px gap

Retake text button:
```
Text Button: "Retake Photo" — Primary color
```

---

### SCREEN 3A — Step 3: Preview · Upload In Progress

**Purpose:** Doctor confirmed the photo. Upload is firing. Doctor is waiting.

**Card contents:**

Patient Identity Block → Divider

Prescription image container:
```
Full width, height: auto (aspect-ratio preserved, min 240px)
Border-radius: Medium 12px
Overflow: hidden
Shows the actual captured prescription photo (local object URL — instantly available)

Overlay on image (semi-transparent):
  Background: rgba(255,255,255,0.65)
  Border-radius: inherited
  Contents (centered):
    MD3 Circular Progress Indicator — 32px, Primary #00897B (indeterminate)
    8px gap
    "Uploading…" — Title Medium 500, Primary #00897B
```

12px gap below image

Upload progress bar:
```
MD3 Linear Progress (determinate, cosmetic)
Height: 4px, border-radius: 100px
Track: Primary Container #E0F2F1
Indicator: Primary #00897B
Width: ~65% (mid-upload visual state)
```

Label below progress bar (4px gap):
```
"Preparing your prescription…" — Label Medium, On Surface Variant, right-aligned
```

20px gap

Send button (DISABLED, loading):
```
Filled Button, Primary, 70% opacity, NOT tappable
Contents: [MD3 Circular Progress 20px white] + 8px gap + "Uploading…"
```

12px gap

Retake outlined button:
```
Outlined Button, full width: "Retake Photo"
Still active — doctor can cancel and retake
```

---

### SCREEN 3B — Step 3: Preview · Ready to Send

**Purpose:** Upload complete. Prescription ready. Doctor sends to patient.

**Card contents:**

Patient Identity Block → Divider

Prescription image:
```
Full width, auto height (portrait prescription fully visible, no crop)
Border-radius: Medium 12px
Overflow: hidden
No overlay — clean, full-res image display
Subtle tonal elevation border: 1px solid Outline Variant #E7E0EC
```

20px gap

Send to WhatsApp button (PRIMARY ACTION):
```
Filled Button, Primary #00897B, full width, 56px, pill
Leading icon: WhatsApp logo SVG (18px white) — use official WhatsApp icon shape
Label: "Send to Whatsapp" — Title Medium 500 white
```

8px gap

Retake Photo button:
```
Outlined Button, full width, 56px: "Retake Photo"
Teal border, teal label — de-emphasized compared to primary
```

16px gap

Wrong number escape hatch:
```
Full width, center-aligned row
"Wrong number? " — Body Small, On Surface Variant, inline
"Send to a different number →" — Body Small, Primary #00897B, tappable, underlined
No button chrome — purely text
```

---

### SCREEN 3C — Step 3: Preview · Upload Failed

**Purpose:** Network failed during upload. Doctor needs to retry.

**Card contents:**

Patient Identity Block → Divider

Prescription image:
```
Same as 3B but with error state border:
1.5px solid Error #B3261E border on the image container
Tonal Error Container #F9DEDC as image border background bleeds 2px around it
```

Error banner (8px below image):
```
Background: Error Container #F9DEDC
Border-radius: Small 8px
Padding: 12px 16px
Row layout:
  Error icon — 18px, Error #B3261E
  8px gap
  "Upload failed. Check your connection and try again." — Body Medium, On Error Cont. #410E0B
```

20px gap

Retry Upload button:
```
Filled Button, Primary, full width, 56px
Leading icon: refresh (18px white)
Label: "Retry Upload"
```

8px gap

Retake Photo outlined button:
```
Outlined, full width, 56px: "Retake Photo"
```

12px gap

Wrong number text: same as 3B

---

### SCREEN 3D — Step 3: Preview · Device Is Offline

**Purpose:** Doctor tapped Retry but the device has no internet connection.

**Card contents:**

Patient Identity Block → Divider

Prescription image: same as 3C (error border)

Offline banner (8px below image):
```
Background: Warning Container #FFF3E0
Border-radius: Small 8px
Padding: 12px 16px
Row:
  Wifi-off icon — 18px, Warning #E65100
  8px gap
  "No internet connection.
   Connect to WiFi or mobile data, then tap Retry." — Body Medium, On Warning Cont. #BF360C, line-height 1.5
```

Device status chip (8px below banner):
```
MD3 Suggestion Chip, disabled style
Background: Surface Variant #F4F6F8
Border: 1px Outline Variant
Leading icon: signal-wifi-off, 16px, On Surface Variant
Label: "Device is offline" — Label Medium, On Surface Variant
Height: 32px, pill, left-aligned (not full width)
```

20px gap

Retry Upload button: same as 3C (active teal — doctor may reconnect immediately)
Retake outlined button: same as 3C

---

### SCREEN 3E — Step 3: Preview · Send to Different Number

**Purpose:** Doctor tapped "Send to a different number" — phone correction inline.

**Card contents:**

Patient Identity Block (shows original number) → Divider

Prescription image: same as 3B, full clean display

Inline override panel (8px below image):
```
Background: Surface #FAFAFA
Border: 1.5px solid Primary Container #E0F2F1
Border-radius: Medium 12px
Padding: 16px

Inside panel (top to bottom):

  Section label: "Send to a different number"
    Title Small 500, On Surface Variant, left-aligned
    16px below label

  MD3 Filled Text Field:
    Floating label: "WhatsApp Number"
    Pre-filled: "+91 9876543210" (current number)
    type="tel", inputmode="numeric"
    Active indicator: Primary (focused state)
    If valid: confirmation helper text (teal checkmark + formatted number)
    If invalid: error indicator + error helper text

  16px gap

  Two-button row (side by side, 8px gap):
    Left button (50% width): Outlined Button "Cancel" — closes panel, no change
    Right button (50% width): Filled Button "Confirm" — updates phone, closes panel
    Both buttons: 44px height (slightly shorter than normal in this compact context), pill
```

24px gap below panel

Send to WhatsApp button:
```
DISABLED while panel is open — Filled Button, disabled state
Label: "Send to Whatsapp"
Activates only after Confirm is tapped and new number is valid
```

---

### SCREEN 3F — Step 3: Preview · WhatsApp Not Installed / Deep Link Blocked

**Purpose:** Doctor tapped Send but WhatsApp deep link failed to open.

**Card contents:**

Patient Identity Block → Divider

Prescription image: clean display, no error state (upload succeeded — this is a delivery issue)

Info banner (8px below image):
```
Background: Info Container #E1F5FE
Border-radius: Small 8px
Padding: 12px 16px
Row:
  Info icon — 18px, Info #0277BD
  8px gap
  "Could not open WhatsApp. Share this link with your patient manually."
  — Body Medium, On Info Cont. #01579B, line-height 1.5
```

Link share box (8px below banner):
```
Background: Surface Variant #F4F6F8
Border-radius: Small 8px
Border: 1px Outline Variant #E7E0EC
Padding: 12px 16px

Inside:
  Overline label: "PRESCRIPTION LINK" — Label Small, On Surface Variant, letter-spacing 1px

  8px gap

  URL row (horizontal):
    URL text (fills remaining width):
      "https://yourapp.vercel.app/prescription/abc1234"
      Body Small, On Surface, monospace-adjacent font
      Truncated with ellipsis if overflows — selectable on long press
    8px gap
    "Copy" teal filled chip button:
      MD3 Input Chip, Primary background
      Label: "Copy" — Label Medium white
      Height: 32px, border-radius: 100px
      On tap: label changes to "✓ Copied" for 2 seconds, then resets
      Also triggers MD3 Snackbar: "Link copied to clipboard" at bottom of screen
```

20px gap

Try WhatsApp Again button:
```
Outlined Button, full width, 56px
Leading icon: WhatsApp logo (18px, Primary teal)
Label: "Try WhatsApp Again"
```

8px gap

Retake text button: "Retake Photo" — Primary, text only

---

### SCREEN 4A — Patient View: Prescription Page · Loaded State

**Purpose:** Patient opens the WhatsApp link on their device. Sees the prescription.
This is the patient-facing page — completely different visual identity from the doctor screens.
No Doctor's Portal header. Branded with the specific doctor's identity.

**OG META NOTE (for developer, not rendered on screen):**
```
og:title    = "Prescription for Chunnu · Dr. Reynaldo O. Joson"
og:description = "From Manila Doctors Hospital · Tap to view and download"
og:image    = [1200×630 padded Cloudinary URL — c_pad, b_white]
og:url      = https://yourapp.vercel.app/prescription/[id]
```

**Page layout (top to bottom, no header chrome):**

Doctor Identity Card:
```
Background: Surface #FAFAFA
Border-radius: 0px top, Medium 16px bottom (only bottom rounded — butts against top edge)
Padding: 20px 16px
Margin: 0 (full bleed top)

Inside:
  Row: Doctor avatar (40px circle) + 12px gap + Name block
  Name block:
    "Dr. Reynaldo O. Joson, M.D." — Title Large 500, On Surface
    "Manila Doctors Hospital" — Body Medium, On Surface Variant
  Divider (full bleed) 12px below name block
  "Suite 301, Medical Arts Center, U.N. Avenue Ermita, Manila"
    — Body Small, On Surface Variant, 4px below divider
  "Tel: 524-30-11 · Reg. No. PRC XXXXX"
    — Body Small, On Surface Variant, 4px below address
```

Patient Info Card (16px below doctor card):
```
Background: Surface #FAFAFA
Border-radius: Large 16px
Padding: 16px 16px
Margin: 0 16px

Inside:
  Overline: "PRESCRIPTION FOR" — Label Small, On Surface Variant, letter-spacing 1px
  4px gap
  Patient name "Chunnu" — Headline Small 600, On Surface
  4px gap
  "Issued via Doctor's Portal" — Body Small, On Surface Variant
```

Prescription Image Card (12px below patient card):
```
Background: Surface #FAFAFA
Border-radius: Large 16px
Padding: 0 (image fills the card with only radius clipping)
Margin: 0 16px
Overflow: hidden

The prescription image takes full width of the card
Height: auto (preserves full portrait aspect ratio — nothing is cropped)
Image URL uses Cloudinary transformation: w_800, q_auto, f_auto (fast load, not the OG version)
Below the image (inside card, 16px padding):
  "Tap and hold the image to save" — Body Small, On Surface Variant, center-aligned
```

Download Button Card (12px below image card):
```
Background: Surface #FAFAFA
Border-radius: Large 16px
Padding: 16px
Margin: 0 16px

Filled Button, Primary, full width, 56px:
  Leading icon: download (18px white)
  Label: "Download Prescription"
  Links to: /api/download/[id] — same origin, iOS Safari compatible
4px gap
"Saves to your Photos or Files app" — Body Small, On Surface Variant, center-aligned
```

Footer (24px below download card):
```
Center-aligned, no card
"Sent securely via Doctor's Portal" — Label Small, On Surface Variant
"This link is for your personal use only." — Label Small, On Surface Variant
```

Bottom safe area: 32px padding

---

### SCREEN 4B — Patient View: Prescription Page · Loading Skeleton

**Purpose:** Patient opened the link. Server rendered the doctor/patient identity immediately,
but the Cloudinary image is still loading.

**Layout:** Same as 4A — all text sections are real (SSR, load instantly).

Prescription image area replaced with skeleton:
```
Full width, 380px height (approximate portrait prescription height)
Background: Surface Variant #F4F6F8
Border-radius: Medium 12px
Animated MD3 shimmer:
  Left-to-right sweep animation
  Shimmer color: rgba(255,255,255,0.5) on top of F4F6F8 base
  Duration: 1.4s, ease-in-out, infinite loop
No icon or text inside skeleton — pure animated fill
```

Download button: DISABLED state (no URL yet to download)
Helper text below button: "Loading prescription…" — Body Small, On Surface Variant

---

### SCREEN 4C — Patient View: 404 Not Found

**Purpose:** Patient opened a broken, expired, or tampered link.
Clean error state — calm, not alarming.

**Page layout (no doctor chrome, fully centered):**

Background: Surface Variant #F4F6F8 full page

Content card (centered, 16px margin, max-width 380px):
```
Background: Surface #FAFAFA
Border-radius: Large 16px
Padding: 32px 24px
Margin: auto, top margin: 80px (vertically centered-ish on screen)

Inside (all center-aligned):
  Description icon — 64px, On Surface Variant, outlined style
  24px gap
  "Prescription not found" — Headline Small 600, On Surface, center
  12px gap
  "This link may have expired or is incorrect.
   Please contact your doctor for a new link."
   — Body Medium, On Surface Variant, center, line-height 1.6, max-width 280px
  32px gap
  Filled Button, Primary, full width, 56px:
    Leading icon: WhatsApp logo (18px white)
    Label: "Contact Doctor on WhatsApp"
    Links to: wa.me/[DOCTOR_PHONE] (hardcoded constant from doctor.js)
```

Footer (24px below card):
```
Center-aligned
"Doctor's Portal" — Label Medium, On Surface Variant
```

---

## PART 5 — SCREEN FLOW MAP

```
[Start]
  │
  ▼
SCREEN 1A (empty form)
  │  Doctor types name
  ▼
SCREEN 1B (name filled, phone empty)
  │  Doctor types invalid phone → blur
  ▼
SCREEN 1C (phone error)
  │  Doctor fixes phone → blur
  ▼
SCREEN 1D (both valid, Continue active)
  │  [Edge] Page refreshed → SCREEN 1E (session restored, same as 1D with banner)
  │  Doctor taps Continue
  ▼
SCREEN 2A (camera placeholder)
  │  Doctor taps Take Photo → native camera OS opens (outside the app)
  │  [Edge] Camera permission denied → SCREEN 2B
  │  [Edge] iPhone HEIC captured → SCREEN 2C
  │  Doctor captures photo → photo returned to app
  ▼
SCREEN 3A (uploading, spinner on image)
  │  Upload finishes
  ▼
SCREEN 3B (ready to send)
  │  [Edge] Doctor taps Retake → back to SCREEN 2A (capturedFile cleared)
  │  [Edge] Doctor taps "Wrong number" → SCREEN 3E (inline number panel)
  │      └─ Confirm new number → back to SCREEN 3B (updated phone)
  │      └─ Cancel → back to SCREEN 3B (unchanged)
  │  Doctor taps "Send to Whatsapp"
  ▼
SCREEN 3A again (upload begins) →
  │  [Edge] Upload fails → SCREEN 3C
  │      └─ Device offline → SCREEN 3D
  │      └─ Retry → SCREEN 3A again
  │  Upload succeeds
  ▼
wa.me deep link fires → WhatsApp opens (leaves app)
  │  [Edge] WhatsApp not installed / deep link blocked → SCREEN 3F
  │      └─ Try Again → re-fires deep link
  │      └─ Copy Link → MD3 Snackbar "Copied"

[Patient flow — separate browser session]
  │
  ▼
Patient taps WhatsApp card → opens /prescription/[id]
  │
SCREEN 4B (skeleton, image loading)
  │  Image loads
  ▼
SCREEN 4A (full prescription view)
  │  Patient taps Download → /api/download/[id] → saves file
  │  [Edge] Invalid or expired ID → SCREEN 4C (404)
  │      └─ "Contact Doctor on WhatsApp" → wa.me/[DOCTOR_PHONE]
```

---

## PART 6 — ACCESSIBILITY & MOBILE REQUIREMENTS

```
Touch targets: All interactive elements minimum 48×48px (MD3 standard)
Focus rings: MD3 focus indicator — 3px Primary color, 2px offset
Color contrast: All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
Screen reader labels: All icon-only elements have aria-label
Error association: All error text uses aria-describedby on its input
Loading states: aria-busy="true" on loading containers
Disabled buttons: aria-disabled="true", not just visually muted
Image alt text: "Prescription photo for [patient name]" on all prescription images
Semantic HTML: h1 for page title, h2 for section headings, button not div for all actions
Safe area: padding-bottom: env(safe-area-inset-bottom) on all screens for iPhone notch

Input behavior:
  Patient name: autocomplete="name", autocorrect="off", spellcheck="false"
  Phone field: type="tel", inputmode="numeric", autocomplete="tel", pattern="[0-9]*"
  Phone validation triggers: onBlur only (not onKeyUp — too aggressive)
  sessionStorage write: onInput (every keystroke on Step 1 fields)
  sessionStorage clear: after successful wa.me deep link fires

Performance:
  All images: lazy loading except prescription preview (above fold on patient page)
  Cloudinary patient page image URL: w_800,q_auto,f_auto (not full-res, not OG version)
  Cloudinary OG image URL: w_1200,h_630,c_pad,b_white,f_jpg,q_auto (letterbox, never crop)
  Cloudinary download URL: original upload (full resolution)
```

---

## PART 7 — WHAT NOT TO BUILD

```
× No navigation tabs or bottom navigation bar
× No hamburger menu or side drawer
× No floating action button (FAB)
× No toast notifications (except the single "Copied" Snackbar on Screen 3F)
× No modal dialogs or bottom sheets (all errors/panels are inline in cards)
× No live camera viewfinder in the app (native OS camera handles this)
× No patient login, no authentication, no OTP
× No doctor settings or profile page
× No prescription history or list view
× No PDF generation (prescription is the photo, not a generated PDF)
× No multi-doctor support (single doctor, constants hardcoded)
× No dark mode (out of scope for MVP)
× No animations beyond MD3 standard ripple, shimmer, and progress indicators
```
