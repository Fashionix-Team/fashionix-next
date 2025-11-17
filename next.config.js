/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
    images: {
        unoptimized: false,
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.IMAGE_DOMAIN,
            },
            {
                protocol: "http",
                hostname: process.env.IMAGE_DOMAIN,
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
            // Menambahkan konfigurasi remotePatterns untuk susercontent.com by robin
            {
                protocol: "https",
                hostname: "down-id.img.susercontent.com",
            },
        ],
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        BAGISTO_STORE_DOMAIN: process.env.BAGISTO_STORE_DOMAIN,
        REVALIDATION_DURATION: process.env.REVALIDATION_DURATION,
        SITE_NAME: process.env.SITE_NAME,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=3600, stale-while-revalidate=8640",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
