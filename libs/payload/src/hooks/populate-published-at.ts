import type {CollectionBeforeChangeHook} from "payload";

export const populatePublishedAt: CollectionBeforeChangeHook = ({
    data,
    operation,
    req,
}) => {
    if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        (operation === "create" || operation === "update") &&
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        req.data &&
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        !req.data.publishedAt
    ) {
        const now = new Date();
        return {
            ...data,
            publishedAt: now,
        };
    }

    return data;
};
