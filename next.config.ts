import type { NextConfig } from 'next';
const nextConfig: NextConfig = { allowedDevOrigins: ['192.168.100.72'], turbopack: { root: process.cwd() }, output: 'export', trailingSlash: true, images: { unoptimized: true }, devIndicators: false };
export default nextConfig;
