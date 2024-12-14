export const toKebabCase = (string: string): string =>
    string
        ?.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replaceAll(/\s+/g, "-")
        .toLowerCase();
