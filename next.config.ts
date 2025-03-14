import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/google3f937ff77a6bb76f.html',
        destination: '/google3f937ff77a6bb76f.html'
      }
    ];
  }
};

export default nextConfig;
