import {
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    ParagraphFeature,
    UnderlineFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type {Config} from "payload";

export const defaultLexical: Config["editor"] = lexicalEditor({
    features: () => [
        ParagraphFeature(),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
            enabledCollections: ["pages", "posts"],
            fields: ({defaultFields}) => {
                const defaultFieldsWithoutUrl = defaultFields.filter(
                    (field) => {
                        if ("name" in field && field.name === "url")
                            return false;
                        return true;
                    },
                );

                return [
                    ...defaultFieldsWithoutUrl,
                    {
                        name: "url",
                        type: "text",
                        admin: {
                            condition: ({linkType}) => linkType !== "internal",
                        },
                        label: ({t}) => t("fields:enterURL"),
                        required: true,
                    },
                ];
            },
        }),
    ],
});
