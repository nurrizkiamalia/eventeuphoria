/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://mini-project.fly.dev/api/v1/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;
  