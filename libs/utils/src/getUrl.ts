/* eslint-disable @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions -- this file is special */

import {canUseDom} from "./canUseDom";

export const getServerSideUrl = () => {
    let url = process.env["NEXT_PUBLIC_SERVER_URL"];

    if (!url && process.env["VERCEL_PROJECT_PRODUCTION_URL"]) {
        return `https://${process.env["VERCEL_PROJECT_PRODUCTION_URL"]}`;
    }

    if (!url) {
        url = "http://localhost:3000";
    }

    return url;
};

export const getClientSideUrl = () => {
    if (canUseDom) {
        const protocol = globalThis.location.protocol;
        const domain = globalThis.location.hostname;
        const port = globalThis.location.port;

        return `${protocol}//${domain}${port ? `:${port}` : ""}`;
    }

    if (process.env["VERCEL_PROJECT_PRODUCTION_URL"]) {
        return `https://${process.env["VERCEL_PROJECT_PRODUCTION_URL"]}`;
    }

    return process.env["NEXT_PUBLIC_SERVER_URL"] || "";
};
