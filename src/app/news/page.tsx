// src/app/news/page.tsx
import Link from 'next/link';
import { getSortedNewsArticlesData } from '@/lib/news';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin Tức | Hyperliquid Vietnam',
  description: 'Cập nhật những tin tức mới nhất về Hyperliquid và thị trường phái sinh crypto.',
};

export default function NewsPage() {
  const allNewsArticles = getSortedNewsArticlesData();

  return (
    <div className="container mx-auto px-4 py-8 text-hl-text">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-md">
        Tin Tức Hyperliquid
      </h1>

      {allNewsArticles.length === 0 && (
        <p className="text-center text-muted text-lg">
          Hiện tại chưa có tin tức nào. Vui lòng quay lại sau!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allNewsArticles.map(({ slug, title, date, source_url }) => (
          <article
            key={slug}
            className="bg-surface rounded-lg shadow-xl p-6 flex flex-col transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-3 text-hl-text hover:text-hl-success transition-colors">
              <Link href={`/news/${slug}`}>
                {title}
              </Link>
            </h2>
            <small className="text-muted mb-4">
              {new Date(date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </small>
            {source_url && (
              <p className="text-sm text-muted mb-2">
                Nguồn: <a href={source_url} target="_blank" rel="noopener noreferrer" className="text-hl-success hover:underline">{source_url}</a>
              </p>
            )}
            <Link
              href={`/news/${slug}`}
              className="mt-auto inline-block text-hl-success hover:text-opacity-80 transition-colors font-medium"
            >
              Đọc thêm &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
