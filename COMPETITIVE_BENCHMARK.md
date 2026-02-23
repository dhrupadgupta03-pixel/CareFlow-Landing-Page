# Competitive Landscape & Design Benchmarking

**Focus:** Zocdoc, Practo, Doctolib, and Jane App.

---

## 1. Executive Summary
The market standard is moving away from "Management Software" toward "Experience Platforms." While existing systems are powerful, they suffer from "Complexity Creep" and "Design Debt," leading to slow workflows and high learning curves.

## 2. Competitor Breakdown

### **Jane App**
*   **Visual Identity:** Elevated minimalist with soft shadows and a "Trust Blue/Pink" palette.
*   **Strengths:** Excellent use of color-coded appointment statuses (Green for arrived, Red for no-show).
*   **Weaknesses:** Users report it is "complicated with too many functions" and requires frequent page refreshes to see real-time updates.

### **Doctolib**
*   **Visual Identity:** Highly structured, flat, and clinical. Uses the "Oxygen Design System."
*   **Strengths:** Uses decision-tree components for forms, ensuring high data consistency.
*   **Weaknesses:** "Ghost Slots"—patients book a time that is already taken because the UI doesn't update fast enough. High "Design Debt" noted in reviews.

### **Practo**
*   **Visual Identity:** Vibrant, quirkier colors compared to Doctolib. Card-based layout.
*   **Strengths:** Strong mobile optimization and patient-facing doctor discovery.
*   **Weaknesses:** Fragmented data. Doctors complain about missing patient details (prescriptions) and slow customer service/website load times.

### **Zocdoc**
*   **Visual Identity:** Bold, bright, and quirky. High use of Figma-variable themes.
*   **Strengths:** Exceptionally fast 170-screen UI Kit. Very strong "Big Design System."
*   **Weaknesses:** High provider dissatisfaction regarding the business model (no-show fees), though the UI itself is generally praised for being vibrant and easy to use.

---

## 3. The "Common Enemy" (Pain Points to Solve)
1.  **Complexity Creep:** Don't put everything on the main screen. Use the "Bottom Tray" for secondary actions.
2.  **Stale Data:** Ensure the "Receptionist Command Center" is real-time (WebSockets/Polling) so the staff never sees a "Ghost Slot."
3.  **Click Exhaustion:** Reduce the number of clicks required to move a patient from "Waiting" to "Inside."

## 4. Synthesis for Our Project
We will combine **Jane App's "Elevated Vibe"** with **Doctolib's "Functional Structure"** while avoiding the **"Complexity Creep"** of both. Our "Secret Sauce" is the **Zero-Refresh Single Screen** for the Receptionist.
