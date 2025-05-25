// src/app/page.tsx
import Link from 'next/link';
import { RefButton } from '@/components/RefButton';

export default function HomePage() {
  return (
    // Removed the overall bg-cyan-500 from here as it's now in layout.tsx
    // The main tag from layout now handles flex-grow, so this main can be a div or section
    <div className="flex flex-col items-center justify-center p-8 text-center text-hl-text"> {/* Changed main to div, text-white for default text color on this page */}
      <section className="mb-16 mt-8"> {/* Added mt-8 for spacing from Navbar */}
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-md text-hl-text">
          Chào mừng đến với Hyperliquid Vietnam
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-muted drop-shadow-sm max-w-3xl mx-auto">
          Cộng đồng hàng đầu và nguồn thông tin cập nhật về Hyperliquid tại Việt Nam. Khám phá tiềm năng của giao dịch phái sinh phi tập trung.
        </p>
      </section>

      <section className="rounded-lg bg-surface p-8 shadow-2xl max-w-3xl w-full mb-12">
        <h2 className="mb-6 text-3xl md:text-4xl font-semibold text-hl-text">
          Giới Thiệu Về Hyperliquid
        </h2>
        <p className="mb-4 text-lg text-muted text-left"> {/* Text align left for readability */}
          Hyperliquid là một sàn giao dịch hợp đồng vĩnh cửu phi tập trung (Perpetual Futures DEX) hiệu suất cao, được xây dựng trên Layer 1 blockchain riêng biệt.
          Nó cung cấp trải nghiệm giao dịch tương tự như các sàn CEX hàng đầu với tốc độ khớp lệnh nhanh, độ trễ thấp và sổ lệnh (order book) đầy đủ tính năng.
        </p>
        <p className="mb-8 text-lg text-muted text-left">
          Với Hyperliquid, người dùng có thể giao dịch nhiều loại tài sản khác nhau với đòn bẩy, hoàn toàn on-chain và tự quản lý tài sản của mình.
          Dự án tập trung vào việc cung cấp một nền tảng minh bạch, an toàn và thân thiện với người dùng.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/blog"
            className="inline-block rounded-md bg-success px-8 py-3 text-lg font-medium text-bg shadow-lg ring-2 ring-transparent transition-all duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 focus:ring-offset-surface"
          >
            Khám Phá Blog
          </Link>
          <RefButton /> {/* RefButton is already styled */}
        </div>
      </section>

      {/* Removed the old "Khám phá Kiến Thức DEX" section as it's integrated above and in the intro */}
      {/* Removed the old RefButton instance from here */}
      {/* Removed the old footer from here as it's now global */}
    </div>
  );
}
