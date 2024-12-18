import {revalidateTag} from "next/cache";
import type {CollectionAfterChangeHook} from "payload";

export const revalidateRedirects: CollectionAfterChangeHook = ({
    doc,
    req: {payload},
}) => {
    payload.logger.info("Revalidating redirects");

    revalidateTag("redirects");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- [bulk suppress]
    return doc;
};
