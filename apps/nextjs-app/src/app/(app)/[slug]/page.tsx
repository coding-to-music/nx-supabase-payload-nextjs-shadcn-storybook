import type {Page as PageType} from "@my-project/payload";
import configPromise from "@my-project/payload/config";
import type {Metadata} from "next";
import {draftMode} from "next/headers";
import {getPayload} from "payload";
import React from "react";

import {homeStatic} from "./_/home-static";
import PageClient from "./page.client";

import {PayloadRedirects} from "~/components/utils/PayloadRedirects";
import {RenderBlocks} from "~/components/utils/RenderBlocks";
import {RenderHero} from "~/components/utils/RenderHero";
import {generateMeta} from "~/utils/generateMeta";

export async function generateStaticParams() {
    const payload = await getPayload({config: configPromise});
    const pages = await payload.find({
        collection: "pages",
        draft: false,
        limit: 1000,
        overrideAccess: false,
        select: {
            slug: true,
        },
    });

    const parameters = pages.docs
        ?.filter((document_) => document_.slug !== "home")
        .map(({slug}) => ({slug}));

    return parameters;
}

interface Args {
    params: Promise<{
        slug?: string;
    }>;
}

export default async function Page({params: parametersPromise}: Args) {
    const {slug = "home"} = await parametersPromise;
    const url = "/" + slug;

    let page: PageType | null;

    page = await queryPageBySlug({
        slug,
    });

    // Remove this code once your website is seeded
    if (!page && slug === "home") {
        page = homeStatic;
    }

    if (!page) {
        return <PayloadRedirects url={url} />;
    }

    const {hero, layout} = page;

    return (
        <article className={"pb-24 pt-16"}>
            <PageClient />
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects url={url} disableNotFound />

            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} />
        </article>
    );
}

export async function generateMetadata({
    params: parametersPromise,
}): Promise<Metadata> {
    const {slug = "home"} = await parametersPromise;
    const page = await queryPageBySlug({
        slug,
    });

    return await generateMeta({doc: page});
}

const queryPageBySlug = React.cache(async ({slug}: {slug: string}) => {
    const {isEnabled: draft} = await draftMode();

    const payload = await getPayload({config: configPromise});

    const result = await payload.find({
        collection: "pages",
        draft,
        limit: 1,
        pagination: false,
        overrideAccess: draft,
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    return result.docs?.[0] || null;
});
