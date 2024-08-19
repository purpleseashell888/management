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

  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "http://localhost:3000/",
  //         }, // replace this your actual origin
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,DELETE,PATCH,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },

  async rewrites() {
    return [
      {
        source: "/base/captcha",
        destination:
          process.env.NODE_ENV === "development"
            ? "/api"
            : "https://api.jsonlee.cn",
      },
    ];
  },
};

export default nextConfig;
