"use client";

const MARQUEE_TEXT = Array(12)
    .fill("CREATIVE DEVELOPER • AVAILABLE FOR WORK • ")
    .join("");

const SOCIAL_LINKS = [
    { label: "X / Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
    return (
        <footer className="relative bg-void text-ink pt-32 pb-10 overflow-hidden">

            {/* ── BLOCK A: Marquee ─────────────────────────────── */}
            <div className="w-full overflow-hidden border-y border-white/10 py-4 mb-0">
                <div className="animate-marquee">
                    {/* Doubled so the seam is invisible at translateX(-50%) */}
                    {[0, 1].map((i) => (
                        <span
                            key={i}
                            className="font-space-grotesk text-sm uppercase tracking-widest text-ink/60 whitespace-nowrap pr-8"
                            aria-hidden={i === 1}
                        >
                            {MARQUEE_TEXT}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── BLOCK B: Contact area ────────────────────────── */}
            <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-10 mt-24">
                <div className="grid grid-cols-12 gap-x-5">

                    {/* LEFT — big CTA */}
                    <div className="col-span-12 md:col-span-8">
                        <span className="block font-space-grotesk text-xs uppercase tracking-widest text-ink/40 mb-8">
                            (03) — Contact
                        </span>
                        <h2 className="font-unbounded text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tight">
                            LET&apos;S BUILD
                            <br />
                            SOMETHING
                        </h2>
                    </div>

                    {/* RIGHT — email + socials */}
                    <div className="col-span-12 md:col-span-4 flex flex-col justify-end items-start md:items-end gap-8 mt-12 md:mt-0">
                        <a
                            href="mailto:hello@yourdomain.com"
                            className="font-cormorant italic text-2xl md:text-4xl text-ink/80 hover:text-alert transition-colors duration-300 group"
                        >
                            <span className="block border-b border-ink/20 pb-1 group-hover:border-alert transition-colors duration-300">
                                hello@yourdomain.com
                            </span>
                        </a>

                        <nav className="flex flex-row md:flex-col gap-4 md:gap-3 items-start md:items-end">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-space-grotesk text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors duration-300"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* ── BLOCK C: Copyright bar ──────────────────────── */}
                <div className="mt-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <span className="font-space-grotesk text-[10px] uppercase tracking-widest text-white/40">
                        © 2026 — All rights reserved
                    </span>
                    <span className="font-space-grotesk text-[10px] uppercase tracking-widest text-white/40">
                        Local Time: EET UTC+2
                    </span>
                    <span className="font-space-grotesk text-[10px] uppercase tracking-widest text-white/40">
                        Design System v1.0 — Built with Next.js
                    </span>
                </div>
            </div>

        </footer>
    );
}
