'use client';

import { useI18n } from '@/providers/I18nProvider';
import type { Locale } from '@/types';
import styles from './LanguageSwitcher.module.scss';

const locales: Locale[] = ['en', 'sr'];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className={styles.switcher} role="group" aria-label="Language switcher">
      {locales.map((loc, i) => (
        <span key={loc} className={styles.item}>
          {i > 0 && <span className={styles.divider} aria-hidden="true" />}
          <button
            className={`${styles.btn} ${locale === loc ? styles.active : ''}`}
            onClick={() => setLocale(loc)}
            aria-pressed={locale === loc}
            lang={loc}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
