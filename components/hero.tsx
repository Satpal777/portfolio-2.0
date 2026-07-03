'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, ChevronDown } from 'lucide-react';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const roles = [
    'Software Engineer',
    'Frontend Craftsman',
    'Animation Obsessed',
    'Full-Stack Builder',
];

function RotatingRole() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % roles.length);
        }, 2600);
        return () => clearInterval(timer);
    }, []);

    return (
        <span className="relative inline-flex h-[1.6em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={roles[index]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="inline-block whitespace-nowrap"
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function Magnetic({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        setPosition({
            x: (e.clientX - (left + width / 2)) * 0.3,
            y: (e.clientY - (top + height / 2)) * 0.3,
        });
    };

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            onMouseMove={handleMouse}
            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}

export function Hero() {
    const [isHovered, setIsHovered] = useState(false);

    const name = 'Satpalsinh Rana';

    const nameContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.045,
                delayChildren: 0.9,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 28, rotateX: 90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.5, ease: EASE },
        },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] as const },
        },
    };

    const contactLinks = [
        { href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`, icon: Mail, label: 'Email' },
        { href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#', icon: Linkedin, label: 'LinkedIn' },
        { href: process.env.NEXT_PUBLIC_GITHUB_URL || '#', icon: Github, label: 'GitHub' },
    ];

    return (
        <section
            className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 border-b overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
        >
            {/* Aurora blobs drifting behind everything */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="aurora-blob absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="aurora-blob-2 absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-purple-500/15 blur-[100px]" />
                <div className="aurora-blob-3 absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-blue-500/15 blur-[90px]" />
            </div>

            {/* Pixel Grid Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                    backgroundSize: '10px 10px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Large centered logo/initials with Geist Pixel font */}
                <div className="mb-8 text-center logo-float">
                    <motion.div
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        whileHover={{
                            scale: 1.05,
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 },
                        }}
                        className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter font-[family-name:var(--font-geist-pixel-square)] cursor-pointer select-none relative"
                    >
                        <motion.span
                            initial={false}
                            animate={{
                                opacity: isHovered ? 0 : 1,
                                scale: isHovered ? 0.8 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                        >
                            ŘSS
                        </motion.span>
                        <motion.span
                            initial={false}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <img
                                src="/pixel-smile.svg"
                                alt="Smiling face"
                                className="w-30 h-30 md:w-40 md:h-40"
                            />
                        </motion.span>
                    </motion.div>
                </div>

                {/* Name — letter-by-letter 3D flip reveal */}
                <div className="text-center max-w-2xl mb-6">
                    <motion.h1
                        variants={nameContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl sm:text-4xl md:text-5xl font-medium mb-2 leading-tight"
                        style={{ perspective: '600px' }}
                        aria-label={name}
                    >
                        {name.split('').map((char, i) => (
                            <motion.span
                                key={`${char}-${i}`}
                                variants={letterVariants}
                                className="inline-block"
                                style={{ transformOrigin: 'bottom center' }}
                            >
                                {char === ' ' ? ' ' : char}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.7, ease: EASE }}
                        className="text-xl md:text-2xl mb-6"
                    >
                        <RotatingRole />
                    </motion.p>
                </div>

                {/* Contact Links — magnetic */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 0.6, delay: 2, ease: EASE }}
                    className="flex flex-wrap items-center justify-center gap-4 text-sm"
                >
                    {contactLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <div key={link.href} className="flex items-center gap-1.5">
                                {index > 0 && (
                                    <span className="hidden sm:inline mr-2.5 opacity-50">•</span>
                                )}
                                <Magnetic>
                                    <motion.a
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="flex items-center gap-1.5 hover:text-teal-500 transition-colors"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{link.label}</span>
                                    </motion.a>
                                </Magnetic>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="mt-12"
                    aria-hidden
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
