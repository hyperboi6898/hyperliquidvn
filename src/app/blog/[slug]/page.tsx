// src/app/blog/[slug]/page.tsx
import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next'; // Added Metadata import

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> { // Added Promise<Metadata>
  try {
    const post = await getPostData(params.slug);
    return {
      title: `${post.title} | Blog Hyperliquid Vietnam`, // Enhanced title
      description: `Bài viết blog: ${post.title}. ${post.contentHtml.substring(0, 150)}...`, // Basic description
    };
  } catch (error) {
    // Post not found
    return {
      title: 'Không tìm thấy bài viết', // Updated message
    };
  }
}

export default async function PostPage({ params }: Props) {
  let post: PostData;
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    notFound(); // This will render the not-found.tsx page or a default Next.js 404
  }

  return (
    <article className="container mx-auto px-4 py-12 text-hl-text"> {/* Container and default text */}
      <div className="max-w-3xl mx-auto bg-surface rounded-lg shadow-xl p-6 md:p-10"> {/* Card style */}
        <Link href="/blog" className="text-hl-success hover:underline mb-6 inline-block"> {/* Back link */}
          &larr; Quay lại Blog
        </Link>
        <header className="mb-8">
        <h1 className="mb-3 text-3xl md:text-4xl font-bold text-hl-text">
          {post.title}
        </h1>
        <p className="text-sm text-muted">
          {new Date(post.date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>
        <div
          className="prose prose-invert max-w-none 
                     prose-headings:text-hl-text prose-p:text-muted prose-a:text-hl-success 
                     prose-strong:text-hl-text prose-em:text-hl-text prose-blockquote:text-muted 
                     prose-ul:text-muted prose-ol:text-muted prose-li:marker:text-hl-success" // Prose styling for content
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
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
