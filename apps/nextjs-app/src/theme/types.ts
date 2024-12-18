export type Theme = "dark" | "light";

export const themeIsValid = (string: null | string): string is Theme =>
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    string ? ["dark", "light"].includes(string) : false;
