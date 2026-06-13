import fs from 'fs';
import path from 'path';

const IMAGE_EXT = /\.(png|jpg|jpeg|webp|gif|avif)$/i;
const THUMBNAIL_NAME = /thumbnail/i;

export interface ProjectImageData {
  thumbnail: string | undefined;
  screenshots: string[];
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export function getProjectImageMap(): Record<string, ProjectImageData> {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  const result: Record<string, ProjectImageData> = {};

  let folders: string[];
  try {
    folders = fs.readdirSync(projectsDir);
  } catch {
    return result;
  }

  for (const folder of folders) {
    const folderPath = path.join(projectsDir, folder);
    try {
      if (!fs.statSync(folderPath).isDirectory()) continue;
    } catch {
      continue;
    }

    let files: string[];
    try {
      files = fs.readdirSync(folderPath).filter((f) => IMAGE_EXT.test(f));
    } catch {
      continue;
    }

    files.sort(naturalSort);

    const thumbnailFile = files.find((f) => THUMBNAIL_NAME.test(f));
    const screenshotFiles = files.filter((f) => !THUMBNAIL_NAME.test(f));

    result[folder] = {
      thumbnail: thumbnailFile
        ? `/projects/${folder}/${encodeURIComponent(thumbnailFile)}`
        : undefined,
      screenshots: screenshotFiles.map(
        (f) => `/projects/${folder}/${encodeURIComponent(f)}`
      ),
    };
  }

  return result;
}
