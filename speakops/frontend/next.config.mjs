/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
};

export default nextConfig;
