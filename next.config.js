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
      {
        source: "/setting",
        destination: "/dashboard/settings",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/dashboard/settings",
        permanent: true,
      },
      {
        source: "/dashboard/setting",
        destination: "/dashboard/settings",
        permanent: true,
      },
      {
        source: "/onboard",
        destination: "/onboarding",
        permanent: true,
      },
      {
        source: "/onboards",
        destination: "/onboarding",
        permanent: true,
      },
      {
        source: "/board",
        destination: "/onboarding",
        permanent: true,
      },
      {
        source: "/reset",
        destination: "/password-reset",
        permanent: true,
      },
      {
        source: "/reset-password",
        destination: "/password-reset",
        permanent: true,
      },
      {
        source: "/resetpassword",
        destination: "/password-reset",
        permanent: true,
      },
      {
        source: "/passwordreset",
        destination: "/password-reset",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
