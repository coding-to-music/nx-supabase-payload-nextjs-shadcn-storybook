import type {CollectionSlug} from "payload";

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    posts: "/posts",
    pages: "",
};

interface Props {
    collection: keyof typeof collectionPrefixMap;
    slug: string;
}

export const generatePreviewPath = ({collection, slug}: Props) => {
    const path = `${collectionPrefixMap[collection]}/${slug}`;

    const parameters = {
        slug,
        collection,
        path,
    };

    const encodedParameters = new URLSearchParams();

    for (const [key, value] of Object.entries(parameters)) {
        encodedParameters.append(key, value);
    }

    return `/next/preview?${encodedParameters.toString()}`;
};
