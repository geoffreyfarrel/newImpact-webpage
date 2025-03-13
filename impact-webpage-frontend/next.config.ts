import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cn"],
    defaultLocale: "en",
    domains: [
      { domain: "example.com", defaultLocale: "en", http: true },
      {
        domain: "example.cn",
        defaultLocale: "cn",
        http: true,
      },
    ],
  },
};

export default nextConfig;
