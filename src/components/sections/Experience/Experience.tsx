'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { experienceItems } from '@/data/experience';
import { useI18n } from '@/providers/I18nProvider';
import styles from './Experience.module.scss';

export function Experience() {
  const { t, lang } = useI18n();

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className={styles.inner}>
        <AnimatedSection className={styles.header}>
          <p className="section-tag">{t('experience.tag')}</p>
          <h2 className="section-title" id="experience-title">
            {t('experience.title')}
          </h2>
          <p className="section-subtitle">{t('experience.subtitle')}</p>
        </AnimatedSection>

        <div className={styles.timeline} role="list">
          {experienceItems.map((item, i) => {
            const translated = lang.experience.items[i];
            return (
              <AnimatedSection key={i} delay={0.1} className={styles.item} role="listitem">
                <div className={styles.dot} aria-hidden="true">
                  <div className={styles.dotInner} />
                </div>

                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.titleGroup}>
                      <h3 className={styles.jobTitle}>{item.title}</h3>
                      <span className={styles.company}>{item.company}</span>
                    </div>
                    <span className={styles.period}>
                      {item.current && (
                        <span className={styles.currentDot} aria-label="Current position" />
                      )}
                      {translated?.period ?? item.period}
                    </span>
                  </div>

                  <p className={styles.description}>
                    {translated?.description ?? item.description}
                  </p>

                  <p className={styles.responsibilitiesTitle}>
                    {t('experience.keyResponsibilities')}
                  </p>
                  <ul className={styles.responsibilities}>
                    {(translated?.responsibilities ?? item.responsibilities).map((r) => (
                      <li key={r} className={styles.responsibility}>
                        <span className={styles.bullet} aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
