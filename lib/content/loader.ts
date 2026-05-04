import fs from 'fs';
import path from 'path';

export const loadMdxLesson = (slug: string): string => {
  const p = path.join(process.cwd(), 'content', slug + '.mdx');
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf8');
};
