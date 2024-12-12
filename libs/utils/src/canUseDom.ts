export const canUseDom = !!(
    typeof globalThis !== "undefined" &&
    "document" in globalThis &&
    "createElement" in globalThis.document
);
