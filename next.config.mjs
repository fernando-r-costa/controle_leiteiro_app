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
    urlImports: ["https://cdn.skypack.dev"]
  }

});