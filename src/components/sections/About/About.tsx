'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import { LuCode, LuZap, LuAtom, LuUser, LuDatabase, LuLayers } from 'react-icons/lu';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
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

// Index-keyed icons — order matches lang.about.interests array
const INTEREST_ICONS = [
  LuCode, // Frontend Architecture
  LuZap, // Performance Optimization
  LuAtom, // React Ecosystem
  LuUser, // User Experience
  LuDatabase, // Scalable Systems
  LuLayers, // Design Systems
] as const;

export function About() {
  const years = getYearsOfExperience();
  const { t, lang } = useI18n();

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <SectionHeader
          id="about-title"
          title={<>{t('about.titleLine1')}</>}
          className={styles.header}
        />

        <div className={styles.grid}>
          <AnimatedSection delay={0.1} direction="right">
            <div className={styles.left}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/vt.jpg"
                  alt="Vladimir Tankosic – Frontend Developer"
                  fill
                  className={styles.image}
                  sizes="(max-width: 1024px) 280px, 360px"
                  priority
                />
                <div className={styles.imageOverlay} aria-hidden="true" />
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
                {lang.about.interests.map((interest, index) => {
                  const Icon = INTEREST_ICONS[index];
                  return (
                    <span key={interest} className={styles.interestTag}>
                      <span className={styles.interestIcon} aria-hidden="true">
                        {Icon && <Icon />}
                      </span>
                      {interest}
                    </span>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
