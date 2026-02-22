import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50">
                <p>
                    © {new Date().getFullYear()} Satpalsinh Rana. All rights reserved.
                </p>
                <p className="flex items-center gap-1">
                    Built with <Heart className="w-3 h-3 text-teal-500 fill-teal-500" /> using Next.js
                </p>
            </div>
        </footer>
    );
}
