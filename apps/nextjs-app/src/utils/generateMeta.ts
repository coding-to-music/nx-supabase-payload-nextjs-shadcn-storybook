import type {Page, Post} from "@my-project/payload";
import {getServerSideUrl} from "@my-project/utils";
import type {Metadata} from "next";

import {mergeOpenGraph} from "./mergeOpenGraph";

export const generateMeta = async (args: {
    doc: Partial<Page> | Partial<Post>;
}): Promise<Metadata> => {
    const {doc} = args || {};

    const ogImage =
        typeof doc?.meta?.image === "object" &&
        doc.meta.image !== null &&
        "url" in doc.meta.image &&
        getServerSideUrl();

    const title = doc?.meta?.title
        ? doc?.meta?.title + " | Payload Website Template"
        : "Payload Website Template";

    return {
        description: doc?.meta?.description,
        openGraph: mergeOpenGraph({
            description: doc?.meta?.description || "",
            images: ogImage
                ? [
                      {
                          url: ogImage,
                      },
                  ]
                : undefined,
            title,
            url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
        }),
        title,
    };
};
