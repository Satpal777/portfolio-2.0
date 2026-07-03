'use client';

import { useEffect, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { useTheme } from 'next-themes';
import { useReducedMotion } from 'framer-motion';

interface ShaderBackdropProps {
    /** Fixed color set — overrides theme-based colors when provided */
    colors?: string[];
    darkColors?: string[];
    lightColors?: string[];
    speed?: number;
    className?: string;
}

export function ShaderBackdrop({
    colors,
    darkColors = ['#0a0a0a', '#0f766e', '#14b8a6', '#312e81'],
    lightColors = ['#f0f0ee', '#99f6e4', '#a5b4fc', '#e0e7ff'],
    speed = 0.25,
    className,
}: ShaderBackdropProps) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        setMounted(true);
    }, []);

    // WebGL canvas can't render on the server; wait for mount so the
    // theme is resolved and hydration stays clean
    if (!mounted) return null;

    const activeColors = colors ?? (resolvedTheme === 'dark' ? darkColors : lightColors);

    return (
        <div className={className} aria-hidden>
            <MeshGradient
                colors={activeColors}
                speed={reducedMotion ? 0 : speed}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
