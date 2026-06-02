import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiSass,
  SiBootstrap,
  SiRedux,
  SiPhp,
  SiMysql,
  SiGit,
  SiGithub,
  SiGitlab,
  SiSwagger,
  SiFigma,
} from 'react-icons/si';
import { MdCode } from 'react-icons/md';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  HTML5: SiHtml5,
  CSS3: MdCode,
  Sass: SiSass,
  Bootstrap: SiBootstrap,
  'Context API': MdCode,
  Redux: SiRedux,
  Zustand: MdCode,
  PHP: SiPhp,
  MySQL: SiMysql,
  'REST API': MdCode,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Swagger: SiSwagger,
  Figma: SiFigma,
};

export function getTechnologyIcon(name: string): React.FC<{ size?: number; className?: string }> {
  return iconMap[name] || MdCode;
}
