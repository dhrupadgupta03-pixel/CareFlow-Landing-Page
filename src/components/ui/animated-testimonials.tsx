"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    clinic?: string;
}

export function AnimatedTestimonials({
    testimonials,
    className,
}: {
    testimonials: Testimonial[];
    className?: string;
}) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const paginate = (dir: number) => {
        setDirection(dir);
        setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
    };

    // auto-advance every 5s
    useEffect(() => {
        const timer = setInterval(() => paginate(1), 5000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
    };

    const current = testimonials[index];

    return (
        <div className={cn("relative max-w-3xl mx-auto", className)}>
            <div className="relative overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-sm px-10 py-12 min-h-[240px] flex flex-col justify-between">
                {/* Brand-colored quote mark */}
                <Quote className="w-10 h-10 text-primary/30 mb-4 flex-shrink-0" />

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="flex-1"
                    >
                        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                            "{current.quote}"
                        </p>
                        <div>
                            <p className="font-bold text-foreground text-base">{current.name}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {current.role}
                                {current.clinic ? ` · ${current.clinic}` : ""}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-3 mt-6">
                <button
                    onClick={() => paginate(-1)}
                    className="p-2 rounded-full border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-1.5">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                i === index ? "bg-primary w-4" : "bg-border"
                            )}
                            aria-label={`Go to ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => paginate(1)}
                    className="p-2 rounded-full border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Next"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
