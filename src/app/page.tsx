import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/sections/Hero/Hero';
import { About } from '@/components/sections/About/About';
import { Skills } from '@/components/sections/Skills/Skills';
import { Experience } from '@/components/sections/Experience/Experience';
import { Projects } from '@/components/sections/Projects/Projects';
import { TechnicalHighlights } from '@/components/sections/TechnicalHighlights/TechnicalHighlights';
import { Contact } from '@/components/sections/Contact/Contact';
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { StickyActions } from '@/components/ui/StickyActions/StickyActions';
import { projects as projectsData } from '@/data/projects';
import { getProjectImageMap } from '@/lib/getProjectImages';
import type { Project } from '@/types';

export default function Home() {
  const imageMap = getProjectImageMap();
  const projects: Project[] = projectsData.map((p) => ({
    ...p,
    thumbnail: imageMap[p.id]?.thumbnail,
    screenshots: imageMap[p.id]?.screenshots ?? [],
  }));

  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects projects={projects} />
        <TechnicalHighlights />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <StickyActions />
    </>
  );
}
