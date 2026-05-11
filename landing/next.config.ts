import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bắt buộc để Docker multi-stage build hoạt động
  output: "standalone",
  experimental: {
    // Tree-shake large packages that re-export everything from an index
    optimizePackageImports: ["swiper", "@fortawesome/fontawesome-free"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days — aligns with Cache-Control on storage server
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
