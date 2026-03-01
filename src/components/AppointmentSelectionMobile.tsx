import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSandboxStore } from '../store/sandboxStore';
import {
    appointmentMobileData,
    calendarDaysMobile,
    timeSlotsMobile,
    appointmentFooterData
} from '../data/appointmentMobileMockData';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const theme = {
    primary: "#0f756d",
    accentCoral: "#F43F5E",
    bgLight: "#FAFAF9",
    bgDark: "#112120",
    surfaceWhite: "#FFFFFF",
};

interface AppointmentSelectionMobileProps {
    readonly className?: string;
}

export const AppointmentSelectionMobile: React.FC<AppointmentSelectionMobileProps> = ({ className = '' }) => {
    const navigate = useNavigate();
    const { sandboxMode, setBookingStatus } = useSandboxStore();

    const handleBooking = () => {
        if (sandboxMode) {
            setBookingStatus('pending_approval');
            navigate('/');
        }
    };

    return (
        <div className={`bg-background-light font-display text-[#111717] antialiased min-h-screen ${className}`} style={{ backgroundColor: theme.bgLight }}>
            {/* Header */}
            <header className="ios-safe-top sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: `${theme.bgLight}CC`, borderColor: `${theme.primary}0D` }}>
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="w-10">
                        <Button variant="ghost" size="icon" className="hover:bg-transparent" style={{ color: theme.primary }}>
                            <span className="material-symbols-outlined">arrow_back_ios</span>
                        </Button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                                <span className="material-symbols-outlined text-white text-xl">medical_services</span>
                            </div>
                            <h1 className="font-black text-lg tracking-tight text-slate-950">{appointmentMobileData.clinicName}</h1>
                        </div>
                    </div>
                    <div className="w-10"></div>
                </div>
            </header>

            <main className="px-6 py-8 space-y-8 pb-32">
                {/* Introduction */}
                <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight text-slate-950 leading-tight">{appointmentMobileData.title}</h2>
                    <p className="text-base text-slate-700 font-bold">{appointmentMobileData.subtitle}</p>
                </div>

                {/* Calendar Card */}
                <Card className="rounded-xl border-slate-50 shadow-sm" style={{ backgroundColor: theme.surfaceWhite, boxShadow: '0 10px 15px -3px rgba(15, 117, 109, 0.05)' }}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Button variant="ghost" size="icon" className="size-11 rounded-full transition-colors hover:bg-slate-50 text-slate-900">
                                <span className="material-symbols-outlined font-black">chevron_left</span>
                            </Button>
                            <p className="font-black text-lg text-slate-950">{appointmentMobileData.calendarMonth}</p>
                            <Button variant="ghost" size="icon" className="size-11 rounded-full transition-colors hover:bg-slate-50 text-slate-900">
                                <span className="material-symbols-outlined font-black">chevron_right</span>
                            </Button>
                        </div>
                        <div className="grid grid-cols-7 text-center mb-2">
                            {appointmentMobileData.daysOfWeek.map(day => (
                                <p key={day} className="text-[10px] font-black uppercase tracking-widest py-2 text-slate-400">{day}</p>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 text-center">
                            {calendarDaysMobile.map((dayObj, index) => {
                                if (dayObj.status === 'empty') {
                                    return <div key={index} className="h-11"></div>;
                                }

                                let buttonStyles = "h-11 w-full rounded-full transition-all ";
                                let inlineStyles: React.CSSProperties = {};
                                let variant: "default" | "ghost" | "outline" = "ghost";

                                if (dayObj.status === 'selected') {
                                    buttonStyles += "font-black text-white shadow-xl hover:text-white scale-105 ";
                                    inlineStyles = { backgroundColor: theme.primary };
                                    variant = "default";
                                } else if (dayObj.status === 'disabled') {
                                    buttonStyles += "cursor-not-allowed hover:bg-transparent ";
                                    inlineStyles = { color: `${theme.primary}4D` };
                                } else {
                                    buttonStyles += "hover:bg-[#0f756d]/5 ";
                                }

                                return (
                                    <Button key={index} variant={variant} className={buttonStyles} style={inlineStyles}>
                                        {dayObj.day}
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Time Slots */}
                <section className="space-y-6">
                    <div>
                        <h3 className="text-lg font-black text-slate-950 mb-4 px-1">Morning Slots</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {timeSlotsMobile.morning.map((slot, index) => {
                                let styles = "h-12 w-full rounded-full text-sm font-medium transition-all ";
                                let innerContent = <>{slot.time}</>;
                                let inlineStyle: React.CSSProperties = {};
                                let variant: "outline" | "default" = "outline";

                                if (slot.status === 'outline') {
                                    styles += "border bg-white hover:border-[#0f756d] hover:bg-white";
                                    inlineStyle = { borderColor: `${theme.primary}33`, color: theme.primary, backgroundColor: theme.surfaceWhite };
                                } else if (slot.status === 'border') {
                                    styles += "border bg-white hover:bg-white";
                                    inlineStyle = { borderColor: theme.primary, color: theme.primary, backgroundColor: theme.surfaceWhite };
                                } else if (slot.status === 'selected') {
                                    styles += "font-bold text-white shadow-md hover:bg-[#0f756d] hover:text-white";
                                    inlineStyle = { backgroundColor: theme.primary, boxShadow: '0 4px 6px -1px rgba(15, 117, 109, 0.2)' };
                                    variant = "default";
                                } else if (slot.status === 'disabled') {
                                    styles += "cursor-not-allowed border-transparent hover:bg-[#0f756d]/5";
                                    inlineStyle = { backgroundColor: `${theme.primary}0D`, color: `${theme.primary}4D` };
                                    innerContent = <span className="line-through">{slot.time}</span>;
                                }

                                return <Button key={index} variant={variant} className={styles} style={inlineStyle}>{innerContent}</Button>;
                            })}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif text-xl mb-4" style={{ color: theme.primary }}>Afternoon</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {timeSlotsMobile.afternoon.map((slot, index) => {
                                let styles = "h-12 w-full rounded-full text-sm font-medium transition-all ";
                                let innerContent = <>{slot.time}</>;
                                let inlineStyle: React.CSSProperties = {};
                                let variant: "outline" | "default" = "outline";

                                if (slot.status === 'outline') {
                                    styles += "border bg-white hover:border-[#0f756d] hover:bg-white";
                                    inlineStyle = { borderColor: `${theme.primary}33`, color: theme.primary, backgroundColor: theme.surfaceWhite };
                                } else if (slot.status === 'border') {
                                    styles += "border bg-white hover:bg-white";
                                    inlineStyle = { borderColor: theme.primary, color: theme.primary, backgroundColor: theme.surfaceWhite };
                                } else if (slot.status === 'selected') {
                                    styles += "font-bold text-white shadow-md hover:bg-[#0f756d] hover:text-white";
                                    inlineStyle = { backgroundColor: theme.primary, boxShadow: '0 4px 6px -1px rgba(15, 117, 109, 0.2)' };
                                    variant = "default";
                                } else if (slot.status === 'disabled') {
                                    styles += "cursor-not-allowed border-transparent hover:bg-[#0f756d]/5";
                                    inlineStyle = { backgroundColor: `${theme.primary}0D`, color: `${theme.primary}4D` };
                                    innerContent = <span className="line-through">{slot.time}</span>;
                                }

                                return <Button key={index} variant={variant} className={styles} style={inlineStyle}>{innerContent}</Button>;
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Action Bar */}
            <footer
                className="fixed bottom-0 left-0 right-0 ios-safe-bottom backdrop-blur-xl border-t shadow-2xl z-50"
                style={{ backgroundColor: `${theme.surfaceWhite}CC`, borderColor: `${theme.primary}0D` }}
            >
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest px-2" style={{ color: `${theme.primary}99` }}>
                        <span>{appointmentFooterData.date}</span>
                        <span className="size-1 rounded-full" style={{ backgroundColor: `${theme.primary}4D` }}></span>
                        <span>{appointmentFooterData.time}</span>
                    </div>
                    <Button
                        size="lg"
                        className="w-full text-white font-bold h-14 rounded-full shadow-lg hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-2 hover:brightness-110"
                        style={{ backgroundColor: theme.accentCoral, boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.3)' }}
                        onClick={handleBooking}
                    >
                        <span>{appointmentFooterData.buttonText}</span>
                        <span className="material-symbols-outlined text-xl ml-1">arrow_forward</span>
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default AppointmentSelectionMobile;
