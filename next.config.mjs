import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});

export default withPWA({
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '^(?!www\\.).*$',
          },
        ],
        destination: 'https://www.controleleiteiro.com.br/:path*',
        permanent: true,
      },
    ];
  },
});