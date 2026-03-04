"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TITLE_LINES = ["CREATING", "DIGITAL", "EXPERIENCES"];

export default function Hero() {
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const scrollLabelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word-by-word stagger reveal on the title
            gsap.fromTo(
                wordsRef.current.filter(Boolean),
                {
                    yPercent: 110,
                    opacity: 0,
                    skewY: 4,
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1,
                    delay: 0.2,
                }
            );

            // Subtext fade in after title
            gsap.fromTo(
                subtextRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.9 }
            );

            // Scroll label
            gsap.fromTo(
                scrollLabelRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.4 }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end">
            {/* ── Background video placeholder (z-0) ───────────────── */}
            <div className="absolute inset-0 z-0">
                {/* Video element — swap src when real asset is ready */}
                <div className="w-full h-full bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
                {/* Noise vignette overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
                    }}
                />
                {/* Bottom gradient to ground the text */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-void via-void/80 to-transparent" />
            </div>

            {/* ── Decorative grid lines (editorial texture) ─────────── */}
            <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
                <div className="w-full h-full grid grid-cols-12 gap-x-5 px-4 md:px-10 max-w-screen-2xl mx-auto">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-r border-ink/100 h-full" />
                    ))}
                </div>
            </div>

            {/* ── Hero content (z-10) ───────────────────────────────── */}
            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 md:px-10 pb-24 md:pb-32">
                {/* Index label */}
                <div className="mb-6 md:mb-10">
                    <span className="font-space-grotesk text-xs uppercase tracking-widest text-ink/40">
                        (01) — Portfolio /{" "}
                        <span className="text-alert">Creative Developer</span>
                    </span>
                </div>

                {/* Main title — word stagger */}
                <h1
                    className="font-unbounded text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-[0.85] tracking-tight text-ink mb-10 md:mb-14"
                    aria-label={TITLE_LINES.join(" ")}
                >
                    {TITLE_LINES.map((word, i) => (
                        <span key={i} className="block overflow-hidden">
                            <span
                                ref={(el) => { wordsRef.current[i] = el; }}
                                className="block"
                                style={{ opacity: 0 }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                {/* 12-col layout — subtext + scroll cue */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 items-end">
                    {/* Subtext */}
                    <p
                        ref={subtextRef}
                        className="md:col-span-5 md:col-start-1 font-cormorant italic text-xl md:text-2xl text-ink/70 leading-relaxed"
                        style={{ opacity: 0 }}
                    >
                        Independent creative developer building
                        <br className="hidden md:block" />
                        functionality aimed at the future.
                    </p>

                    {/* Scroll indicator */}
                    <div
                        ref={scrollLabelRef}
                        className="md:col-span-3 md:col-start-10 flex items-center gap-3 mt-10 md:mt-0 justify-start md:justify-end"
                        style={{ opacity: 0 }}
                    >
                        <div className="w-8 h-px bg-ink/30" />
                        <span className="font-space-grotesk text-xs uppercase tracking-widest text-ink/40">
                            Scroll to explore
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
