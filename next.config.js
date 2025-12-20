/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["example.com", "storage.googleapis.com"],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },
  // 添加安全相关配置
  poweredByHeader: false,
  // 添加国际化配置
  i18n: {
    locales: ["zh-CN", "en"],
    defaultLocale: "zh-CN",
  },
}

module.exports = nextConfig
