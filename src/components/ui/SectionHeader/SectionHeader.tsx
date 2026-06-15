import { type ReactNode } from 'react';
import { AnimatedSection } from '../AnimatedSection/AnimatedSection';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  id: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ id, title, subtitle, className }: SectionHeaderProps) {
  return (
    <AnimatedSection className={`${styles.header}${className ? ` ${className}` : ''}`}>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </AnimatedSection>
  );
}
