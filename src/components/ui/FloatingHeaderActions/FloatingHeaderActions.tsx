'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingHeaderActions.module.scss';

const SHOW_THRESHOLD = 240;

const SPRING_TAP = { type: 'spring' as const, stiffness: 620, damping: 30 };
const SPRING_LEFT = { type: 'spring' as const, stiffness: 380, damping: 30 };
const SPRING_RIGHT = { type: 'spring' as const, stiffness: 380, damping: 30, delay: 0.05 };

// ── Icons ───────────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function DotsHorizontalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export function FloatingHeaderActions() {
  const [visible, setVisible] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // iOS-style back: use history if available, else scroll to top
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  return (
    <>
      {/* ─── Left: back / scroll-to-top ─── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={styles.floatLeft}
            initial={{ opacity: 0, scale: 0.72, x: -14 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.72, x: -14 }}
            transition={SPRING_LEFT}
          >
            <motion.button
              className={styles.floatBtn}
              onClick={handleBack}
              aria-label="Back"
              whileTap={{ scale: 0.86, transition: SPRING_TAP }}
            >
              <ChevronLeftIcon />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Right: share + more ─── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={styles.floatRight}
            initial={{ opacity: 0, scale: 0.72, x: 14 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.72, x: 14 }}
            transition={SPRING_RIGHT}
          >
            <motion.button
              className={styles.floatBtn}
              onClick={handleShare}
              aria-label="Share portfolio"
              whileTap={{ scale: 0.86, transition: SPRING_TAP }}
            >
              <ShareIcon />
            </motion.button>

            <motion.button
              className={styles.floatBtn}
              onClick={scrollToContact}
              aria-label="Jump to contact"
              whileTap={{ scale: 0.86, transition: SPRING_TAP }}
            >
              <DotsHorizontalIcon />
            </motion.button>

            <AnimatePresence>
              {shareToast && (
                <motion.span
                  className={styles.toast}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 7, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 7, scale: 0.88 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
