import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid/ProjectsGrid';
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';

export const metadata: Metadata = {
  title: 'Projects — Vladimir Tankosic',
  description:
    'Collection of selected work and case studies by Vladimir Tankosic, Frontend Developer.',
};

export default function ProjectsPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <ProjectsGrid />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
