'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { ProjectModal } from '@/components/ui/ProjectModal/ProjectModal';
import { projects } from '@/data/projects';
import { useI18n } from '@/providers/I18nProvider';
import type { Project } from '@/types';
import styles from './Projects.module.scss';

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

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

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const thumb = project.screenshots?.[0] ?? project.image;

  return (
    <article className={styles.card}>
      {/* Thumbnail — only this area triggers the modal */}
      <div
        className={styles.imageWrapper}
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(project);
          }
        }}
        aria-label={`Open ${project.title} gallery`}
      >
        {thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <MonitorIcon />
            <span>{project.title}</span>
          </div>
        )}
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tech} aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <div className={styles.cardActions}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveLink}
              aria-label={`Visit live site for ${project.title}`}
            >
              <ExternalLinkIcon />
              <span>See Project</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    if (selectedProject) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className={styles.section} aria-labelledby="projects-title">
        <div className={styles.inner}>
          <AnimatedSection className={styles.header}>
            <p className="section-tag">{t('projects.tag')}</p>
            <h2 className="section-title" id="projects-title">
              {t('projects.title')}
            </h2>
            <p className="section-subtitle">{t('projects.subtitle')}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className={styles.swiperWrapper}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                a11y={{ enabled: true }}
                grabCursor
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
                className={styles.swiper}
              >
                {projects.map((project) => (
                  <SwiperSlide key={project.id} className={styles.slide}>
                    <ProjectCard project={project} onOpen={setSelectedProject} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
