/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
        },
      ],
      domains: ["files.edgestore.dev"],
    },
  };
  
  export default nextConfig;
  