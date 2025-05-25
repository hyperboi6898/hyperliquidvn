// src/app/news/[slug]/page.tsx
import { getAllNewsArticleSlugs, getNewsArticleData } from '@/lib/news';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const newsArticle = await getNewsArticleData(params.slug);

  if (!newsArticle) {
    return {
      title: 'Không tìm thấy tin tức',
    };
  }

  return {
    title: `${newsArticle.title} | Tin Tức Hyperliquid Vietnam`,
    description: `Bài viết tin tức: ${newsArticle.title}. ${newsArticle.contentHtml.substring(0, 150)}...`, // Basic description
  };
}

export async function generateStaticParams() {
  const paths = getAllNewsArticleSlugs();
  return paths;
}

export default async function NewsArticlePage({ params }: Props) {
  const newsArticle = await getNewsArticleData(params.slug);

  if (!newsArticle) {
    notFound(); // Triggers 404 page
  }

  return (
    <article className="container mx-auto px-4 py-12 text-hl-text">
      <div className="max-w-3xl mx-auto bg-surface rounded-lg shadow-xl p-6 md:p-10">
        <Link href="/news" className="text-hl-success hover:underline mb-6 inline-block">
          &larr; Quay lại danh sách tin tức
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-hl-text">
          {newsArticle.title}
        </h1>
        <div className="text-muted mb-6">
          <time dateTime={newsArticle.date}>
            {new Date(newsArticle.date).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {newsArticle.source_url && (
            <span className="ml-4">
              | Nguồn: <a href={newsArticle.source_url} target="_blank" rel="noopener noreferrer" className="text-hl-success hover:underline">{newsArticle.source_url}</a>
            </span>
          )}
        </div>
        <div
          className="prose prose-invert max-w-none 
                     prose-headings:text-hl-text prose-p:text-muted prose-a:text-hl-success 
                     prose-strong:text-hl-text prose-em:text-hl-text prose-blockquote:text-muted 
                     prose-ul:text-muted prose-ol:text-muted prose-li:marker:text-hl-success"
          dangerouslySetInnerHTML={{ __html: newsArticle.contentHtml }}
        />
        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-muted text-sm">
            Nếu bạn muốn trải nghiệm Hyperliquid và được chiết khấu 10% phí giao dịch, có thể tham gia tại đây:
          </p>
          <Link href="https://app.hyperliquid.xyz/join/VN84" target="_blank" rel="noopener noreferrer" className="text-hl-success hover:underline font-semibold mt-2 inline-block">
            Đăng ký Hyperliquid (Ref: VN84)
          </Link>
        </div>
      </div>
    </article>
  );
}
