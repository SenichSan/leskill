"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
    {
        value: "+45%",
        label: "Conversion Boost",
        description: "В первую неделю после релиза конверсия выросла почти вдвое.",
        color: "text-alert",
    },
    {
        value: "0.8s",
        label: "Load Speed",
        description: "Время до первого интерактивного байта — быстрее 95% конкурентов.",
        color: "text-ink",
    },
    {
        value: "9.4",
        label: "Awwwards Score",
        description: "Оценка жюри за дизайн, взаимодействие и инновации.",
        color: "text-alert",
    },
];

const PROOFS = [
    {
        index: "01",
        label: "Homepage — Dark Editorial",
    },
    {
        index: "02",
        label: "Product Detail — Motion Layer",
    },
    {
        index: "03",
        label: "Conversion Flow — Micro Interactions",
    },
];

export default function Spotlight() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const scrollZoneRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
    const proofRefs = useRef<(HTMLDivElement | null)[]>([]);
    const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // ── DESKTOP: sticky pin + metric swap ────────────────
            mm.add("(min-width: 768px)", () => {
                // 1. Pin the left column while the right scrolls
                ScrollTrigger.create({
                    trigger: scrollZoneRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: leftColRef.current,
                    pinSpacing: false,
                });

                // 2. Intro: show first metric immediately
                gsap.set(metricsRef.current[0], { opacity: 1, y: 0 });
                gsap.set(metricsRef.current.slice(1), { opacity: 0, y: 32 });

                // 3. For each proof block: fade out current metric, fade in next
                proofRefs.current.forEach((proof, i) => {
                    if (i === PROOFS.length - 1) return; // last block has no "next"

                    ScrollTrigger.create({
                        trigger: proof,
                        start: "bottom center",
                        onEnter: () => {
                            // fade out current
                            gsap.to(metricsRef.current[i], {
                                opacity: 0,
                                y: -24,
                                duration: 0.5,
                                ease: "power2.in",
                            });
                            // fade in next
                            gsap.fromTo(
                                metricsRef.current[i + 1],
                                { opacity: 0, y: 32 },
                                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
                            );
                        },
                        onLeaveBack: () => {
                            // reverse: hide next, show current
                            gsap.to(metricsRef.current[i + 1], {
                                opacity: 0,
                                y: 32,
                                duration: 0.4,
                                ease: "power2.in",
                            });
                            gsap.to(metricsRef.current[i], {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "power3.out",
                            });
                        },
                    });
                });

                // 4. Parallax on proof images
                parallaxRefs.current.filter(Boolean).forEach((el) => {
                    gsap.fromTo(
                        el,
                        { yPercent: -8 },
                        {
                            yPercent: 8,
                            ease: "none",
                            scrollTrigger: {
                                trigger: el,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                });

                return () => mm.revert();
            });

            // ── MOBILE: simple fade-in for each proof ────────────
            mm.add("(max-width: 767px)", () => {
                proofRefs.current.filter(Boolean).forEach((proof) => {
                    gsap.fromTo(
                        proof,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: proof,
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                });

                return () => mm.revert();
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-void text-ink py-32 md:py-48"
        >
            <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-10">

                {/* ── ENTRANCE HEADER ───────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 mb-24 md:mb-32">
                    {/* Label */}
                    <div className="md:col-span-4 flex flex-col justify-start">
                        <span className="font-space-grotesk text-xs uppercase tracking-widest text-ink/50 leading-relaxed">
                            [ 01 ] Selected Work
                            <br />
                            Grovnica Project
                        </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-start-5 md:col-span-8 mt-8 md:mt-0">
                        <h2 className="font-unbounded text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tight">
                            GROVNICA:
                            <br />
                            THE ANOMALY
                        </h2>
                    </div>
                </div>

                {/* ── SPLIT-SCREEN ZONE ─────────────────────────────── */}
                <div
                    ref={scrollZoneRef}
                    className="grid grid-cols-1 md:grid-cols-12 gap-x-5"
                >

                    {/* ── LEFT: Sticky metrics ──────────────────────── */}
                    <div
                        ref={leftColRef}
                        className="md:col-span-5 flex items-center"
                        // h-screen set inline so sticky works correctly
                        style={{ height: "100vh" }}
                    >
                        <div className="relative w-full">
                            {METRICS.map((metric, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { metricsRef.current[i] = el; }}
                                    // on mobile: all visible, stacked; on desktop: absolute, faded by GSAP
                                    className="md:absolute md:inset-0 flex flex-col justify-center mb-16 md:mb-0"
                                >
                                    {/* Value */}
                                    <span
                                        className={`font-unbounded text-6xl lg:text-8xl font-black leading-none ${metric.color}`}
                                    >
                                        {metric.value}
                                    </span>

                                    {/* Label */}
                                    <span className="mt-4 font-space-grotesk text-sm uppercase tracking-widest text-ink/60">
                                        {metric.label}
                                    </span>

                                    {/* Divider */}
                                    <div className="mt-6 w-12 h-px bg-ink/20" />

                                    {/* Description */}
                                    <p className="mt-6 font-cormorant italic text-xl md:text-2xl text-ink/70 leading-relaxed max-w-xs">
                                        {metric.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Scrolling proofs ───────────────────── */}
                    <div className="md:col-start-7 md:col-span-6 flex flex-col gap-0">
                        {PROOFS.map((proof, i) => (
                            <div
                                key={i}
                                ref={(el) => { proofRefs.current[i] = el; }}
                                className="flex flex-col justify-center min-h-screen py-12 md:py-0"
                            >
                                {/* Proof card */}
                                <div className="w-full aspect-[4/5] bg-[#111111] border border-white/10 rounded-sm overflow-hidden relative group">
                                    {/* Parallax inner container */}
                                    <div
                                        ref={(el) => { parallaxRefs.current[i] = el; }}
                                        className="absolute inset-[-8%] flex items-center justify-center"
                                    >
                                        {/* Placeholder texture — replace with Image when ready */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#161616] to-[#0A0A0A]" />
                                        <div
                                            className="absolute inset-0 opacity-[0.03]"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(0deg, #EAEAE5 0px, #EAEAE5 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #EAEAE5 0px, #EAEAE5 1px, transparent 1px, transparent 32px)",
                                            }}
                                        />
                                    </div>

                                    {/* Center label */}
                                    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3">
                                        <span className="font-space-grotesk text-[10px] uppercase tracking-widest text-ink/20">
                                            [{proof.index}]
                                        </span>
                                        <span className="font-space-grotesk text-xs uppercase tracking-widest text-ink/30">
                                            {proof.label}
                                        </span>
                                        <span className="font-space-grotesk text-[10px] uppercase tracking-widest text-ink/15">
                                            Image / Video Placeholder
                                        </span>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-alert/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Proof caption */}
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="font-space-grotesk text-[10px] uppercase tracking-widest text-ink/30">
                                        Fig. {proof.index}
                                    </span>
                                    <span className="font-cormorant italic text-base text-ink/40">
                                        {proof.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
