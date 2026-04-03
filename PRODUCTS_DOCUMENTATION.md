# Workspace Products Documentation

This document outlines the various products, prototypes, and resources created within the **Doctor Patient Receptionist** workspace.

## 1. Main Web Application (Doctor Patient Receptionist)

- **Path**: `/src`, `/public`, Document Root
- **Tech Stack**: React 19, Vite, TailwindCSS, Framer Motion, Zustand (State Management), Radix UI (Headless Components), Lucide React & Tabler Icons.
- **Purpose**: The primary frontend application serving role-based interfaces for healthcare management.
- **Key Features**:
  - Role-based dashboards (`dashboard.html`, `premium-dashboard.html`, `receptionist-desktop.html`, `appointment-desktop.html`, etc.).
  - Landing pages for both desktop and mobile views.
  - Interactive components, animations, and a structured UI library.

## 2. Prescription Digitizer Prototype

- **Path**: `/prescription-digitizer`
- **Tech Stack**: Python 3, Streamlit, Google Gemini 1.5 Flash API, OpenCV (Image Bifurcation), Fuzzy Matching (RAG-based).
- **Purpose**: A scientific Linux prototype to validate a "Snap-to-Text" engine designed to accurately digitize handwritten prescriptions.
- **Key Features**:
  - RAG-based medicine matching against an Indian medicine database (`/data`).
  - Dual Mode Comparison: Side-by-side view comparing "Quick" vs. "Extended" digitization methods.
  - Scientific Trace & Telemetry: Detailed monitoring of RAM, CPU usage, and function execution times.
  - Decoupled instrumentation (`/debug_monitor`).

---

*This documentation provides a high-level overview of the segregated components driving the Doctor Patient Receptionist ecosystem.*
