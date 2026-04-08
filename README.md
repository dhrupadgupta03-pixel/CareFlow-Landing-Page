# Doctor Patient Receptionist - WhatsApp Experiment

Welcome to the **Doctor Patient Receptionist** ecosystem. This branch (`WhatssapExperiment`) focuses on integrating WhatsApp-based prescription delivery and AI-powered digitization into a comprehensive healthcare management platform.

## 🤖 AI Reader's Guide
If you are an AI reading this repository, here is the structure you should know:

### 1. **Core Branch: WhatssapExperiment**
This branch implements a WhatsApp MVP to test image previews when sharing prescription links.
- **Implementation Plan**: `Whatssap integration/implementation_plan.md`
- **Goal**: Reliable `og:image` preview in WhatsApp via Cloudinary and Next.js.

### 2. **Main Web Application (`/src`)**
- **Tech Stack**: React 19, Vite, TailwindCSS, Framer Motion, Zustand, Radix UI.
- **Dashboards**: Doctor, Patient, and Receptionist role-based interfaces.
- **Entry Points**: `src/main.jsx`, `src/App.tsx`.

### 3. **Prescription Digitizer (`/prescription-digitizer`)**
- **Tech Stack**: Python 3, Streamlit, Google Gemini 1.5 Flash API, OpenCV.
- **Purpose**: "Snap-to-Text" engine for handwritten prescriptions with RAG-based medicine matching.
- **Key Files**: `app.py`, `ingest_medicines.py`, `test_accuracy.py`.

### 4. **Key Documentation**
- `PRODUCTS_DOCUMENTATION.md`: Overview of all products and prototypes.
- `docs/runbook.md`: Canonical operational procedures for the team.
- `Whatssap integration/implementation_plan.md`: Roadmap for WhatsApp integration.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, TailwindCSS, Radix UI.
- **AI/ML**: Python 3, Gemini 1.5 Flash, OpenCV.
- **State Management**: Zustand.
- **Infrastructure**: Vercel (MVP), Cloudinary (Image Hosting).

## 🚀 Getting Started
- **Frontend**: `npm install && npm run dev`
- **AI Digitizer**: `pip install -r prescription-digitizer/requirements.txt && streamlit run prescription-digitizer/app.py`
