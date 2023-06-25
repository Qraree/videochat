/** @type {import('next').NextConfig} */
// import nodeExternals from 'webpack-node-externals'


const nextConfig = {
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.externals = [nodeExternals()];
    //     }
    //
    //     return config;
    // },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
