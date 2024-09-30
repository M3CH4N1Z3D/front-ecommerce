/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itechcolombia.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdsassets.apple.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "photos5.appleinsider.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.apple.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.celudmovil.com.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i02.appmifile.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "consumer.huawei.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pngarts.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gopro.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d34vmoxq6ylzee.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1gb7gicmr8iau.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
