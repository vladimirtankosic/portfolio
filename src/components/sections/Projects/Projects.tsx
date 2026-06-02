'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { projects } from '@/data/projects';
import { useI18n } from '@/providers/I18nProvider';
import styles from './Projects.module.scss';

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
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

const TEST_REPEAT = 8;

export function Projects() {
  const { t, messages } = useI18n();

  // Duplicate the existing project data to test Swiper layout and responsiveness.
  // Replace with real projects when ready.
  const displayProjects = Array.from({ length: TEST_REPEAT }, (_, i) => ({
    ...projects[0],
    id: `${projects[0].id}-${i}`,
  }));

  return (
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
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              a11y={{ enabled: true }}
              grabCursor
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className={styles.swiper}
            >
              {displayProjects.map((project) => {
                const translated = messages.projects.items[0];
                const title = translated?.title ?? project.title;
                const description = translated?.description ?? project.description;

                return (
                  <SwiperSlide key={project.id} className={styles.slide}>
                    <article className={styles.card}>
                      <div className={styles.imageWrapper}>
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={title}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <MonitorIcon />
                            <span>{title}</span>
                          </div>
                        )}
                        <div className={styles.imageOverlay} aria-hidden="true" />
                      </div>

                      <div className={styles.content}>
                        <div className={styles.titleRow}>
                          <h3 className={styles.title}>{title}</h3>
                          <div className={styles.links}>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                                aria-label={t('projects.githubAriaLabel', { title })}
                              >
                                <GitHubIcon />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                                aria-label={t('projects.liveAriaLabel', { title })}
                              >
                                <ExternalIcon />
                              </a>
                            )}
                          </div>
                        </div>

                        <p className={styles.description}>{description}</p>

                        <div className={styles.tech} aria-label="Technologies used">
                          {project.technologies.map((tech) => (
                            <span key={tech} className={styles.techTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>{' '}
          </div>{' '}
        </AnimatedSection>
      </div>
    </section>
  );
}
