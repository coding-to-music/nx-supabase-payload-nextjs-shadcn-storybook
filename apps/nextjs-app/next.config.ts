//@ts-check
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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
    redirects: async () => [
        {
            destination: "/ie-incompatible.html",
            has: [
                {
                    type: "header",
                    key: "user-agent",
                    value: "(.*Trident.*)", // all ie browsers
                },
            ],
            permanent: false,
            source: "/:path((?!ie-incompatible.html$).*)", // all pages except the incompatibility page
        },
    ],
    typescript: {
        ignoreBuildErrors: true,
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
    withPayload,
];

module.exports = composePlugins(...plugins)(nextConfig);
