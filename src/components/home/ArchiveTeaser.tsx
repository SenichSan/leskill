"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NOISE_TEXT =
    "LOADING_ASSETS... 0%... 12%... 45%... 67%... 99%... AWAITING_DEPLOYMENT... INIT_SEQUENCE... PARSING_DATA... CHUNK_001... CHUNK_002... COMPILING... BUILD_SUCCESS... AWAITING_DEPLOY... 0%... 12%... 45%... 67%... 99%... COMPLETE";

export default function ArchiveTeaser() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            tl.fromTo(
                labelRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );

            tl.fromTo(
                [line1Ref.current, line2Ref.current],
                { yPercent: 110, skewY: 3 },
                {
                    yPercent: 0,
                    skewY: 0,
                    duration: 1.1,
                    ease: "power4.out",
                    stagger: 0.1,
                },
                "-=0.4"
            );

            tl.fromTo(
                subRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
                "-=0.5"
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-void text-ink py-32 md:py-48 overflow-hidden"
        >
            {/* ── Background data noise ────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
            >
                <p className="absolute top-8 right-4 md:right-10 font-space-grotesk text-[10px] uppercase tracking-widest text-ink/[0.06] text-right max-w-xs leading-6">
                    {NOISE_TEXT}
                </p>
                <p className="absolute bottom-8 left-4 md:left-10 font-space-grotesk text-[10px] uppercase tracking-widest text-ink/[0.06] max-w-xs leading-6">
                    {NOISE_TEXT.split("").reverse().join("")}
                </p>
                <p
                    className="absolute top-1/2 right-4 md:right-10 font-space-grotesk text-[10px] uppercase tracking-widest text-ink/[0.05] leading-6"
                    style={{ writingMode: "vertical-rl", transform: "translateY(-50%)" }}
                >
                    ARCHIVE_BUILD_v2.6.0 — COMPILING
                </p>
            </div>

            {/* ── Main grid ────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10">

                    {/* LEFT: Status label */}
                    <div ref={labelRef} className="md:col-span-4 flex flex-col gap-4">
                        <span className="font-space-grotesk text-xs uppercase tracking-widest text-ink/40">
                            Selected Work
                        </span>
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-alert animate-pulse flex-shrink-0" />
                            <span className="font-space-grotesk text-xs uppercase tracking-widest text-ink/50">
                                [Status: Compiling Archive]
                            </span>
                        </div>
                    </div>

                    {/* RIGHT: Big typographic block */}
                    <div className="md:col-start-5 md:col-span-8">
                        {/* overflow-hidden clips the yPercent reveal — GSAP sets from-state at runtime */}
                        <h2 className="font-unbounded text-[clamp(2.8rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tight">
                            <span className="block overflow-hidden">
                                <span ref={line1Ref} className="block">
                                    CURATING
                                </span>
                            </span>
                            <span className="block overflow-hidden">
                                <span ref={line2Ref} className="block">
                                    THE ARCHIVE
                                </span>
                            </span>
                        </h2>

                        <p
                            ref={subRef}
                            className="mt-10 md:mt-14 font-cormorant italic text-xl md:text-2xl text-ink/60 max-w-lg leading-relaxed"
                        >
                            New digital experiences are currently in development.
                            <br />
                            Quality takes time.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
