# The Clinic Journey: User Flow & Experience

This guide explains how different people use the system, what they see, and what happens when they click buttons.

---

## 🛠️ Step 0: The Building Blocks

*Goal: Ensure every part of the clinic feels consistent and professional.*

Before anyone uses the system, we created a set of "digital tools" to make sure everything looks right.

**What is in here?**

- **The "Book Now" Button**: This is our most important button. It's designed to be easily seen so that patients know exactly where to click.
- **Form Fields**: Simple boxes where patients type their name or phone number.
- **Status Tags**: Little labels like "#Confirmed" or "#Arrived" that help the staff see the state of an appointment at a glance.

![Component Library](/home/dhrupad/.gemini/antigravity/brain/c749d906-8d35-439e-a078-f5db1f7d7188/images/comp_lib_hq.png)

---

## 👤 Journey 1: The Patient's Experience

*Goal: Easily find the doctor and book a visit without any hassle.*

### 1. Arriving at the Clinic Website

When a patient first visits, they see a professional and friendly welcome page. It introduces them to the doctor and explains how the clinic can help.

**What can they do?**

- **"Book Appointment" Button**: This starts the booking process immediately.
- **Doctor's Profile**: Patients can scroll down to see the doctor's photo and learn about their expertise.
- **Services Cards**: These boxes describe different types of visits, like a "General Check-up". Clicking one will help pre-set the type of care they need.

![Landing Page](/home/dhrupad/.gemini/antigravity/brain/c749d906-8d35-439e-a078-f5db1f7d7188/images/landing_hq.png)

---

### 2. Picking a Date & Time

The booking screen is fast and clear. There are no accounts needed—it’s built for quick access.

**How does it work?**

- **The Date Picker**: Patients tap a day on the calendar. Only dates when the doctor is available can be selected.
- **Time Slots**: Once a day is chosen, patients see a list of times. Tapping a time selects it for their visit.
- **"Continue to Details" Button**: This button stays locked until the patient has chosen both a day and a time. Once it changes color, clicking it moves the patient to the final step to provide their contact information.

![Booking Selection](/home/dhrupad/.gemini/antigravity/brain/c749d906-8d35-439e-a078-f5db1f7d7188/images/booking_hq.png)

---

## 🩺 Journey 2: The Doctor's Day

*Goal: Focus on the patient in the room and see who is coming next.*

### 3. Managing the Daily Visit

The doctor has a special view that shows exactly who is in the room and who is waiting.

**What can they do?**

- **"Mark as Done" Button**: This is the doctor's main tool. Clicking it tells the system the current check-up is finished. The patient is removed from the list, and the next person in line is automatically brought to the top.
- **Waiting Counter**: A small notification in the corner shows exactly how many people are sitting in the reception area right now.
- **The Timeline**: The doctor can look at a list of the whole day's appointments. Visits that already happened are faded out so they can focus on what's left.

![Doctor Dashboard](/home/dhrupad/.gemini/antigravity/brain/c749d906-8d35-439e-a078-f5db1f7d7188/images/doctor_hq.png)

---

## 📋 Journey 3: The Receptionist's Command Center

*Goal: Keep the clinic running smoothly and manage the patient queue in three logical stages.*

### 4. Managing the Clinic Flow

The receptionist manages the journey of every patient from arrival to consultation.

**I. Active Appointment (Who is inside?)**

- **Function**: Tracks the patient currently in with the doctor.
- **Key Action**: **Three-Dot "Edit" Menu** (Top-right) to quickly access "Change Date" or "Cancel" if the visit ends unexpectedly.

**II. Next Appointment (The Focal Point)**

- **Function**: This is the receptionist's primary focus—the very next person to go in.
- **Primary CTA: "Send In"**: Moves the patient into the doctor's room.
- **Secondary CTA: "Call"**: A distinct button to find the patient nearby.
- **Other Actions**: **Three-Dot "Edit" Menu** (Top-right) for "Cancel" or "Change Date" if the patient can't wait.

**III. Waiting List (The Queue)**

- **Function**: Shows everyone else who has arrived and is waiting.
- **Tertiary CTA: "Call"**: A distinct icon for each person.
- **Other Actions**: **Three-Dot "Edit" Menu** (Top-right) on each card to manage reschedule or cancellation requests.

![Receptionist Dashboard](/home/dhrupad/.gemini/antigravity/brain/c749d906-8d35-439e-a078-f5db1f7d7188/images/receptionist_hq.png)
