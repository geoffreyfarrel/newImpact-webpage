import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cn"],
    defaultLocale: "en",
  },
};

export default nextConfig;
