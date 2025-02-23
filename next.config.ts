import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' }
    ]
  },
  serverExternalPackages: ['pino', 'pino-pretty']
}

export default nextConfig
