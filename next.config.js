/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Prisma nicht bundeln (vermeidet Turbopack-Junction-Fehler unter Windows)
  serverExternalPackages: ['@prisma/client', 'prisma', '.prisma/client', 'bcryptjs'],
};

module.exports = nextConfig;
