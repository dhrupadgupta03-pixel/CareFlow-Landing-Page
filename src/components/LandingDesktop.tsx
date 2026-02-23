import React from 'react';
import { landingData } from '../data/landingMockData';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const theme = {
    primary: "#52b7ae",
    primaryDark: "#0f756d",
    bgLight: "#ffffff",
};

interface LandingDesktopProps {
    readonly className?: string;
}

export const LandingDesktop: React.FC<LandingDesktopProps> = ({ className = '' }) => {
    return (
        <div className={`bg-white text-slate-900 font-display ${className}`}>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-white p-2 rounded-lg" style={{ backgroundColor: theme.primary }}>
                            <span className="material-symbols-outlined block text-2xl">medical_services</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dr. Chamber</h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-medium hover:text-[#52b7ae] transition-colors" href="#about">About</a>
                        <a className="text-sm font-medium hover:text-[#52b7ae] transition-colors" href="#services">Services</a>
                        <a className="text-sm font-medium hover:text-[#52b7ae] transition-colors" href="#testimonials">Testimonials</a>
                        <a className="text-sm font-medium hover:text-[#52b7ae] transition-colors" href="#contact">Contact</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            className="hidden sm:flex text-white rounded-full text-sm font-bold transition-all items-center gap-2 hover:opacity-90 h-10 px-6"
                            style={{ backgroundColor: theme.primaryDark }}
                        >
                            <span className="material-symbols-outlined text-sm">call</span>
                            Call Now (+123456789)
                        </Button>
                        <Avatar className="size-10 border-2" style={{ borderColor: `${theme.primary}33` }}>
                            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBKi7DRSoEPJe6chB1tyvgIoRY_n5T5zg1ZpyLWaQKEoYm31ysYo4hwvBo-4JbLmbvrOXrtlkeduKoR9_tHYYt23ZNgaJn8Q79qh197fduXyNFkbmlQAEBmtaKr8bCYhgWbvnl3GanFaTtUWH26w8HX9WsNsGoC6cLtWYLJWE2x7McK93pV0VQ13gfDJfmtaKT9dgxZtSGADImWhK-LjPKW488VRYspTgt_ZUG4Xss_rASh-B18qkrxyNI-2cK3ran6Cd-MgRuYK4" alt="Doctor" className="object-cover" />
                            <AvatarFallback>DC</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <Badge
                                variant="outline"
                                className="inline-block py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest border-0 mb-6"
                                style={{ backgroundColor: `${theme.primary}1A`, color: theme.primaryDark }}
                            >
                                {landingData.hero.tagline}
                            </Badge>
                            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight mb-10">
                                {landingData.hero.title.first} <br /><span style={{ color: theme.primaryDark }}>{landingData.hero.title.highlight}</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-bold mb-12 max-w-2xl">
                                {landingData.hero.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="text-white rounded-full text-lg font-bold transition-all hover:bg-[#0f756d] h-14 px-10"
                                    style={{ backgroundColor: theme.primary, boxShadow: '0 10px 15px -3px rgba(82, 183, 174, 0.2)' }}
                                >
                                    Book Private Appointment
                                </Button>
                                <Button size="lg" variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full text-lg font-bold transition-all h-14 px-10">
                                    View Services
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-5">
                        <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: theme.primary }}></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: theme.primaryDark }}></div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-24 bg-slate-50" id="about">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                                    <img alt="Doctor consulting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDarE9BMzX_v03tL1ofCaH_poq6tMEXjbf27pIWTJpaJLhlbsjXg7JGnWFd_zGOBTGu16Ce2hVdijMED7TKVEC1WXKm_BY1g4n0AmM90mCV0uGbmzuXFchF9X5KqEyFgw9jlbfMFtorN7nGaqfczsDzmiibJSG_GB_18ZXf9mS_9yqqkgsx0uicAyLPGHGmoVGVifhfVdSVJD86Gn821lkI1mHIPlYbTattsVPmhP8Yq9OlHTImxzUmgsVFD8M_km3VYvZHyB1f4fE" />
                                </div>
                                <Card className="absolute -bottom-8 -right-8 bg-white p-8 rounded-xl shadow-xl border-slate-100 hidden md:block">
                                    <CardContent className="p-0">
                                        <p className="text-4xl font-black mb-1" style={{ color: theme.primary }}>{landingData.about.stats.number}</p>
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{landingData.about.stats.label}</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-900 mb-6">{landingData.about.title}</h2>
                                    <p className="text-lg font-bold text-slate-700 leading-relaxed">{landingData.about.description}</p>
                                </div>
                                <div className="space-y-6">
                                    {landingData.about.points.map(point => (
                                        <div key={point.title} className="flex gap-5 p-7 premium-card">
                                            <span className="material-symbols-outlined text-4xl" style={{ color: theme.primaryDark, fontVariationSettings: "'FILL' 1" }}>{point.icon}</span>
                                            <div>
                                                <h3 className="text-xl font-black mb-1.5">{point.title}</h3>
                                                <p className="text-slate-700 font-bold">{point.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-24" id="services">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">{landingData.services.title}</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">{landingData.services.description}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {landingData.services.list.map(service => (
                                <Card key={service.id} className="group premium-card p-2">
                                    <CardContent className="p-0">
                                        <div className="aspect-[16/10] rounded-lg overflow-hidden mb-6">
                                            <img
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src={service.imageUrl}
                                            />
                                        </div>
                                        <div className="px-6 pb-6">
                                            <h3 className="text-xl font-black mb-3">{service.title}</h3>
                                            <p className="text-[15px] font-bold text-slate-700 leading-relaxed mb-6">{service.description}</p>
                                            <Button variant="link" className="font-black inline-flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer p-0 h-auto" style={{ color: theme.primaryDark }}>
                                                Learn More <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 bg-[#52b7ae]/5" id="testimonials">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">{landingData.testimonials.title}</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">{landingData.testimonials.description}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {landingData.testimonials.list.map(testimonial => (
                                <Card key={testimonial.id} className="premium-card bg-white">
                                    <CardContent className="p-10">
                                        <div className="mb-6" style={{ color: theme.primaryDark }}>
                                            <span className="material-symbols-outlined text-4xl font-black">format_quote</span>
                                        </div>
                                        <p className="text-xl text-slate-900 leading-relaxed font-bold italic mb-8">"{testimonial.quote}"</p>
                                        <div className="flex items-center gap-5">
                                            <Avatar className="size-16 border-2 border-slate-100 shadow-sm">
                                                <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} className="object-cover" />
                                                <AvatarFallback className="bg-slate-50 text-slate-400 font-bold">T</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-black text-xl text-slate-950">{testimonial.name}</h4>
                                                <p className="text-base font-black uppercase tracking-tight" style={{ color: theme.primaryDark }}>{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                        <div className="rounded-xl p-12 lg:p-20 text-center text-white relative overflow-hidden" style={{ backgroundColor: theme.primaryDark }}>
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">{landingData.cta.title}</h2>
                                <p className="text-xl text-white font-bold opacity-90 mb-12">{landingData.cta.description}</p>
                                <Button size="lg" className="bg-white rounded-full text-2xl font-black transition-all shadow-2xl hover:scale-105 h-20 px-16" style={{ color: theme.primaryDark }}>
                                    Request Your Appointment
                                </Button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100" id="contact">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-white p-1.5 rounded-lg scale-90" style={{ backgroundColor: theme.primary }}>
                                    <span className="material-symbols-outlined block">medical_services</span>
                                </div>
                                <h2 className="text-xl font-bold tracking-tight text-slate-900">Dr. Chamber</h2>
                            </div>
                            <p className="text-slate-600 mb-6">{landingData.footer.description}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Location</h3>
                            <div className="flex gap-3 text-slate-600">
                                <span className="material-symbols-outlined" style={{ color: theme.primary }}>location_on</span>
                                <p>122 Harley St, Marylebone<br />London W1G 7JH, UK</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Contact & Hours</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-slate-600">
                                    <span className="material-symbols-outlined" style={{ color: theme.primary }}>call</span>
                                    <p>{landingData.footer.contact}</p>
                                </div>
                                <div className="flex gap-3 text-slate-600">
                                    <span className="material-symbols-outlined" style={{ color: theme.primary }}>schedule</span>
                                    <div>
                                        <p>Mon - Fri: 09:00 - 18:00</p>
                                        <p className="text-xs opacity-60">Weekends by request only</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                <li><a className="text-slate-600 transition-colors hover:text-[#52b7ae]" href="#">Privacy Policy</a></li>
                                <li><a className="text-slate-600 transition-colors hover:text-[#52b7ae]" href="#">Terms of Service</a></li>
                                <li><a className="text-slate-600 transition-colors hover:text-[#52b7ae]" href="#">Cookie Settings</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-slate-500">© 2024 Dr. Chamber Boutique Medical. All rights reserved.</p>
                        <div className="flex gap-6">
                            {/* Social icons skipped for brevity */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingDesktop;
