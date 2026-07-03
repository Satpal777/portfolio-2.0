'use client';

import { useState, useRef, ReactNode, Suspense } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, Play, Copy, Check, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShaderBackdrop } from '@/components/shader-backdrop';

// --- Types & Data ---

interface Project {
    id: string;
    num: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    githubBackend?: string;
    url: string;
    videoUrl?: string;
    npmCommand?: string;
    image: string;
    color: string;
}

const projectsData: Project[] = [
    {
        id: 'nextnews',
        num: '01',
        title: 'NextNews',
        description: 'Real-time news aggregation with AI-powered summarization and personalized feeds. Integrates multiple news APIs into a single unified stream applying rapid sentiment analysis.',
        tech: ['Next.js', 'NewsAPI', 'Groq', 'LLaMA', 'TailwindCSS'],
        github: 'https://github.com/Satpal777/NextNews',
        url: 'https://github.com/Satpal777/NextNews',
        image: '/project-nextnews.png',
        color: '#14b8a6', // teal
    },
    {
        id: 'carpool',
        num: '02',
        title: 'Carpool',
        description: 'Dynamic carpool web application with interactive route visualization. Uses Leaflet.js to plot, match, and visualize optimal carpool paths with custom clustering metrics.',
        tech: ['AngularJS', 'Node.js', 'Express', 'MongoDB', 'Leaflet'],
        github: 'https://github.com/Satpal777/Carpool',
        url: 'https://github.com/Satpal777/Carpool',
        image: '/project-carpool.png',
        color: '#3b82f6', // blue
    },
    {
        id: 'aetheria',
        num: '03',
        title: 'Aetheria',
        description: 'Immersive cosmic data visualization platform dashboard. Visualizes simulated deep-space telemetry using orbital graphs, neon HUD overlays, and high-performance charts.',
        tech: ['React', 'Three.js', 'WebGL', 'Framer Motion'],
        github: 'https://github.com/Satpal777/aetheria',
        url: 'https://github.com/Satpal777/aetheria',
        image: '/project-aetheria.png',
        color: '#8b5cf6', // purple
    },
    {
        id: 'tiktak',
        num: '04',
        title: 'Tik-Tak',
        description: 'A delightful twist on classic Tic-Tac-Toe featuring custom character avatars and intelligent computer opponents. Play against the AI or challenge friends in this interactive web game.',
        tech: ['React', 'Game AI', 'CSS Grid', 'TailwindCSS'],
        github: 'https://github.com/Satpal777/tik-tak',
        url: 'https://tiktak.satpal.cloud',
        image: '/project-tiktak.png',
        color: '#10b981', // emerald green
    },
    {
        id: 'ratiod',
        num: '05',
        title: "Ratio'd",
        description: 'A blazing fast real-time polling platform. Launch quick polls, collect live votes, and uncover instant insights with a modern creator toolkit.',
        tech: ['Next.js', 'React', 'Live Data', 'TailwindCSS'],
        github: 'https://github.com/Satpal777/Ratiod',
        url: 'https://ratiod.satpal.cloud/',
        image: '/project-ratiod.png',
        color: '#2563eb', // bright blue
    },
    {
        id: 'lively',
        num: '06',
        title: 'Lively',
        description: 'A real-time location tracking platform that visualizes the live positions of connected users on an interactive map. Powered by a high-throughput event streaming architecture using Kafka and Bun.',
        tech: ['React', 'Kafka', 'Bun', 'WebSockets'],
        github: 'https://github.com/Satpal777/Lively-Frontend',
        githubBackend: 'https://github.com/Satpal777/Lively-Backend',
        url: 'https://youtu.be/jegLFE0CEzk',
        image: '/project-lively-v2.png',
        color: '#a855f7', // purple
    },
    {
        id: 'emitly',
        num: '07',
        title: 'Emitly',
        description: 'A high-performance real-time web socket messaging platform. Connects clients with ultra-low latency data transmission through a modern developer-focused dashboard.',
        tech: ['React', 'Node.js', 'WebSockets', 'TailwindCSS'],
        github: 'https://github.com/Satpal777/socket-box-frontend',
        githubBackend: 'https://github.com/Satpal777/socket-box',
        url: 'https://emitly.satpal.cloud',
        videoUrl: 'https://youtu.be/H6wHaHviP0U',
        image: '/project-emitly.png', // Reusing the high-tech streaming mockup
        color: '#06b6d4', // cyan
    },
    {
        id: 'aura-auth',
        num: '08',
        title: 'Aura Auth',
        description: 'An OIDC-compliant Single Sign-On (SSO) authentication server. Designed as a secure plug-and-play identity provider to seamlessly manage user access across multiple internal applications.',
        tech: ['Node.js', 'OAuth 2.0', 'OIDC', 'Security'],
        github: 'https://github.com/Satpal777/aura-auth',
        url: 'https://auth.satpal.cloud/',
        image: '/project-aura-auth.png',
        color: '#f59e0b', // amber
    },
    {
        id: 'chainmoj',
        num: '09',
        title: 'ChainMoj',
        description: 'A full-stack movie ticket booking platform. Features real-time interactive theater seat selection, automated booking workflows, and comprehensive cinema management.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB'],
        github: 'https://github.com/Satpal777/movie-ticket-booking-frontend',
        githubBackend: 'https://github.com/Satpal777/movie-ticket-booking-backend',
        url: 'https://chainmoj.satpal.cloud',
        image: '/project-chainmoj.png',
        color: '#eab308', // yellow
    },
    {
        id: 'tss',
        num: '10',
        title: 'TSS',
        description: 'Tea Simple Smart CSS (TSS) is a lightweight, intelligent CSS utility framework designed for modern web development. Installable via NPM, it comes with comprehensive developer documentation.',
        tech: ['CSS', 'NPM Package', 'Documentation', 'Open Source'],
        github: 'https://github.com/Satpal777/TSS',
        githubBackend: 'https://github.com/Satpal777/TSS-DOCS',
        url: 'https://tss-docs.vercel.app',
        npmCommand: 'npm i tea-simple-smart-css',
        image: '/project-tss.png',
        color: '#10b981', // emerald
    }
];

// --- Subcomponents ---

function CopyNpmCommand({ command }: { command: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <Magnetic className="w-full sm:w-auto">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(command);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex w-full sm:w-auto min-w-0 items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 bg-zinc-900/50 text-white font-mono text-[11px] sm:text-xs md:text-sm tracking-normal sm:tracking-wide hover:bg-white/10 transition-colors"
            >
                <Terminal className="w-4 h-4 opacity-50" />
                <span className="min-w-0 truncate">{command}</span>
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-50" />}
            </button>
        </Magnetic>
    );
}

// --- Magnetic Component ---

function Magnetic({ children, className = "inline-block" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            className={`relative magnetic ${className}`}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}

// --- Sticky Stacking Card Component ---

function StackedCard({ project, index }: { project: Project, index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // We track the scroll progress of THIS specific container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // As you scroll past this card, it scales down and fades out, pushing to the background
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);

    return (
        <div 
            ref={containerRef}
            id={project.id}
            className="h-screen w-full sticky top-0 flex items-center justify-center p-6 md:p-12 overflow-hidden z-10"
            style={{ 
                // Z-index ensures later cards stack on top of earlier ones
                zIndex: index
            }}
        >
            <motion.div 
                style={{ scale, opacity, filter }}
                className="w-full max-w-6xl h-[85vh] md:h-[80vh] bg-zinc-950 border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row group"
            >
                {/* Visual Background / Image Container */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/50">
                    <motion.div 
                        className="absolute inset-0 z-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-60 mix-blend-screen transition-opacity duration-500 group-hover:opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent md:bg-gradient-to-r" />
                    </motion.div>
                    
                    {/* Floating Tech Badges (over image on mobile, top left on desktop) */}
                    <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2 max-w-[80%]">
                        {project.tech.map((tag) => (
                            <span 
                                key={tag} 
                                className="px-3 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] md:text-xs font-mono tracking-wider text-white/80"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content Container */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-zinc-950">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <span className="text-3xl md:text-5xl font-light font-mono tracking-tighter" style={{ color: project.color }}>
                            {project.num}
                        </span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-white">
                        {project.title}
                    </h2>
                    
                    <p className="text-xs md:text-base text-zinc-400 leading-relaxed font-light mb-8 md:mb-12 max-w-lg">
                        {project.description}
                    </p>

                    {/* Action Links */}
                    <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 sm:gap-4 md:gap-6 mt-auto md:mt-0">
                        <Magnetic className="w-full sm:w-auto">
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest font-bold hover:scale-105 transition-all whitespace-nowrap ${
                                    project.url.includes('youtu') 
                                    ? 'bg-[#ff0000] text-white hover:bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.3)]' 
                                    : 'bg-white text-black hover:bg-gray-200'
                                }`}
                            >
                                {project.url.includes('youtu') ? (
                                    <>
                                        <Play className="w-4 h-4 fill-current" />
                                        Watch Video
                                    </>
                                ) : (
                                    <>
                                        Live Demo
                                        <ArrowUpRight className="w-4 h-4" />
                                    </>
                                )}
                            </a>
                        </Magnetic>
                        {project.videoUrl && (
                            <Magnetic className="w-full sm:w-auto">
                                <a
                                    href={project.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest font-bold hover:scale-105 transition-all bg-[#ff0000] text-white hover:bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.3)] whitespace-nowrap"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    Watch Video
                                </a>
                            </Magnetic>
                        )}
                        <Magnetic className="w-full sm:w-auto">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 text-white font-mono text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
                            >
                                <Github className="w-4 h-4" />
                                {project.githubBackend ? 'Frontend' : 'Source'}
                            </a>
                        </Magnetic>
                        {project.githubBackend && (
                            <Magnetic className="w-full sm:w-auto">
                                <a
                                    href={project.githubBackend}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 text-white font-mono text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
                                >
                                    <Github className="w-4 h-4" />
                                    {project.githubBackend.toLowerCase().includes('docs') ? 'Docs Source' : 'Backend'}
                                </a>
                            </Magnetic>
                        )}
                        {project.npmCommand && (
                            <CopyNpmCommand command={project.npmCommand} />
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// --- Back Button (isolated so useSearchParams is inside Suspense) ---

function BackButton() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    if (from !== 'home' && from !== 'portfolio') return null;
    return (
        <div className="pointer-events-auto">
            <Magnetic>
                <Link href="/" className="flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </Magnetic>
        </div>
    );
}

// --- Main Page ---

export default function ProjectsShowcase() {
    const [activeSection, setActiveSection] = useState<string>('nextnews');

    // Scroll tracker for Catalog Index (Mathematical sync)
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof window === 'undefined') return;
        const vh = window.innerHeight;
        const startOffset = 48 + (vh * 0.6); // pt-12 (48px) + 60vh intro
        
        let activeIdx = Math.floor((latest - startOffset + (vh * 0.5)) / vh);
        if (activeIdx < 0) activeIdx = 0;
        if (activeIdx >= projectsData.length) activeIdx = projectsData.length - 1;
        
        setActiveSection(projectsData[activeIdx].id);
    });

    const scrollToSection = (id: string) => {
        const index = projectsData.findIndex(p => p.id === id);
        if (index === -1) return;
        
        const vh = window.innerHeight;
        // Exact mathematical position where the card originally becomes sticky
        const offset = 48 + (vh * 0.6) + (index * vh);
        
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-[#050505] min-h-screen font-sans relative selection:bg-white/20">
            {/* Live shader backdrop — deep teal/indigo drift under everything */}
            <ShaderBackdrop
                colors={['#050505', '#134e4a', '#1e1b4b', '#0f172a']}
                speed={0.15}
                className="fixed inset-0 pointer-events-none opacity-60 z-0"
            />

            {/* Grid Vector Background */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Header Navigation */}
            <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
                <div className="pointer-events-auto">
                    <Magnetic>
                        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter font-[family-name:var(--font-geist-pixel-square)]">
                            ŘSS
                        </Link>
                    </Magnetic>
                </div>
                <Suspense>
                    <BackButton />
                </Suspense>
            </header>

            {/* Sticky Catalog Index (Desktop) */}
            <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 p-6 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/5">
                <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-2">
                    SELECTED WORK
                </div>
                {projectsData.map((project) => {
                    const isActive = activeSection === project.id;
                    return (
                        <button
                            key={project.id}
                            onClick={() => scrollToSection(project.id)}
                            className="flex items-center gap-4 group text-left"
                        >
                            <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                {project.num}
                            </span>
                            <div className="flex flex-col">
                                <span className={`text-xs font-mono tracking-wider uppercase transition-all duration-300 ${isActive ? 'text-white translate-x-2' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                    {project.title}
                                </span>
                                {/* Animated underline highlight */}
                                <div 
                                    className="h-[1px] mt-1 transition-all duration-500 rounded-full"
                                    style={{
                                        width: isActive ? '100%' : '0%',
                                        backgroundColor: project.color,
                                        opacity: isActive ? 1 : 0
                                    }}
                                />
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Sticky Stacking Projects Wrapper */}
            <main className="relative z-10 w-full pt-12 pb-[20vh]">
                {/* Hero / Intro Space */}
                <div className="h-[60vh] flex flex-col items-center justify-center text-center px-6 sticky top-0 -z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6"
                    >
                    SELECTED WORK
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="font-mono text-zinc-500 tracking-widest uppercase text-sm"
                    >
                        Scroll down to explore
                    </motion.p>
                </div>

                {/* Stacking Cards */}
                {projectsData.map((project, index) => (
                    <StackedCard 
                        key={project.id} 
                        project={project} 
                        index={index + 10} 
                    />
                ))}
            </main>

            {/* Outro / Thank You Space */}
            <div className="h-[100vh] flex flex-col items-center justify-center text-center px-6 relative z-10 bg-[#050505]">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6"
                >
                    THANK YOU
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-mono text-zinc-500 tracking-widest uppercase text-sm"
                >
                    For exploring the catalog
                </motion.p>
            </div>
            
        </div>
    );
}
