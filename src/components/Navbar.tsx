// src/components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-hl-surface text-hl-text p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Hyperliquid Vietnam Logo" width={40} height={40} />
          <span className="text-xl font-semibold text-hl-text">Hyperliquid VN</span>
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-success transition-colors">Trang Chủ</Link>
          <Link href="/blog" className="hover:text-success transition-colors">Blog</Link>
          <Link href="/news" className="hover:text-success transition-colors">Tin Tức</Link>
          {/* <Link href="/gioi-thieu" className="hover:text-cyan-300 transition-colors">Giới Thiệu</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
