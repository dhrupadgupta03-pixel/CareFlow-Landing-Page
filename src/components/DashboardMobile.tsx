import React from 'react';
import { dashboardMobileData, activeSessionMobile, scheduleMobile } from '../data/dashboardMobileMockData';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const theme = {
    primary: "#0f756d",
    accentCoral: "#F43F5E",
    bgLight: "#FAFAF9",
    bgDark: "#112120",
    stoneCustom: "#A8A29E",
};

interface DashboardMobileProps {
    readonly className?: string;
}

export const DashboardMobile: React.FC<DashboardMobileProps> = ({ className = '' }) => {
    return (
        <div className={`bg-background-light text-[#111717] min-h-screen flex flex-col font-display ${className}`} style={{ backgroundColor: theme.bgLight }}>
            {/* Header Section */}
            <header className="px-6 pt-8 pb-4 flex flex-col gap-1 relative">
                <div className="absolute top-8 right-6">
                    <Badge
                        className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-sm border-0"
                    >
                        <span className="material-symbols-outlined text-[14px]">groups</span>
                        {dashboardMobileData.waitingPatients} PATIENTS WAITING
                    </Badge>
                </div>
                <p className="metadata-text">
                    {dashboardMobileData.date}
                </p>
                <h1 className="text-4xl font-black text-slate-950 mt-1 leading-tight tracking-tight">
                    {dashboardMobileData.greeting},<br />{dashboardMobileData.doctorName}
                </h1>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-6 pb-24">
                {/* Active Patient Card */}
                <section className="mt-4">
                    <Card className="rounded-xl border-slate-50 shadow-sm" style={{ boxShadow: '0 10px 40px -15px rgba(15,117,109,0.1)' }}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <Badge
                                        className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border-0 shadow-sm"
                                        style={{ backgroundColor: theme.primary, color: 'white' }}
                                    >
                                        Active Session
                                    </Badge>
                                    <h2 className="text-2xl font-black mt-3 text-slate-950 tracking-tight">{activeSessionMobile.name}</h2>
                                    <div className="flex items-center gap-4 mt-2 text-sm font-bold" style={{ color: theme.stoneCustom }}>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px] font-black">person</span> {activeSessionMobile.age} yrs</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px] font-black">schedule</span> {activeSessionMobile.timeRange}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primary}1A` }}>
                                    <span className="material-symbols-outlined text-2xl" style={{ color: theme.primary }}>medical_services</span>
                                </div>
                            </div>
                            <Button className="w-full text-white font-semibold py-6 rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-opacity-90" style={{ backgroundColor: theme.primary }}>
                                <span className="material-symbols-outlined">check_circle</span>
                                Mark as Done
                            </Button>
                        </CardContent>
                    </Card>
                </section>

                {/* Timeline Section */}
                <section className="mt-10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-slate-950">Today's Schedule</h3>
                        <span className="metadata-text">{scheduleMobile.totalCount} Appointments</span>
                    </div>

                    <div className="relative space-y-0">
                        {/* Timeline Vertical Line */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-stone-200"></div>

                        {scheduleMobile.appointments.map((apt, index) => {
                            const isPast = apt.status === 'past';
                            const isActive = apt.status === 'active';

                            if (isPast) {
                                return (
                                    <div key={apt.id} className="relative pl-10 pb-8 opacity-40">
                                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-stone-200 border-4 z-10 flex items-center justify-center" style={{ borderColor: theme.bgLight }}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div>
                                        </div>
                                        <div className="flex justify-between items-center bg-stone-100/50 p-4 rounded-xl border border-transparent">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.stoneCustom }}>{apt.time}</p>
                                                <p className="text-stone-600 font-semibold">{apt.name}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-stone-400">check</span>
                                        </div>
                                    </div>
                                );
                            }

                            if (isActive) {
                                return (
                                    <div key={apt.id} className="relative pl-10 pb-8">
                                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 z-10 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}33`, borderColor: theme.bgLight }}>
                                            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }}></div>
                                        </div>
                                        <Card className="flex justify-between items-center p-4 rounded-xl border shadow-sm" style={{ backgroundColor: `${theme.primary}0D`, borderColor: `${theme.primary}33` }}>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.primary }}>{apt.time}</p>
                                                <p className="text-[#111717] font-bold">{apt.name}</p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-full border-0"
                                                style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}
                                            >
                                                IN PROGRESS
                                            </Badge>
                                        </Card>
                                    </div>
                                );
                            }

                            return (
                                <div key={apt.id} className="relative pl-10 pb-8">
                                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-200 border-4 z-10 flex items-center justify-center" style={{ borderColor: theme.bgLight }}>
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                    </div>
                                    <Card className="premium-card flex justify-between items-center p-5 bg-white">
                                        <div>
                                            <p className="metadata-text mb-0.5">{apt.time}</p>
                                            <p className="text-slate-950 font-black text-base">{apt.name}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-400 font-black">chevron_right</span>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-stone-100 px-6 pb-6 pt-3 z-50">
                <div className="flex justify-around items-center max-w-md mx-auto">
                    <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-4 hover:bg-transparent" style={{ color: theme.primary }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-4 text-stone-400 hover:text-[#0f756d] hover:bg-transparent transition-colors">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Patients</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-4 text-stone-400 hover:text-[#0f756d] hover:bg-transparent transition-colors">
                        <span className="material-symbols-outlined">calendar_month</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Schedule</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-4 text-stone-400 hover:text-[#0f756d] hover:bg-transparent transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
                    </Button>
                </div>
            </nav>

            {/* Safe area */}
            <div className="h-10 bg-white"></div>
        </div>
    );
};

export default DashboardMobile;
