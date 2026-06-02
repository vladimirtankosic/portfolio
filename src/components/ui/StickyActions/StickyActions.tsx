'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/providers/I18nProvider';
import styles from './StickyActions.module.scss';

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
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
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function StickyActions() {
  const { t } = useI18n();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (!el) return;
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      10,
    );
    const top = el.getBoundingClientRect().top + window.scrollY - (headerHeight || 68);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    // Wrapper: handles fixed positioning only — never animated so CSS transform is stable
    <div className={styles.wrapper} aria-label="Quick actions">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="/cv/VladimirTankosic-CV.pdf"
          download
          className={styles.btn}
          aria-label={t('stickyActions.downloadCv')}
          whileTap={{ scale: 0.94 }}
        >
          <DownloadIcon />
          <span className={styles.label}>{t('stickyActions.downloadCv')}</span>
        </motion.a>

        <span className={styles.divider} aria-hidden="true" />

        <motion.button
          onClick={scrollToContact}
          className={`${styles.btn} ${styles.btnContact}`}
          aria-label={t('stickyActions.contactMe')}
          whileTap={{ scale: 0.94 }}
        >
          <MailIcon />
          <span className={styles.label}>{t('stickyActions.contactMe')}</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
