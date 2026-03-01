import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ChevronRight, ArrowRight, Activity, CalendarCheck, Stethoscope, Users, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Journey', href: '#journey' },
    { label: 'Features', href: '#features' },
];

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

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

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
            {/* Navbar */}
            <motion.nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3' : 'bg-transparent py-5'}`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800">CareFlow</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a key={item.label} href={item.href} className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <button onClick={() => navigate('/sandbox')} className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-slate-200">
                        Try Sandbox
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-teal-100/40 blur-[120px]" />
                    <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-100/40 blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-xl">
                        <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-6">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                            </span>
                            Next-Gen Clinic Management
                        </motion.div>
                        <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                            Care that <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-indigo-700">Connects.</span>
                        </motion.h1>
                        <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                            A unified, intuitive platform designed for the modern Indian clinic. Seamlessly connect patients, receptionists, and doctors for a smoother healthcare journey.
                        </motion.p>
                        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/sandbox')} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-teal-700 text-white font-semibold text-lg hover:bg-teal-800 transition-all hover:shadow-xl hover:shadow-teal-700/20 active:scale-95 group">
                                Explore Platform
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95">
                                View Demo
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div style={{ opacity, scale }} className="relative h-[400px] md:h-[600px] w-full lg:w-[120%] lg:-ml-[10%] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                        <img
                            src="/home/dhrupad/.gemini/antigravity/brain/3ff36d8c-4096-4244-b5f2-5d3e3ecd3d88/simple_indian_clinic_hero_1772217657894.png"
                            alt="Friendly Indian doctor in a clean modern clinic"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section id="ecosystem" className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">One Platform. Three Roles.</h2>
                        <p className="text-slate-600 text-lg">Tailored experiences designed specifically for the needs of everyone in the clinic.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Patient', icon: Users, desc: 'Intuitive booking, transparent status updates, and digital records.', color: 'from-orange-50 to-orange-100 border-orange-200 text-orange-700', path: '/patient' },
                            { title: 'Receptionist', icon: CalendarCheck, desc: 'Centralized command center to manage queue flow and approvals.', color: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700', path: '/receptionist' },
                            { title: 'Doctor', icon: Stethoscope, desc: 'Focused dashboard with patient history and instant schedule sync.', color: 'from-teal-50 to-teal-100 border-teal-200 text-teal-700', path: '/doctor' }
                        ].map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }
                                }}
                                onClick={() => navigate(role.path)}
                                className={`group cursor-pointer p-8 rounded-3xl border bg-gradient-to-br hover:shadow-lg transition-all hover:-translate-y-1 ${role.color}`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-inherit">
                                    <role.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-900">{role.title}</h3>
                                <p className="text-slate-600 mb-8">{role.desc}</p>
                                <div className="flex items-center font-semibold text-sm group-hover:underline">
                                    View Experience <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Journey */}
            <section id="journey" className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Seamless Synchronization</h2>
                        <p className="text-slate-600 text-lg">Watch how information flows instantly without manual intervention.</p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { step: '1', title: 'Patient Books', desc: 'Securely requests a slot via mobile.' },
                                { step: '2', title: 'Receptionist Approves', desc: 'Verifies and confirms the appointment.' },
                                { step: '3', title: 'Doctor Notified', desc: 'Dashboard updates instantly with new patient.' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                                    className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative"
                                >
                                    <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold mb-4 z-10 shadow-md">
                                        {item.step}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-slate-500 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Designed for speed and reliability.</h2>
                            <p className="text-slate-600 text-lg mb-8">We've stripped away the complexity of traditional clinic software to focus on what matters: delivering care.</p>

                            <ul className="space-y-4">
                                {[
                                    'Real-time state synchronization across all devices.',
                                    'Optimized for both mobile and high-resolution desktops.',
                                    'Clean, distraction-free clinical UI.',
                                    'Built with modern web standards for maximum performance.'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-100 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-inner flex items-center justify-center min-h-[400px]">
                            {/* Abstract Feature Visualization */}
                            <div className="relative w-full max-w-sm aspect-square">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-teal-200 rounded-full" />
                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-8 border border-indigo-200 rounded-full" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-teal-700">
                                        <Activity className="w-10 h-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA & Footer */}
            <footer className="bg-slate-900 text-white pt-24 pb-8 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to upgrade your clinic?</h2>
                    <p className="text-xl text-slate-400 mb-10">Get in touch to see how CareFlow can transform your daily operations.</p>
                    <button className="px-10 py-5 rounded-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-colors active:scale-95 shadow-xl shadow-teal-900/50">
                        Contact Us Today
                    </button>
                </div>

                <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-teal-600" />
                        <span className="font-bold text-slate-300 tracking-tight">CareFlow</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <p>© 2024 CareFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
