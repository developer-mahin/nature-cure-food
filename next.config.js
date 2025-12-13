/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Remove console.log statements in production for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    // Enable modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "digitalseba.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  turbopack: {},
};

export default nextConfig;
