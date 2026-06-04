'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { technicalHighlights } from '@/data/highlights';
import { useI18n } from '@/providers/I18nProvider';
import styles from './TechnicalHighlights.module.scss';

export function TechnicalHighlights() {
  const { t, lang } = useI18n();

  return (
    <section id="highlights" className={styles.section} aria-labelledby="highlights-title">
      <div className={styles.inner}>
        <AnimatedSection className={styles.header}>
          <p className="section-tag">{t('highlights.tag')}</p>
          <h2 className="section-title" id="highlights-title">
            {t('highlights.title')}
          </h2>
          <p className="section-subtitle">{t('highlights.subtitle')}</p>
        </AnimatedSection>

        <div className={styles.grid}>
          {technicalHighlights.map((highlight, i) => {
            const translated = lang.highlights.items[i];
            return (
              <AnimatedSection key={highlight.title} delay={i * 0.07}>
                <div className={styles.card}>
                  <div className={styles.icon} aria-hidden="true">
                    {highlight.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{translated?.title ?? highlight.title}</h3>
                  <p className={styles.cardDescription}>
                    {translated?.description ?? highlight.description}
                  </p>
                  <div className={styles.tags} aria-label={`${highlight.title} technologies`}>
                    {highlight.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
