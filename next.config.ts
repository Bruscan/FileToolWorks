import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.filetoolworks.com",
          },
        ],
        destination: "https://filetoolworks.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
