# Linux Prototype: Prescription Digitizer - Implementation Plan

## Goal Description

Build a Linux prototype specifically for doctors to instantly digitize handwritten prescriptions. The system takes a raw photo of a doctor's handwriting as input and outputs structured text. This prototype validates the "Snap-to-Text" engine—including image bifurcation and ensemble OCR—to ensure 99%+ accuracy for medical data before Android deployment.

## Proposed Changes

### [Folder Structure]

```
prescription-digitizer/
├── app.py                     # Streamlit Web UI (entry point)
├── .env                       # API keys (gitignored)
├── requirements.txt           # All dependencies
├── core/                      # Pure logic — ZERO debug/logging code
│   ├── bifurcation.py         # Image segmentation
│   ├── preprocessing.py       # Contrast, noise removal, rotation correction
│   ├── vlm_connector.py       # VLM API/local model calls
│   └── rag_engine.py          # Medicine database matching
├── debug_monitor/             # Scientific debugging — fully decoupled
│   ├── instrumentation.py     # Decorator-based function wrapping
│   ├── logger.py              # Log file generation
│   ├── telemetry.py           # RAM/CPU/GPU monitoring
│   └── accuracy_diff.py       # Quick vs Extended comparison scoring
├── data/
│   └── medicines_india.json   # Indian medicine database for RAG
├── db_updater/                # Auto-updating medicine DB system
│   ├── scraper.py             # Multi-source scraper (CDSCO, 1mg, Netmeds)
│   ├── cross_reference.py     # Cross-validation across sources
│   ├── validator.py           # Format/quality checks
│   └── merger.py              # Safe merge into medicines_india.json
├── logs/
│   └── scientific_debug.log   # Auto-generated trace output
└── test_accuracy.py           # CLI accuracy test tool
```

### [Web UI]

#### [NEW] `app.py` (Streamlit)

- **Image Upload**: Drag-and-drop or file selector.
- **Dual Mode Comparison**:
  - **"Quick Text"** box: Fast OCR result (< 10s).
  - **"Extended Time Text"** box: High-accuracy result (30–60s, with bifurcation + RAG).
- **"Digitize" Button**: Triggers both modes for side-by-side comparison.
- **"Debug Log" Tab**: View last N lines of `scientific_debug.log` in-app.

### [Core Logic]

#### `core/preprocessing.py` *(NEW — currently missing)*

- Contrast enhancement, noise removal, rotation/deskew correction.
- Must run before bifurcation to improve segmentation quality.

#### `core/bifurcation.py`

- Adaptive thresholding, dilation/erosion via OpenCV.
- Segments prescription into line-level images.

#### `core/vlm_connector.py`

- **Primary**: Gemini Flash API (peak accuracy).
- **Local Fallback**: Moondream2 via `ollama` or `transformers`.
- **Prompt Templates**: Documented, tested prompts for Quick and Extended modes.

#### `core/rag_engine.py`

- Fuzzy matching (`RapidFuzz`) against `medicines_india.json`.
- Reconciles OCR output with known drug names/dosages.

### [Scientific Debugging System]

#### `debug_monitor/instrumentation.py`

- Python decorators that wrap every `core/` function.
- Captures: function name, input args, output value, execution time, exceptions.

#### `debug_monitor/logger.py`

- Writes to `logs/scientific_debug.log`.
- Log levels: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`.
- Every log entry includes: timestamp, module, function, duration, memory delta.

#### `debug_monitor/telemetry.py`

- Continuous RAM/CPU/GPU sampling during VLM inference.
- Logs peak usage and average usage per operation.

#### `debug_monitor/accuracy_diff.py` *(NEW — currently missing)*

- Compares Quick vs Extended outputs character-by-character.
- Generates a diff report highlighting where extra time improved accuracy.
- Classifies errors: `SUBSTITUTION`, `INSERTION`, `DELETION`, `HALLUCINATION`.

### [Data Setup]

#### `data/medicines_india.json`

- Expand from current 15 entries to full Indian drug registry (60,000+).

### [Medicine DB Auto-Updater System]

#### [NEW] `db_updater/scraper.py`

- Scrapes 3 sources: **CDSCO SUGAM**, **1mg.com**, **Netmeds**.
- Runs via **cron job every 10 days** on hosting server.

#### [NEW] `db_updater/cross_reference.py`

- Drug must appear in **2 out of 3 sources** to be accepted.
- Fuzzy matches names across sources to resolve naming differences.

#### [NEW] `db_updater/validator.py`

- Rejects entries with suspicious patterns (e.g., `40e0mg`).
- Verifies format: Name + Dosage + Form.
- Alerts if total count changes >5% (possible scraping error).

#### [NEW] `db_updater/merger.py`

- **New drugs** → added to DB.
- **Existing drugs** → unchanged.
- **Removed drugs** → soft-deleted (flagged as discontinued).
- **Dual Trigger**: Time-based (every 10 days) + Change-based (10+ updates detected → immediate push).

---

## Implementation Audit (7 Issues Found)

> [!CAUTION]
> The following issues must be fixed before the prototype can be considered functional.

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | **`core/` files import `logger`** — violates "zero debug code in core" rule. All `logger.info/debug/error` calls must be removed from `bifurcation.py`, `vlm_connector.py`, and `rag_engine.py`. The `@trace` decorator in `debug_monitor/` already handles logging externally. | 🔴 Critical | Open |
| 2 | **Extended mode skips bifurcation & RAG** — `app.py` line 62 sends the full image to Gemini without segmenting or reconciling. The pipeline should be: bifurcate → OCR each segment → RAG reconcile → combine. | 🔴 Critical | Open |
| 3 | **`accuracy_diff.py` not implemented** — listed in plan but missing from `debug_monitor/`. | 🟡 Medium | Open |
| 4 | **`preprocessing.py` missing** — no contrast enhancement or deskew before bifurcation. | 🟡 Medium | Open |
| 5 | **Medicine DB has only 15 entries** — too small for meaningful RAG testing. | 🟡 Medium | Open |
| 6 | **Typo in `medicines_india.json`** — `"Pantoprazole 40e0mg"` should be `"Pantoprazole 40mg"`. | 🟢 Minor | Open |
| 7 | **No `.env` file** — only `.env.template` exists, no guidance on setup. | 🟢 Minor | Open |

## Verification Plan

### Manual Verification

- **E2E Demo**: Run on 5+ sample handwritten prescriptions.
- **Accuracy Audit**: Compare Quick vs Extended OCR and RAG-reconciled output.
- **Performance**: Measure latency of bifurcation + dual-pass OCR.
- **Debug Audit**: Verify `scientific_debug.log` captures 100% of internal operations.
- **Core Purity Check**: Confirm zero logging/debug imports exist in `core/`.
