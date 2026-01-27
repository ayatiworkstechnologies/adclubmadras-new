const nextConfig = {
  output: 'export',
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.admin.adclubmadras.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'www.admin.adclubmadras.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.adclubmadras.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
