/** @type {import('next').NextConfig} */
const nextConfig = {
  // Example: Enabling React Strict Mode
  reactStrictMode: true,
  // Example: Adding custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
