import React from 'react';
import { doctorData, activePatient, scheduleOverview } from '../data/mockData';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
    readonly className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className = '' }) => {
    return (
        <div className={`flex h-screen overflow-hidden bg-white ${className}`}>
            {/* Sidebar Navigation */}
            <aside className="w-72 bg-white border-r border-slate-100 flex flex-col justify-between p-8">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-4 px-2">
                        <Avatar className="size-14 border border-slate-100 shadow-sm">
                            <AvatarImage src={doctorData.imageUrl} alt={doctorData.name} />
                            <AvatarFallback className="bg-slate-50 text-slate-400 font-bold">DR</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h1 className="text-slate-950 text-base font-black leading-tight">{doctorData.name}</h1>
                            <p className="text-[#0f756d] text-xs font-black uppercase tracking-tight mt-1">{doctorData.clinic}</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <a className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0f756d]/10 text-[#0f756d] transition-all" href="#">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm font-bold">Home</span>
                        </a>
                        <a className="flex items-center gap-3 px-6 py-4 rounded-full text-slate-500 hover:text-[#0f756d] hover:bg-[#0f756d]/5 transition-all" href="#">
                            <span className="material-symbols-outlined font-black">group</span>
                            <span className="text-sm font-black">Patients</span>
                        </a>
                        <a className="flex items-center gap-3 px-6 py-4 rounded-full text-slate-500 hover:text-[#0f756d] hover:bg-[#0f756d]/5 transition-all" href="#">
                            <span className="material-symbols-outlined font-black">calendar_month</span>
                            <span className="text-sm font-black">Schedule</span>
                        </a>
                        <a className="flex items-center gap-3 px-6 py-4 rounded-full text-slate-500 hover:text-[#0f756d] hover:bg-[#0f756d]/5 transition-all" href="#">
                            <span className="material-symbols-outlined font-black">settings</span>
                            <span className="text-sm font-black">Settings</span>
                        </a>
                    </nav>
                </div>
                <Button className="w-full bg-[#0f756d] text-white rounded-full h-14 hover:bg-[#0f756d]/90 shadow-lg shadow-[#0f756d]/20 transition-all font-bold text-sm">
                    <span className="material-symbols-outlined text-xl mr-2">add</span>
                    New Appointment
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-white p-12">
                <div className="max-w-5xl mx-auto flex flex-col gap-12">
                    <header className="flex flex-col gap-2">
                        <p className="metadata-text">Tuesday, October 24, 2023</p>
                        <h2 className="text-4xl font-black text-slate-950 tracking-tight">Good Morning, {doctorData.name}</h2>
                    </header>

                    <section className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="size-2 rounded-full bg-[#0f756d]"></span>
                            Active Patient
                        </h3>
                        <Card className="rounded-xl border-slate-50 shadow-sm" style={{ boxShadow: '0 10px 40px -10px rgba(15, 117, 109, 0.08)' }}>
                            <CardContent className="p-10 flex justify-between items-start">
                                <div className="flex items-center gap-6">
                                    <Avatar className="size-20 ring-4 ring-slate-50">
                                        <AvatarImage src={activePatient.imageUrl} alt={activePatient.name} />
                                        <AvatarFallback>PT</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="text-4xl font-black text-slate-950 tracking-tight">{activePatient.name}</h4>
                                        <div className="flex flex-col mt-3">
                                            <p className="text-slate-700 flex items-center gap-2 font-bold">
                                                <span className="material-symbols-outlined text-[22px] text-[#0f756d] font-black" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                                                Last visit: {activePatient.lastVisit}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="metadata-text">Scheduled Time:</span>
                                                <span className="text-base font-black text-slate-950">{activePatient.scheduledTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="secondary" className="px-8 h-12 rounded-full font-bold text-sm bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
                                        Patient History
                                    </Button>
                                    <Button className="px-10 h-12 rounded-full font-bold text-sm bg-[#0f756d] text-white hover:bg-[#0f756d]/90 shadow-lg shadow-[#0f756d]/20 transition-all">
                                        Send In
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="flex flex-col gap-6">
                        <div className="flex justify-between items-end">
                            <h3 className="text-xl font-bold text-slate-900">Schedule Overview</h3>
                            <button className="text-[#0f756d] text-sm font-bold flex items-center gap-1 hover:underline">
                                View Full Calendar <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                        <Card className="rounded-xl border-slate-50 overflow-hidden" style={{ boxShadow: '0 10px 40px -10px rgba(15, 117, 109, 0.08)' }}>
                            <div className="flex flex-col">
                                {scheduleOverview.map((item, i) => {
                                    if (item.status === 'active') {
                                        return (
                                            <div key={item.id} className="flex items-center p-6 bg-[#0f756d] text-white">
                                                <div className="w-24 shrink-0">
                                                    <p className="font-black">{item.time}</p>
                                                    <p className="text-xs opacity-70 font-bold uppercase">{item.duration}</p>
                                                </div>
                                                <div className="flex-1 flex items-center gap-4">
                                                    <Avatar className="size-12 ring-2 ring-white/30 hidden sm:block bg-white/20">
                                                        <AvatarImage src={item.imageUrl} alt={item.name} />
                                                        <AvatarFallback>PT</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-bold">{item.name}</p>
                                                        <p className="text-sm opacity-80 font-medium">{item.reason}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button className="size-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={item.id} className="flex items-center p-6 border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0">
                                            <div className="w-24 shrink-0">
                                                <p className="text-slate-900 font-bold">{item.time}</p>
                                                <p className="text-xs text-slate-400 font-medium">{item.duration}</p>
                                            </div>
                                            <div className="flex-1 flex items-center gap-4">
                                                <Avatar className="size-12 hidden sm:block bg-slate-100">
                                                    <AvatarImage src={item.imageUrl} alt={item.name} />
                                                    <AvatarFallback>PT</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-slate-900">{item.name}</p>
                                                    <p className="text-sm text-slate-500 font-medium">{item.reason}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {item.status === 'completed' ? (
                                                    <span className="text-emerald-500 material-symbols-outlined font-bold">check_circle</span>
                                                ) : (
                                                    <Badge variant="secondary" className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full border-0">
                                                        Upcoming
                                                    </Badge>
                                                )}
                                                <button className="size-10 rounded-full flex items-center justify-center text-slate-300 hover:text-[#0f756d] transition-all">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
