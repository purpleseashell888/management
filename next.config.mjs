/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],

  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: "http://api.jsonlee.cn/:path*",
      },
    ];
  },
};

export default nextConfig;
