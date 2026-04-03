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
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
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

export const LandingPageV2: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/10 selection:text-primary">
            {/* ── 1. Floating Navbar ──────────────────────────────────────────── */}
            <FloatingNavbar navItems={NAV_ITEMS} />

            {/* ── 2. Hero ─────────────────────────────────────────────────────── */}
            <HeroHighlight
                containerClassName="min-h-screen flex flex-col items-center justify-start"
                className="w-full"
            >
                <section className="flex flex-col items-center text-center pt-36 pb-16 px-6">
                    {/* Badge */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={FADE_UP}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-6 rounded-full bg-primary/10 text-primary border border-primary/20 py-1.5 px-4 font-semibold text-xs tracking-wide"
                        >
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Next-Gen Clinic Management
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={{ ...FADE_UP, visible: { ...FADE_UP.visible as object, transition: { duration: 0.6, delay: 0.1, ease: "easeOut" } } }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6 max-w-4xl"
                    >
                        Care that{" "}
                        <Highlight>Connects.</Highlight>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={{ ...FADE_UP, visible: { ...FADE_UP.visible as object, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } } }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
                    >
                        A unified, intuitive platform designed for the modern Indian clinic.
                        Seamlessly connect patients, receptionists, and doctors for a smoother
                        healthcare journey.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ ...FADE_UP, visible: { ...FADE_UP.visible as object, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } } }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate("/sandbox")}
                            className="rounded-full text-base px-8 h-14 shadow-xl shadow-primary/20 group hover:-translate-y-1 transition-all"
                        >
                            Explore Platform
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full text-base px-8 h-14 hover:-translate-y-1 transition-all shadow-sm"
                        >
                            View Demo
                        </Button>
                    </motion.div>

                    {/* Dashboard Screenshot — clean, no laptop frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                        className="w-full max-w-6xl mx-auto px-4"
                    >
                        {/* Clean screenshot drop-shadow with subtle border */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
                            <img
                                src="/dashboard-screenshot.png"
                                alt="CareFlow Doctor Dashboard"
                                className="w-full block"
                                onError={(e) => {
                                    // Fallback placeholder if image is missing
                                    const target = e.currentTarget;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent && !parent.querySelector(".fallback-placeholder")) {
                                        const el = document.createElement("div");
                                        el.className = "fallback-placeholder w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center";
                                        el.innerHTML = `<div class="text-center text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><p class="text-base font-medium">Dashboard Screenshot</p><p class="text-sm mt-1">Add /public/dashboard-screenshot.png</p></div>`;
                                        parent.appendChild(el);
                                    }
                                }}
                            />
                        </div>

                        {/* Fade gradient below image into next section */}
                        <div className="absolute left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    </motion.div>
                </section>
            </HeroHighlight>

            {/* ── 3. Ecosystem (Role Cards) ────────────────────────────────────── */}
            <section id="ecosystem" className="py-28 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={FADE_UP}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <Badge variant="outline" className="mb-4 rounded-full py-1 px-3 text-xs font-semibold text-muted-foreground">
                            Built for Everyone
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            One Platform.{" "}
                            <span className="text-primary">Three Roles.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Tailored experiences for every person in the clinic.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Patient",
                                icon: IconUser,
                                desc: "Intuitive booking, transparent status updates, and a complete digital health journey.",
                                color: "text-orange-600",
                                bg: "bg-orange-50",
                                accent: "border-t-orange-400",
                                path: "/patient",
                            },
                            {
                                title: "Receptionist",
                                icon: IconCalendarCheck,
                                desc: "A centralized command center to manage queue flow, approvals, and patient communications.",
                                color: "text-indigo-600",
                                bg: "bg-indigo-50",
                                accent: "border-t-indigo-400",
                                path: "/receptionist",
                            },
                            {
                                title: "Doctor",
                                icon: IconStethoscope,
                                desc: "A focused, distraction-free dashboard with full patient history and real-time schedule sync.",
                                color: "text-primary",
                                bg: "bg-primary/5",
                                accent: "border-t-primary",
                                path: "/doctor",
                            },
                        ].map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 28 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: idx * 0.12, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
                                    },
                                }}
                                onClick={() => navigate(role.path)}
                                className="cursor-pointer group"
                            >
                                <div
                                    className={`h-full bg-card border border-border border-t-4 ${role.accent} rounded-[var(--radius)] p-8 shadow-sm hover:shadow-xl hover:-translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-2xl ${role.bg} ${role.color} flex items-center justify-center mb-6 shadow-sm ring-1 ring-inset ring-black/5`}
                                    >
                                        <role.icon stroke={1.5} className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                                        {role.desc}
                                    </p>
                                    <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                        View Experience
                                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Features Bento Grid ───────────────────────────────────────── */}
            <section id="features" className="py-28 px-6 md:px-12 bg-muted/40 border-t border-border">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={FADE_UP}
                        className="text-center max-w-2xl mx-auto mb-14"
                    >
                        <Badge variant="outline" className="mb-4 rounded-full py-1 px-3 text-xs font-semibold text-muted-foreground">
                            Smart Features
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Lightning fast.{" "}
                            <span className="text-primary">Insanely smart.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Built with modern web standards for maximum performance and minimal
                            cognitive load.
                        </p>
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
                                className="bg-slate-950 border-slate-800 text-white p-8 flex flex-col justify-between min-h-[320px]"
                            >
                                <div>
                                    <Badge className="bg-primary/20 text-primary border-none mb-4 hover:bg-primary/30">
                                        <IconScan className="w-3 h-3 mr-1.5" />
                                        AI Powered
                                    </Badge>
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        Prescription Digitizer
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
                                        Upload any handwritten prescription. Our AI extracts
                                        medicines, dosages, and instructions into structured clinical
                                        data within seconds.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <Button
                                        variant="secondary"
                                        className="bg-white text-slate-900 hover:bg-slate-100 font-semibold"
                                    >
                                        Try Digitizer Demo
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                                {/* Decorative icon */}
                                <IconScan
                                    size={200}
                                    stroke={0.6}
                                    className="absolute bottom-0 right-0 text-slate-700 opacity-20 translate-x-8 translate-y-8 pointer-events-none"
                                />
                            </BentoCard>

                            {/* Real-time Sync */}
                            <BentoCard className="p-6">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <IconBrain className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-foreground text-lg mb-1">
                                    Real-time Sync
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Patient state syncs across doctor, receptionist, and patient
                                    screens instantly.
                                </p>
                            </BentoCard>

                            {/* Security */}
                            <BentoCard className="p-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                                    <IconShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-foreground text-lg mb-1">
                                    Secure by Design
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Role-based access ensures each user sees exactly what they
                                    need — nothing more.
                                </p>
                            </BentoCard>

                            {/* Speed */}
                            <BentoCard className="p-6">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                                    <IconClock className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-foreground text-lg mb-1">
                                    Clinically Optimised UI
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Designed to reduce cognitive fatigue with clean, distraction-free
                                    clinical workflows.
                                </p>
                            </BentoCard>
                        </BentoGrid>
                    </motion.div>
                </div>
            </section>

            {/* ── 5. Testimonials ──────────────────────────────────────────────── */}
            <section id="testimonials" className="py-28 px-6 md:px-12 bg-background border-t border-border">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={FADE_UP}
                        className="text-center max-w-2xl mx-auto mb-14"
                    >
                        <Badge variant="outline" className="mb-4 rounded-full py-1 px-3 text-xs font-semibold text-muted-foreground">
                            Trusted by Clinics
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            What doctors are{" "}
                            <span className="text-primary">saying.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={FADE_UP}
                    >
                        <AnimatedTestimonials testimonials={TESTIMONIALS} />
                    </motion.div>
                </div>
            </section>

            {/* ── 6. Footer CTA ────────────────────────────────────────────────── */}
            <footer className="bg-slate-950 text-slate-300 pt-28 pb-10 px-6 md:px-12 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />

                {/* CTA Block */}
                <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight">
                        Ready to upgrade your clinic?
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
                        Get in touch to see how CareFlow can transform your daily operations and
                        patient satisfaction.
                    </p>
                    <Button
                        size="lg"
                        className="px-10 h-16 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1"
                    >
                        Contact Us Today
                    </Button>
                </div>

                {/* Footer Bar */}
                <div className="max-w-7xl mx-auto border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary/30 flex items-center justify-center">
                            <IconHeartbeat className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-bold text-white tracking-tight">CareFlow</span>
                    </div>
                    <div className="flex gap-8 text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <p className="text-slate-600">© 2025 CareFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
