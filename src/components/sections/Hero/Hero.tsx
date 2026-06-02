'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button/Button';
import { getYearsOfExperience } from '@/hooks/useYearsOfExperience';
import { useI18n } from '@/providers/I18nProvider';
import styles from './Hero.module.scss';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const years = getYearsOfExperience();
  const { t } = useI18n();

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.gridLines} />
        <div className={styles.orbBlue} />
        <div className={styles.orbPurple} />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.div className={styles.badge} {...fadeUp(0.1)}>
            {t('hero.badge')}
          </motion.div>

          <motion.h1 className={styles.headline} {...fadeUp(0.2)}>
            {t('hero.greeting')} <span className={styles.accent}>{t('hero.name')}</span>
          </motion.h1>

          <motion.p className={styles.subheadline} {...fadeUp(0.3)}>
            {t('hero.subheadline', { years })}
          </motion.p>

          <motion.p className={styles.description} {...fadeUp(0.4)}>
            {t('hero.description')}
          </motion.p>

          <motion.div className={styles.ctas} {...fadeUp(0.5)}>
            <Button as="a" href="/cv/VladimirTankosic-CV.pdf" variant="primary" size="lg" download>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('hero.downloadCv')}
            </Button>

            <Button as="a" href="#contact" variant="secondary" size="lg">
              {t('hero.contactMe')}
            </Button>
          </motion.div>

          <motion.div className={styles.social} {...fadeUp(0.6)}>
            <span className={styles.socialLabel}>{t('hero.connect')}</span>
            <a
              href="https://www.linkedin.com/in/vladimir-tankosic1993"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={t('hero.linkedinAriaLabel')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
