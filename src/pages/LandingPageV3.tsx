import React from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Icons
import {
    IconHeartbeat,
    IconStethoscope,
    IconCalendarCheck,
    IconUser,
    IconScan,
    IconBrain,
    IconShieldCheck,
    IconClock,
} from "@tabler/icons-react";

// UI primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// New components from the implementation plan
import { FloatingNavbar } from "@/components/ui/floating-navbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { AnimatedTestimonials, Testimonial } from "@/components/ui/animated-testimonials";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
];

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "CareFlow completely transformed how my clinic operates. Patient wait times dropped by 40% in the very first week. The doctor's dashboard gives me everything I need at a glance.",
        name: "Dr. Priya Mehta",
        role: "General Physician",
        clinic: "Mehta Family Clinic, Pune",
    },
    {
        quote:
            "The receptionist module is incredibly intuitive. Managing the queue used to be a nightmare — now my staff handles it without any training at all.",
        name: "Mr. Anand Kapoor",
        role: "Clinic Manager",
        clinic: "Kapoor Diagnostics, Mumbai",
    },
    {
        quote:
            "The AI prescription digitizer alone is worth it. We digitized 3 years of paper records in a single week. The accuracy is remarkable.",
        name: "Dr. Sanjay Rao",
        role: "Internist",
        clinic: "Rao Wellness Centre, Bengaluru",
    },
];

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export const LandingPageV3: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dark min-h-screen bg-[#050B14] font-sans text-slate-100 overflow-x-hidden selection:bg-teal-500/30 selection:text-teal-200">
            {/* Ambient Medical Glows (Global) */}
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

            {/* ── 1. Floating Navbar ──────────────────────────────────────────── */}
            <FloatingNavbar navItems={NAV_ITEMS} />

            {/* ── 2. Hero ─────────────────────────────────────────────────────── */}
            <HeroHighlight
                containerClassName="min-h-screen flex flex-col items-center justify-start relative !bg-transparent"
                className="w-full"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05)_0%,transparent_60%)] pointer-events-none" />

                <section className="flex flex-col items-center text-center pt-36 pb-16 px-6 relative z-10 w-full">
                    {/* Badge */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={FADE_UP}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-8 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 py-1.5 px-5 font-semibold text-xs tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_-3px_rgba(20,184,166,0.3)]"
                        >
                            <span className="relative flex h-2 w-2 mr-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                            </span>
                            Clinical Intelligence
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={{ ...FADE_UP, visible: { ...FADE_UP.visible as object, transition: { duration: 0.6, delay: 0.1, ease: "easeOut" } } }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] mb-6 max-w-5xl drop-shadow-sm"
                    >
                        Precision care.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-500 filter drop-shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                            Zero friction.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={{ ...FADE_UP, visible: { ...FADE_UP.visible as object, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } } }}
                        className="text-lg md:text-xl md:leading-relaxed text-slate-400 mb-12 max-w-2xl"
                    >
                        An intelligent, unified platform built specifically for Indian clinics.
                        Connect patients, receptionists, and doctors with absolute clarity.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ ...FADE_UP, visible: { ...FADE_UP.visible as object, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } } }}
                        className="flex flex-col sm:flex-row justify-center gap-5 mb-20"
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate("/sandbox")}
                            className="rounded-full text-base px-8 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white shadow-[0_0_30px_-5px_rgba(20,184,166,0.5)] group hover:-translate-y-1 transition-all border-none"
                        >
                            Explore Platform
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full text-base px-8 h-14 hover:-translate-y-1 transition-all shadow-sm bg-slate-900/50 backdrop-blur-md border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                            View Live Demo
                        </Button>
                    </motion.div>

                    {/* Dashboard Screenshot — glassmorphism container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                        className="w-full max-w-6xl mx-auto px-4 relative group"
                    >
                        {/* Glow behind the image */}
                        <div className="absolute inset-4 bg-teal-500/20 blur-[60px] rounded-full group-hover:bg-cyan-500/30 transition-colors duration-1000" />

                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 bg-slate-900 p-2 glass">
                            <div className="rounded-xl overflow-hidden border border-slate-800">
                                <img
                                    src="/dashboard-screenshot.png"
                                    alt="CareFlow Doctor Dashboard"
                                    className="w-full block brightness-90 contrast-[1.1] grayscale-[0.05]"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.style.display = "none";
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector(".fallback-placeholder")) {
                                            const el = document.createElement("div");
                                            el.className = "fallback-placeholder w-full h-[500px] bg-gradient-to-br from-[#0c1322] to-[#070b14] flex items-center justify-center";
                                            el.innerHTML = `<div class="text-center text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><p class="text-base font-medium text-slate-400">Dashboard Screenshot</p><p class="text-xs mt-1 text-slate-500">Expected at /public/dashboard-screenshot.png</p></div>`;
                                            parent.appendChild(el);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Fade gradient below image into next section */}
                        <div className="absolute -bottom-8 left-0 right-0 h-40 bg-gradient-to-t from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none" />
                    </motion.div>
                </section>
            </HeroHighlight>

            {/* ── 3. Ecosystem (Role Cards) ── with unified medical tones ────────── */}
            <section id="ecosystem" className="py-28 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={FADE_UP}
                        className="text-center max-w-2xl mx-auto mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Health Ecosystem</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Beautifully crafted, distraction-free interfaces engineered for the specific needs of your entire workflow.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Patient Journey",
                                icon: IconUser,
                                desc: "Transparent queuing, direct vital input, and full prescription history accessible instantly from a smartphone.",
                                color: "text-emerald-400",
                                bg: "bg-emerald-500/10",
                                accent: "border-b-emerald-500/50",
                                hoverGlow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]",
                                path: "/patient",
                            },
                            {
                                title: "Front Desk Control",
                                icon: IconCalendarCheck,
                                desc: "A powerful command center to manage flow, verify intakes, and reduce patient friction in the waiting room.",
                                color: "text-blue-400",
                                bg: "bg-blue-500/10",
                                accent: "border-b-blue-500/50",
                                hoverGlow: "hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]",
                                path: "/receptionist",
                            },
                            {
                                title: "Doctor's Canvas",
                                icon: IconStethoscope,
                                desc: "An ultra-clean diagnostic interface. Instantly review history, log vitals, and issue digitized prescriptions.",
                                color: "text-cyan-400",
                                bg: "bg-cyan-500/10",
                                accent: "border-b-cyan-500/50",
                                hoverGlow: "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]",
                                path: "/doctor",
                            },
                        ].map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: idx * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                                onClick={() => navigate(role.path)}
                                className="cursor-pointer group h-full"
                            >
                                <div
                                    className={`h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 border-b-4 ${role.accent} rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${role.hoverGlow} relative overflow-hidden`}
                                >
                                    {/* Subtle internal gradient */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />

                                    <div
                                        className={`w-14 h-14 rounded-[14px] ${role.bg} ${role.color} flex items-center justify-center mb-8 ring-1 ring-inset ring-white/10`}
                                    >
                                        <role.icon stroke={1.5} className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-slate-200 transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">
                                        {role.desc}
                                    </p>
                                    <div className={`flex items-center text-sm font-semibold ${role.color} mt-auto`}>
                                        Explore Module
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Features Bento Grid ───────────────────────────────────────── */}
            <section id="features" className="py-28 px-6 md:px-12 relative">
                <div className="absolute inset-0 bg-slate-950/50 border-t border-b border-white/5 backdrop-blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={FADE_UP}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            Intelligent architecture.{" "}
                            <span className="text-slate-500 font-light">Clinical focus.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={FADE_UP}
                    >
                        <BentoGrid>
                            {/* Large card: AI Digitizer */}
                            <BentoCard
                                colSpan={2}
                                rowSpan={2}
                                className="bg-[#0b1221]/80 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-500"
                            >
                                {/* Glow behind text */}
                                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                                        <IconScan className="w-3.5 h-3.5 mr-1.5" />
                                        Optical Character Recognition
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        AI Prescription Digitizer
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-base max-w-md font-light">
                                        Eliminate manual data entry. Upload any handwritten or printed prescription. Our medical-grade AI instantly extracts medicines, dosages, and regimen instructions into structured code.
                                    </p>
                                </div>
                                <div className="mt-8 relative z-10">
                                    <Button
                                        variant="default"
                                        className="bg-white hover:bg-slate-200 text-slate-900 font-semibold rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    >
                                        Try Digitizer Demo
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                                {/* Decorative icon with very subtle glow */}
                                <IconScan
                                    size={300}
                                    stroke={0.3}
                                    className="absolute bottom-0 right-0 text-teal-500 opacity-[0.03] translate-x-16 translate-y-16 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000"
                                />
                            </BentoCard>

                            {/* Real-time Sync */}
                            <BentoCard className="p-8 bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-[14px] bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 ring-1 ring-inset ring-white/5">
                                    <IconBrain className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-white text-xl mb-2 tracking-tight">
                                    Real-time State Sync
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    Patient status changes reflect instantly across all module screens without refreshing.
                                </p>
                            </BentoCard>

                            {/* Security */}
                            <BentoCard className="p-8 bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-[14px] bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-inset ring-white/5">
                                    <IconShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-white text-xl mb-2 tracking-tight">
                                    PHI Compliant
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    Strict role-based access control and encrypted storage guarantees total patient privacy.
                                </p>
                            </BentoCard>

                            {/* Speed */}
                            <BentoCard className="p-8 bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-[14px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 ring-1 ring-inset ring-white/5">
                                    <IconClock className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-white text-xl mb-2 tracking-tight">
                                    Sub-second Latency
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    Built securely on modern frameworks to ensure lag-free navigation during peak hours.
                                </p>
                            </BentoCard>
                        </BentoGrid>
                    </motion.div>
                </div>
            </section>

            {/* ── 5. Testimonials ──────────────────────────────────────────────── */}
            <section id="testimonials" className="py-28 px-6 md:px-12 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={FADE_UP}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            Trusted by <span className="italic font-medium font-serif text-teal-200">Physicians</span>.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={FADE_UP}
                    >
                        <AnimatedTestimonials
                            testimonials={TESTIMONIALS}
                            className="bg-[#0b1221]/60 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-3xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ── 6. Footer CTA ────────────────────────────────────────────────── */}
            <footer className="bg-black pt-32 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
                {/* Immersive Footer Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.15),transparent_60%)] pointer-events-none" />

                {/* CTA Block */}
                <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
                        Modernize your practice.
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                        Join modern clinics across India using CareFlow to eliminate friction and focus on what matters most — the patient.
                    </p>
                    <Button
                        size="lg"
                        className="px-10 h-16 rounded-full bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] hover:-translate-y-1"
                    >
                        Schedule a Consultation
                    </Button>
                </div>

                {/* Footer Bar */}
                <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                            <IconHeartbeat className="w-5 h-5 text-teal-400" />
                        </div>
                        <span className="font-bold text-white tracking-widest uppercase text-base">CareFlow</span>
                    </div>
                    <div className="flex gap-8 text-slate-500 font-medium">
                        <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-teal-400 transition-colors">Support</a>
                    </div>
                    <p className="text-slate-600">© 2025 CareFlow Health. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
