/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for middleware support
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['supabase.co', 'localhost'],
  },
  // PWA Configuration
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      // WebAuthn support headers
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(self), geolocation=(self), biometric=(self)',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
