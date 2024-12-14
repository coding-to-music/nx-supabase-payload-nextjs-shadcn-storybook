import {getServerSideUrl} from "@my-project/utils";
import {formBuilderPlugin} from "@payloadcms/plugin-form-builder";
import {nestedDocsPlugin} from "@payloadcms/plugin-nested-docs";
import {redirectsPlugin} from "@payloadcms/plugin-redirects";
import {seoPlugin} from "@payloadcms/plugin-seo";
import type {GenerateTitle, GenerateURL} from "@payloadcms/plugin-seo/types";
import {
    FixedToolbarFeature,
    HeadingFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type {Plugin} from "payload";

import {revalidateRedirects} from "./hooks";
import type {Page, Post} from "./payload-types";
import {search} from "./search";

const generateTitle: GenerateTitle<Post | Page> = ({doc}) =>
    doc?.title
        ? `${doc.title} | Payload Website Template`
        : "Payload Website Template";

const generateURL: GenerateURL<Post | Page> = ({doc}) => {
    const url = getServerSideUrl();

    return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
    redirectsPlugin({
        collections: ["pages", "posts"],
        overrides: {
            // @ts-expect-error
            fields: ({defaultFields}) =>
                defaultFields.map((field) => {
                    if ("name" in field && field.name === "from") {
                        return {
                            ...field,
                            admin: {
                                description:
                                    "You will need to rebuild the website when changing this field.",
                            },
                        };
                    }
                    return field;
                }),
            hooks: {
                afterChange: [revalidateRedirects],
            },
        },
    }),
    nestedDocsPlugin({
        collections: ["categories"],
    }),
    seoPlugin({
        generateTitle,
        generateURL,
    }),
    formBuilderPlugin({
        fields: {
            payment: false,
        },
        formOverrides: {
            fields: ({defaultFields}) =>
                defaultFields.map((field) => {
                    if (
                        "name" in field &&
                        field.name === "confirmationMessage"
                    ) {
                        return {
                            ...field,
                            editor: lexicalEditor({
                                features: ({rootFeatures}) => [
                                    ...rootFeatures,
                                    FixedToolbarFeature(),
                                    HeadingFeature({
                                        enabledHeadingSizes: [
                                            "h1",
                                            "h2",
                                            "h3",
                                            "h4",
                                        ],
                                    }),
                                ],
                            }),
                        };
                    }
                    return field;
                }),
        },
    }),
    search,
];
