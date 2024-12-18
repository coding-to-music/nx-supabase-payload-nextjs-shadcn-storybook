import type {Page, Post} from "@my-project/payload";
import {notFound, redirect} from "next/navigation";
import type React from "react";

import {getCachedDocument} from "~/utils/getDocument";
import {getCachedRedirects} from "~/utils/getRedirects";

interface Props {
    disableNotFound?: boolean;
    url: string;
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
    disableNotFound,
    url,
}) => {
    const slug = url.startsWith("/") ? url : url;

    const redirects = await getCachedRedirects()();

    const redirectItem = redirects.find((redirect) => redirect.from === slug);

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (redirectItem) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        if (redirectItem.to?.url) {
            redirect(redirectItem.to.url);
        }

        let redirectUrl: string;

        if (typeof redirectItem.to?.reference?.value === "string") {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
            const collection = redirectItem.to?.reference?.relationTo;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
            const id = redirectItem.to?.reference?.value;

            const document = (await getCachedDocument(collection, id)()) as
                | Page
                | Post;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
            redirectUrl = `${redirectItem.to?.reference?.relationTo === "pages" ? "" : `/${redirectItem.to?.reference?.relationTo}`}/${
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                document?.slug
            }`;
        } else {
            redirectUrl = `${redirectItem.to?.reference?.relationTo === "pages" ? "" : `/${redirectItem.to?.reference?.relationTo}`}/${
                typeof redirectItem.to?.reference?.value === "object"
                    ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                      redirectItem.to?.reference?.value?.slug
                    : ""
            }`;
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        if (redirectUrl) redirect(redirectUrl);
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (disableNotFound) return null;

    notFound();
};
