'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface Article {
    title: string;
    url: string;
    publishedAt: string;
    excerpt?: string;
    coverImage?: string;
}

export function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch('/api/articles');

                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }

                const data = await response.json();
                setArticles(data.articles || []);
            } catch (err) {
                setError('Unable to load articles');
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <section id="articles" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="text-2xl font-medium mb-8">Articles</h2>
                <div className="text-sm opacity-50">Loading articles...</div>
            </section>
        );
    }

    if (error || articles.length === 0) {
        return (
            <section id="articles" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="text-2xl font-medium mb-8">Articles</h2>
                <div className="text-sm opacity-70">
                    <p className="mb-4">Check out my latest articles on my blog.</p>
                    <a
                        href="https://blogs.satpal.cloud"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                    >
                        Visit Blog <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section id="articles" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-medium mb-8">Articles</h2>
            <div className="space-y-0">
                {articles.map((article, index) => (
                    <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-6 border-b last:border-b-0 group transition-opacity hover:opacity-70"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <div className="flex items-start gap-4">
                            {article.coverImage && (
                                <div className="flex-shrink-0 w-40 h-[90px] overflow-hidden rounded border" style={{ borderColor: 'var(--border)' }}>
                                    <img
                                        src={article.coverImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-medium">{article.title}</h3>
                                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                                {article.excerpt && (
                                    <p className="text-sm opacity-70 mb-2 line-clamp-2">{article.excerpt}</p>
                                )}
                                {article.publishedAt && (
                                    <div className="flex items-center gap-1.5 text-xs opacity-50">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="mt-6 text-center">
                <a
                    href="https://blogs.satpal.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                >
                    View all articles <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
            </div>
        </section>
    );
}
