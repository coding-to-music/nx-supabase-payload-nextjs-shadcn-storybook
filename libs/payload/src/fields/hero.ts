import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type {Field} from "payload";

import {linkGroup} from "../fields/link-group";

const heroField: Field = {
    name: "hero",
    type: "group",
    fields: [
        {
            name: "type",
            type: "select",
            defaultValue: "lowImpact",
            label: "Type",
            options: [
                {
                    label: "None",
                    value: "none",
                },
                {
                    label: "High Impact",
                    value: "highImpact",
                },
                {
                    label: "Medium Impact",
                    value: "mediumImpact",
                },
                {
                    label: "Low Impact",
                    value: "lowImpact",
                },
            ],
            required: true,
        },
        {
            name: "richText",
            type: "richText",
            editor: lexicalEditor({
                features: ({rootFeatures}) => [
                    ...rootFeatures,
                    HeadingFeature({
                        enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ],
            }),
            label: false,
        },
        linkGroup({
            overrides: {
                maxRows: 2,
            },
        }),
        {
            name: "media",
            type: "upload",
            admin: {
                condition: (_, {type} = {}) =>
                    ["highImpact", "mediumImpact"].includes(type),
            },
            relationTo: "media",
            required: true,
        },
    ],
    label: false,
};

type Factory = () => Field;

export const hero: Factory = () => heroField;
