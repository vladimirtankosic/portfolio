'use client';

import { type ReactNode } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { getYearsOfExperience } from '@/hooks/useYearsOfExperience';
import { useI18n } from '@/providers/I18nProvider';
import styles from './About.module.scss';

function parseHighlights(text: string, className: string): ReactNode[] {
  const parts = text.split(/\[\[|\]\]/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function About() {
  const years = getYearsOfExperience();
  const { t, messages } = useI18n();

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <AnimatedSection className={styles.header}>
          <p className="section-tag">{t('about.tag')}</p>
          <h2 className="section-title" id="about-title">
            {t('about.titleLine1')}
            <br />
            {t('about.titleLine2')}
          </h2>
        </AnimatedSection>

        <div className={styles.grid}>
          <AnimatedSection delay={0.1} direction="right">
            <div className={styles.left}>
              <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                  <div className={styles.avatarIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className={styles.imageName}>Vladimir Tankosic</span>
                  <span className={styles.imageRole}>Frontend Developer</span>
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{years}+</div>
                  <div className={styles.statLabel}>{t('about.statsYears')}</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>1</div>
                  <div className={styles.statLabel}>{t('about.statsCompany')}</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>10+</div>
                  <div className={styles.statLabel}>{t('about.statsTechnologies')}</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>∞</div>
                  <div className={styles.statLabel}>{t('about.statsBugs')}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className={styles.right}>
              <div className={styles.bio}>
                <p>{parseHighlights(t('about.bio1'), styles.highlight)}</p>
                <p>{parseHighlights(t('about.bio2'), styles.highlight)}</p>
                <p>{parseHighlights(t('about.bio3'), styles.highlight)}</p>
              </div>

              <p className={styles.interestsTitle}>{t('about.interestsTitle')}</p>
              <div className={styles.interests}>
                {messages.about.interests.map((interest) => (
                  <span key={interest} className={styles.interestTag}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
