'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { skillCategories } from '@/data/skills';
import { getTechnologyIcon } from '@/data/iconMap';
import { useI18n } from '@/providers/I18nProvider';
import styles from './Skills.module.scss';

const categoryKeyMap: Record<string, string> = {
  Frontend: 'skills.categoryFrontend',
  'State Management': 'skills.categoryState',
  Backend: 'skills.categoryBackend',
  Tools: 'skills.categoryTools',
};

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className={styles.inner}>
        <SectionHeader
          id="skills-title"
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
          className={styles.header}
        />

        <div className={styles.grid}>
          {skillCategories.map((category, i) => (
            <AnimatedSection key={category.title} delay={i * 0.08}>
              <div className={styles.category}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon} aria-hidden="true">
                    {category.icon}
                  </div>
                  <h3 className={styles.categoryTitle}>
                    {t(categoryKeyMap[category.title] ?? category.title)}
                  </h3>
                </div>

                <div className={styles.skills}>
                  {category.skills.map((skill, j) => {
                    const IconComponent = getTechnologyIcon(skill);
                    const hasIcon = IconComponent !== React.Fragment;
                    return (
                      <motion.span
                        key={skill}
                        className={styles.skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + j * 0.04, duration: 0.3 }}
                        whileHover={{ y: -2 }}
                      >
                        {hasIcon && <IconComponent size={16} className={styles.skillIcon} />}
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
