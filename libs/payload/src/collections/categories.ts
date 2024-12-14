import type {CollectionConfig} from "payload";

import {anyone, authenticated} from "../access";

export const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
    ],
};
