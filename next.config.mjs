/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*',
    'localhost:5000',
    '127.0.0.1:5000',
    'efc5c245-7fda-4320-854a-e492305ba49b-00-2o556ouncf9ld.picard.replit.dev'
  ],
}

export default nextConfig
