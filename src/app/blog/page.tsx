// src/app/blog/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Metadata } from 'next'; // Added Metadata import

export const metadata: Metadata = { // Ensured metadata export is correct
  title: 'Blog | Hyperliquid Vietnam',
  description: 'Latest articles and insights from Hyperliquid Vietnam.',
};

export default function BlogIndexPage() {
  const allPosts = getSortedPostsData();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 text-hl-text">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-hl-text drop-shadow-md">
          Blog Kiến Thức
        </h1>
        <p className="mt-4 text-lg text-muted">
          Cập nhật tin tức, hướng dẫn và kiến thức chuyên sâu.
        </p>
      </header>

      <section>
        {allPosts.length === 0 ? (
          <p className="text-center text-muted text-lg">
            Hiện tại chưa có bài viết nào. Vui lòng quay lại sau!
          </p>
        ) : (
          <ul className="space-y-8">
            {allPosts.map(({ slug, date, title, tags }) => (
              <li
                key={slug}
                className="rounded-lg bg-surface p-6 shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl flex flex-col"
              >
                <h2 className="mb-2 text-3xl font-semibold text-hl-text hover:text-hl-success transition-colors">
                  <Link href={`/blog/${slug}`}>{title}</Link>
                </h2>
                <p className="mb-3 text-sm text-muted">
                  {new Date(date).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {tags && Array.isArray(tags) && tags.length > 0 && (
                  <div className="mb-4">
                    {tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="mr-2 inline-block rounded-full bg-success bg-opacity-20 px-3 py-1 text-xs font-medium text-hl-success"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/blog/${slug}`}
                  className="mt-auto font-medium text-hl-success hover:text-opacity-80 transition-colors"
                >
                  Read more &rarr;
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
