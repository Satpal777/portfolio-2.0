import { Heart } from 'lucide-react';

const phrases = ["LET'S BUILD SOMETHING COOL", 'OPEN TO WORK', 'ŘSS'];

export function Footer() {
    return (
        <footer>
            {/* Giant scrolling marquee */}
            <div
                className="marquee overflow-hidden border-b py-8 select-none"
                style={{ borderColor: 'var(--border)', '--marquee-duration': '40s' } as React.CSSProperties}
            >
                <div className="marquee-track flex w-max whitespace-nowrap">
                    {[0, 1].map((copy) => (
                        <div
                            key={copy}
                            className="flex items-center gap-10 pr-10"
                            aria-hidden={copy === 1}
                        >
                            {phrases.map((phrase) => (
                                <span
                                    key={`${copy}-${phrase}`}
                                    className="flex items-center gap-10 text-5xl md:text-7xl font-bold tracking-tighter opacity-[0.08] font-[family-name:var(--font-geist-pixel-square)]"
                                >
                                    {phrase}
                                    <span className="text-teal-500 opacity-60">✦</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50">
                    <p>
                        © {new Date().getFullYear()} Satpalsinh Rana. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-teal-500 fill-teal-500" /> using Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
