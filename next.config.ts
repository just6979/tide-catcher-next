import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig

module.exports = {
  distDir: "build",
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  allowedDevOrigins: ["merlin", "merlin.local"],
}
