# The Clinic Journey - UI/UX Design Strategy

**Date:** February 17, 2026
**Status:** Approved / Architectural Foundation
**Project Goal:** Synchronize patient booking, receptionist queue management, and doctor consultation into a single, real-time "Command Center."

---

## 1. Context & Problem Statement

The primary friction is the **fragmentation of the clinic visit**. Currently, data flow between the patient's booking, the receptionist's check-in, and the doctor's room is disconnected. This leads to "Panic Moments" for staff and "Anxiety Points" for patients.

## 2. User Personas

### **The Receptionist (The Orchestrator)**

* **Goal:** Manage high-volume patient flow without switching screens.
* **Panic Moment:** Crowded waiting rooms with unclear status of who is "Inside" vs "Next."
* **Solution:** A single-screen dashboard with three logical columns: *Inside Chamber*, *Next Up*, and *Waiting Line*.

### **The Doctor (The Practitioner)**

* **Goal:** Focus on the patient in the room while maintaining awareness of the remaining schedule.
* **Efficiency Killer:** Manual queue management or checking phone/reception for the next patient.
* **Solution:** A "Focus + Context" layout. 70% of screen for the current patient; 30% sidebar for the upcoming queue.

### **The Patient (The Guest)**

* **Goal:** Book a visit in under 60 seconds with zero account creation.
* **Anxiety Point:** Unclear wait times or confusing calendar UI.
* **Solution:** Mobile-first, 2-step progressive booking flow. mobile first but we need desktop website also.

---

## 3. Design Principles

* **Modern Minimalist but Clinically Trusted:** High whitespace and soft shadows to reduce cognitive load, paired with structured medical data.
* **Speed of Action:** Prioritize primary CTAs (e.g., "Send In," "Mark as Done") with high-contrast colors and large touch targets.
* **Zero-Refresh Workflow:** Real-time state management to avoid the "Jane App" issue of browser fragility.

---

## 4. Design System Foundation

* **Typography:** **Inter** (Geometric Sans-Serif). Clean, tech-forward, and highly readable at small sizes in dense dashboards.
* **Color Strategy (Semantic):**
  * **Primary Action (Trust Blue):** #0052CC (Used for "Book Now", "Send In").
  * **Success/Status (Clinic Green):** #36B37E (Used for "Done", "Arrived").
  * **Urgency (Alert Amber):** #FFAB00 (Used for patients waiting >20 mins).
  * **Neutral (Slate):** #42526E (Used for text and secondary borders).
* **Grid:** **8px Hard Grid** to ensure scalability between Desktop and Tablet (Reception/Doctor views).
* **Vibe:** **Elevated Cards** with soft shadows (Blur: 10-15px) to create depth and hierarchy.

---

## 5. Interaction Model

* **The Bottom Tray:** For all editing tasks (canceling, rescheduling), a tray slides up from the bottom. This keeps the user in the context of the main dashboard without navigating away.
* **Doctor's Primary CTA:** A prominent "Mark as Done" button that triggers a state change, auto-advancing the "Next" patient to "Inside."
* **Patient Flow:** Identity (Name/Phone) → Time Selection → Confirmation.

---

## 6. Accessibility & Technical Constraints

* **Touch Targets:** Minimum 44x44px for all staff-facing buttons.
* **Loading States:** Use **Skeleton Screens** that mirror the card layout to maintain perceived performance.
* **Framework:** Optimized for React + Tailwind CSS.
