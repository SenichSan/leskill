"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.4,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
