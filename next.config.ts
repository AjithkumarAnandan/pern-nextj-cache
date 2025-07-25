import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
  allowedDevOrigins: ["http://localhost:3000", "*localdev:3000"],
};

export default nextConfig;
