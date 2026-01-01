/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
