import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bắt buộc để Docker multi-stage build hoạt động
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
