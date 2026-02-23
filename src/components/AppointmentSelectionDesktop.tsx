import React from 'react';
import { appointmentServices, calendarMonth, calendarDays, timeSlots, selectedAppointmentLabel } from '../data/appointmentMockData';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const theme = {
    primary: "#52b7ae",
    deepTeal: "#0f756d",
    bgLight: "#f6f7f7",
};

interface AppointmentSelectionDesktopProps {
    readonly className?: string;
}

export const AppointmentSelectionDesktop: React.FC<AppointmentSelectionDesktopProps> = ({ className = '' }) => {
    return (
        <div className={`bg-white text-slate-900 font-display min-h-screen flex flex-col ${className}`}>
            {/* Header Section */}
            <header className="w-full border-b border-slate-100 bg-white sticky top-0 z-50">
                <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 flex items-center justify-center rounded-xl text-white" style={{ backgroundColor: theme.primary }}>
                            <span className="material-symbols-outlined text-2xl">medical_services</span>
                        </div>
                        <h1 className="text-xl font-black tracking-tight text-slate-950">
                            The Clinic <span style={{ color: theme.deepTeal }}>Journey</span>
                        </h1>
                    </div>

                    <nav className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50">
                            <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500">1</span>
                            <span className="text-sm font-medium text-slate-500">Service</span>
                        </div>
                        <div className="h-px w-6 bg-slate-200"></div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${theme.primary}1A`, borderColor: `${theme.primary}33`, borderWidth: '1px' }}>
                            <span className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: theme.primary }}>2</span>
                            <span className="text-sm font-semibold" style={{ color: theme.primary }}>Time</span>
                        </div>
                        <div className="h-px w-6 bg-slate-200"></div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50">
                            <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500">3</span>
                            <span className="text-sm font-medium text-slate-500">Details</span>
                        </div>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-400 transition-colors hover:text-[#52b7ae] hover:bg-transparent">
                            <span className="material-symbols-outlined">help</span>
                        </Button>
                        <Avatar className="size-10 border border-slate-200">
                            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3EdpveF1AJq3jXQLYKNApkREcg9fiFbql-pl5RCqU5LXrNSWg3RIhB7WYp4xTrZnld1z8WO8mvlVx3EKYMwsQ4Zg7h7WFquugtsxLQC_IvtLyuWr3SxxgPtxMfBe8tb40dJYr7Et7zi7b7WEA9fpO6bDOocCmcux2dXxM1PvouBv1lIj5Y3XFk5V9IYgXSkpAn3FZKCAwPLmDJUtEMqHkzdumouB2n_3UpTPy1fQgN6J3QsS-E0_ImWUVdkScj6rcuT_d7sXxiBA" alt="User" className="object-cover" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="flex-1 max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-12 p-12">
                <aside className="col-span-5 space-y-10">
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-950">Select Service</h3>
                            <span className="metadata-text">Step 1 of 2</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {appointmentServices.map(service => (
                                <button
                                    key={service.id}
                                    className={`flex items-center gap-4 p-5 rounded-xl border text-left transition-all group ${service.selected ? 'border-2' : 'hover:border-slate-300'}`}
                                    style={{
                                        borderColor: service.selected ? theme.primary : '#e2e8f0',
                                        backgroundColor: service.selected ? `${theme.primary}0D` : 'white'
                                    }}
                                >
                                    <div
                                        className={`size-12 rounded-full flex items-center justify-center shrink-0 ${service.selected ? 'text-white' : 'bg-slate-100 text-slate-500'}`}
                                        style={{ backgroundColor: service.selected ? theme.primary : '' }}
                                    >
                                        <span className="material-symbols-outlined">{service.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p
                                            className="font-black text-slate-950 transition-colors text-[15px]"
                                            style={service.selected ? { color: theme.deepTeal } : {}}
                                        >
                                            {service.name}
                                        </p>
                                        <p className="text-sm font-bold text-slate-700 line-clamp-1">{service.description}</p>
                                    </div>
                                    {service.selected && <span className="material-symbols-outlined font-black" style={{ color: theme.deepTeal, fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Calendar Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-950">Choose Date</h3>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="size-9 rounded-full hover:bg-slate-100 transition-colors text-slate-900">
                                    <span className="material-symbols-outlined text-base font-black">chevron_left</span>
                                </Button>
                                <span className="text-sm font-black text-slate-950">{calendarMonth}</span>
                                <Button variant="ghost" size="icon" className="size-9 rounded-full hover:bg-slate-100 transition-colors text-slate-900">
                                    <span className="material-symbols-outlined text-base font-black">chevron_right</span>
                                </Button>
                            </div>
                        </div>
                        <Card className="premium-card p-2">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-7 text-center mb-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <span key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-y-2 text-center">
                                    {calendarDays.map((dayObj, i) => {
                                        if (dayObj.status === 'empty') return <div key={i} className="h-10"></div>;

                                        let styles = "h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium ";
                                        if (dayObj.status === 'selected') {
                                            styles += "text-white shadow-lg font-bold";
                                            return <button key={i} className={styles} style={{ backgroundColor: theme.primary, boxShadow: '0 10px 15px -3px rgba(82, 183, 174, 0.3)' }}>{dayObj.day}</button>;
                                        } else if (dayObj.status === 'disabled') {
                                            styles += "text-slate-300 cursor-not-allowed";
                                        } else {
                                            styles += `hover:bg-[#52b7ae]/10 text-slate-700`;
                                        }

                                        return <button key={i} className={styles}>{dayObj.day}</button>;
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </aside>

                <section className="col-span-7 space-y-8">
                    <header>
                        <h2 className="text-3xl font-black text-slate-950 leading-tight">Monday, Oct 24</h2>
                        <p className="text-slate-700 font-bold">Please select an available time slot for your consultation.</p>
                    </header>

                    <div className="space-y-10">
                        {/* Morning Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined font-black" style={{ color: theme.deepTeal }}>light_mode</span>
                                <h4 className="high-legibility-text uppercase tracking-widest text-[11px]">Morning (09:00 - 12:00)</h4>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {timeSlots.morning.map(slot => (
                                    <Button
                                        key={slot.time}
                                        variant="outline"
                                        className={`rounded-full font-black text-sm transition-all h-14 w-full ${slot.status === 'disabled'
                                            ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50'
                                            : slot.status === 'selected'
                                                ? 'text-white shadow-xl hover:text-white scale-105'
                                                : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-slate-900'
                                            }`}
                                        style={
                                            slot.status === 'selected'
                                                ? { backgroundColor: theme.deepTeal, borderColor: theme.deepTeal }
                                                : {}
                                        }
                                    >
                                        {slot.time}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined" style={{ color: theme.primary }}>sunny</span>
                                <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">Afternoon (13:00 - 17:00)</h4>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {timeSlots.afternoon.map(slot => (
                                    <Button
                                        key={slot.time}
                                        variant="outline"
                                        className="rounded-full font-semibold text-sm transition-all h-12 w-full bg-white hover:bg-slate-50"
                                        style={{ borderColor: theme.deepTeal, color: theme.deepTeal }}
                                    >
                                        {slot.time}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined" style={{ color: theme.primary }}>bedtime</span>
                                <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">Evening (18:00 - 20:00)</h4>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {timeSlots.evening.map(slot => (
                                    <Button
                                        key={slot.time}
                                        variant="outline"
                                        className={`rounded-full font-semibold text-sm transition-all h-12 w-full ${slot.status === 'disabled' ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50 hover:bg-slate-50 hover:text-slate-300' : 'bg-white hover:bg-slate-50'
                                            }`}
                                        style={slot.status === 'available' ? { borderColor: theme.deepTeal, color: theme.deepTeal } : {}}
                                    >
                                        {slot.time}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full bg-white border-t border-slate-100 py-6 sticky bottom-0 z-50">
                <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
                    <Button variant="ghost" className="flex items-center gap-2 text-slate-500 font-semibold transition-colors hover:text-slate-900 hover:bg-transparent">
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span>Back</span>
                    </Button>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Selected Appointment</span>
                            <span className="text-sm font-semibold text-slate-700">{selectedAppointmentLabel}</span>
                        </div>
                        <Button
                            size="lg"
                            className="flex items-center gap-3 text-white px-10 rounded-full font-bold text-base transition-all h-14 hover:shadow-xl active:scale-[0.98] hover:brightness-110"
                            style={{ backgroundColor: theme.deepTeal, boxShadow: '0 4px 14px 0 rgba(15, 117, 109, 0.39)' }}
                        >
                            <span>Confirm Appointment</span>
                            <span className="material-symbols-outlined ml-1">arrow_forward</span>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AppointmentSelectionDesktop;
