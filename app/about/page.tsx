import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const siteUrl = 'https://www.satpal.cloud';

export const metadata: Metadata = {
    title: 'About Satpalsinh Rana — Software Engineer',
    description:
        'About Satpalsinh Rana, a Software Engineer from Ahmedabad, India building real-time systems and cross-platform desktop apps with Angular, React, Node.js and Electron.js.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'About Satpalsinh Rana — Software Engineer',
        description:
            'Software Engineer from Ahmedabad building real-time systems and desktop applications with Angular, React, Node.js and Electron.js.',
        url: '/about',
    },
};

const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
        '@type': 'Person',
        name: 'Satpalsinh Rana',
        url: siteUrl,
        jobTitle: 'Software Engineer',
        worksFor: { '@type': 'Organization', name: 'Asite Solutions Pvt. Ltd.' },
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Government Engineering College, Modasa',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ahmedabad',
            addressRegion: 'Gujarat',
            addressCountry: 'IN',
        },
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex justify-center">
            <div
                className="w-full lg:w-1/2 border-x-0 lg:border-x pb-20 md:pb-0"
                style={{ borderColor: 'var(--border)' }}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
                />

                <Header />

                <main className="px-4 sm:px-6 py-10 sm:py-14">
                    <h1 className="text-3xl sm:text-4xl font-medium mb-6 leading-tight">
                        About Satpalsinh Rana
                    </h1>

                    <div className="space-y-5 text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl">
                        <p>
                            I&apos;m <strong>Satpalsinh Rana</strong>, a Software Engineer based in
                            Ahmedabad, Gujarat, India. I build real-time systems, web applications,
                            and cross-platform desktop software — the kind of products where
                            performance, responsiveness and clean architecture actually matter.
                        </p>
                        <p>
                            Since June 2023 I&apos;ve been a Software Engineer at{' '}
                            <strong>Asite Solutions</strong>, where I develop and maintain a
                            cross-platform desktop application built with Electron.js and Angular,
                            handling secure file operations and cloud synchronization. I work
                            heavily with RxJS for reactive state, led an upgrade from Angular 12 to
                            Angular 17+, and have built Node.js native C++ addons for
                            performance-critical modules.
                        </p>
                        <p>
                            Outside of work I ship side projects to explore ideas end to end — from{' '}
                            <Link href="/projects/lively" className="text-teal-500 hover:opacity-70 transition-opacity">
                                Kafka-based real-time location tracking
                            </Link>
                            {' '}and{' '}
                            <Link href="/projects/emitly" className="text-teal-500 hover:opacity-70 transition-opacity">
                                low-latency WebSocket messaging
                            </Link>
                            , to an{' '}
                            <Link href="/projects/aura-auth" className="text-teal-500 hover:opacity-70 transition-opacity">
                                OIDC-compliant Single Sign-On server
                            </Link>
                            {' '}and an{' '}
                            <Link href="/projects/tss" className="text-teal-500 hover:opacity-70 transition-opacity">
                                open-source CSS framework published on npm
                            </Link>
                            . I also write about JavaScript internals and system design on{' '}
                            <a href="https://blogs.satpal.cloud" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:opacity-70 transition-opacity">
                                my blog
                            </a>
                            .
                        </p>
                        <p>
                            I hold a B.E. in Information Technology from Government Engineering
                            College, Modasa (2019–2023), graduating with a CPI of 8.78. I care about
                            clean code, thoughtful UX, and solving real problems with the right tool
                            for the job.
                        </p>
                        <p>
                            I&apos;m open to collaboration and new projects. The best ways to reach
                            me are through the{' '}
                            <Link href="/#contact" className="text-teal-500 hover:opacity-70 transition-opacity">
                                contact section
                            </Link>
                            , or on{' '}
                            <a href="https://www.linkedin.com/in/satpalsinhrana/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:opacity-70 transition-opacity">
                                LinkedIn
                            </a>
                            {' '}and{' '}
                            <a href="https://github.com/Satpal777" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:opacity-70 transition-opacity">
                                GitHub
                            </a>
                            .
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm rounded-full border hover:opacity-70 transition-opacity"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            View projects
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm rounded-full border hover:opacity-70 transition-opacity"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            Back to home
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
