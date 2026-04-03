"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { IconHeartbeat } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface NavItem {
    label: string;
    href: string;
}

export function FloatingNavbar({ navItems }: { navItems: NavItem[] }) {
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 50);
            setVisible(currentY < 50 || currentY < lastY);
            lastY = currentY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
                    scrolled
                        ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-110 transition-transform">
                            <IconHeartbeat className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">
                            CareFlow
                        </span>
                    </a>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <Button
                        onClick={() => navigate("/sandbox")}
                        className="rounded-full shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
                        variant="default"
                    >
                        Try Sandbox
                    </Button>
                </div>
            </motion.nav>
        </AnimatePresence>
    );
}
