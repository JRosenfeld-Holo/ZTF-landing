import type { NextConfig } from 'next'

if (typeof global !== 'undefined') {
  if (!global.localStorage || typeof global.localStorage.getItem !== 'function') {
    (global as any).localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    }
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
}

export default nextConfig
