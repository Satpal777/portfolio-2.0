'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { SectionHeading } from './reveal';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const projects = [
    {
        title: 'NextNews',
        description: 'Real-time news aggregation with AI-powered summarization using Groq and LLaMA models.',
        tech: 'Next.js, NewsAPI, Groq, LLaMA, shadcn/ui',
        github: 'https://github.com/Satpal777/NextNews',
        url: 'https://github.com/Satpal777/NextNews',
    },
    {
        title: 'Carpool',
        description: 'Dynamic carpool web application with route visualization using Leaflet maps.',
        tech: 'AngularJS, Node.js, Express.js, MongoDB, Leaflet',
        github: 'https://github.com/Satpal777/Carpool',
        url: 'https://github.com/Satpal777/Carpool',
    },
];

function setSpotlight(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export function Projects() {
    return (
        <section id="projects" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <SectionHeading number="03" title="Projects" />
            <div className="space-y-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: index * 0.12, ease: EASE }}
                        whileHover={{ y: -4 }}
                        onMouseMove={setSpotlight}
                        className="group relative rounded-xl border p-6 transition-colors hover:border-teal-500/40 overflow-hidden"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        {/* Mouse-tracked spotlight */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background:
                                    'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(20, 184, 166, 0.1), transparent 70%)',
                            }}
                        />

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-medium group-hover:text-teal-500 transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowUpRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                            <p className="text-sm opacity-70 mb-2">{project.description}</p>
                            <div className="flex items-center gap-3 mt-4">
                                <p className="text-xs opacity-50 font-[family-name:var(--font-geist-mono)] flex-1">{project.tech}</p>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-10 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github className="w-3.5 h-3.5" />
                                    <span>Code</span>
                                </a>
                            </div>
                        </div>

                        {/* Stretched Link Area */}
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-0"
                        >
                            <span className="sr-only">View {project.title}</span>
                        </a>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <motion.a
                    href="/projects?from=portfolio"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-sm rounded-full border hover:border-teal-500/50 hover:text-teal-500 transition-colors"
                    style={{ borderColor: 'var(--border)' }}
                >
                    View project catalog
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
            </div>
        </section>
    );
}
