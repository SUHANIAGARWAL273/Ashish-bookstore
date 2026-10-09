import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d117z51sy2soxm.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;