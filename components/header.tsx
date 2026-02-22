'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { SearchModal } from './search-modal';
import { Search, Github, Briefcase, FolderGit2, Newspaper, Award, Mail } from 'lucide-react';

const navLinks = [
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#projects', label: 'Projects', icon: FolderGit2 },
    { href: '#articles', label: 'Articles', icon: Newspaper },
    { href: '#certifications', label: 'Certs', icon: Award },
    { href: '#contact', label: 'Contact', icon: Mail },
];

const SECTION_IDS = navLinks.map(link => link.href.substring(1));

export function Header() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowLogo(window.scrollY > 180);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollY < 100) {
                setActiveSection('');
                return;
            }

            if (Math.ceil(scrollY + windowHeight) >= documentHeight - 10) {
                setActiveSection('contact');
                return;
            }

            const offset = windowHeight * 0.3;
            let current = '';

            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top <= offset) {
                    current = id;
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut' as const,
            },
        },
    };

    return (
        <>
            {/* Desktop Header — hidden on mobile */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="hidden md:flex sticky top-0 z-50 items-center justify-between px-6 py-4 border-b backdrop-blur-md"
                style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'rgba(var(--background-rgb), 0.8)'
                }}
            >
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                        animate={{
                            opacity: showLogo ? 1 : 0,
                            scale: showLogo ? 1 : 0.8,
                            x: showLogo ? 0 : 20,
                            y: showLogo ? 0 : 20
                        }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                        className="text-2xl font-bold tracking-tighter font-[family-name:var(--font-geist-pixel-square)]"
                        style={{
                            pointerEvents: showLogo ? 'auto' : 'none',
                        }}
                    >
                        <a href="#" className="hover:opacity-70 transition-opacity">
                            ŘSS
                        </a>
                    </motion.div>

                    <motion.nav
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-6"
                    >
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <motion.a
                                    key={link.href}
                                    variants={itemVariants}
                                    href={link.href}
                                    className="text-sm transition-all duration-300 relative py-1"
                                    style={{
                                        color: isActive ? '#14b8a6' : 'inherit',
                                        fontWeight: isActive ? 500 : 400,
                                        opacity: isActive ? 1 : 0.7
                                    }}
                                    whileHover={{ scale: 1.05, opacity: 1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </motion.nav>
                </div>

                {/* Right: Search, GitHub, Theme */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3"
                >
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:opacity-70 transition-opacity"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <Search className="w-4 h-4" />
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs border rounded" style={{ borderColor: 'var(--border)' }}>
                            Ctrl
                        </kbd>
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs border rounded" style={{ borderColor: 'var(--border)' }}>
                            K
                        </kbd>
                    </motion.button>

                    <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Satpal777'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm hover:opacity-70 transition-opacity"
                    >
                        <Github className="w-4 h-4" />
                    </motion.a>

                    <motion.div variants={itemVariants}>
                        <ThemeToggle />
                    </motion.div>
                </motion.div>
            </motion.header>

            {/* Mobile Top Bar — only logo + actions, visible on small screens */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex md:hidden sticky top-0 z-50 items-center justify-between px-4 py-3 border-b backdrop-blur-md"
                style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'rgba(var(--background-rgb), 0.8)'
                }}
            >
                <a
                    href="#"
                    className="text-xl font-bold tracking-tighter font-[family-name:var(--font-geist-pixel-square)] hover:opacity-70 transition-opacity"
                >
                    ŘSS
                </a>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 hover:opacity-70 transition-opacity"
                        aria-label="Search"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                    <a
                        href={process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Satpal777'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:opacity-70 transition-opacity"
                        aria-label="GitHub"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                    <ThemeToggle />
                </div>
            </motion.header>

            {/* Mobile Dock Navigation — fixed at bottom */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t backdrop-blur-md"
                style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'rgba(var(--background-rgb), 0.85)',
                }}
            >
                <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all"
                                style={{
                                    color: isActive ? '#14b8a6' : 'inherit',
                                    opacity: isActive ? 1 : 0.5,
                                }}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-[10px] font-medium leading-none">
                                    {link.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="mobileDockActive"
                                        className="absolute -top-0.5 w-8 h-0.5 bg-teal-500 rounded-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
