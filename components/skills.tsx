'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './reveal';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const skills = {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Python'],
    'Frontend': ['Angular', 'React.js', 'Next.js', 'RxJS', 'NgRx', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Backend & Databases': ['Node.js', 'Express.js', 'SQLite', 'MongoDB'],
    'Desktop Development': ['Electron.js'],
};

const allSkills = Object.values(skills).flat();

export function Skills() {
    return (
        <section className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <SectionHeading number="02" title="Technical Skills" />
            <div className="space-y-6">
                {Object.entries(skills).map(([category, items], catIndex) => (
                    <div key={category}>
                        <motion.h3
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 0.7, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIndex * 0.08, ease: EASE }}
                            className="text-sm font-medium mb-3"
                        >
                            {category}
                        </motion.h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: catIndex * 0.08 + i * 0.04,
                                        ease: EASE,
                                    }}
                                    whileHover={{
                                        y: -4,
                                        scale: 1.06,
                                        borderColor: '#14b8a6',
                                        color: '#14b8a6',
                                        transition: { duration: 0.2 },
                                    }}
                                    className="px-3 py-1.5 text-sm border rounded-md cursor-default"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Infinite tech marquee */}
            <div
                className="marquee mt-12 -mx-4 sm:-mx-6 overflow-hidden border-t border-b py-4 select-none"
                style={{ borderColor: 'var(--border)', '--marquee-duration': '26s' } as React.CSSProperties}
            >
                <div className="marquee-track flex w-max whitespace-nowrap">
                    {[0, 1].map((copy) => (
                        <div
                            key={copy}
                            className="flex items-center gap-6 pr-6"
                            aria-hidden={copy === 1}
                        >
                            {allSkills.map((skill) => (
                                <span
                                    key={`${copy}-${skill}`}
                                    className="flex items-center gap-6 text-sm opacity-40 font-[family-name:var(--font-geist-mono)] uppercase tracking-widest"
                                >
                                    {skill}
                                    <span className="text-teal-500 text-xs">✦</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
