import type {Page, Post} from "@my-project/payload";
import {getServerSideUrl} from "@my-project/utils";
import type {Metadata} from "next";

import {mergeOpenGraph} from "./mergeOpenGraph";

export const generateMeta = async (args: {
    doc: Partial<Page> | Partial<Post>;
    // eslint-disable-next-line @typescript-eslint/require-await -- [bulk suppress]
}): Promise<Metadata> => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    const {doc} = args || {};

    const ogImage =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        typeof doc?.meta?.image === "object" &&
        doc.meta.image !== null &&
        "url" in doc.meta.image &&
        getServerSideUrl();

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
    const title = doc?.meta?.title
        ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
          doc?.meta?.title + " | Payload Website Template"
        : "Payload Website Template";

    return {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        description: doc?.meta?.description,
        openGraph: mergeOpenGraph({
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
            description: doc?.meta?.description || "",
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
            images: ogImage
                ? [
                      {
                          url: ogImage,
                      },
                  ]
                : undefined,
            title,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
            url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
        }),
        title,
    };
};
