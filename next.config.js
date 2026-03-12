/** @type {import('next').NextConfig} */
const nextConfig = {
  // API 호출 시 외부 도메인 허용
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=60, stale-while-revalidate=300' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
