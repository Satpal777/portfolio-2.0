import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Articles } from '@/components/articles';
import { Education } from '@/components/education';
import { Certifications } from '@/components/certifications';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Stats } from '@/components/stats';

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center">
      <div
        className="w-full lg:w-1/2 border-x-0 lg:border-x pb-20 md:pb-0"
        style={{ borderColor: 'var(--border)' }}
      >
        <Header />
        <Hero />
        <Stats />
        <Experience />
        <Skills />
        <Projects />
        <Articles />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
