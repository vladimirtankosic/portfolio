'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useVelocity,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useI18n } from '@/providers/I18nProvider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './StickyActions.module.scss';

// ── Spring configs ──────────────────────────────────────────────────────────
const SPRING_TAP = { type: 'spring' as const, stiffness: 580, damping: 28 };
const SPRING_HOVER = { type: 'spring' as const, stiffness: 360, damping: 24 };
const SPRING_ENTER = { type: 'spring' as const, stiffness: 340, damping: 28 };

// ── Icons ───────────────────────────────────────────────────────────────────

function ShareIcon() {
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function DownloadIcon() {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="m9 15 3 3 3-3" />
    </svg>
  );
}

function MailIcon() {
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export function StickyActions() {
  const { t } = useI18n();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [shareToast, setShareToast] = useState(false);

  // Subtle scroll-velocity float — mobile only
  const scrollY = useMotionValue(0);
  const velocity = useVelocity(scrollY);
  const rawFloat = useTransform(velocity, [-900, 0, 900], [4, 0, -4]);
  const floatY = useSpring(rawFloat, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile, scrollY]);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact');
    if (!el) return;
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      10,
    );
    const top = el.getBoundingClientRect().top + window.scrollY - (headerHeight || 68);
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const handleShare = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Vladimir Tankosic — Frontend Developer',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2200);
      }
    } catch {
      // User dismissed
    }
  }, []);

  return (
    <div className={styles.wrapper} aria-label="Quick actions">
      <motion.div
        className={styles.container}
        style={isMobile ? { y: floatY } : undefined}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_ENTER, delay: 1.0 }}
      >
        {/* ─── Share ─── */}
        <motion.button
          className={styles.btn}
          onClick={handleShare}
          aria-label="Share portfolio"
          whileHover={!isMobile ? { y: -2, transition: SPRING_HOVER } : undefined}
          whileTap={{ scale: isMobile ? 0.88 : 0.96, y: 0, transition: SPRING_TAP }}
        >
          <span className={styles.iconWrap}>
            <ShareIcon />
          </span>
          {!isMobile && <span className={styles.label}>{t('stickyActions.share')}</span>}
        </motion.button>

        {/* ─── Divider: desktop only ─── */}
        {!isMobile && <span className={styles.divider} aria-hidden="true" />}

        {/* ─── Download CV ─── */}
        <motion.a
          href="/cv/VladimirTankosicCV.pdf"
          download
          className={styles.btn}
          aria-label={t('stickyActions.downloadCv')}
          whileHover={!isMobile ? { y: -2, transition: SPRING_HOVER } : undefined}
          whileTap={{ scale: isMobile ? 0.88 : 0.96, y: 0, transition: SPRING_TAP }}
        >
          <span className={styles.iconWrap}>
            <DownloadIcon />
          </span>
          {!isMobile && <span className={styles.label}>{t('stickyActions.downloadCv')}</span>}
        </motion.a>

        {/* ─── Divider: desktop only ─── */}
        {!isMobile && <span className={styles.divider} aria-hidden="true" />}

        {/* ─── Contact ─── */}
        <motion.button
          onClick={scrollToContact}
          className={`${styles.btn}${!isMobile ? ` ${styles.btnPrimary}` : ''}`}
          aria-label={t('stickyActions.contactMe')}
          whileHover={!isMobile ? { y: -2, transition: SPRING_HOVER } : undefined}
          whileTap={{ scale: isMobile ? 0.88 : 0.96, y: 0, transition: SPRING_TAP }}
        >
          <span className={styles.iconWrap}>
            <MailIcon />
          </span>
          {!isMobile && <span className={styles.label}>{t('stickyActions.contactMe')}</span>}
        </motion.button>
      </motion.div>

      {/* ─── Clipboard toast ─── */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            className={styles.toast}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
