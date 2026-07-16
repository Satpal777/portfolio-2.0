import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github, Play, Terminal } from 'lucide-react';
import { projectCases, getProjectCase } from '@/data/projects';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const siteUrl = 'https://www.satpal.cloud';

export function generateStaticParams() {
    return projectCases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectCase(slug);
    if (!project) return {};

    const title = `${project.title} — Case Study`;
    const description = `${project.tagline}. Built by Satpalsinh Rana with ${project.tech.slice(0, 4).join(', ')}. Architecture, highlights and source code.`;

    return {
        title,
        description,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title: `${title} | Satpalsinh Rana`,
            description,
            url: `/projects/${project.slug}`,
            images: [{ url: project.image }],
        },
    };
}

export default async function ProjectCasePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectCase(slug);
    if (!project) notFound();

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
            { '@type': 'ListItem', position: 3, name: project.title, item: `${siteUrl}/projects/${project.slug}` },
        ],
    };

    const creativeWorkJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.tagline,
        codeRepository: project.github,
        programmingLanguage: project.tech,
        author: { '@type': 'Person', name: 'Satpalsinh Rana', url: siteUrl },
        url: `${siteUrl}/projects/${project.slug}`,
    };

    const others = projectCases.filter((p) => p.slug !== project.slug).slice(0, 3);

    return (
        <div className="min-h-screen flex justify-center">
            <div
                className="w-full lg:w-1/2 border-x-0 lg:border-x pb-20 md:pb-0"
                style={{ borderColor: 'var(--border)' }}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
                />

                <Header />

                <main className="px-4 sm:px-6 py-10 sm:py-14">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm opacity-60 flex items-center gap-2" aria-label="Breadcrumb">
                        <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
                        <span>/</span>
                        <Link href="/projects" className="hover:opacity-70 transition-opacity">Projects</Link>
                        <span>/</span>
                        <span className="opacity-90">{project.title}</span>
                    </nav>

                    <h1 className="text-3xl sm:text-4xl font-medium mb-2 leading-tight">{project.title}</h1>
                    <p className="text-lg opacity-70 mb-8">{project.tagline}</p>

                    {/* Cover image */}
                    <div
                        className="relative w-full aspect-video rounded-xl overflow-hidden border mb-10"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <Image
                            src={project.image}
                            alt={`${project.title} — ${project.tagline}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* Overview */}
                    <section className="mb-10">
                        <h2 className="text-xl font-medium mb-4">Overview</h2>
                        <div className="space-y-4 text-sm sm:text-base opacity-80 leading-relaxed">
                            {project.overview.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section className="mb-10">
                        <h2 className="text-xl font-medium mb-4">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1.5 text-sm border rounded-md"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Highlights */}
                    <section className="mb-10">
                        <h2 className="text-xl font-medium mb-4">Highlights</h2>
                        <ul className="space-y-2 text-sm sm:text-base opacity-80">
                            {project.highlights.map((h, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-teal-500 text-xs mt-1.5 flex-shrink-0">✦</span>
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Links */}
                    <section className="mb-12 flex flex-wrap gap-3">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                            >
                                Live Demo <ArrowUpRight className="w-4 h-4" />
                            </a>
                        )}
                        {project.videoUrl && (
                            <a
                                href={project.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full border hover:opacity-70 transition-opacity"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <Play className="w-4 h-4" /> Watch Video
                            </a>
                        )}
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full border hover:opacity-70 transition-opacity"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <Github className="w-4 h-4" />
                            {project.githubBackend ? 'Frontend Source' : 'Source Code'}
                        </a>
                        {project.githubBackend && (
                            <a
                                href={project.githubBackend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full border hover:opacity-70 transition-opacity"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <Github className="w-4 h-4" /> Backend Source
                            </a>
                        )}
                        {project.npmCommand && (
                            <span
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full border font-[family-name:var(--font-geist-mono)]"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <Terminal className="w-4 h-4 opacity-50" /> {project.npmCommand}
                            </span>
                        )}
                    </section>

                    {/* More case studies — internal linking */}
                    <section className="border-t pt-8" style={{ borderColor: 'var(--border)' }}>
                        <h2 className="text-xl font-medium mb-4">More Case Studies</h2>
                        <div className="space-y-3">
                            {others.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/projects/${p.slug}`}
                                    className="block group"
                                >
                                    <span className="text-sm font-medium group-hover:text-teal-500 transition-colors">
                                        {p.title}
                                    </span>
                                    <span className="text-sm opacity-60"> — {p.tagline}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100 transition-opacity"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Full project catalog
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
