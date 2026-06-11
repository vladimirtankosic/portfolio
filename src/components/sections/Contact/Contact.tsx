'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { useI18n } from '@/providers/I18nProvider';
import styles from './Contact.module.scss';

const schema = z.object({
  name: z.string().min(2, 'nameMin').max(80, 'nameMax'),
  email: z.string().email('emailInvalid'),
  message: z.string().min(10, 'messageMin').max(2000, 'messageMax'),
});

type FormData = z.infer<typeof schema>;
type Status = 'idle' | 'loading' | 'success' | 'error';

function CheckIcon() {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setServerMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus('success');
        setServerMessage(t('contact.successMessage'));
        reset();
      } else {
        setStatus('error');
        setServerMessage(json.message || t('contact.errorMessage'));
      }
    } catch {
      setStatus('error');
      setServerMessage(t('contact.networkError'));
    }
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <AnimatedSection className={styles.header}>
          <p className="section-tag">{t('contact.tag')}</p>
          <h2 className="section-title" id="contact-title">
            {t('contact.title')}
          </h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </AnimatedSection>

        <div className={styles.grid}>
          <AnimatedSection delay={0.1} direction="right">
            <div className={styles.info}>
              <p className={styles.infoText}>{t('contact.infoText')}</p>

              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
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
                  </div>
                  <div>
                    <p className={styles.contactLabel}>{t('contact.emailLabel')}</p>
                    <a href="mailto:vladimirtankosic.dev@gmail.com" className={styles.contactValue}>
                      vladimirtankosic.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
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
                  </div>
                  <div>
                    <p className={styles.contactLabel}>{t('contact.linkedinLabel')}</p>
                    <a
                      href="https://www.linkedin.com/in/vladimir-tankosic1993"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactValue}
                    >
                      linkedin.com/in/vladimir-tankosic1993
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
            >
              <h3 className={styles.formTitle}>{t('contact.formTitle')}</h3>

              <div className={styles.fields}>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t('contact.namePlaceholder')}
                      className={`${styles.input} ${errors.name ? styles.hasError : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name')}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.errorText} role="alert">
                        {t(`contact.validation.${errors.name.message}`)}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      {t('contact.emailInputLabel')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t('contact.emailPlaceholder')}
                      className={`${styles.input} ${errors.email ? styles.hasError : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.errorText} role="alert">
                        {t(`contact.validation.${errors.email.message}`)}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    placeholder={t('contact.messagePlaceholder')}
                    className={`${styles.textarea} ${errors.message ? styles.hasError : ''}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    {...register('message')}
                  />
                  {errors.message && (
                    <span id="message-error" className={styles.errorText} role="alert">
                      {t(`contact.validation.${errors.message.message}`)}
                    </span>
                  )}
                </div>

                <div className={styles.submitRow}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
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
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        {t('contact.sendButton')}
                      </>
                    )}
                  </button>
                </div>

                {(status === 'success' || status === 'error') && (
                  <div
                    className={`${styles.feedback} ${status === 'success' ? styles.success : styles.error}`}
                    role="status"
                    aria-live="polite"
                  >
                    {status === 'success' ? <CheckIcon /> : <AlertIcon />}
                    <span>{serverMessage}</span>
                  </div>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
