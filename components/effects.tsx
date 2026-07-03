'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-teal-500 via-teal-400 to-purple-500"
            style={{ scaleX }}
        />
    );
}

function CursorGlow() {
    const x = useMotionValue(-400);
    const y = useMotionValue(-400);
    const springX = useSpring(x, { stiffness: 100, damping: 20, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.5 });

    useEffect(() => {
        const move = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
    }, [x, y]);

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed z-[1] hidden md:block w-[480px] h-[480px] rounded-full"
            style={{
                left: springX,
                top: springY,
                translateX: '-50%',
                translateY: '-50%',
                background:
                    'radial-gradient(circle, rgba(20, 184, 166, 0.07) 0%, rgba(20, 184, 166, 0.03) 40%, transparent 70%)',
            }}
        />
    );
}

export function Effects() {
    return (
        <>
            <ScrollProgress />
            <CursorGlow />
        </>
    );
}
