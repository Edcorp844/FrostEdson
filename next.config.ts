import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out', // Explicit output directory
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/FrostEdson' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/FrostEdson/' : '',
  trailingSlash: true, // Important for GitHub Pages
};

export default nextConfig;