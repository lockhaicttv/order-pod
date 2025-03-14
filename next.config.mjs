import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['lucide-react', 'geist'],
  eslint: {
    // ignoreDuringBuilds: true
  }
  // rewrites: async () => {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: '/.well-known/apple-app-site-association',
  //         destination: '/public/.well-known/apple-app-site-association.json'
  //       },
  //       {
  //         source: '/.well-known/assetlinks1.json',
  //         destination: '/public/.well-known/assetlinks1.json'
  //       }
  //     ],
  //     afterFiles: [
  //       {
  //         source: '/.well-known/apple-app-site-association',
  //         destination: '/public/.well-known/apple-app-site-association.json'
  //       },
  //       {
  //         source: '/.well-known/assetlinks1.json',
  //         destination: '/public/.well-known/assetlinks1.json'
  //       }
  //     ],
  //     fallback: [
  //       {
  //         source: '/.well-known/apple-app-site-association',
  //         destination: '/public/.well-known/apple-app-site-association.json'
  //       },
  //       {
  //         source: '/.well-known/assetlinks1.json',
  //         destination: '/public/.well-known/assetlinks1.json'
  //       }
  //     ]
  //   }
  // },
  // headers: () => {
  //   return [
  //     {
  //       source: '/.well-known/apple-app-site-association',
  //       headers: [{ key: 'content-type', value: 'application/json' }]
  //     }
  //   ]
  // }
}

export default withNextIntl(nextConfig)
