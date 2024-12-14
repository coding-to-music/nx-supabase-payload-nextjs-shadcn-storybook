import type {Field} from "payload";

import {deepMerge} from "../utils";

export type LinkAppearances = "default" | "outline";

export const appearanceOptions: Record<
    LinkAppearances,
    {label: string; value: string}
> = {
    default: {
        label: "Default",
        value: "default",
    },
    outline: {
        label: "Outline",
        value: "outline",
    },
};

type Factory = (options?: {
    appearances?: LinkAppearances[] | false;
    disableLabel?: boolean;
    overrides?: Record<string, unknown>;
}) => Field;

export const link: Factory = ({
    appearances,
    disableLabel = false,
    overrides = {},
} = {}) => {
    const linkField: Field = {
        name: "link",
        type: "group",
        admin: {
            hideGutter: true,
        },
        fields: [
            {
                type: "row",
                fields: [
                    {
                        name: "type",
                        type: "radio",
                        admin: {
                            layout: "horizontal",
                            width: "50%",
                        },
                        defaultValue: "reference",
                        options: [
                            {
                                label: "Internal link",
                                value: "reference",
                            },
                            {
                                label: "Custom URL",
                                value: "custom",
                            },
                        ],
                    },
                    {
                        name: "newTab",
                        type: "checkbox",
                        admin: {
                            style: {
                                alignSelf: "flex-end",
                            },
                            width: "50%",
                        },
                        label: "Open in new tab",
                    },
                ],
            },
        ],
    };

    const linkTypes: Field[] = [
        {
            name: "reference",
            type: "relationship",
            admin: {
                condition: (_, siblingData) =>
                    siblingData?.["type"] === "reference",
            },
            label: "Document to link to",
            maxDepth: 1,
            relationTo: ["pages"],
            required: true,
        },
        {
            name: "url",
            type: "text",
            admin: {
                condition: (_, siblingData) => siblingData?.["type"] === "custom",
            },
            label: "Custom URL",
            required: true,
        },
    ];

    if (disableLabel) {
        linkField.fields = [...linkField.fields, ...linkTypes];
    } else {
        linkTypes.map((linkType) => ({
            ...linkType,
            admin: {
                ...linkType.admin,
                width: "50%",
            },
        }));

        linkField.fields.push({
            type: "row",
            fields: [
                ...linkTypes,
                {
                    name: "label",
                    type: "text",
                    admin: {
                        width: "50%",
                    },
                    label: "Label",
                    required: true,
                },
            ],
        });
    }

    if (appearances !== false) {
        let appearanceOptionsToUse = [
            appearanceOptions.default,
            appearanceOptions.outline,
        ];

        if (appearances) {
            appearanceOptionsToUse = appearances.map(
                (appearance) => appearanceOptions[appearance],
            );
        }

        linkField.fields.push({
            name: "appearance",
            type: "select",
            admin: {
                description: "Choose how the link should be rendered.",
            },
            defaultValue: "default",
            options: appearanceOptionsToUse,
        });
    }

    return deepMerge(linkField, overrides);
};
