import { ArrowUpRight, Calendar } from 'lucide-react';
import articlesData from '@/data/articles.json';

interface Article {
    title: string;
    url: string;
    publishedAt: string;
    excerpt?: string;
    coverImage?: string;
}

const FEED_URL = process.env.RSS_FEED_URL || 'https://blogs.satpal.cloud/rss.xml';

function decodeEntities(s: string): string {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

function parseRss(xml: string): Article[] {
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

    return items
        .map((item) => {
            const pick = (tag: string) => {
                const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
                return (m?.[1] ?? '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
            };

            const content = pick('content:encoded') || pick('description');
            const coverImage =
                item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1] ||
                content.match(/<img[^>]+src="([^"]+)"/)?.[1];
            const text = decodeEntities(
                content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
            );

            return {
                title: decodeEntities(pick('title')),
                url: pick('link'),
                publishedAt: pick('pubDate'),
                excerpt: text ? `${text.slice(0, 200)}` : undefined,
                coverImage,
            };
        })
        .filter((a) => a.title && a.url);
}

// Fetched at build time and revalidated daily, so the homepage always shows
// the latest posts in prerendered (indexable) HTML. Falls back to the
// bundled snapshot if the feed is unreachable.
async function getArticles(): Promise<Article[]> {
    try {
        const res = await fetch(FEED_URL, { next: { revalidate: 86400 } });
        if (res.ok) {
            const fresh = parseRss(await res.text());
            if (fresh.length > 0) return fresh.slice(0, 5);
        }
    } catch {
        // fall through to the bundled snapshot
    }
    return articlesData.articles as Article[];
}

export async function Articles() {
    const articles = await getArticles();

    if (articles.length === 0) {
        return (
            <section id="articles" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="text-2xl font-medium mb-8">Articles</h2>
                <div className="text-sm opacity-70">
                    <p className="mb-4">Check out my latest articles on my blog.</p>
                    <a
                        href={process.env.NEXT_PUBLIC_BLOG_URL || '#'}
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
                    href={process.env.NEXT_PUBLIC_BLOG_URL || '#'}
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
