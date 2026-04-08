# GEMINI.md - Project Context & Instructions

This document provides foundational context and instructions for AI agents working within the **Doctor Patient Receptionist** workspace.

---

## 1. Project Overview

The **Doctor Patient Receptionist** project is a comprehensive healthcare management ecosystem designed to streamline interactions between doctors, patients, and receptionists. It features role-based dashboards, an AI-powered prescription digitizer, and WhatsApp integration.

### Core Components:

*   **Main Web Application (`/src`, `/public`)**:
    *   **Tech Stack**: React 19, Vite, TailwindCSS, Framer Motion, Zustand, Radix UI.
    *   **Purpose**: Provides role-based frontend interfaces (Doctor, Patient, Receptionist, Appointment Management).
*   **Prescription Digitizer Prototype (`/prescription-digitizer`)**:
    *   **Tech Stack**: Python 3, Streamlit, Google Gemini 1.5 Flash API, OpenCV (Image Bifurcation), Fuzzy Matching (RAG-based).
    *   **Purpose**: A "Snap-to-Text" engine to digitize handwritten prescriptions with RAG-based medicine matching against an Indian medicine database.
*   **WhatsApp Integration (`/Whatssap integration`)**:
    *   **Purpose**: MVP and implementation plans for WhatsApp-based prescription delivery and interaction.
*   **Documentation (`/docs`, `/all doc`)**:
    *   Includes runbooks (`runbook.md`), token optimization guides, and model selection playbooks.

---

## 2. Building and Running

### Frontend (Main Web App)
*   **Install Dependencies**: `npm install`
*   **Development Server**: `npm run dev`
*   **Build**: `npm run build`
*   **Lint**: `npm run lint`

### Prescription Digitizer (AI Prototype)
*   **Install Dependencies**: `pip install -r prescription-digitizer/requirements.txt`
*   **Configure API Key**: `export GEMINI_API_KEY='your_api_key_here'`
*   **Run Web UI**: `streamlit run prescription-digitizer/app.py`
*   **Run Accuracy Test**: `python3 prescription-digitizer/test_accuracy.py <path_to_image>`

---

## 3. Development Conventions

### Operational Procedures (from `docs/runbook.md`)
*   **Wave-Based Workflow**: Work is organized into "waves." Verify wave completion by ensuring all tasks have commits and passing verifications before moving forward.
*   **3-Strike Rule**: After 3 consecutive failed debug attempts, stop, document the attempts and hypothesis, and start a fresh session.
*   **Search-First Workflow**: Always search for relevant patterns and terms across the codebase before reading entire files.
*   **Scientific Debugging**: For the Prescription Digitizer, maintain the decoupled instrumentation (`/debug_monitor`) to monitor RAM, CPU, and execution traces.

### Code Style & Standards
*   **Frontend**: Prefer functional components with React 19 features. Use TailwindCSS for styling and Framer Motion for animations. State management is handled by Zustand.
*   **Python**: Follow clean code practices and ensure business logic remains decoupled from instrumentation/telemetry.
*   **Git**: Frequently check `git status` and `git log` to ensure tracking and alignment with documented progress. **Never stage or commit unless explicitly requested.**

---

## 4. Key Documentation Resources
*   `docs/runbook.md`: Canonical operational procedures.
*   `PRODUCTS_DOCUMENTATION.md`: Overview of all products and prototypes.
*   `docs/token-optimization-guide.md`: Guidance for LLM efficiency.
*   `docs/model-selection-playbook.md`: Criteria for selecting appropriate AI models.

*Refer to these files for detailed guidance on specific workflows and standards.*
