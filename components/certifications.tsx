'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, X, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';

const certifications = [
    {
        title: 'Namaste JavaScript',
        issuer: 'Akshay Saini',
        description: 'Deep dive into JavaScript engine internals, closures, event loop, and expert-level concepts.',
        image: '/namaste-js.jpg',
    },
    {
        title: 'JavaScript: Five Advanced Challenges and Concepts',
        issuer: 'LinkedIn Learning / Advanced Patterns',
        description: 'Mastering performance optimization, memory management, and advanced functional patterns.',
        image: '/js-five-advance-challenges-and-concepts.jpg',
    },
    {
        title: 'Namaste Node.Js',
        issuer: 'Akshay Saini',
        description: 'Scalable backend architecture, Libuv, Streams, Clusters, and Performance Tuning.',
        image: '/namaste-node-js.jpg',
    },
    {
        title: 'LeetCode 365 Days Badge',
        issuer: 'LeetCode',
        description: 'Demonstrated consistency and problem-solving skills across a wide range of algorithms and data structures.',
        image: '/leetcode-365.jpg',
    }
];

export function Certifications() {
    const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedCert]);

    return (
        <section id="certifications" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-medium mb-8 sm:mb-12 flex items-center gap-3">
                    <Award className="w-6 h-6 text-teal-500" />
                    Certifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedCert(cert)}
                            className="relative overflow-hidden rounded-2xl border bg-muted/20 hover:bg-muted/30 transition-all group cursor-pointer"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="p-2 rounded-lg bg-muted text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ZoomIn className="w-4 h-4" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-medium mb-1 group-hover:text-teal-500 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-sm font-medium opacity-50 mb-4">{cert.issuer}</p>
                                <p className="text-sm opacity-70 leading-relaxed">
                                    {cert.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Portal-like View */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-[95vw] max-h-[95vh] bg-muted rounded-3xl overflow-hidden shadow-2xl border"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <img
                                src={selectedCert.image}
                                alt={selectedCert.title}
                                className="w-auto h-auto max-w-full max-h-[95vh] block object-contain"
                            />

                            {/* Modal Header/Info Overlay */}
                            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent text-white flex justify-between items-start opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div>
                                    <h3 className="text-xl font-medium">{selectedCert.title}</h3>
                                    <p className="text-sm opacity-80">{selectedCert.issuer}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
