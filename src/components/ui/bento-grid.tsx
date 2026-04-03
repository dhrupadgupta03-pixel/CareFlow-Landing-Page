"use client";
import React, { useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

// ── SpotlightCard ──────────────────────────────────────────────────────────────
// Wraps any card content with a subtle radial-gradient spotlight on mouse move.
export function SpotlightCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--x", `${e.clientX - left}px`);
        ref.current.style.setProperty("--y", `${e.clientY - top}px`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative overflow-hidden rounded-[var(--radius)] border border-border bg-card",
                "group transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                className
            )}
            style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
        >
            {/* Spotlight overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[var(--radius)]"
                style={{
                    background: `radial-gradient(300px circle at var(--x) var(--y), hsl(var(--primary) / 0.07), transparent 80%)`,
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}

// ── BentoGrid ─────────────────────────────────────────────────────────────────
export function BentoGrid({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]",
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
}: {
    children: React.ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
}) {
    const colClass = {
        1: "md:col-span-1",
        2: "md:col-span-2",
        3: "md:col-span-3",
    }[colSpan];
    const rowClass = { 1: "row-span-1", 2: "row-span-2" }[rowSpan];

    return (
        <SpotlightCard className={cn(colClass, rowClass, className)}>
            {children}
        </SpotlightCard>
    );
}
