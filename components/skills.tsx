export function Skills() {
    const skills = {
        'Programming Languages': ['JavaScript', 'TypeScript', 'Python'],
        'Frontend': ['Angular', 'React.js', 'Next.js', 'RxJS', 'NgRx', 'HTML5', 'CSS3', 'Tailwind CSS'],
        'Backend & Databases': ['Node.js', 'Express.js', 'SQLite', 'MongoDB'],
        'Desktop Development': ['Electron.js'],
    };

    return (
        <section className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-medium mb-8">Technical Skills</h2>
            <div className="space-y-6">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-sm font-medium mb-3 opacity-70">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 text-sm border rounded-md"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
