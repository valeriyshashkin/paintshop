module.exports = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
  },
  async redirects() {
    return [
      {
        source: "/admin",
        has: [
          {
            type: "cookie",
            key: "auth",
          },
        ],
        permanent: false,
        destination: "/admin/products",
      },
    ];
  },
};
