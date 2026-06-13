import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'sentzuu-portfolio',
    title: 'Sentzuu — Personal Portfolio Website',
    liveUrl: 'https://sentzuu.com/',
    description:
      'A cinematic portfolio website for a UI/UX designer focused on immersive storytelling and smooth transitions. Includes a full-screen overlay menu, video covers, parallax effects, and animated page transitions with structured case studies and media galleries.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'jQuery', 'Isotope', 'PHP'],
  },
  {
    id: 'my-account',
    title: 'My Account',
    description:
      'Comprehensive player profile and account management dashboard featuring personal information editing, real-time balance visibility, and full transaction history. Includes a custom profile picture system with in-browser image cropping, predefined avatar selection, and progressive field locking to protect verified identity data.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API'],
  },
  {
    id: 'onboarding-missions',
    title: 'Onboarding Missions',
    description:
      'Interactive 24-hour guided onboarding experience that walks new players through key casino actions — from email verification to placing their first bet — culminating in a $70 Free Chip reward. Features a spotlight overlay system that highlights relevant UI elements in context, smart page routing, real-time progress polling, and analytics integration.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Google Tag Manager', 'Customer.io'],
  },
  {
    id: 'navigation-profile-picture',
    title: 'Navigation & Profile Picture System',
    description:
      'Responsive dual-mode navigation with a persistent desktop sidebar and a fixed mobile top bar, both driven by server-cached menu data and a unified profile avatar service. Includes an animated hamburger menu with blur overlay, collapsible submenu groups, and a profile settings popup.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'GSAP'],
  },
  {
    id: 'casino-banking',
    title: 'Banking',
    description:
      'Full-featured financial platform supporting 15+ deposit methods including cryptocurrency, credit cards, e-wallets, and local bank transfers, alongside a guided withdrawal flow with multi-step eligibility verification. Includes Quick Deposit functionality, bonus upsell messaging, QR-code crypto address generation, and coupon redemption support.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'RTG API'],
  },
  {
    id: 'vip-program',
    title: 'VIP Program',
    description:
      'Five-tier loyalty program delivering scaled cashback rates, withdrawal limits, comp point multipliers, and exclusive player benefits as users progress from Rookie to Hall of Fame. Features VIP Trial mode, countdown timers, and progress tracking.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API', 'Smartico'],
  },
  {
    id: 'games-page',
    title: 'Games Page',
    description:
      'Dynamic game lobby featuring 500+ casino games across multiple categories with real-time search, Favorites and Recently Played functionality, and progressive lazy-loading. Includes instant favorite toggling and RTG-powered game launching.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API'],
  },
  {
    id: 'refer-a-friend',
    title: 'Refer a Friend Program',
    description:
      'Player referral system with unique shareable codes, social sharing integrations, and a self-service dashboard showing referrals, earned rewards, and cashback progression. Includes Free Spins rewards and referral network incentives.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'RTG API'],
  },
  {
    id: 'tournament-pages',
    title: 'Tournament Pages',
    description:
      'Promotional tournament platform supporting leaderboard competitions, cup-style brackets, and affiliate-specific campaigns with configurable prize structures and eligibility rules.',
    technologies: ['PHP', 'JavaScript', 'SCSS'],
  },
  {
    id: 'promotions-bonus-system',
    title: 'Promotions & Bonus System',
    description:
      'Centralized promotions platform managing bonus offers, free chip campaigns, and time-limited deals across multiple casino brands. Supports coupon validation, redemption tracking, and personalized targeting.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'RTG API'],
  },
  {
    id: 'admin-cms',
    title: 'Admin CMS',
    description:
      'Internal content management system for administering games, banners, promotions, player data, and media assets. Includes a media library, bulk operations, email log management, and extensible plugin architecture.',
    technologies: ['PHP', 'JavaScript', 'CKEditor'],
  },
  {
    id: 'crypto-casino',
    title: 'Crypto Casino',
    description:
      'Full-stack online casino platform with native cryptocurrency support, covering the complete player journey from registration and KYC through to game lobby, bonuses, and cashier. Built with a modular frontend architecture, real-time balance updates, and seamless wallet integration across Bitcoin, Ethereum, and stablecoin deposits.',
    technologies: ['PHP', 'JavaScript', 'SCSS', 'Redis', 'RTG API'],
  },
];
