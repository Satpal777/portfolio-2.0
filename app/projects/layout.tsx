import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work by Satpalsinh Rana — real-time apps, AI-powered news aggregation, SSO authentication, WebSocket platforms and more, built with Next.js, React, Angular and Node.js.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | Satpalsinh Rana',
    description:
      'Selected work by Satpalsinh Rana — real-time apps, AI-powered news aggregation, SSO authentication, WebSocket platforms and more.',
    url: '/projects',
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
