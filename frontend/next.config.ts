import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'us.123rf.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ]
  }
};

export default nextConfig;
