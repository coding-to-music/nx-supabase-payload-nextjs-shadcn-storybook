import {revalidateTag} from "next/cache";
import type {GlobalConfig} from "payload";

import {link} from "../fields";

export const Footer: GlobalConfig = {
    slug: "footer",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "navItems",
            type: "array",
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 6,
        },
    ],
    hooks: {
        afterChange: [
            ({doc, req: {payload}}) => {
                payload.logger.info("Revalidating footer");

                revalidateTag("global_footer");

                // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- [bulk suppress]
                return doc;
            },
        ],
    },
};
