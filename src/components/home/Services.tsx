"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        index: "01",
        name: "Web Design",
        tech: "Figma, Three.js, WebGL",
    },
    {
        index: "02",
        name: "Next.js Development",
        tech: "React, TypeScript, Tailwind",
    },
    {
        index: "03",
        name: "WebGL Animations",
        tech: "GSAP, Three.js, Lenis",
    },
    {
        index: "04",
        name: "Creative Direction",
        tech: "Editorial, Motion, Brand",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const manifestoRef = useRef<HTMLParagraphElement>(null);
    const linesRef = useRef<(HTMLDivElement | null)[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            // Manifesto fade + Y rise
            gsap.fromTo(
                manifestoRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: manifestoRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            // Service lines: scaleX 0→1
            linesRef.current.filter(Boolean).forEach((line, i) => {
                gsap.fromTo(
                    line,
                    { scaleX: 0, transformOrigin: "left center" },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 85%",
                            once: true,
                        },
                        delay: i * 0.08,
                    }
                );
            });

            // Service text items: staggered fade + Y rise
            gsap.fromTo(
                itemsRef.current.filter(Boolean),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: itemsRef.current[0],
                        start: "top 80%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-paper text-paper-text py-32 md:py-48 overflow-hidden"
        >
            <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-10">
                {/* ── Grid wrapper ─────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10">

                    {/* ── BLOCK 1: Manifesto ───────────────────────── */}
                    <div className="md:col-start-2 md:col-span-8">
                        {/* Section index */}
                        <span className="block font-space-grotesk text-xs uppercase tracking-widest text-paper-text/40 mb-8">
                            (02) — Manifesto
                        </span>

                        <p
                            ref={manifestoRef}
                            className="font-cormorant italic text-3xl md:text-5xl lg:text-6xl leading-tight text-paper-text"
                            style={{ opacity: 0 }}
                        >
                            I build custom digital experiences through
                            modern typography and unique interactions.
                            Rooted in strong engineering,
                            driven by purpose.
                        </p>
                    </div>

                    {/* ── BLOCK 2: Services List ────────────────────── */}
                    {/* Left: section label */}
                    <div className="md:col-start-1 md:col-span-4 md:mt-24 flex items-end">
                        <span className="font-space-grotesk text-xs uppercase tracking-widest text-paper-text/40">
                            Services Provided
                        </span>
                    </div>

                    {/* Right: list */}
                    <div className="md:col-span-8 md:mt-24">
                        {SERVICES.map((service, i) => (
                            <div key={service.index} className="relative">
                                {/* Line — scaleX animation target */}
                                <div
                                    ref={(el) => { linesRef.current[i] = el; }}
                                    className="border-t border-black/10"
                                    style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                                />

                                {/* Item row */}
                                <div
                                    ref={(el) => { itemsRef.current[i] = el; }}
                                    className="flex items-center justify-between py-6 md:py-8 group"
                                    style={{ opacity: 0 }}
                                >
                                    {/* Index + Name */}
                                    <div className="flex items-baseline gap-4 md:gap-6">
                                        <span className="font-space-grotesk text-xs uppercase tracking-widest text-paper-text/30 tabular-nums">
                                            {service.index}
                                        </span>
                                        <span className="font-unbounded text-xl md:text-2xl uppercase tracking-tight text-paper-text transition-colors duration-300 group-hover:text-alert">
                                            {service.name}
                                        </span>
                                    </div>

                                    {/* Tech stack */}
                                    <span className="font-space-grotesk text-[10px] md:text-xs uppercase tracking-widest text-paper-text/40 text-right max-w-[120px] md:max-w-none">
                                        {service.tech}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Final bottom border */}
                        <div className="border-t border-black/10" />
                    </div>

                </div>
            </div>
        </section>
    );
}
