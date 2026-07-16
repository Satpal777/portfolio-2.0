import type { MetadataRoute } from 'next';
import { projectCases } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.satpal.cloud';

  const projectPages: MetadataRoute.Sitemap = projectCases.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectPages,
  ];
}
