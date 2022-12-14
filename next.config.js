/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.alza.cz',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
