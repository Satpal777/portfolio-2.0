'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Globe, MapPin, ArrowRight } from 'lucide-react';

export function Contact() {
    const socials = [
        { name: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Satpal777', icon: Github },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/satpalsinh-rana', icon: Linkedin },
        { name: 'Portfolio', url: 'https://satpal.cloud', icon: Globe },
    ];

    return (
        <section id="contact" className="px-4 sm:px-6 py-12 sm:py-16 md:py-24 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium mb-6"
                            style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' }}>
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                            Available for new projects
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 leading-tight">
                            Let's work together on your next big thing.
                        </h2>

                        <p className="opacity-70 mb-8 leading-relaxed">
                            Interested in collaborating or just want to say hi?
                            My inbox is always open. Whether you have a question or just want to connect,
                            I'll try my best to get back to you!
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 opacity-70">
                                <MapPin className="w-5 h-5 text-teal-500" />
                                <span>Ahmedabad, Gujarat, India</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-70">
                                <Mail className="w-5 h-5 text-teal-500" />
                                <a href="mailto:your.email@gmail.com" className="hover:text-teal-500 transition-colors">
                                    your.email@gmail.com
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-muted/30 p-8 rounded-2xl border"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <h3 className="text-xl font-medium mb-8">Connect with me</h3>

                        <div className="grid grid-cols-1 gap-4">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-xl border bg-background hover:bg-muted/50 transition-all group"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500">
                                            <social.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{social.name}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </a>
                            ))}

                            <a
                                href="mailto:your.email@gmail.com"
                                className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                            >
                                Send a Message
                                <Mail className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
