import type {Config} from "@my-project/payload";
import configPromise from "@my-project/payload/config";
import {unstable_cache} from "next/cache";
import {getPayload} from "payload";

type Global = keyof Config["globals"];

const getGlobal = async (slug: Global, depth = 0) => {
    const payload = await getPayload({config: configPromise});

    const global = await payload.findGlobal({
        slug,
        depth,
    });

    return global;
};

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
    unstable_cache(async () => await getGlobal(slug, depth), [slug], {
        tags: [`global_${slug}`],
    });
