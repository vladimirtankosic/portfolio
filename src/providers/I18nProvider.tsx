'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import en from '../../messages/en.json';
import sr from '../../messages/sr.json';

export type Locale = 'en' | 'sr';

type Messages = typeof en;

const translations: Record<Locale, Messages> = { en, sr };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  messages: en,
});

function getNestedValue(obj: unknown, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    if (Array.isArray(current)) {
      const idx = parseInt(part, 10);
      if (isNaN(idx)) return undefined;
      current = current[idx];
    } else if (typeof current === 'object') {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null;
    if (stored === 'en' || stored === 'sr') {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string, vars?: Record<string, string | number>): string => {
    const value = getNestedValue(translations[locale], key);
    if (typeof value !== 'string') return key;
    if (!vars) return value;
    return Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, String(v)), value);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, messages: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
