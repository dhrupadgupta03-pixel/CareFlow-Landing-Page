import React from 'react';
import { receptionistData, clinicStats, currentlyInside, upNext, waitingQueue, clinicInfo } from '../data/receptionistMockData';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Replicating Tailwind config values from HTML
const theme = {
    primary: "#0F766E",
    accentCoral: "#F43F5E",
    offWhite: "#FAFAF9",
    textDark: "#0f172a",
    textSecondary: "#334155",
};

interface ReceptionistDesktopProps {
    readonly className?: string;
}

export const ReceptionistDesktop: React.FC<ReceptionistDesktopProps> = ({ className = '' }) => {
    return (
        <div className={`min-h-screen font-sans antialiased text-slate-900 ${className}`} style={{ backgroundColor: theme.offWhite }}>
            {/* Header */}
            <header className="bg-white border-b border-stone-100 flex items-center justify-between sticky top-0 z-50 px-12 h-24">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-[#0F766E] bg-[#0F766E]/5">
                        <span className="material-symbols-outlined font-light">clinical_notes</span>
                    </div>
                    <h1 className="text-2xl font-bold font-serif tracking-tight" style={{ color: theme.primary }}>Clinic Flow</h1>
                </div>

                <div className="flex items-center gap-12">
                    {/* Stats */}
                    <div className="flex gap-4">
                        <Card className="px-6 py-3 rounded-xl border-stone-50 text-center min-w-[100px] shadow-sm drop-shadow-sm">
                            <CardContent className="p-0">
                                <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-stone-400 mb-1">Total</p>
                                <p className="text-xl font-bold" style={{ color: theme.primary }}>{clinicStats.total}</p>
                            </CardContent>
                        </Card>
                        <Card className="px-6 py-3 rounded-xl border-stone-50 text-center min-w-[100px] shadow-sm drop-shadow-sm">
                            <CardContent className="p-0">
                                <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-stone-400 mb-1">Checked-In</p>
                                <p className="text-xl font-bold" style={{ color: theme.primary }}>{clinicStats.checkedIn}</p>
                            </CardContent>
                        </Card>
                        <Card className="px-6 py-3 rounded-xl border-stone-50 text-center min-w-[100px] shadow-sm drop-shadow-sm">
                            <CardContent className="p-0">
                                <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-stone-400 mb-1">Done</p>
                                <p className="text-xl font-bold" style={{ color: theme.primary }}>{clinicStats.done}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="h-8 w-[1px] bg-stone-200"></div>

                    {/* Profile */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-black text-slate-900">{receptionistData.receptionistName}</p>
                            <p className="metadata-text">{receptionistData.role}</p>
                        </div>
                        <Avatar className="size-10 border border-stone-100">
                            <AvatarImage src={receptionistData.imageUrl} alt={receptionistData.receptionistName} className="object-cover" />
                            <AvatarFallback>RP</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <div className="flex">
                <main className="flex-1 p-12 space-y-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-12 gap-12">

                        {/* Left Column */}
                        <div className="col-span-12 lg:col-span-5 space-y-12">
                            <section>
                                <h2 className="text-xl font-black mb-6 text-slate-900 tracking-tight font-sans">Currently Inside</h2>
                                <div className="premium-card p-8 bg-white">
                                    <div className="mb-10">
                                        <p className="metadata-text mb-3">Patient Name</p>
                                        <h3 className="text-5xl font-black text-slate-900 leading-tight font-sans">{currentlyInside.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-16 pt-8 border-t border-slate-100">
                                        <div>
                                            <p className="metadata-text mb-2">Entry Time</p>
                                            <p className="text-2xl font-black" style={{ color: theme.primary }}>{currentlyInside.entryTime}</p>
                                        </div>
                                        <div>
                                            <p className="metadata-text mb-2">Duration</p>
                                            <div className="flex items-center gap-2">
                                                {currentlyInside.isWarning && <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accentCoral }}></span>}
                                                <p className="text-2xl font-black text-slate-800">{currentlyInside.duration}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold mb-6 text-stone-800 tracking-tight font-serif">Up Next</h2>
                                <Card className="rounded-2xl border-stone-50 shadow-sm drop-shadow-sm p-8 relative">
                                    <div className="mb-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="material-symbols-outlined text-base font-light" style={{ color: theme.primary }}>schedule</span>
                                            <span className="font-semibold text-sm tracking-wide" style={{ color: theme.primary }}>{upNext.scheduledTime}</span>
                                        </div>
                                        <h3 className="text-4xl font-bold text-stone-900 leading-tight font-serif">{upNext.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            size="lg"
                                            className="flex-1 rounded-full font-semibold shadow-lg hover:brightness-90 transition-all flex items-center justify-center gap-2 h-14"
                                            style={{ backgroundColor: theme.primary, boxShadow: '0 10px 15px -3px rgba(15, 118, 110, 0.2)' }}
                                        >
                                            Send In
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-14 h-14 rounded-full border border-stone-100 text-stone-400 hover:text-[#0F766E] hover:border-[#0F766E]/20 transition-all flex items-center justify-center bg-transparent"
                                        >
                                            <span className="material-symbols-outlined">call</span>
                                        </Button>
                                    </div>
                                </Card>
                            </section>
                        </div>

                        {/* Right Column: Queue */}
                        <div className="col-span-12 lg:col-span-7">
                            <section>
                                <div className="flex justify-between items-end mb-6">
                                    <h2 className="text-xl font-bold text-stone-800 tracking-tight font-serif">Waiting Queue</h2>
                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{waitingQueue.length} Patients Pending</span>
                                </div>
                                <Card className="premium-card overflow-hidden">
                                    <div className="divide-y divide-slate-100">
                                        {waitingQueue.map((patient) => (
                                            <div key={patient.id} className="px-10 py-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                                <div className="flex items-center gap-12">
                                                    <span className="text-base font-black text-slate-950 w-24 tracking-tight">{patient.scheduledTime}</span>
                                                    <h4 className="text-lg font-black text-slate-900 group-hover:text-[#0F766E] transition-colors">{patient.name}</h4>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <Button variant="ghost" size="icon" className="text-stone-300 hover:text-[#0F766E] transition-colors hover:bg-transparent">
                                                        <span className="material-symbols-outlined text-2xl font-light">call</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-stone-300 hover:text-stone-500 transition-colors hover:bg-transparent">
                                                        <span className="material-symbols-outlined text-2xl font-light">more_vert</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </section>
                        </div>

                    </div>
                </main>

                <aside className="w-80 p-12 space-y-12">
                    <div>
                        <Button
                            size="lg"
                            className="w-full text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all h-16 shadow-xl hover:shadow-2xl hover:bg-rose-600"
                            style={{ backgroundColor: theme.accentCoral, boxShadow: '0 20px 25px -5px rgba(244, 63, 94, 0.2)' }}
                        >
                            <span className="material-symbols-outlined font-light">person_add</span>
                            Add Walk-in
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-stone-400 font-serif">Search Patients</h3>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 text-lg font-light z-10">search</span>
                            <Input
                                className="w-full pl-12 pr-4 h-14 bg-white border-stone-100 rounded-2xl focus-visible:ring-1 focus-visible:ring-[#0F766E]/20 transition-all font-sans text-sm drop-shadow-sm shadow-sm outline-none placeholder:text-stone-300"
                                placeholder="Find patient..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-stone-200">
                        <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-6 font-serif">Clinic Info</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-stone-500">{clinicInfo.session}</span>
                                <Badge
                                    variant="outline"
                                    className="px-2 py-1 text-[10px] font-bold rounded uppercase border-0"
                                    style={{ backgroundColor: 'rgba(15, 118, 110, 0.1)', color: theme.primary }}
                                >
                                    {clinicInfo.sessionStatus}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-stone-500">Avg. Wait Time</span>
                                <span className="font-semibold text-stone-700">{clinicInfo.avgWaitTime}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Background Decorators */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0F766E]/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-stone-200/40 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};

export default ReceptionistDesktop;
