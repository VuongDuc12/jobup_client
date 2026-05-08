import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bắt buộc để Docker multi-stage build hoạt động
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // 1 day — tránh cache ảnh cũ khi admin thay ảnh cùng URL
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
