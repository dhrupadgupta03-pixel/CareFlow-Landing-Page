import React from 'react';
import { premiumDoctorData, activeSession, todaysSchedule, quickNote } from '../data/premiumDashboardMockData';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const theme = {
    primary: "#0f756d", // Dark teal
    primaryLight: "#52b7ae", // Light teal
    bgLight: "#f8fafc",
    bgWhite: "#ffffff",
    accentRed: "#E11D48", // Rose 600
    textDark: "#0f172a", // Slate 900
    textSecondary: "#334155", // Slate 700
    textMuted: "#475569", // Slate 600
};

interface PremiumDoctorDashboardProps {
    readonly className?: string;
}

export const PremiumDoctorDashboard: React.FC<PremiumDoctorDashboardProps> = ({ className = '' }) => {
    return (
        <div className={`font-sans min-h-screen text-slate-900 ${className}`} style={{ backgroundColor: theme.bgLight }}>
            <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto bg-white shadow-2xl relative overflow-hidden">
                {/* Top Header Layer */}
                <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-50">
                    <div className="flex items-center gap-6 mb-4 sm:mb-0">
                        {/* Logo Area */}
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: theme.primary }}>
                                <span className="material-symbols-outlined text-white text-xl">medical_services</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">Premium Clinic</h2>
                        </div>
                        {/* Divider */}
                        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
                        {/* Greeting */}
                        <h1 className="text-base text-slate-700">
                            Good Morning, <span className="font-black text-slate-900">Dr. Jenkins</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto overflow-x-auto no-scrollbar justify-start sm:justify-end pb-2 sm:pb-0">
                        {/* Waiting Badge */}
                        <Badge
                            className="text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest whitespace-nowrap shadow-sm"
                            style={{ backgroundColor: theme.accentRed }}
                        >
                            <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                            3 PATIENTS WAITING
                        </Badge>

                        {/* Date Pill */}
                        <div className="px-5 py-2 rounded-full text-xs font-bold text-slate-700 whitespace-nowrap bg-slate-100/80">
                            Tuesday, October 24, 2023
                        </div>

                        {/* Avatar */}
                        <div className="relative shrink-0 flex items-center justify-center">
                            <Avatar className="size-10 border border-slate-200" style={{ backgroundColor: theme.primaryLight }}>
                                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBKi7DRSoEPJe6chB1tyvgIoRY_n5T5zg1ZpyLWaQKEoYm31ysYo4hwvBo-4JbLmbvrOXrtlkeduKoR9_tHYYt23ZNgaJn8Q79qh197fduXyNFkbmlQAEBmtaKr8bCYhgWbvnl3GanFaTtUWH26w8HX9WsNsGoC6cLtWYLJWE2x7McK93pV0VQ13gfDJfmtaKT9dgxZtSGADImWhK-LjPKW488VRYspTgt_ZUG4Xss_rASh-B18qkrxyNI-2cK3ran6Cd-MgRuYK4" alt="Doctor profile" />
                                <AvatarFallback className="bg-transparent text-white font-bold">DR</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>
                </header>

                <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                    {/* Left Main Content Area - Active Patient Info */}
                    <section className="w-full lg:w-3/5 flex flex-col items-center justify-center p-8 lg:p-16 relative">
                        {/* Patient Active Status Info */}
                        <div className="flex flex-col items-center justify-center text-center space-y-12 w-full max-w-2xl mt-[-5%]">

                            {/* Status Tag */}
                            <Badge
                                variant="outline"
                                className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border-0"
                                style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}
                            >
                                ACTIVE SESSION
                            </Badge>

                            {/* Patient Name */}
                            <h2 className="text-6xl lg:text-7xl font-sans font-black tracking-[-0.04em] text-slate-900 leading-none">
                                {activeSession.name}
                            </h2>

                            {/* Patient Meta Data */}
                            <div className="flex items-center justify-center gap-8 text-slate-700 font-bold pb-4">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[24px]" style={{ color: theme.primary, fontVariationSettings: "'FILL' 1" }}>person</span>
                                    Age: {activeSession.age}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[24px]" style={{ color: theme.primary, fontVariationSettings: "'FILL' 1" }}>schedule</span>
                                    {activeSession.timeRange}
                                </span>
                            </div>

                            {/* Main CTA */}
                            <div className="relative pt-4 w-full flex flex-col items-center">
                                {/* Soft glow shadow behind button */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-28 blur-2xl opacity-40 rounded-full pointer-events-none"
                                    style={{ backgroundColor: theme.primaryLight }}
                                ></div>
                                <Button
                                    className="relative flex items-center justify-center w-full max-w-[320px] h-[72px] text-white rounded-[36px] text-xl font-bold tracking-wide transition-all hover:scale-[1.02] shadow-xl hover:brightness-110 active:scale-[0.98]"
                                    style={{ backgroundColor: theme.primary }}
                                >
                                    Send In
                                    <span className="material-symbols-outlined ml-3 text-[22px]">login</span>
                                </Button>
                                <p className="text-xs text-slate-400 font-medium mt-6 tracking-wide">Click to notify the nurse to escort the patient.</p>
                            </div>
                        </div>

                        {/* Bottom Chips - Meta Details */}
                        <div className="absolute bottom-32 left-0 right-0 px-8 lg:px-16 flex flex-wrap lg:flex-nowrap gap-4 justify-center lg:justify-between max-w-4xl mx-auto">
                            <div className="flex-1 min-w-[200px] premium-card p-6 lg:p-7">
                                <p className="metadata-text mb-2">REASON</p>
                                <p className="text-base font-black text-slate-900">{activeSession.reason}</p>
                            </div>
                            <div className="flex-1 min-w-[200px] premium-card p-6 lg:p-7">
                                <p className="metadata-text mb-2">STATUS</p>
                                <p className="text-base font-black text-slate-900">{activeSession.status}</p>
                            </div>
                            <div className="flex-1 min-w-[200px] premium-card p-6 lg:p-7">
                                <p className="metadata-text mb-2">VITALS</p>
                                <p className="text-base font-black text-slate-900">{activeSession.vitals}</p>
                            </div>
                        </div>
                    </section>

                    {/* Right Panel - Timeline Schedule */}
                    <section className="w-full lg:w-2/5 p-8 lg:p-12 overflow-y-auto" style={{ backgroundColor: theme.bgLight }}>
                        <div className="mb-14 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 tracking-wide">Today's Schedule</h3>
                            <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:bg-slate-200 h-10 w-10">
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            </Button>
                        </div>

                        {/* Timeline List */}
                        <div className="relative pl-6">
                            {/* Continuous Background Line */}
                            <div className="absolute left-[39px] top-6 bottom-6 w-px bg-slate-200 z-0"></div>

                            {/* Hardcoded items for exact visual match */}

                            {/* Item 1: Completed */}
                            <div className="flex gap-6 pb-12 relative group z-10">
                                <div className="absolute w-[2px] h-full left-[14.5px] top-6 bottom-0" style={{ backgroundColor: theme.primary }}></div>
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-sm shrink-0" style={{ backgroundColor: theme.primaryLight }}>
                                    <span className="material-symbols-outlined text-sm font-bold text-white">check</span>
                                </div>
                                <div className="flex flex-col justify-center pt-0.5">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">09:00 AM</span>
                                    <span className="text-base font-bold text-slate-500">Sarah Connor</span>
                                </div>
                            </div>

                            {/* Item 2: Completed */}
                            <div className="flex gap-6 pb-12 relative group z-10">
                                <div className="absolute w-[2px] h-full left-[14.5px] top-6 bottom-0" style={{ backgroundColor: theme.primaryLight }}></div>
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-sm shrink-0" style={{ backgroundColor: theme.primaryLight }}>
                                    <span className="material-symbols-outlined text-sm font-bold text-white">check</span>
                                </div>
                                <div className="flex flex-col justify-center pt-0.5">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">09:45 AM</span>
                                    <span className="text-base font-bold text-slate-500">Robert Brown</span>
                                </div>
                            </div>

                            {/* Item 3: Active Patient (Highlighted Card) */}
                            <div className="flex gap-6 pb-12 relative group z-10 items-center">
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shrink-0 shadow-xl ring-2 ring-[#52b7ae]/30" style={{ borderColor: theme.primaryLight }}>
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primaryLight }}></div>
                                </div>
                                <div className="flex-1 bg-white border rounded-[32px] p-6 shadow-sm overflow-hidden relative" style={{ borderColor: `${theme.primaryLight}4D`, backgroundColor: `${theme.primaryLight}0D` }}>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: theme.primaryLight }}>10:30 AM</span>
                                        <span className="text-lg font-black text-slate-900 leading-tight">Arthur Miller</span>
                                        <span className="text-[10px] font-bold mt-1.5" style={{ color: theme.primaryLight }}>In Queue • 12 mins waiting</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 4: Upcoming */}
                            <div className="flex gap-6 pb-12 relative group z-10">
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-slate-300 shrink-0 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                </div>
                                <div className="flex flex-col justify-center pt-0.5">
                                    <span className="metadata-text">11:15 AM</span>
                                    <span className="text-base font-black text-slate-800">James Smith</span>
                                </div>
                            </div>

                            {/* Item 5: Upcoming */}
                            <div className="flex gap-6 pb-4 relative group z-10">
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-slate-300 shrink-0 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                </div>
                                <div className="flex flex-col justify-center pt-0.5">
                                    <span className="metadata-text">12:00 PM</span>
                                    <span className="text-base font-black text-slate-800">Elena Gilbert</span>
                                </div>
                            </div>

                        </div>

                        {/* Quick Note Card */}
                        <div className="mt-12 premium-card p-6 border-slate-200 bg-white shadow-md">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: theme.primary }}>
                                    <span className="material-symbols-outlined text-white text-[18px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                                </div>
                                <h4 className="high-legibility-text text-lg">Quick Note</h4>
                            </div>
                            <p className="text-[15px] text-slate-700 leading-relaxed font-bold">
                                {quickNote}
                            </p>
                        </div>
                    </section>
                </main>

                {/* Floating Dock Navigation (macOS style) */}
                <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-[32px] shadow-2xl flex items-center justify-center gap-4 z-50 backdrop-blur-xl border w-max" style={{ backgroundColor: '#232D3F', borderColor: 'rgba(255,255,255,0.05)' }}>
                    <Button variant="ghost" size="icon" className="w-12 h-12 shrink-0 rounded-full text-white hover:bg-white/10 transition-all flex items-center justify-center border-0 shadow-inner" style={{ backgroundColor: theme.primary }}>
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 shrink-0 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">groups</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 shrink-0 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 shrink-0 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                    </Button>
                    <div className="w-px h-6 shrink-0 bg-slate-600/50 mx-2"></div>
                    <Button variant="ghost" size="icon" className="w-12 h-12 shrink-0 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </Button>
                </nav>
            </div>
        </div>
    );
};

export default PremiumDoctorDashboard;
