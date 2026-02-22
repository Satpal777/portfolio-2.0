'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
    title: string;
    section: string;
    content: string;
    href: string;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    // Search index - in a real app, this would be generated from your content
    const searchIndex: SearchResult[] = [
        // Experience
        {
            title: 'Experience & Work History',
            section: 'Experience',
            content: 'Desktop Application Development, Web Application Development, Angular, TypeScript, C#, .NET, Asite Solutions',
            href: '#experience',
        },
        // Skills
        {
            title: 'Frontend & UI Development',
            section: 'Skills',
            content: 'Angular, React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Framer Motion',
            href: '#experience',
        },
        {
            title: 'Backend & System Architecture',
            section: 'Skills',
            content: 'Node.js, C#, .NET, REST APIs, PostgreSQL, Libuv, Streams, Clusters',
            href: '#experience',
        },
        // Projects
        {
            title: 'NextNews - News Platform',
            section: 'Projects',
            content: 'News aggregation platform built with Next.js, TypeScript, Tailwind CSS',
            href: '#projects',
        },
        {
            title: 'Carpool - Sharing App',
            section: 'Projects',
            content: 'Ride-sharing application using Angular, TypeScript, Node.js',
            href: '#projects',
        },
        // Education
        {
            title: 'B.E. in Information Technology',
            section: 'Education',
            content: 'Gujarat Technological University, CGPA: 8.5, IT Engineering',
            href: '#education',
        },
        // Certifications
        {
            title: 'Namaste JavaScript Certificate',
            section: 'Certifications',
            content: 'Akshay Saini, JS Internals, Closures, Event Loop, Expert Concepts',
            href: '#certifications',
        },
        {
            title: 'Namaste Node.Js Certificate',
            section: 'Certifications',
            content: 'Akshay Saini, Scalable Backend, Libuv, Streams, Clusters, Performance',
            href: '#certifications',
        },
        {
            title: 'LeetCode 365 Days Achievement',
            section: 'Certifications',
            content: 'Consistency, Algorithms, Data Structures, Problem Solving Badge',
            href: '#certifications',
        },
        {
            title: 'JS Advanced Challenges Certificate',
            section: 'Certifications',
            content: 'LinkedIn Learning, Performance Optimization, Memory Management',
            href: '#certifications',
        },
        // Contact
        {
            title: 'Contact - Hire & Collaborate',
            section: 'Contact',
            content: 'Email, LinkedIn, WhatsApp, GitHub, Open to new opportunities',
            href: '#contact',
        },
    ];

    useEffect(() => {
        if (query.trim()) {
            const filtered = searchIndex.filter(
                (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.content.toLowerCase().includes(query.toLowerCase()) ||
                    item.section.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    const handleResultClick = (href: string) => {
        onClose();
        // Smooth scroll to section
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl rounded-lg border shadow-2xl"
                style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                }}
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <Search className="w-5 h-5 opacity-50" />
                    <input
                        type="text"
                        placeholder="Search portfolio..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-base"
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="p-1 hover:opacity-70 transition-opacity"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                    {query.trim() && results.length === 0 && (
                        <div className="px-4 py-8 text-center text-sm opacity-50">
                            No results found for "{query}"
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="py-2">
                            {results.map((result, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleResultClick(result.href)}
                                    className="w-full px-4 py-3 text-left hover:bg-opacity-5 hover:bg-gray-500 transition-colors border-b last:border-b-0"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium mb-1">{result.title}</div>
                                            <div className="text-sm opacity-70 truncate">
                                                {result.content}
                                            </div>
                                        </div>
                                        <div className="text-xs opacity-50 flex-shrink-0">
                                            {result.section}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {!query.trim() && (
                        <div className="px-4 py-8 text-center text-sm opacity-50">
                            Start typing to search...
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t text-xs opacity-50 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                    <span>Press ESC to close</span>
                    <span>↑↓ to navigate</span>
                </div>
            </div>
        </div>
    );
}
