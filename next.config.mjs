/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Redirects de URLs viejas (de la versión Vite)
  async redirects() {
    return [
      { source: '/v1', destination: '/', permanent: true },
      { source: '/v1/:slug', destination: '/peliculas/:slug', permanent: true },
      { source: '/v1/film/:id', destination: '/peliculas/:id', permanent: true },
      { source: '/v2/:path*', destination: '/', permanent: true },
    ];
  },
  // Headers de seguridad básicos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
