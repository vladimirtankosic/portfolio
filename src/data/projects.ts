import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'casino-lobby-clone',
    title: 'Casino Lobby Clone',
    description:
      'A casino lobby application featuring game listing, category filtering, search functionality and pagination. Built with Next.js and integrated with a REST API for dynamic game data.',
    technologies: ['Next.js', 'React', 'Sass', 'REST API'],
    githubUrl: 'https://github.com/vladimirtankosic',
    screenshots: [
      '/projects/casino-lobby/1.webp',
      '/projects/casino-lobby/2.webp',
      '/projects/casino-lobby/3.webp',
    ],
    featured: true,
  },
  {
    id: 'banking-platform',
    title: 'Banking Platform',
    description:
      'Modern banking application with authentication, account management, transaction history and real-time balance updates. Features a clean dashboard with data visualizations.',
    technologies: ['React', 'TypeScript', 'SCSS', 'PHP'],
    githubUrl: 'https://github.com/vladimirtankosic',
    screenshots: [
      '/projects/banking/1.webp',
      '/projects/banking/2.webp',
      '/projects/banking/3.webp',
    ],
    featured: true,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'Full-featured online store with product catalog, cart management, checkout flow and order tracking. Optimized for performance with server-side rendering and image optimization.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/vladimirtankosic',
    screenshots: [
      '/projects/ecommerce/1.webp',
      '/projects/ecommerce/2.webp',
      '/projects/ecommerce/3.webp',
    ],
    featured: true,
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    description:
      'Comprehensive admin panel with analytics, user management, role-based access control and real-time data tables. Built with a focus on performance and developer experience.',
    technologies: ['React', 'TypeScript', 'SCSS', 'Node.js'],
    githubUrl: 'https://github.com/vladimirtankosic',
    screenshots: [
      '/projects/admin-dashboard/1.webp',
      '/projects/admin-dashboard/2.webp',
    ],
  },
  {
    id: 'booking-app',
    title: 'Booking Application',
    description:
      'Reservation platform for scheduling appointments and managing availability. Features calendar integration, email notifications and a responsive mobile-first interface.',
    technologies: ['React', 'SCSS', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/vladimirtankosic',
    screenshots: [
      '/projects/booking/1.webp',
      '/projects/booking/2.webp',
    ],
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'Personal portfolio showcasing projects and professional experience. Built with Next.js and animated with Framer Motion, featuring dark/light themes and multi-language support.',
    technologies: ['Next.js', 'TypeScript', 'Sass', 'Framer Motion'],
    githubUrl: 'https://github.com/vladimirtankosic',
    liveUrl: 'https://vladimirtankosic.com',
    screenshots: [
      '/projects/portfolio/1.webp',
      '/projects/portfolio/2.webp',
    ],
    featured: true,
  },
];
