# Hyperliquid Vietnam Website

## 1. Giới Thiệu Dự Án

Hyperliquid Vietnam là một trang web cộng đồng dành cho các nhà giao dịch (trader) tiền điện tử tại Việt Nam quan tâm đến sàn giao dịch Hyperliquid. Mục tiêu của dự án là:

*   Cung cấp kiến thức, hướng dẫn chi tiết về cách sử dụng sàn Hyperliquid.
*   Cập nhật tin tức mới nhất liên quan đến Hyperliquid và thị trường.
*   Chia sẻ các bài viết phân tích, chiến lược giao dịch.
*   Xây dựng một cộng đồng trader Việt Nam vững mạnh, hỗ trợ lẫn nhau.
*   Giới thiệu người dùng mới đến với Hyperliquid thông qua chương trình referral.

## 2. Công Nghệ Sử Dụng

Dự án được xây dựng bằng các công nghệ web hiện đại, tập trung vào hiệu suất và trải nghiệm người dùng:

*   **Framework:** [Next.js](https://nextjs.org/) (React Framework for Production)
*   **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Bao gồm cấu hình tùy chỉnh cho theme (sáng/tối) và các màu đặc trưng của Hyperliquid (`hl-` prefix).
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Thư viện component được xây dựng trên Tailwind CSS và Radix UI.
*   **Nội dung:** Markdown cho các bài blog và tin tức, được xử lý để hiển thị HTML.

## 3. Tính Năng Chính

*   **Trang Chủ:** Giới thiệu chung về Hyperliquid và website.
*   **Blog Kiến Thức:** Các bài viết chuyên sâu, hướng dẫn sử dụng, phân tích kỹ thuật. (Xem mục 4.1 để biết cách hoạt động)
*   **Tin Tức:** Cập nhật các thông tin mới nhất từ Hyperliquid và thị trường.
*   **Giao Diện Responsive:** Tương thích tốt trên mọi thiết bị (desktop, tablet, mobile).
*   **Theme Sáng/Tối:** Cho phép người dùng lựa chọn giao diện ưa thích.
*   **Liên Kết Giới Thiệu (Referral):** Tích hợp liên kết giới thiệu để người dùng mới có thể đăng ký và nhận ưu đãi.

## 4. Cấu Trúc Thư Mục (Sơ Lược)

```
hyperliquidvn/
├── content/                  # Chứa các file Markdown cho blog và tin tức
│   ├── blog/                 # Các bài viết blog (.md)
│   └── news/                 # Các bài tin tức (.md)
├── public/                   # Chứa các tài sản tĩnh (hình ảnh, fonts, logo)
├── src/
│   ├── app/                  # Routes chính của ứng dụng (Next.js App Router)
│   │   ├── (main)/           # Layout chính cho các trang
│   │   │   ├── blog/         # Trang danh sách blog và chi tiết bài viết [slug]
│   │   │   ├── news/         # Trang danh sách tin tức và chi tiết bài viết [slug]
│   │   │   └── page.tsx      # Trang chủ
│   │   ├── layout.tsx        # Layout gốc của ứng dụng
│   │   └── globals.css       # CSS toàn cục, định nghĩa biến màu CSS
│   ├── components/           # Các React components tái sử dụng (Navbar, Footer, RefButton, v.v.)
│   ├── lib/                  # Các hàm tiện ích (ví dụ: posts.ts, news.ts để xử lý Markdown)
│   └── types/                # Định nghĩa các kiểu TypeScript (nếu có)
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts        # Cấu hình Tailwind CSS
├── tsconfig.json
└── readme.MD                 # Chính là file này
```

### 4.1. Cách Hoạt Động Của Blog Posts (và Tin Tức tương tự)

Hệ thống blog (và tin tức) hoạt động dựa trên các file Markdown:

1.  **Nguồn Dữ Liệu:**
    *   Các bài viết được lưu trữ dưới dạng file `.md` trong thư mục `content/blog/` (hoặc `content/news/`).
    *   Mỗi file Markdown chứa "frontmatter" (siêu dữ liệu như `title`, `date`, `tags`, `author`, `description`) ở đầu file, được phân cách bằng `---`. Theo sau là nội dung bài viết bằng cú pháp Markdown.
    *   Ví dụ frontmatter:
        ```yaml
        ---
        title: "Hướng dẫn sử dụng API của Hyperliquid"
        date: "2024-05-20"
        tags: ["api", "hướng dẫn"]
        author: "HyperVN Team"
        description: "Bài viết này sẽ hướng dẫn bạn cách..."
        ---
        Nội dung bài viết ở đây...
        ```

2.  **Xử Lý Dữ Liệu (thường trong `src/lib/posts.ts` hoặc `src/lib/news.ts`):**
    *   Sử dụng thư viện `fs` (Node.js file system) để đọc danh sách file từ thư mục `content/blog/`.
    *   Sử dụng thư viện `gray-matter` để phân tích (parse) frontmatter và nội dung từ mỗi file Markdown.
    *   Sử dụng thư viện `remark` và `remark-html` (hoặc các plugin tương tự) để chuyển đổi nội dung Markdown thành chuỗi HTML an toàn.
    *   Các hàm tiện ích được tạo để:
        *   `getSortedPostsData()`: Lấy và sắp xếp (thường theo ngày) siêu dữ liệu của tất cả bài viết để hiển thị trên trang danh sách blog.
        *   `getPostData(slug)`: Lấy dữ liệu chi tiết (bao gồm cả `contentHtml`) của một bài viết cụ thể dựa trên `slug` (tên file không có phần mở rộng `.md`).
        *   `getAllPostSlugs()`: Lấy tất cả các `slug` có thể có, dùng cho việc tạo static paths trong Next.js (nếu sử dụng `generateStaticParams`).

3.  **Hiển Thị (trong `src/app/`):**
    *   **Trang danh sách (`src/app/blog/page.tsx`):**
        *   Gọi hàm `getSortedPostsData()` để lấy danh sách các bài viết.
        *   Lặp qua danh sách này và hiển thị thông tin tóm tắt (title, date, description, link) cho mỗi bài.
    *   **Trang chi tiết bài viết (`src/app/blog/[slug]/page.tsx`):**
        *   Đây là một dynamic route trong Next.js.
        *   Sử dụng `params.slug` từ URL để gọi hàm `getPostData(params.slug)`.
        *   Hiển thị `title`, `date`, và nội dung `contentHtml` (sử dụng `dangerouslySetInnerHTML`).
        *   Thường sử dụng plugin `@tailwindcss/typography` để style nội dung HTML được tạo ra từ Markdown một cách dễ dàng.

## 5. Cách Khởi Chạy Dự Án (Local Development)

1.  **Clone repository (Nếu có):**
    ```bash
    git clone <your-repository-url>
    cd hyperliquidvn
    ```
2.  **Cài đặt Dependencies:**
    Mở terminal trong thư mục gốc của dự án và chạy:
    ```bash
    npm install
    # hoặc
    yarn install
    ```
3.  **Chạy Development Server:**
    ```bash
    npm run dev
    # hoặc
    yarn dev
    ```
4.  Mở trình duyệt và truy cập `http://localhost:3000`.

## 6. Quy Trình Làm Việc Với CSS/Styling

*   **Tailwind CSS:** Là framework CSS chính. Sử dụng utility classes để style trực tiếp trong JSX.
*   **`globals.css`:**
    *   Định nghĩa các biến màu CSS cho theme sáng và tối (ví dụ: `--background`, `--foreground`, `--card`, `--primary`, v.v.).
    *   Các style global cơ bản cho `body`, `html`.
*   **`tailwind.config.ts`:**
    *   Cấu hình theme của Tailwind.
    *   Mở rộng màu sắc:
        *   Các màu theo chuẩn `shadcn/ui` được định nghĩa bằng cách tham chiếu đến các biến CSS (ví dụ: `background: "hsl(var(--background))"`).
        *   Các màu tùy chỉnh riêng của Hyperliquid được thêm tiền tố `hl-` (ví dụ: `hl-bg`, `hl-text`, `hl-surface`).
    *   Cấu hình plugin, ví dụ như `@tailwindcss/typography` cho styling nội dung Markdown.

## 7. Đóng Góp

Hiện tại, dự án đang được phát triển cá nhân. Nếu bạn có ý tưởng đóng góp, vui lòng tạo Issue hoặc Pull Request (nếu có repository công khai).

---

_Tài liệu này được tạo bởi Cascade AI._