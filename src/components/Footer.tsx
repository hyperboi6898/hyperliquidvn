// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-surface text-muted p-8 text-center mt-auto">
      <div className="container mx-auto">
        <p className="mb-2">
          Trang web của cộng đồng Hyperliquid Vietnam.
          <br />
          Cập nhật tin tức mới nhất về dự án Hyperliquid và sàn giao dịch Perp.
        </p>
        <p>&copy; {new Date().getFullYear()} Hyperliquid Vietnam. All rights reserved.</p>
        {/* Add social links or other footer content here if needed */}
      </div>
    </footer>
  );
};

export default Footer;
