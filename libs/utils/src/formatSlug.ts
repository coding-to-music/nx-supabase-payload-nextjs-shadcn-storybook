export const formatSlug = (value: string) =>
    value
        .replaceAll(" ", "-")
        .replaceAll(/[^\w-]+/g, "")
        .toLowerCase();
