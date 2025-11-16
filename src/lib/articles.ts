import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

const articlesDirectory = path.join(process.cwd(), 'src/articles');

export interface ArticleData {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}

export async function getAllArticles(): Promise<ArticleData[]> {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        const processedContent = await remark()
          .use(remarkMath)
          .use(remarkRehype)
          .use(rehypeKatex)
          .use(rehypeStringify)
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

  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex)
      .use(rehypeStringify)
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

export async function getAllArticleSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}