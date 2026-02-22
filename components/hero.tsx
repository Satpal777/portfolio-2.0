'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const logoVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            rotate: -180,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 1,
                ease: [0.6, 0.05, 0.01, 0.9] as const,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const, // easeOut
            },
        },
    };

    const contactLinks = [
        { href: 'mailto:your.email@gmail.com', icon: Mail, label: 'Email' },
        { href: 'tel:+1234567890', icon: Phone, label: 'Phone' },
        { href: 'https://linkedin.com/in/satpalsinh-rana', icon: Linkedin, label: 'LinkedIn' },
        { href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Satpal777', icon: Github, label: 'GitHub' },
    ];

    return (
        <section
            className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 border-b overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
        >
            {/* Pixel Grid Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                    backgroundSize: '10px 10px',
                }}
            />

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
            >
                {/* Large centered logo/initials with Geist Pixel font */}
                <div className="mb-8 text-center">
                    <motion.div
                        variants={logoVariants}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        whileHover={{
                            scale: 1.05,
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 }
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

                {/* Name and Title */}
                <div className="text-center max-w-2xl mb-6">
                    <motion.h1
                        variants={textVariants}
                        className="text-3xl sm:text-4xl md:text-5xl font-medium mb-2 leading-tight"
                    >
                        Satpalsinh Rana
                    </motion.h1>
                    <motion.p
                        variants={textVariants}
                        className="text-xl md:text-2xl mb-6 opacity-70"
                    >
                        Software Engineer
                    </motion.p>
                </div>

                {/* Contact Links */}
                <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-70"
                >
                    {contactLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <motion.div
                                key={link.href}
                                variants={textVariants}
                                className="flex items-center gap-1.5"
                            >
                                {index > 0 && (
                                    <span className="hidden sm:inline mr-2.5">•</span>
                                )}
                                <motion.a
                                    href={link.href}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{link.label}</span>
                                </motion.a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
}
