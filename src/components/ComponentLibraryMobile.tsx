import React from 'react';
import {
    libraryHeaderData,
    libraryHeroData,
    doctorProfileData,
    serviceIconsData,
    colorPaletteData
} from '../data/componentLibraryMockData';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const theme = {
    primary: "#0f756d",
    bgLight: "#fafaf9",
    bgDark: "#112120",
    stoneCustom: "#e7e5e4",
};

interface ComponentLibraryMobileProps {
    readonly className?: string;
}

export const ComponentLibraryMobile: React.FC<ComponentLibraryMobileProps> = ({ className = '' }) => {
    return (
        <div className={`bg-background-light font-display text-[#112120] antialiased min-h-screen pb-32 ${className}`} style={{ backgroundColor: theme.bgLight }}>
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 backdrop-blur-md border-b px-4 py-4" style={{ backgroundColor: `${theme.bgLight}CC`, borderColor: `${theme.primary}1A` }}>
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl" style={{ color: theme.primary }}>{libraryHeaderData.logoIcon}</span>
                        <h1 className="font-serif text-xl font-bold" style={{ color: theme.primary }}>{libraryHeaderData.title}</h1>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full transition-colors hover:bg-black/5 h-10 w-10">
                        <span className="material-symbols-outlined" style={{ color: theme.primary }}>search</span>
                    </Button>
                </div>
            </header>

            <main className="max-w-md mx-auto px-6 py-8 space-y-12">
                {/* Hero Section */}
                <section className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-950 leading-tight tracking-[0.01em]">{libraryHeroData.title}</h2>
                    <p className="text-lg text-slate-700 font-bold leading-relaxed">{libraryHeroData.description}</p>
                </section>

                {/* Buttons Section */}
                <section className="space-y-6">
                    <h3 className="metadata-text">Action Buttons</h3>
                    <div className="flex flex-col gap-4">
                        <Button
                            size="lg"
                            className="text-white rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:bg-opacity-90 hover:brightness-110 h-14 shadow-lg"
                            style={{ backgroundColor: theme.primary, boxShadow: '0 10px 15px -3px rgba(15, 117, 109, 0.2)' }}
                        >
                            Book Now
                            <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all h-14 bg-transparent hover:bg-stone-50"
                            style={{ borderColor: theme.primary, color: theme.primary }}
                        >
                            Learn More
                        </Button>
                    </div>
                </section>

                {/* Form Elements */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: `${theme.primary}99` }}>Input Fields</h3>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold ml-4" style={{ color: `${theme.primary}CC` }}>FULL NAME</label>
                            <Input
                                className="w-full bg-white border-2 rounded-xl px-6 h-14 outline-none transition-all placeholder-stone-400 font-sans text-base focus-visible:ring-1 focus-visible:ring-[#0f756d]"
                                style={{ borderColor: theme.stoneCustom }}
                                placeholder="Dr. Sarah Jenkins"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold ml-4" style={{ color: `${theme.primary}CC` }}>APPOINTMENT DATE</label>
                            <div className="relative">
                                <Input
                                    className="w-full bg-white border-2 rounded-xl px-6 h-14 outline-none font-sans text-base focus-visible:ring-1 focus-visible:ring-[#0f756d]"
                                    style={{ borderColor: theme.stoneCustom }}
                                    type="text"
                                    defaultValue="October 24, 2024"
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: `${theme.primary}99` }}>calendar_today</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Doctor Card Section */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: `${theme.primary}99` }}>Doctor Profile Card</h3>
                    <Card className="premium-card bg-white p-7">
                        <CardContent className="p-0 flex flex-col items-center text-center space-y-6 w-full">
                            <div className="relative">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-xl" style={{ borderColor: `${theme.primary}1A` }}>
                                    <img alt="Doctor profile" className="w-full h-full object-cover" src={doctorProfileData.imageUrl} />
                                </div>
                                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-black text-3xl text-slate-950 tracking-tight">{doctorProfileData.name}</h4>
                                <p className="text-base font-black uppercase tracking-tight" style={{ color: theme.primary }}>{doctorProfileData.title}</p>
                            </div>
                            <div className="flex gap-3 py-2">
                                <Badge className="px-4 py-1.5 text-xs font-black rounded-full border-0 shadow-sm" style={{ backgroundColor: theme.primary, color: 'white' }}>{doctorProfileData.rating}</Badge>
                                <Badge className="px-4 py-1.5 text-xs font-black rounded-full border-0 shadow-sm" style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}>{doctorProfileData.experience}</Badge>
                            </div>
                            <Button
                                className="w-full h-14 font-black text-base rounded-full transition-all shadow-md active:scale-95"
                                style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}
                            >
                                View Profile
                            </Button>
                        </CardContent>
                    </Card>
                </section>

                {/* Service Icons (Glassmorphism) */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: `${theme.primary}99` }}>Specialized Services</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {serviceIconsData.map((service, idx) => (
                            <Card
                                key={idx}
                                className="rounded-2xl transition-transform hover:scale-[1.02] border-white/30 shadow-none"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.4)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                }}
                            >
                                <CardContent className="p-6 flex flex-col items-center gap-3">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined text-3xl" style={{ color: theme.primary }}>{service.icon}</span>
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: theme.primary }}>{service.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Color Palette */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: `${theme.primary}99` }}>Color System</h3>
                    <div className="flex items-center gap-6">
                        {colorPaletteData.map((colorItem, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2">
                                <div
                                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                                    style={{ backgroundColor: colorItem.color }}
                                ></div>
                                <span className="text-[10px] font-bold" style={{ color: `${theme.primary}99` }}>{colorItem.name}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t pb-8 pt-4 px-8" style={{ borderColor: `${theme.primary}0D` }}>
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-4 hover:bg-transparent" style={{ color: theme.primary }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                        <span className="text-[10px] font-bold mt-1">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center gap-1 hover:text-[#0f756d] transition-colors h-auto py-2 px-4 hover:bg-transparent" style={{ color: `${theme.primary}66` }}>
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-[10px] font-bold mt-1">Doctors</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center gap-1 hover:text-[#0f756d] transition-colors h-auto py-2 px-4 hover:bg-transparent" style={{ color: `${theme.primary}66` }}>
                        <span className="material-symbols-outlined">calendar_month</span>
                        <span className="text-[10px] font-bold mt-1">Bookings</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center gap-1 hover:text-[#0f756d] transition-colors h-auto py-2 px-4 hover:bg-transparent" style={{ color: `${theme.primary}66` }}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-bold mt-1">Profile</span>
                    </Button>
                </div>
            </nav>
        </div>
    );
};

export default ComponentLibraryMobile;
