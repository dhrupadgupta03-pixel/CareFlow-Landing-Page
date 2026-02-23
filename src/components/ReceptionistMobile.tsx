import React from 'react';
import {
    receptionistMobileData,
    todaysStatsMobile,
    insideChamberMobile,
    upNextMobile,
    waitingQueueMobile
} from '../data/receptionistMobileMockData';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const theme = {
    primary: "#0F766E",
    bgLight: "#FAFAF9",
    accentCoral: "#f43f5e"
};

interface ReceptionistMobileProps {
    readonly className?: string;
}

export const ReceptionistMobile: React.FC<ReceptionistMobileProps> = ({ className = '' }) => {
    return (
        <div className={`font-sans text-slate-900 min-h-screen pb-24 ${className}`} style={{ backgroundColor: theme.bgLight }}>
            <div className="ios-status-bar bg-white px-safe"></div>

            <header className="bg-white px-6 pt-6 pb-4 border-b border-stone-100 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}>
                            <span className="material-symbols-outlined font-black">clinical_notes</span>
                        </div>
                        <h1 className="font-black text-2xl tracking-tight text-slate-950">{receptionistMobileData.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full bg-stone-50 text-slate-400 hover:bg-stone-100">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                        </Button>
                        <Avatar className="size-10 border-2" style={{ borderColor: `${theme.primary}1A` }}>
                            <AvatarImage src={receptionistMobileData.profileImageUrl} alt="Receptionist" className="object-cover" />
                            <AvatarFallback>RM</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {todaysStatsMobile.map((stat, idx) => (
                        <Card key={idx} className="flex-none min-w-[125px] rounded-2xl border-stone-100 shadow-sm bg-white">
                            <CardContent className="p-4">
                                <p className="metadata-text">{stat.label}</p>
                                <p className="text-2xl font-black mt-1" style={{ color: theme.primary }}>{stat.count}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </header>

            <main className="p-6 space-y-8">
                <section>
                    <h2 className="metadata-text px-1 mb-4">Inside Chamber</h2>
                    <Card className="premium-card relative bg-white">
                        <CardContent className="p-7">
                            <Button variant="ghost" size="icon" className="absolute top-5 right-4 text-stone-300 hover:bg-transparent hover:text-stone-500 h-8 w-8">
                                <span className="material-symbols-outlined font-black">more_vert</span>
                            </Button>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-3xl font-black text-slate-950 pr-8 tracking-tight">{insideChamberMobile.name}</h3>
                                <div className="flex items-center gap-5 mt-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-700 text-[22px] font-black" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
                                        <span className="text-[15px] font-black text-slate-900">{insideChamberMobile.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-700 text-[22px] font-black" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                                        <span className="text-[15px] font-black text-slate-900">{insideChamberMobile.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Up Next</h2>
                        <Badge
                            variant="outline"
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border-0"
                            style={{ color: theme.primary, backgroundColor: `${theme.primary}0D` }}
                        >
                            Priority
                        </Badge>
                    </div>
                    <Card className="rounded-2xl border relative drop-shadow-[0_20px_25px_rgba(15,118,110,0.08)] shadow-none" style={{ borderColor: '#f0fdfa' }}>
                        <CardContent className="p-6">
                            <Button variant="ghost" size="icon" className="absolute top-5 right-4 text-stone-300 hover:bg-transparent hover:text-stone-500 h-8 w-8">
                                <span className="material-symbols-outlined">more_vert</span>
                            </Button>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-serif text-xl text-slate-900 pr-8">{upNextMobile.name}</h3>
                                    <p className="text-sm font-medium mt-0.5" style={{ color: theme.primary }}>{upNextMobile.scheduledFor}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 text-white py-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:opacity-90 shadow-md hover:opacity-90"
                                    style={{ backgroundColor: theme.primary }}
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    Send In
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-12 h-12 flex items-center justify-center bg-stone-50 border-stone-100 rounded-xl hover:bg-stone-100"
                                    style={{ color: theme.primary }}
                                >
                                    <span className="material-symbols-outlined text-xl">call</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Waiting Queue</h2>
                        <Button variant="link" className="text-[11px] font-bold uppercase tracking-wider h-auto p-0" style={{ color: theme.primary }}>View All</Button>
                    </div>
                    <div className="space-y-3">
                        {waitingQueueMobile.map((patient) => (
                            <Card key={patient.id} className="premium-card flex items-center justify-between group relative overflow-hidden bg-white">
                                <CardContent className="p-5 w-full flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-black text-slate-950 text-base">{patient.name}</span>
                                        <span className="metadata-text lowercase">{patient.arrivedTime} arrived</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-base font-black text-slate-900 mr-8">{patient.scheduledTime}</span>
                                        <Button variant="ghost" size="icon" className="absolute right-4 text-stone-300 hover:bg-transparent hover:text-stone-500 h-8 w-8">
                                            <span className="material-symbols-outlined font-black">more_vert</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <div className="fixed bottom-24 right-6 z-50">
                    <Button
                        size="icon"
                        className="w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform hover:bg-rose-600"
                        style={{ backgroundColor: theme.accentCoral }}
                    >
                        <span className="material-symbols-outlined text-2xl">add</span>
                    </Button>
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-100 px-8 py-4 flex justify-between items-center z-50 pb-safe">
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-transparent" style={{ color: theme.primary }}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Board</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-stone-300 hover:text-stone-500 hover:bg-transparent transition-colors">
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Schedule</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-stone-300 hover:text-stone-500 hover:bg-transparent transition-colors">
                    <span className="material-symbols-outlined">group</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Patients</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-stone-300 hover:text-stone-500 hover:bg-transparent transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Admin</span>
                </Button>
            </nav>
        </div>
    );
};

export default ReceptionistMobile;
