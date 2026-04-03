"use client";
import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroHighlight({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return;
            const { left, top } = containerRef.current.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            containerRef.current.style.setProperty("--mouse-x", `${x}px`);
            containerRef.current.style.setProperty("--mouse-y", `${y}px`);
        },
        []
    );

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full group",
                containerClassName
            )}
            style={
                {
                    "--mouse-x": "50%",
                    "--mouse-y": "50%",
                } as React.CSSProperties
            }
        >
            {/* Dot pattern background */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                    maskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, black 60%, transparent 100%)",
                }}
            />
            {/* Radial mouse-follow spotlight */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.06), transparent 80%)`,
                }}
            />
            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    );
}

export function Highlight({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.span
            initial={{ backgroundSize: "0% 100%" }}
            whileInView={{ backgroundSize: "100% 100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className={cn(
                "relative inline-block pb-1 pr-1",
                "bg-gradient-to-r from-primary/20 to-primary/10",
                "bg-no-repeat bg-bottom rounded-sm",
                className
            )}
        >
            <span className="relative text-foreground">{children}</span>
        </motion.span>
    );
}
