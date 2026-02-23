export const appointmentMobileData = {
    clinicName: "ELITE CLINIC",
    title: "Schedule Visit",
    subtitle: "Select your preferred date and time for consultation.",
    calendarMonth: "October 2023",
    daysOfWeek: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
};

export const calendarDaysMobile = [
    ...Array(3).fill({ day: "", status: "empty" }),
    { day: 1, status: "available" },
    { day: 2, status: "available" },
    { day: 3, status: "available" },
    { day: 4, status: "available" },
    { day: 5, status: "selected" },
    { day: 6, status: "available" },
    { day: 7, status: "available" },
    { day: 8, status: "available" },
    { day: 9, status: "available" },
    { day: 10, status: "available" },
    { day: 11, status: "available" },
    { day: 12, status: "disabled" },
    { day: 13, status: "available" },
    { day: 14, status: "available" },
    { day: 15, status: "available" },
    { day: 16, status: "available" },
    { day: 17, status: "available" },
    { day: 18, status: "available" },
    { day: 19, status: "available" },
    { day: 20, status: "available" },
    { day: 21, status: "available" },
    { day: 22, status: "available" },
    { day: 23, status: "available" },
    { day: 24, status: "available" },
    { day: 25, status: "available" },
    { day: 26, status: "available" },
    { day: 27, status: "available" },
    { day: 28, status: "available" },
    { day: 29, status: "disabled" },
    { day: 30, status: "disabled" },
    { day: 31, status: "disabled" }
];

export const timeSlotsMobile = {
    morning: [
        { time: "09:00 AM", status: "outline" },
        { time: "09:30 AM", status: "border" },
        { time: "10:00 AM", status: "selected" },
        { time: "11:00 AM", status: "disabled" },
        { time: "11:30 AM", status: "outline" },
    ],
    afternoon: [
        { time: "01:00 PM", status: "outline" },
        { time: "01:30 PM", status: "outline" },
        { time: "02:00 PM", status: "outline" },
        { time: "03:30 PM", status: "disabled" },
        { time: "04:00 PM", status: "outline" },
        { time: "05:00 PM", status: "outline" },
    ]
};

export const appointmentFooterData = {
    date: "Oct 5, 2023",
    time: "10:00 AM",
    buttonText: "Continue to Details"
};
