const faqs = [
    {
        q: 'Who is Satpalsinh Rana?',
        a: 'Satpalsinh Rana is a Software Engineer based in Ahmedabad, Gujarat, India. He builds real-time systems, web applications and cross-platform desktop applications, and has worked at Asite Solutions since June 2023.',
    },
    {
        q: 'What technologies does Satpalsinh Rana work with?',
        a: 'He works primarily with JavaScript and TypeScript across Angular, React.js and Next.js on the frontend, Node.js and Express.js on the backend, and Electron.js for desktop applications. He also uses RxJS, NgRx, MongoDB and SQLite.',
    },
    {
        q: 'What kind of projects has he built?',
        a: 'His projects include real-time systems such as Lively (Kafka-based location tracking) and Emitly (WebSocket messaging), an OIDC Single Sign-On server called Aura Auth, an AI-powered news aggregator called NextNews, and an open-source CSS framework published on npm. See the full catalog at satpal.cloud/projects.',
    },
    {
        q: 'Is Satpalsinh Rana available for work?',
        a: 'Yes. He is open to collaboration and new projects. The fastest way to reach him is through the contact section of his portfolio at satpal.cloud, or via LinkedIn and GitHub.',
    },
    {
        q: 'Where is Satpalsinh Rana based?',
        a: 'He is based in Ahmedabad, Gujarat, India, and works with teams and clients remotely.',
    },
];

export const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

export function FAQ() {
    return (
        <section id="faq" className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <h2 className="text-2xl font-medium mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqs.map((f) => (
                    <div key={f.q}>
                        <h3 className="text-base font-medium mb-2">{f.q}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">{f.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
