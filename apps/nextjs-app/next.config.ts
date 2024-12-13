//@ts-check
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, unicorn/prefer-module, @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions */

const {composePlugins, withNx} = require("@nx/next");
const {withPayload} = require("@payloadcms/next/withPayload");

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    images: {
        remotePatterns: [
            NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */,
        ].map((item) => {
            const url = new URL(item);

            return {
                hostname: url.hostname,
                protocol: url.protocol.replace(":", ""),
            };
        }),
    },
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    reactStrictMode: true,
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
    withPayload,
];

module.exports = composePlugins(...plugins)(nextConfig);
