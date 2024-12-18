import {getServerSideUrl} from "@my-project/utils";
import type {Metadata} from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
    type: "website",
    description: "An open-source website built with Payload and Next.js.",
    images: [
        {
            url: `${getServerSideUrl()}/website-template-OG.webp`,
        },
    ],
    siteName: "Payload Website Template",
    title: "Payload Website Template",
};

export const mergeOpenGraph = (
    og?: Metadata["openGraph"],
): Metadata["openGraph"] => ({
    ...defaultOpenGraph,
    ...og,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, unicorn/prefer-logical-operator-over-ternary -- [bulk suppress]
    images: og?.images ? og.images : defaultOpenGraph.images,
});
