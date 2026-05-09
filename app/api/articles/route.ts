import { NextResponse } from 'next/server';

interface HashnodeArticle {
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  url: string;
  coverImage?: {
    url: string;
  };
}

export async function GET() {
  try {
    const query = `
      query Publication {
        publication(host: "${process.env.NEXT_PUBLIC_HASHNODE_HOST}") {
          posts(first: 5) {
            totalDocuments
            edges {
              node {
                title
                brief
                slug
                publishedAt
                url
                coverImage {
                  url
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(process.env.HASHNODE_API_URL || 'https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles from Hashnode');
    }

    const data = await response.json();

    const publication = data.data?.publication?.posts;
    const totalArticles: number = publication?.totalDocuments ?? 0;

    const articles = publication?.edges?.map((edge: { node: HashnodeArticle }) => ({
      title: edge.node.title,
      url: edge.node.url,
      publishedAt: edge.node.publishedAt,
      excerpt: edge.node.brief,
      coverImage: edge.node.coverImage?.url,
    })) || [];

    return NextResponse.json({ articles, totalArticles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ articles: [], error: 'Failed to fetch articles' }, { status: 500 });
  }
}
