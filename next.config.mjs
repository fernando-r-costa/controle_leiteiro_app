import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});

const isProd = process.env.NODE_ENV === 'production';

export default withPWA({
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
  },

  redirects: isProd ? async () => {
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
  } : undefined,
});