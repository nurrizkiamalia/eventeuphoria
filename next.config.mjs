/** @type {import('next').NextConfig} */
const nextConfig = {
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
  