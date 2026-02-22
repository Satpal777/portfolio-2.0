'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Code2, FolderGit2, Award, PenLine } from 'lucide-react';

interface Stat {
    label: string;
    value: number;
    suffix: string;
    icon: React.ComponentType<{ className?: string }>;
}

const staticStats: Stat[] = [
    { label: 'Years Experience', value: 2, suffix: '+', icon: Briefcase },
    { label: 'Technologies', value: 15, suffix: '+', icon: Code2 },
    { label: 'Projects Built', value: 5, suffix: '+', icon: FolderGit2 },
    { label: 'Certifications', value: 4, suffix: '', icon: Award },
    { label: 'Articles Written', value: 14, suffix: '+', icon: PenLine },
];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 1500;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

export function Stats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            ref={ref}
            className="px-4 sm:px-6 py-12 sm:py-16 border-b"
            style={{ borderColor: 'var(--border)' }}
        >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {staticStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-500">
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="text-3xl md:text-4xl font-semibold mb-1 tracking-tight">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    isInView={isInView}
                                />
                            </div>
                            <p className="text-xs opacity-50 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

