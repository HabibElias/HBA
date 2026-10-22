/** @type {import('next').NextConfig} */
const nextConfig = {

  allowedDevOrigins: ["192.168.1.9"],
  outputFileTracingIncludes: {
    "/admin/**": ["./public/gallery/**/*"],
    "/api/admin/media": ["./public/gallery/**/*"],
  },
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? [{
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`,
      search: "",
    }] : [],
  },
};

export default nextConfig;
