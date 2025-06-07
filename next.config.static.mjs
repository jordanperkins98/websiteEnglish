/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Only include the homepage for static export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    }
  },
  // Disable server-side features
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
