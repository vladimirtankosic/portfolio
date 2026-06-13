/**
 * Converts, resizes, and organises all project screenshots into WebP.
 *
 * Thumbnails  → 1200×900  (4:3)   quality 82
 * Gallery     → 1600×1000 (16:10) quality 82
 *
 * Outputs land in  public/projects/<project-id>/
 *   thumbnail.webp
 *   1.webp, 2.webp, …
 *
 * Source PNGs in public/projects/ are deleted when every project succeeds.
 */

import sharp from 'sharp';
import { mkdirSync, existsSync, unlinkSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'public', 'projects');

const THUMB   = { w: 1200, h: 900  };   // 4:3
const GALLERY = { w: 1600, h: 1000 };   // 16:10
const QUALITY = 82;

const PROJECTS = [
  {
    id: 'sentzuu-portfolio',
    thumbnail: 'sentzuu-thumbnail.png',
    gallery: ['sentzuu-1.png', 'sentzuu-2.png', 'sentzuu-3.png'],
  },
  {
    id: 'my-account',
    thumbnail: 'myacc-thumbnail.png',
    gallery: ['myacc-1.png', 'myacc-3.png', 'myacc-4.png', 'myacc-5.png', 'myacc-6.png'],
  },
  {
    id: 'onboarding-missions',
    thumbnail: 'missions-thumbnail.png',
    gallery: [
      'missions-1.png', 'missions-2.png', 'missions-3.png',
      'missions-4.png', 'missions-5.png', 'missions-6.png',
    ],
  },
  {
    id: 'navigation-profile-picture',
    thumbnail: 'nav-thumbnail.png',
    gallery: ['nav-1.png', 'nav-2.png', 'nav-3.png', 'nav-4.png'],
  },
  {
    id: 'casino-banking',
    thumbnail: 'banking-thumbnail.png',
    gallery: [
      'banking-1.png', 'banking-2.png', 'banking-3.png',
      'banking-qd-1.png', 'banking-qd-2.png',
    ],
  },
  {
    id: 'vip-program',
    thumbnail: 'vip-thumbnail.png',
    gallery: ['vip-1.png', 'vip-2.png'],
  },
  {
    id: 'games-page',
    thumbnail: 'games-1.png', // no dedicated thumbnail — derive from first screenshot
    gallery: ['games-1.png', 'games-2.png', 'games-3.png'],
  },
  {
    id: 'refer-a-friend',
    thumbnail: 'raf-thumbnail.png',
    gallery: ['raf-1.png', 'raf-2.png'],
  },
  {
    id: 'tournament-pages',
    thumbnail: 'tournaments-thumbnail.png',
    gallery: ['tournaments-1.png'],
  },
  {
    id: 'promotions-bonus-system',
    thumbnail: 'promotions-thumbnail.png',
    gallery: ['promotions-1.png', 'promotions-2.png'],
  },
  {
    id: 'admin-cms',
    thumbnail: 'cms-thumbnail.png',
    gallery: ['cms-1.png', 'cms-2.png'],
  },
  {
    id: 'crypto-casino',
    thumbnail: 'MF-thumbnail.png',
    gallery: ['MF-2.png', 'MF-3.png', 'MF-4.png', 'MF-11.png'],
  },
];

async function toWebP(srcFile, destFile, w, h) {
  if (!existsSync(srcFile)) {
    console.warn(`  ⚠  missing: ${srcFile}`);
    return false;
  }
  await sharp(srcFile)
    .resize(w, h, { fit: 'cover', position: 'centre' })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(destFile);
  return true;
}

let converted = 0;
let skipped   = 0;
const allOk   = [];

for (const project of PROJECTS) {
  const outDir = join(SRC, project.id);
  mkdirSync(outDir, { recursive: true });
  console.log(`\n▶  ${project.id}`);
  let projectOk = true;

  const thumbOk = await toWebP(
    join(SRC, project.thumbnail),
    join(outDir, 'thumbnail.webp'),
    THUMB.w, THUMB.h,
  );
  if (thumbOk) {
    console.log(`   ✓  thumbnail.webp  ${THUMB.w}×${THUMB.h}`);
    converted++;
  } else {
    skipped++;
    projectOk = false;
  }

  for (let i = 0; i < project.gallery.length; i++) {
    const ok = await toWebP(
      join(SRC, project.gallery[i]),
      join(outDir, `${i + 1}.webp`),
      GALLERY.w, GALLERY.h,
    );
    if (ok) {
      console.log(`   ✓  ${i + 1}.webp  ${GALLERY.w}×${GALLERY.h}`);
      converted++;
    } else {
      skipped++;
      projectOk = false;
    }
  }

  allOk.push(projectOk);
}

// Remove source PNGs only when every project processed cleanly
const allProjectsOk = allOk.every(Boolean);
if (allProjectsOk) {
  console.log('\n🗑   Removing source PNG files …');
  for (const entry of readdirSync(SRC)) {
    const full = join(SRC, entry);
    if (statSync(full).isFile() && entry.toLowerCase().endsWith('.png')) {
      unlinkSync(full);
      console.log(`   removed: ${entry}`);
    }
  }
} else {
  console.warn('\n⚠   Some files were missing — source PNGs kept for safety.');
}

console.log(`\n${ allProjectsOk ? '✅' : '⚠ '} Done — ${converted} converted, ${skipped} skipped`);
