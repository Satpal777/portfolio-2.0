'use client';

import { Calendar, MapPin } from 'lucide-react';

const experiences = [
    {
        title: 'Software Engineer',
        company: 'Asite Solutions Pvt. Ltd.',
        location: 'Ahmedabad, Gujarat',
        period: 'June 2023 – Present',
        projects: [
            {
                name: 'Desktop Application Development',
                tech: 'Angular 17+, Electron.js, Node.js, RxJS, SQLite',
                highlights: [
                    'Developed and maintained a cross-platform desktop application built with Electron.js and Angular, providing secure file handling and seamless cloud synchronization',
                    'Implemented RxJS for reactive programming, enabling real-time state updates and event handling throughout the UI',
                    'Upgraded UI from Angular 12 to Angular 17+ with lazy loading for routing, improving performance and maintainability',
                    'Designed reusable Angular components and services, leveraging dependency injection for scalable architecture',
                    'Optimized asynchronous workflows for database operations, API requests, and file I/O using Node.js',
                    'Wrote unit tests for Angular components using Jasmine and for the main process using Jest',
                    'Integrated Windows API for native file operations and built Node.js native C++ addons for performance-critical modules',
                ],
            },
            {
                name: 'Web Application Development',
                tech: 'Angular 12+, RxJS, TypeScript',
                highlights: [
                    'Developed and maintained reusable Angular components for document management and visualization',
                    'Upgraded legacy Angular modules to Angular 17 and integrated components into existing application',
                    'Implemented Angular reactive forms, routing, and lazy data loading',
                    'Contributed to UI/UX improvements through component reusability and modular design patterns',
                ],
            },
        ],
    },
];

export function Experience() {
    return (
        <section id="experience" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-medium mb-8">Experience</h2>
            <div className="space-y-8">
                {experiences.map((exp, idx) => (
                    <div key={idx}>
                        <div className="mb-4">
                            <h3 className="text-lg sm:text-xl font-medium mb-1">{exp.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm opacity-70">
                                <span className="font-medium">{exp.company}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {exp.location}
                                </span>
                                <span className="hidden sm:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {exp.period}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {exp.projects.map((project, pIdx) => (
                                <div key={pIdx} className="pl-4 border-l-2" style={{ borderColor: 'var(--border)' }}>
                                    <h4 className="font-medium mb-1">{project.name}</h4>
                                    <p className="text-sm opacity-70 mb-3 font-[family-name:var(--font-geist-mono)]">{project.tech}</p>
                                    <ul className="space-y-2 text-sm opacity-80">
                                        {project.highlights.map((highlight, hIdx) => (
                                            <li key={hIdx} className="flex gap-2">
                                                <span className="text-teal-500 text-xs mt-1 flex-shrink-0">✦</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
