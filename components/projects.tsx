'use client';

import { ArrowUpRight, Github } from 'lucide-react';

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

export function Projects() {
    return (
        <section id="projects" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-medium mb-8">Projects</h2>
            <div className="space-y-0">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="py-6 border-b last:border-b-0 group transition-all relative"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <div className="flex items-start justify-between gap-4 mb-3 transition-opacity group-hover:opacity-70">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-medium">{project.title}</h3>
                                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                    </div>
                ))}
            </div>
        </section>
    );
}
