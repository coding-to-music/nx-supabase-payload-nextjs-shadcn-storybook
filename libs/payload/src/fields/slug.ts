import {formatSlug} from "@my-project/utils";
import type {CheckboxField, TextField} from "payload";

interface Overrides {
    slugOverrides?: Partial<TextField>;
    checkboxOverrides?: Partial<CheckboxField>;
}

type Factory = (
    fieldToUse?: string,
    overrides?: Overrides,
) => [TextField, CheckboxField];

export const slug: Factory = (fieldToUse = "title", overrides = {}) => {
    const {slugOverrides, checkboxOverrides} = overrides;

    const checkboxField: CheckboxField = {
        name: "slugLock",
        type: "checkbox",
        defaultValue: true,
        admin: {
            hidden: true,
            position: "sidebar",
        },
        ...checkboxOverrides,
    };

    // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
    // @ts-expect-error
    const slugField: TextField = {
        name: "slug",
        type: "text",
        index: true,
        label: "Slug",
        ...slugOverrides,
        hooks: {
            // Kept this in for hook or API based updates
            beforeValidate: [
                ({data, operation, originalDoc, value}) => {
                    if (typeof value === "string") {
                        return formatSlug(value);
                    }

                    if (operation === "create" || !data?.slug) {
                        const fallbackData =
                            data?.[fieldToUse] || data?.[fieldToUse];

                        if (fallbackData && typeof fallbackData === "string") {
                            return formatSlug(fallbackData);
                        }
                    }

                    return value;
                },
            ],
        },
        admin: {
            position: "sidebar",
            ...slugOverrides?.admin,
            components: {
                Field: {
                    path: "~/components/admin/SlugComponent",
                    clientProps: {
                        fieldToUse,
                        checkboxFieldPath: checkboxField.name,
                    },
                },
            },
        },
    };

    return [slugField, checkboxField];
};
