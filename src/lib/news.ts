// src/lib/news.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const newsDirectory = path.join(process.cwd(), 'content/news');

export interface NewsArticleData {
  slug: string;
  title: string;
  date: string;
  source_url?: string; // Optional source URL
  contentHtml: string;
  [key: string]: any; // For other frontmatter fields
}

export function getSortedNewsArticlesData(): Omit<NewsArticleData, 'contentHtml'>[] {
  // Get file names under /content/news
  let fileNames;
  try {
    fileNames = fs.readdirSync(newsDirectory);
  } catch (err) {
    // If the directory doesn't exist or is empty, return an empty array
    console.warn(`Could not read news directory: ${newsDirectory}. Returning empty list.`);
    return [];
  }

  const allNewsArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Ensure we only process markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(newsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the news article metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || 'Untitled News Article',
        date: matterResult.data.date || new Date().toISOString(),
        source_url: matterResult.data.source_url,
        ...matterResult.data,
      };
    });

  // Sort news articles by date
  return allNewsArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllNewsArticleSlugs() {
  let fileNames;
  try {
    fileNames = fs.readdirSync(newsDirectory);
  } catch (err) {
    console.warn(`Could not read news directory for slugs: ${newsDirectory}. Returning empty list.`);
    return [];
  }
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getNewsArticleData(slug: string): Promise<NewsArticleData | null> {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the news article metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    return {
      slug,
      title: matterResult.data.title || 'Untitled News Article',
      date: matterResult.data.date || new Date().toISOString(),
      source_url: matterResult.data.source_url,
      contentHtml,
      ...matterResult.data,
    };
  } catch (err) {
    console.error(`Error reading news article ${slug}:`, err);
    return null; // Return null if file not found or error reading
  }
}
