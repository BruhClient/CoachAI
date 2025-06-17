import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "xujuhlihsd.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
