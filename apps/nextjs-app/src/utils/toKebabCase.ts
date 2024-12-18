export const toKebabCase = (string: string): string =>
    string
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        ?.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replaceAll(/\s+/g, "-")
        .toLowerCase();
