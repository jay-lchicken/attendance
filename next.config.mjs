/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: Keep this as true if you want to enable strict mode
    devIndicators: {
        autoPrerender: false, // Disable Fast Refresh in development
    },
};

export default nextConfig;
