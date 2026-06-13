'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { Project } from '@/types';
import styles from './ProjectModal.module.scss';

const subscribe = () => () => {};

interface ProjectModalProps {
  project: Project | null;
  initialSlide?: number;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

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

export function ProjectModal({ project, initialSlide = 0, onClose }: ProjectModalProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  // Reset slide when a different project opens
  useEffect(() => {
    setActiveIndex(initialSlide);
  }, [project?.id, initialSlide]);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  useEffect(() => {
    if (!project || !modalRef.current) return;
    const modal = modalRef.current;
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const getFocusable = () => Array.from(modal.querySelectorAll<HTMLElement>(focusableSelectors));

    closeButtonRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = getFocusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    const suppressEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') e.stopImmediatePropagation();
    };

    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', suppressEsc, true);
    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', suppressEsc, true);
    };
  }, [project]);

  if (!mounted) return null;

  const screenshots = project?.screenshots ?? (project?.image ? [project.image] : []);
  const hasMultiple = screenshots.length > 1;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-modal="true"
          role="dialog"
          aria-label={`${project.title} screenshots`}
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button in dedicated header — never overlaps image */}
            <div className={styles.modalHeader}>
              <button
                ref={closeButtonRef}
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close gallery"
              >
                <CloseIcon />
              </button>
            </div>

            <div className={styles.swiperWrapper}>
              {screenshots.length > 0 ? (
                <Swiper
                  modules={[Keyboard, Mousewheel, A11y]}
                  keyboard={{ enabled: true }}
                  mousewheel={{ enabled: true, forceToAxis: true, releaseOnEdges: true }}
                  grabCursor
                  spaceBetween={0}
                  slidesPerView={1}
                  initialSlide={initialSlide}
                  loop={hasMultiple}
                  a11y={{ enabled: true }}
                  onSwiper={setSwiperInstance}
                  onSlideChange={(s) => setActiveIndex(s.realIndex)}
                  className={styles.swiper}
                >
                  {screenshots.map((src, i) => (
                    <SwiperSlide key={i}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          fill
                          className={styles.image}
                          sizes="(max-width: 480px) 100vw, 440px"
                          priority={i === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className={styles.imagePlaceholder}>
                  <MonitorIcon />
                  <span>{project.title}</span>
                </div>
              )}
            </div>

            {/* Pagination dots below image — always in document flow, never overlaps */}
            {hasMultiple && (
              <div className={styles.paginationDots} role="tablist" aria-label="Screenshots">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`${styles.paginationDot}${i === activeIndex ? ` ${styles.paginationDotActive}` : ''}`}
                    onClick={() => swiperInstance?.slideToLoop(i)}
                  />
                ))}
              </div>
            )}

            {project.liveUrl && (
              <div className={styles.modalFooter}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLiveLink}
                  aria-label={`Visit live site for ${project.title}`}
                >
                  <ExternalLinkIcon />
                  <span>Visit Live Site</span>
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
