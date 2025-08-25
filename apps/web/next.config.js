/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable React 19 experimental features
    ppr: true, // Partial Pre-rendering
    reactCompiler: true
  },
  transpilePackages: [
    "@ultimate-ai-ide/ui",
    "@ultimate-ai-ide/mcp-hub", 
    "@ultimate-ai-ide/ai-agents"
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Supabase Edge Functions compatibility
  async rewrites() {
    return [
      {
        source: '/api/edge/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig