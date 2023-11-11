/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'flagcdn.com',
            port: '',
            pathname: '/w320/**',
          },
        ],
      },
}
