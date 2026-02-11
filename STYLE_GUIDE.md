# JobUp Coding Style & Design Standards

Tài liệu này quy định các tiêu chuẩn về mã nguồn và thiết kế cho dự án JobUp để đảm bảo tính đồng bộ, hiệu suất và trải nghiệm người dùng cao cấp.

## 1. Thiết kế & Typography (UI/UX)

### Font Chữ chủ đạo
- **Font chính:** `Plus Jakarta Sans` (Sans-serif).
- **Cấu hình Tailwind:** `font-sans`.
- **Nguyên tắc:** 
  - Tiêu đề (Headings) sử dụng `font-extrabold` hoặc `font-black`.
  - Nội dung (Body) sử dụng `font-medium` hoặc `font-light` để tạo độ thoáng.

### Hệ màu thương hiệu (Brand Colors)
- **Vàng (Brand Yellow):** `#F0B429` (Sử dụng cho các nút hành động, điểm nhấn).
- **Đen (Brand Black):** `#111827` (Nền chính, tiêu đề quan trọng).
- **Xám (Gray):** Sử dụng hệ màu mặc định của Tailwind (`text-gray-500`, `text-gray-400`).

### Section Padding & Layout
- **Vertical Padding:** Tất cả các section chính phải sử dụng `py-16` để đảm bảo dãn cách đồng bộ.
- **Container:** Luôn sử dụng `max-w-7xl mx-auto px-4 sm:px-6` cho khung nội dung chính.
- **Hero Sections:** Có thể dãn rộng hơn với `max-w-6xl` hoặc `max-w-screen-2xl` tùy mục đích trình bày.

## 2. Tiêu chuẩn HTML/Tailwind CSS

### Cấu trúc file
- Luôn bao gồm đầy đủ **SEO Meta Tags**.
- Scripts quan trọng (Fonts, Tailwind Config, FontAwesome) đặt trong `<head>`.
- Các thư viện hiệu ứng (AOS, Swiper JS) đặt cuối `<body>`.

### Tailwind Best Practices
- Ưu tiên sử dụng **Utility-first**. 
- Hạn chế viết CSS thuần trừ khi cần các hiệu ứng phức tạp (Glassmorphism, Custom Animation).
- Sử dụng các class trạng thái: `hover:`, `active:`, `focus:`, `group-hover:`.

### Hiệu ứng & Chuyển động (Animations)
- **AOS (Animate On Scroll):**
  - Thời gian mặc định: `duration: 800`.
  - Hiệu ứng: `fade-up`, `fade-right`, `zoom-in`.
- **Hover Transitions:** Luôn thêm `transition-all duration-300` cho các thành phần tương tác (buttons, cards).

## 3. Quy tắc đặt tên (Naming Conventions)

- **ID/Class:** Sử dụng kebab-case (ví dụ: `mobile-menu-btn`, `job-card-wrapper`).
- **Hình ảnh:** Đặt tên gợi nhớ nội dung và tối ưu kích thước trước khi nhúng (ví dụ: `hero-workspace.png`, `advisor-portrait.jpg`).

---
*JobUp - Kết nối nhân tài, kiến tạo tương lai.*
