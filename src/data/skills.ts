import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: '⬡',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Sass', 'Bootstrap'],
  },
  {
    title: 'State Management',
    icon: '◈',
    skills: ['Context API', 'Redux', 'Zustand'],
  },
  {
    title: 'Backend',
    icon: '⬢',
    skills: ['PHP', 'MySQL', 'REST API'],
  },
  {
    title: 'Tools',
    icon: '◇',
    skills: ['Git', 'GitHub', 'GitLab', 'Swagger', 'Figma'],
  },
];
