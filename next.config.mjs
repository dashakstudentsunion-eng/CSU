/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedReplitOrigins: ['*'],
  },
  allowedDevOrigins: [
    '*',
  ],
}

export default nextConfig
