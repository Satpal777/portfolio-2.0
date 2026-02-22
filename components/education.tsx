import { GraduationCap, Award } from 'lucide-react';

export function Education() {
    return (
        <section className="px-4 sm:px-6 py-12 sm:py-16 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-medium mb-8">Education</h2>
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <GraduationCap className="w-5 h-5 mt-1 opacity-70" />
                    <div className="flex-1">
                        <h3 className="text-lg font-medium mb-1">B.E. in Information Technology</h3>
                        <p className="text-sm opacity-70 mb-2">Government Engineering College, Modasa</p>
                        <p className="text-sm opacity-50">2019 – 2023</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm pl-9">
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 opacity-50" />
                        <span className="opacity-70">CPI: <span className="font-medium">8.78</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 opacity-50" />
                        <span className="opacity-70">CGPA: <span className="font-medium">8.66</span></span>
                    </div>
                </div>
            </div>
        </section>
    );
}
