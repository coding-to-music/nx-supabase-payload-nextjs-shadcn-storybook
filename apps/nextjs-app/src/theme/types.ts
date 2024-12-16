export type Theme = "dark" | "light";

export const themeIsValid = (string: null | string): string is Theme =>
    string ? ["dark", "light"].includes(string) : false;
