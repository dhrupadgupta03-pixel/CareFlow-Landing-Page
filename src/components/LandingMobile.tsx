import React from 'react';
import { landingMobileData } from '../data/landingMobileMockData';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const theme = {
    primary: "#0f756d",
    accent: "#F43F5E",
    bgLight: "#f6f8f8",
    bgDark: "#112120",
    neutralSoft: "#FAFAF9"
};

interface LandingMobileProps {
    readonly className?: string;
}

export const LandingMobile: React.FC<LandingMobileProps> = ({ className = '' }) => {
    return (
        <div className={`bg-background-light text-[#111717] font-display min-h-screen ${className}`} style={{ backgroundColor: theme.bgLight }}>
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: `${theme.primary}1A` }}>
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="text-white p-2 rounded-lg" style={{ backgroundColor: theme.primary }}>
                            <span className="material-symbols-outlined text-2xl">stethoscope</span>
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight" style={{ color: theme.primary }}>{landingMobileData.header.title}</h2>
                    </div>
                    <Button
                        asChild
                        className="rounded-full font-bold text-sm transition-all text-white hover:opacity-90 px-5"
                        style={{ backgroundColor: theme.primary }}
                    >
                        <a href={landingMobileData.header.phoneNumber}>
                            {landingMobileData.header.callToActionButton}
                        </a>
                    </Button>
                </div>
            </header>

            <main className="relative">
                {/* Hero Section */}
                <section className="px-6 pt-10 pb-16 overflow-hidden relative">
                    <div className="relative z-10 flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <span className="metadata-text">
                                {landingMobileData.hero.badge}
                            </span>
                            <h1 className="text-slate-950 text-5xl font-black leading-[1.05] tracking-tight">
                                {landingMobileData.hero.titleLine1} <br />
                                <span style={{ color: theme.primary }}>{landingMobileData.hero.titleLine2}</span>
                            </h1>
                            <p className="text-slate-700 text-lg leading-relaxed font-bold max-w-xs">
                                {landingMobileData.hero.description}
                            </p>
                            <div className="pt-4">
                                <Button
                                    size="lg"
                                    className="text-white rounded-full font-bold text-lg shadow-lg flex items-center gap-3 active:scale-95 transition-transform h-16 px-8 hover:brightness-110"
                                    style={{ backgroundColor: theme.accent, boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.2)' }}
                                >
                                    {landingMobileData.hero.ctaText}
                                    <span className="material-symbols-outlined">calendar_today</span>
                                </Button>
                            </div>
                        </div>
                        <div className="relative mt-10">
                            {/* Organic Blob Background */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72"
                                style={{ backgroundColor: `${theme.primary}33`, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                            ></div>
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                                <img alt="Professional doctor portrait" className="w-full h-full object-cover" src={landingMobileData.hero.imageUrl} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="bg-white px-6 py-20 text-center">
                    <div className="max-w-md mx-auto flex flex-col items-center gap-6">
                        <div className="w-16 h-1 rounded-full" style={{ backgroundColor: `${theme.primary}4D` }}></div>
                        <h2 className="text-3xl font-bold tracking-tight text-[#111717]">{landingMobileData.about.title}</h2>
                        <p className="text-gray-600 leading-loose text-base">
                            {landingMobileData.about.description}
                        </p>
                        <div className="flex gap-8 pt-4">
                            {landingMobileData.about.stats.map((stat, idx) => (
                                <div key={idx} className={`text-center ${idx === 1 ? 'border-x border-slate-200 px-8' : ''}`}>
                                    <div className="text-3xl font-black" style={{ color: theme.primary }}>{stat.value}</div>
                                    <div className="metadata-text">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="px-6 py-20" style={{ backgroundColor: theme.bgLight }}>
                    <h2 className="text-2xl font-bold mb-10 text-center">{landingMobileData.services.title}</h2>
                    <div className="flex flex-col gap-6">
                        {landingMobileData.services.list.map((service, idx) => (
                            <Card
                                key={idx}
                                className="premium-card p-6"
                            >
                                <CardContent className="p-0 flex flex-col items-start gap-4">
                                    <div className="p-3 rounded-xl shadow-inner" style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}>
                                        <span className="material-symbols-outlined text-4xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>{service.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-950">{service.title}</h3>
                                    <p className="text-slate-700 text-base font-bold leading-relaxed">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 overflow-hidden bg-white">
                    <h2 className="text-2xl font-bold mb-8 px-6">{landingMobileData.testimonials.title}</h2>
                    <div className="flex overflow-x-auto snap-x snap-mandatory px-6 gap-4 no-scrollbar pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {landingMobileData.testimonials.list.map((testimonial, idx) => {
                            const isFirst = idx === 0;
                            return (
                                <Card
                                    key={testimonial.id}
                                    className={`snap-center shrink-0 w-80 rounded-3xl overflow-hidden ${isFirst ? 'text-white border-0 shadow-xl' : 'border shadow-sm drop-shadow-sm'}`}
                                    style={isFirst ? { backgroundColor: theme.primary } : { backgroundColor: `${theme.primary}1A`, borderColor: `${theme.primary}1A` }}
                                >
                                    <CardContent className="p-8">
                                        <div className="flex mb-4" style={{ color: theme.accent }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            ))}
                                        </div>
                                        <p className="italic mb-6 leading-relaxed" style={{ color: isFirst ? 'rgba(255,255,255,0.9)' : `${theme.primary}CC` }}>
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-10" style={!isFirst ? { backgroundColor: `${theme.primary}33`, color: theme.primary } : { backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                                <AvatarFallback className="font-bold bg-transparent">
                                                    {testimonial.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className={`font-bold text-sm ${isFirst ? '' : 'text-[#0f756d]'}`} style={!isFirst ? { color: theme.primary } : {}}>{testimonial.name}</p>
                                                <p className="text-xs" style={{ color: isFirst ? 'rgba(255,255,255,0.6)' : `${theme.primary}99` }}>{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 pt-16 pb-10" style={{ backgroundColor: theme.neutralSoft }}>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-xl font-black" style={{ color: theme.primary }}>{landingMobileData.footer.contactTitle}</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined" style={{ color: theme.primary }}>location_on</span>
                                    <p className="text-gray-600 text-sm whitespace-pre-line">{landingMobileData.footer.address}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined" style={{ color: theme.primary }}>call</span>
                                    <p className="text-gray-600 text-sm">{landingMobileData.footer.phone}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined" style={{ color: theme.primary }}>schedule</span>
                                    <p className="text-gray-600 text-sm">{landingMobileData.footer.hours}</p>
                                </div>
                            </div>
                        </div>

                        {/* Mini Map */}
                        <div className="rounded-2xl overflow-hidden h-48 bg-gray-200 shadow-inner">
                            <img alt="Map location" className="w-full h-full object-cover" src={landingMobileData.footer.mapImageUrl} />
                        </div>

                        <div className="border-t pt-8 flex flex-col gap-4 items-center" style={{ borderColor: `${theme.primary}1A` }}>
                            <div className="flex gap-6">
                                <a className="transition-colors hover:text-[#0f756d]" style={{ color: `${theme.primary}99` }} href="#">Privacy</a>
                                <a className="transition-colors hover:text-[#0f756d]" style={{ color: `${theme.primary}99` }} href="#">Terms</a>
                                <a className="transition-colors hover:text-[#0f756d]" style={{ color: `${theme.primary}99` }} href="#">Cookies</a>
                            </div>
                            <p className="text-xs text-center" style={{ color: `${theme.primary}66` }}>
                                {landingMobileData.footer.copyright}
                            </p>
                        </div>
                    </div>
                </footer>

                {/* Floating Action Button */}
                <Button
                    size="icon"
                    className="fixed bottom-6 right-6 z-50 text-white size-14 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform hover:bg-rose-600"
                    style={{ backgroundColor: theme.accent }}
                >
                    <span className="material-symbols-outlined text-2xl">add_alert</span>
                </Button>
            </main>
        </div>
    );
};

export default LandingMobile;
