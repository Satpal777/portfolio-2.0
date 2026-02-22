'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = () => {
        setIsAnimating(true);

        // Get button position for clip-path origin
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Store position in CSS variables for animation
            document.documentElement.style.setProperty('--theme-x', `${x}px`);
            document.documentElement.style.setProperty('--theme-y', `${y}px`);
        }

        // Create overlay element for clip-path animation
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            background: ${theme === 'dark' ? '#f0f0ee' : '#0a0a0a'};
        `;

        document.body.appendChild(overlay);

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.style.animation = 'clipPathReveal 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards';
        });

        // Change theme after a short delay
        setTimeout(() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }, 50);

        // Clean up
        setTimeout(() => {
            overlay.remove();
            setIsAnimating(false);
        }, 650);
    };

    if (!mounted) {
        return <div className="w-5 h-5" />;
    }

    const isDark = theme === 'dark';

    return (
        <motion.button
            ref={buttonRef}
            onClick={handleThemeChange}
            className="relative p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isAnimating}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                    >
                        <Sun className="w-5 h-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                    >
                        <Moon className="w-5 h-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
