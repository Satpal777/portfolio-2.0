import { NextResponse } from 'next/server';

interface RssArticle {
  title: string;
  url: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: string;
}

const DEFAULT_RSS_URL = 'https://blogs.satpal.cloud/rss.xml';

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(value: string) {
  return decodeXml(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTagValue(item: string, tagName: string) {
  const match = item.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match ? decodeXml(match[1]).trim() : '';
}

function getTagAttribute(item: string, tagName: string, attributeName: string) {
  const tagMatch = item.match(new RegExp(`<${tagName}\\b[^>]*>`, 'i'));
  const attributeMatch = tagMatch?.[0].match(new RegExp(`${attributeName}=["']([^"']+)["']`, 'i'));
  return attributeMatch ? decodeXml(attributeMatch[1]).trim() : '';
}

function getCoverImage(item: string) {
  return (
    getTagAttribute(item, 'media:content', 'url') ||
    getTagAttribute(item, 'media:thumbnail', 'url') ||
    getTagAttribute(item, 'enclosure', 'url')
  );
}

function parseRssArticles(xml: string): RssArticle[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return items.map((item) => {
    const description = getTagValue(item, 'description') || getTagValue(item, 'content:encoded');

    return {
      title: getTagValue(item, 'title'),
      url: getTagValue(item, 'link'),
      publishedAt: getTagValue(item, 'pubDate'),
      excerpt: stripHtml(description),
      coverImage: getCoverImage(item) || undefined,
    };
  }).filter((article) => article.title && article.url);
}

export async function GET() {
  try {
    const rssUrl = process.env.RSS_FEED_URL || DEFAULT_RSS_URL;
    const response = await fetch(rssUrl, {
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const isRss = /<(rss|feed)\b/i.test(xml);

    if (!isRss) {
      throw new Error(`RSS feed returned non-XML content from ${rssUrl}`);
    }

    const parsedArticles = parseRssArticles(xml);
    const articles = parsedArticles.slice(0, 5);
    const totalArticles = parsedArticles.length;

    return NextResponse.json({ articles, totalArticles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ articles: [], error: 'Failed to fetch articles' }, { status: 500 });
  }
}
