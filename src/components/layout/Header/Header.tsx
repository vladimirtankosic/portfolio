'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useI18n } from '@/providers/I18nProvider';
import styles from './Header.module.scss';

const navLinkDefs = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contact', labelKey: 'nav.contact' },
];

const DESKTOP_BREAKPOINT = 1024;

// ── Spring configs ───────────────────────────────────────────────────────────
const SPRING_TAP = { type: 'spring' as const, stiffness: 580, damping: 28 };
const SPRING_HOVER = { type: 'spring' as const, stiffness: 360, damping: 24 };

// ── Mobile menu — panel + item variants ──────────────────────────────────────
// Panel scales from top-right (hamburger button origin)
const panelVariants = {
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 440, damping: 32 },
  },
  closed: {
    opacity: 0,
    scale: 0.88,
    y: -8,
    transition: { duration: 0.16, ease: [0.36, 0, 0.66, 0] as const },
  },
};

const panelChildrenVariants = {
  open: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
  closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 as const } },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 26 },
  },
  closed: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.08, ease: 'easeIn' as const },
  },
};

export function Header() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const visibleRef = useRef(new Set<string>());
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const sectionIds = navLinkDefs.map((l) => l.href.replace('#', ''));

  const pickActive = useCallback(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
    if (nearBottom) {
      setActiveSection(sectionIds[sectionIds.length - 1]);
      return;
    }
    for (const id of sectionIds) {
      if (visibleRef.current.has(id)) {
        setActiveSection(id);
        return;
      }
    }
  }, [sectionIds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleRef.current.add(entry.target.id);
          else visibleRef.current.delete(entry.target.id);
        });
        pickActive();
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds, pickActive]);

  useEffect(() => {
    const onScroll = () => pickActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pickActive]);

  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile, mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile menu on outside tap
  useEffect(() => {
    if (!mobileOpen) return;
    const dismiss = (e: PointerEvent) => {
      const t = e.target as Node;
      const inHeader = headerRef.current?.contains(t) ?? false;
      const inMenu = menuRef.current?.contains(t) ?? false;
      if (!inHeader && !inMenu) setMobileOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10,
      );
      const top = el.getBoundingClientRect().top + window.scrollY - (headerHeight || 80);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ─── Header ─── */}
      <motion.header
        ref={headerRef}
        className={styles.header}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.inner}>
          {/* Logo pill */}
          <motion.div
            whileHover={{ y: -2, transition: SPRING_HOVER }}
            whileTap={{ scale: 0.96, y: 0, transition: SPRING_TAP }}
            style={{ display: 'flex' }}
          >
            <Link href="/" className={styles.logo} aria-label="Vladimir Tankosic — Home">
              VT<span>.</span>
            </Link>
          </motion.div>

          {/* Desktop center nav — floating control group */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navLinkDefs.map((link) => {
              const id = link.href.replace('#', '');
              return (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
                  aria-current={activeSection === id ? 'true' : undefined}
                  whileHover={{ y: -1, transition: SPRING_HOVER }}
                  whileTap={{ scale: 0.96, y: 0, transition: SPRING_TAP }}
                >
                  {t(link.labelKey)}
                </motion.button>
              );
            })}
          </nav>

          {/* Right floating controls */}
          <div className={styles.right}>
            {/* Language switcher wrapped for spring animation */}
            <motion.div
              whileHover={{ y: -2, transition: SPRING_HOVER }}
              whileTap={{ scale: 0.96, y: 0, transition: SPRING_TAP }}
              style={{ display: 'flex' }}
            >
              <LanguageSwitcher />
            </motion.div>

            {/* Theme toggle wrapped for spring animation */}
            <motion.div
              whileHover={{ y: -2, transition: SPRING_HOVER }}
              whileTap={{ scale: 0.96, y: 0, transition: SPRING_TAP }}
              style={{ display: 'flex' }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Mobile hamburger */}
            {isMobile && (
              <motion.button
                className={`${styles.mobileMenuBtn}${mobileOpen ? ` ${styles.mobileMenuBtnOpen}` : ''}`}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                whileTap={{ scale: 0.92, transition: SPRING_TAP }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.svg
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* ─── Floating mobile nav panel ─── */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.nav
            ref={menuRef}
            id="mobile-nav"
            className={styles.mobileMenu}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ transformOrigin: 'top right' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <motion.div
              className={styles.mobileMenuItems}
              variants={panelChildrenVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinkDefs.map((link) => {
                const id = link.href.replace('#', '');
                return (
                  <motion.button
                    key={link.href}
                    variants={itemVariants}
                    onClick={() => handleNavClick(link.href)}
                    className={`${styles.mobileNavItem} ${activeSection === id ? styles.mobileNavActive : ''}`}
                    aria-current={activeSection === id ? 'true' : undefined}
                    whileHover={{ x: -2, transition: SPRING_HOVER }}
                    whileTap={{ scale: 0.97, x: 0, transition: SPRING_TAP }}
                  >
                    {t(link.labelKey)}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
