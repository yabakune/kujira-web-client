/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async redirects() {
    return [
      {
        source: "/term",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/private",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/cookie",
        destination: "/cookie-policy",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/cookie-policy",
        permanent: true,
      },
      {
        source: "/logbook",
        destination: "/dashboard/logbooks",
        permanent: true,
      },
      {
        source: "/logbooks",
        destination: "/dashboard/logbooks",
        permanent: true,
      },
      {
        source: "/dashboard/logbook",
        destination: "/dashboard/logbooks",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
