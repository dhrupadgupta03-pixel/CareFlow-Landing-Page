# Prescription Digitizer - Linux Prototype

This prototype validates the "Snap-to-Text" engine using Gemini 1.5 Flash, image bifurcation, and RAG-based medicine matching.

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API Key**:
   Create a `.env` file or export the variable:
   ```bash
   export GEMINI_API_KEY='your_api_key_here'
   ```

3. **Run the Accuracy Test (CLI)**:
   ```bash
   python3 test_accuracy.py path/to/prescription.jpg
   ```

4. **Run the Web UI**:
   ```bash
   streamlit run app.py
   ```

## Architecture

- `core/`: Business logic (Gemini API, OpenCV bifurcation, Fuzzy RAG).
- `debug_monitor/`: Decoupled instrumentation for scientific debugging (logs, telemetry, trace decorators).
- `data/`: Indian medicine database for RAG reconciliation.
- `logs/`: Auto-generated `scientific_debug.log`.

## Features

- **Dual Mode Comparison**: Side-by-side view of "Quick" vs "Extended" digitization.
- **Scientific Trace**: Every function call is logged with duration and memory delta.
- **Telemetry**: Real-time monitoring of RAM and CPU usage.
