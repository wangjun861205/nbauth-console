/** @type {import('next').NextConfig} */

const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api",
                destination: "http://localhost:8000"
            }
        ]
    }
}

module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8000/api/:path*"
            }
        ]
    }
};
