'use client';

import { useI18n } from '@/providers/I18nProvider';
import styles from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>
            VT<span>.</span>
          </span>
          <span className={styles.copy}>
            © {year} Vladimir Tankosic. {t('footer.rights')}
          </span>
        </div>

        <a
          href="https://www.linkedin.com/in/vladimir-tankosic1993"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label={t('footer.linkedinAriaLabel')}
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
        </a>
      </div>
    </footer>
  );
}
