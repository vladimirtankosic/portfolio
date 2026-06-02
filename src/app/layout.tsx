import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { I18nProvider } from '@/providers/I18nProvider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vladimir Tankosic — Frontend Developer',
  description:
    'Frontend Developer with 4+ years of experience building modern web applications. Specialized in React, Next.js and modern JavaScript technologies.',
  keywords: [
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Vladimir Tankosic',
  ],
  authors: [{ name: 'Vladimir Tankosic' }],
  creator: 'Vladimir Tankosic',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Vladimir Tankosic — Frontend Developer',
    description:
      'Frontend Developer with 4+ years of experience building modern web applications. Specialized in React, Next.js and modern JavaScript technologies.',
    siteName: 'Vladimir Tankosic Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vladimir Tankosic — Frontend Developer',
    description: 'Frontend Developer with 4+ years of experience building modern web applications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
