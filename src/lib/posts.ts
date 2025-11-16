import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}

export async function getAllPosts(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const content = processedContent.toString();

        return {
          slug,
          title: matterResult.data.title as string,
          date: matterResult.data.date as string,
          content,
          excerpt: matterResult.data.excerpt as string,
        };
      })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const content = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      content,
      excerpt: matterResult.data.excerpt as string,
    };
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}