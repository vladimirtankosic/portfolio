export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  description: string;
  responsibilities: string[];
}

export interface TechnicalHighlight {
  title: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type Locale = 'en' | 'sr';
