'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SectionHeading({ number, title }: { number: string; title: string }) {
    return (
        <Reveal className="mb-8">
            <div className="flex items-baseline gap-3">
                <span className="text-xs text-teal-500 tracking-widest font-[family-name:var(--font-geist-mono)]">
                    {number}
                </span>
                <h2 className="text-2xl font-medium relative inline-block">
                    {title}
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                        className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-teal-500 to-transparent"
                    />
                </h2>
            </div>
        </Reveal>
    );
}
