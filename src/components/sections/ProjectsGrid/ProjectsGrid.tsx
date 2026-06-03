'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { ProjectModal } from '@/components/ui/ProjectModal/ProjectModal';
import { projects } from '@/data/projects';
import { useI18n } from '@/providers/I18nProvider';
import type { Project } from '@/types';
import styles from './ProjectsGrid.module.scss';

function MonitorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.placeholderIcon}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function ProjectsGrid() {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className={styles.section} aria-labelledby="projects-page-title">
        <div className={styles.inner}>
          {/* Hero */}
          <AnimatedSection className={styles.hero}>
            <h1 id="projects-page-title" className={styles.heroTitle}>
              {t('projectsPage.title')}
            </h1>
            <p className={styles.heroSubtitle}>{t('projectsPage.subtitle')}</p>
          </AnimatedSection>

          {/* Grid */}
          <div className={styles.grid}>
            {projects.map((project, i) => {
              const thumb = project.screenshots?.[0] ?? project.image;
              return (
                <AnimatedSection key={project.id} delay={i * 0.06}>
                  <button
                    className={styles.card}
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View ${project.title} details`}
                  >
                    <div className={styles.imageWrapper}>
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={project.title}
                          fill
                          className={styles.image}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <MonitorIcon />
                        </div>
                      )}
                      <div className={styles.imageOverlay} aria-hidden="true" />
                    </div>

                    <div className={styles.content}>
                      <h2 className={styles.title}>{project.title}</h2>
                      <div className={styles.tech} aria-label="Technologies used">
                        {project.technologies.map((tech) => (
                          <span key={tech} className={styles.techTag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
