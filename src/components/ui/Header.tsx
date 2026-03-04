"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Intro reveal — drop down from above
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                { yPercent: -100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.6,
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 py-5 mix-blend-difference"
            style={{ opacity: 0 }} // GSAP will animate from here
        >
            {/* LEFT — Logo */}
            <a
                href="/"
                className="font-unbounded text-xs uppercase tracking-widest text-ink hover:text-alert transition-colors duration-300"
            >
                NAME SURNAME ©
            </a>

            {/* CENTER/RIGHT — Availability pill */}
            <span className="hidden md:flex items-center font-space-grotesk text-xs uppercase tracking-widest border border-ink/30 text-ink rounded-full px-4 py-1.5">
                Available for work&nbsp;
                <span className="text-alert font-bold">[SEPT 2026]</span>
            </span>

            {/* RIGHT — Nav links (desktop) */}
            <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="font-space-grotesk text-xs uppercase tracking-widest text-ink/60 hover:text-ink transition-colors duration-300"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* RIGHT — Burger (mobile) */}
            <button
                className="md:hidden flex flex-col gap-1.5 items-end"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
            >
                <span
                    className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`}
                />
                <span
                    className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`}
                />
                <span
                    className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`}
                />
            </button>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div className="fixed inset-0 top-16 bg-void/95 backdrop-blur-sm flex flex-col items-center justify-center gap-10 z-40 md:hidden">
                    {/* Availability pill */}
                    <span className="font-space-grotesk text-xs uppercase tracking-widest border border-ink/30 text-ink rounded-full px-4 py-1.5">
                        Available for work&nbsp;
                        <span className="text-alert font-bold">[SEPT 2026]</span>
                    </span>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-unbounded text-2xl uppercase tracking-widest text-ink hover:text-alert transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}
