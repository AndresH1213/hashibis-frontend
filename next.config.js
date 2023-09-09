/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'giphy.com',
      'www.greenhousegrower.com',
      'i.pravatar.cc',
      'api-hashibis-bucket-dev.s3.us-east-1.amazonaws.com',
    ],
  },
  crossOrigin: 'anonymous',
};

module.exports = nextConfig;
