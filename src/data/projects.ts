import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'sentzuu-portfolio',
    title: 'Sentzuu — Personal Portfolio Website',
    liveUrl: 'https://sentzuu.com/',
    description:
      'Cinematic portfolio website with smooth transitions, video covers, parallax effects, overlay menu, and structured case studies.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'jQuery', 'Isotope', 'PHP'],
  },
  {
    id: 'my-account',
    title: 'My Account',
    description:
      'Player account dashboard with profile editing, balance tracking, transaction history, avatar system, and identity protection features.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API'],
  },
  {
    id: 'onboarding-missions',
    title: 'Onboarding Missions',
    description:
      'Guided onboarding flow that leads new players through key actions with progress tracking, rewards, and analytics integration.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Google Tag Manager', 'Customer.io'],
  },
  {
    id: 'navigation-profile-picture',
    title: 'Navigation & Profile Picture System',
    description:
      'Responsive navigation system with desktop sidebar, mobile menu, animated interactions, and centralized profile avatar management.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'GSAP'],
  },
  {
    id: 'casino-banking',
    title: 'Banking',
    description:
      'Casino banking system supporting multiple deposit methods, withdrawals, crypto payments, bonuses, and transaction workflows.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'RTG API'],
  },
  {
    id: 'vip-program',
    title: 'VIP Program',
    description:
      'Loyalty system with tier progression, cashback rewards, exclusive benefits, and personalized VIP user experience.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API', 'Smartico'],
  },
  {
    id: 'games-page',
    title: 'Games Page',
    description:
      'Game lobby with 500+ titles, search, filtering, favorites, recently played games, and lazy loading performance optimization.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API'],
  },
  {
    id: 'refer-a-friend',
    title: 'Refer a Friend Program',
    description:
      'Referral system with shareable codes, social sharing, reward tracking, and cashback incentives for invited users.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'RTG API'],
  },
  {
    id: 'tournament-pages',
    title: 'Tournament Pages',
    description:
      'Tournament platform with leaderboards, competitions, prize systems, and configurable participation rules.',
    technologies: ['PHP', 'JavaScript', 'SCSS'],
  },
  {
    id: 'promotions-bonus-system',
    title: 'Promotions & Bonus System',
    description:
      'Centralized bonus system for managing promotions, coupons, rewards, and targeted marketing campaigns.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'RTG API'],
  },
  {
    id: 'admin-cms',
    title: 'Admin CMS',
    description:
      'Internal CMS for managing games, banners, promotions, media assets, users, and administrative operations.',
    technologies: ['PHP', 'JavaScript', 'CKEditor'],
  },
  {
    id: 'crypto-casino',
    title: 'Crypto Casino',
    description:
      'Full casino platform with crypto support, wallet integration, KYC flow, bonuses, and complete player journey.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API'],
  },
];
