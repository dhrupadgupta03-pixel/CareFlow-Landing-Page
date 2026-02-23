# DESIGN DNA: Premium Legibility (Phase 3)

> [!IMPORTANT]
> This document overrides previous component individual styles. All 10 screens must adhere to these tokens.

## 1. Typography (High-Contrast Layer)

- **Primary (Headers/Names)**: `Inter`, Bold (Font weight 700), Dark Slate (`#1e293b`).
- **Data (Labels/Metadata)**: `Roboto Mono` or high-contrast Sans, Semi-Bold (600), Navy Slate (`#334155`).
- **Minimum Size**: Data elements MUST be >= 12px. Metadata >= 11px.

## 2. Color Palette (Deep Mode)

- **Backgrounds**: Slate-50 (Neutral whitespace) or White (#FFFFFF).
- **Text (Primary)**: `slate-900` (#0f172a).
- **Text (Secondary)**: `slate-700` (#334155).
- **Accents**:
  - Teal-600 (#0d9488) - Actionable items.
  - Rose-600 (#e11d48) - High-priority alerts.

## 3. Geometry & Depth

- **Borders**: 1px solid `slate-200`.
- **Shadows**: Multi-layered soft shadows for tactile depth (e.g., `shadow-md` or custom `inner-shadow`).
- **Corner Radius**: 8px (sm-md) for consistency across all cards and inputs.

## 4. Iconography

- **Weight**: All icons must use "Medium" or "Bold" material symbol variants.
- **Color**: `slate-700` as baseline.

## 5. Screen Fleet Checklist (Targeting 10 Screens)

- [ ] Doctor Dashboard
- [ ] Receptionist Dashboard (Desktop/Mobile)
- [ ] Appointment Selection
- [ ] Medical Boutique Landing
- [ ] Patient History
- [ ] Active Consultation
- [ ] [Others from Stitch Project]
