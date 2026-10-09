import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/site/i18n/request.ts');

const nextConfig: NextConfig = {
    output: 'standalone',
    cacheComponents: true,
    images: {
        // This is necessary to display images from your local Vendure instance
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                hostname: 'readonlydemo.vendure.io',
            },
            {
                hostname: 'demo.vendure.io'
            },
            {
                hostname: 'localhost'
            },
            {
                // Supabase S3 storage — product images & assets in production
                hostname: 'queahwwpaohxjwrkuijx.storage.supabase.co',
                protocol: 'https',
            },
            {
                hostname: '15.160.209.193',
            }
        ],
    }
};

export default withNextIntl(nextConfig);
