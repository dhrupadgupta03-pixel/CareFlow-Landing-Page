export const appointmentServices = [
    {
        id: "general",
        name: "General Consultation",
        description: "Regular checkup and health advice",
        icon: "stethoscope",
        selected: true
    },
    {
        id: "specialized",
        name: "Specialized Care",
        description: "Advanced diagnostic and treatment",
        icon: "biotech",
        selected: false
    }
];

export const calendarMonth = "October 2023";
export const calendarDays = [
    ...Array(5).fill({ day: "", status: "empty" }), // Offset for Oct 2023 start
    ...Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        let status = "available";
        if (day === 6) status = "disabled";
        if (day === 24) status = "selected";
        return { day, status };
    })
];

export const timeSlots = {
    morning: [
        { time: "09:00 AM", status: "available" },
        { time: "09:30 AM", status: "available" },
        { time: "10:00 AM", status: "disabled" },
        { time: "10:30 AM", status: "available" },
        { time: "11:00 AM", status: "selected" },
        { time: "11:30 AM", status: "available" }
    ],
    afternoon: [
        { time: "01:00 PM", status: "available" },
        { time: "01:30 PM", status: "available" },
        { time: "02:00 PM", status: "available" },
        { time: "02:30 PM", status: "available" },
        { time: "03:00 PM", status: "available" },
        { time: "03:30 PM", status: "available" },
        { time: "04:00 PM", status: "available" },
        { time: "04:30 PM", status: "available" }
    ],
    evening: [
        { time: "06:00 PM", status: "available" },
        { time: "06:30 PM", status: "disabled" },
        { time: "07:00 PM", status: "available" },
        { time: "07:30 PM", status: "available" }
    ]
};

export const selectedAppointmentLabel = "Oct 24, 2023 at 11:00 AM";
