import type {CollectionAfterReadHook} from "payload";

import type {Post, User} from "../../../payload-types";

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook<Post> = async ({
    doc,
    req,
    req: {payload},
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (doc?.authors) {
        const authorDocuments: User[] = [];

        for (const author of doc.authors) {
            const authorDocument = await payload.findByID({
                id:
                    typeof author === "object"
                        ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                          author?.id
                        : author,
                collection: "users",
                depth: 0,
                req,
            });

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
            if (authorDocument) {
                authorDocuments.push(authorDocument);
            }
        }

        // @ts-expect-error TODO
        doc.populatedAuthors = authorDocuments.map((authorDocument) => ({
            id: authorDocument.id,
            name: authorDocument.name,
        }));
    }

    return doc;
};
