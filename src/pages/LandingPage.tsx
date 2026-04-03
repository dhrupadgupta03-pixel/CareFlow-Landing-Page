import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Icons curated from approved libraries
import {
    IconHeartbeat,
    IconStethoscope,
    IconCalendarCheck,
    IconUser,
    IconScan
} from '@tabler/icons-react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRight } from 'lucide-react';

// Pre-made UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

const navItems = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Journey', href: '#journey' },
    { label: 'Features', href: '#features' },
];

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
            {/* Navbar */}
            <motion.nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-border py-3' : 'bg-transparent py-5'}`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                            <IconHeartbeat className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">CareFlow</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a key={item.label} href={item.href} className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <Button onClick={() => navigate('/sandbox')} className="rounded-full shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform" variant="default">
                        Try Sandbox
                    </Button>
                </div>
            </motion.nav>

            {/* Hero Section with Aceternity Macbook Scroll */}
            <section className="relative pt-32 pb-0 md:pt-40 px-0 overflow-hidden bg-gradient-to-b from-slate-50 to-background">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-teal-100/40 blur-[120px]" />
                    <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/30 blur-[100px]" />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="text-center max-w-3xl px-6 md:px-12 mb-[-150px] md:mb-[-250px] relative z-20">
                        <Badge variant="secondary" className="mb-6 rounded-full bg-teal-50 text-teal-700 border border-teal-200 shadow-sm py-1.5 px-4 font-semibold text-xs tracking-wide">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            Next-Gen Clinic Management
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                            Care that <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">Connects.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                            A unified, intuitive platform designed for the modern Indian clinic. Seamlessly connect patients, receptionists, and doctors for a smoother healthcare journey.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="rounded-full text-base px-8 h-14 shadow-xl shadow-teal-700/20 group hover:-translate-y-1 transition-all">
                                Explore Platform
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-14 bg-white hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-sm">
                                View Demo
                            </Button>
                        </div>
                    </div>

                    {/* Aceternity 3D Macbook Scroll Component */}
                    <div className="w-full relative z-10 overflow-visible translate-y-[10vh]">
                        <MacbookScroll
                            title=""
                            src="/dashboard-screenshot.png"
                            showGradient={true}
                        />
                    </div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section id="ecosystem" className="py-32 px-6 md:px-12 bg-white relative z-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">One Platform. <br /> Three Roles.</h2>
                        <p className="text-slate-600 text-lg">Tailored experiences designed specifically for the needs of everyone in the clinic.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Patient', icon: IconUser, desc: 'Intuitive booking, transparent status updates, and digital records.', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-t-orange-400', path: '/patient' },
                            { title: 'Receptionist', icon: IconCalendarCheck, desc: 'Centralized command center to manage queue flow and approvals.', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-t-indigo-400', path: '/receptionist' },
                            { title: 'Doctor', icon: IconStethoscope, desc: 'Focused dashboard with patient history and instant schedule sync.', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-t-teal-500', path: '/doctor' }
                        ].map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                                }}
                                onClick={() => navigate(role.path)}
                                className="cursor-pointer group"
                            >
                                <Card className={`h-full border border-slate-200/80 border-t-4 ${role.border} shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white overflow-hidden`}>
                                    <CardHeader className="pb-4 pt-8">
                                        <div className={`w-14 h-14 rounded-2xl ${role.bg} ${role.color} flex items-center justify-center mb-6 shadow-sm ring-1 ring-inset ring-black/5`}>
                                            <role.icon stroke={1.5} className="w-7 h-7" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{role.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-slate-600 leading-relaxed mb-6">
                                            {role.desc}
                                        </CardDescription>
                                        <div className="flex items-center font-semibold text-sm text-slate-900 group-hover:text-primary transition-colors">
                                            View Experience <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Smart Features / AI Section */}
            <section id="features" className="py-32 px-6 md:px-12 bg-slate-50 border-t border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <Badge variant="outline" className="mb-6 rounded-full bg-white text-slate-700 shadow-sm py-1.5 px-4 font-semibold text-sm tracking-wide border-slate-200">
                                Built for Speed
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">Lightning fast.<br />Insanely smart.</h2>
                            <p className="text-slate-600 text-lg mb-10 leading-relaxed">We've stripped away the complexity of traditional clinic software to focus on what matters: delivering care with unparalleled efficiency.</p>

                            <ul className="space-y-5">
                                {[
                                    'Real-time state synchronization across all devices.',
                                    'Optimized for both mobile and high-resolution desktops.',
                                    'Clean, distraction-free clinical UI to reduce fatigue.',
                                    'Built with modern web standards for maximum performance.'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-0.5 relative">
                                            <div className="absolute inset-0 bg-teal-100 rounded-full blur-sm opacity-50" />
                                            <CheckCircleIcon className="w-6 h-6 text-teal-600 relative z-10" />
                                        </div>
                                        <span className="text-slate-700 font-medium text-lg leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button className="mt-12 rounded-full px-8 h-12 shadow-lg shadow-slate-200 group">
                                Read the Docs
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Interactive Feature Mockup */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-indigo-50 transform rotate-3 rounded-[3rem] shadow-inner -z-10" />
                            <Card className="bg-white/80 backdrop-blur-xl border-white/50 shadow-2xl p-8 rounded-[2rem]">
                                <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                                        <IconScan size={120} stroke={1} />
                                    </div>
                                    <div className="relative z-10">
                                        <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 mb-8 border-none">
                                            <IconScan className="w-3 h-3 mr-1.5" /> AI Prescription Digitizer
                                        </Badge>
                                        <h3 className="text-2xl font-bold mb-4">Handwriting to Digital Data in seconds.</h3>
                                        <p className="text-slate-300 mb-8 text-sm leading-relaxed max-w-sm">
                                            Upload a doctor's handwritten note and our secure AI instantly extracts medicines, dosages, and instructions into structured clinical data.
                                        </p>
                                        <Button variant="secondary" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg">
                                            Try Digitizer Demo
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA & Footer */}
            <footer className="bg-slate-950 text-slate-300 pt-32 pb-8 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-900/30 blur-[120px] rounded-[100%] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">Ready to upgrade your clinic?</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Get in touch to see how CareFlow can transform your daily operations and patient satisfaction.</p>
                    <Button size="lg" className="px-10 h-16 rounded-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-colors active:scale-95 shadow-xl shadow-teal-900/50 hover:shadow-teal-900/80">
                        Contact Us Today
                    </Button>
                </div>

                <div className="max-w-7xl mx-auto border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-teal-900 flex items-center justify-center">
                            <IconHeartbeat className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="font-bold text-white tracking-tight">CareFlow</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <p className="text-slate-500">© 2024 CareFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
