import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
        {
            source: '/', // путь, с которого редирект
            destination: '/uk', // куда редирект,
            permanent: true,   // true = 301 редирект, false = 302
        }
    ]
  }
};

export default nextConfig;
