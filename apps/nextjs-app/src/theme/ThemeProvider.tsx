"use client";

import {canUseDom} from "@my-project/utils";
import React from "react";

import {ThemeContext} from "./ThemeContext";
import {
    defaultTheme,
    getImplicitPreference,
    themeLocalStorageKey,
} from "./shared";
import type {Theme} from "./types";
import {themeIsValid} from "./types";

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setThemeState] = React.useState<Theme | undefined>(
        canUseDom
            ? (document.documentElement.dataset.theme as Theme)
            : undefined,
    );

    const setTheme = React.useCallback((themeToSet: Theme | null) => {
        if (themeToSet === null) {
            globalThis.localStorage.removeItem(themeLocalStorageKey);
            const implicitPreference = getImplicitPreference();
            document.documentElement.dataset.theme = implicitPreference || "";
            if (implicitPreference) setThemeState(implicitPreference);
        } else {
            setThemeState(themeToSet);
            globalThis.localStorage.setItem(themeLocalStorageKey, themeToSet);
            document.documentElement.dataset.theme = themeToSet;
        }
    }, []);

    React.useEffect(() => {
        let themeToSet: Theme = defaultTheme;
        const preference =
            globalThis.localStorage.getItem(themeLocalStorageKey);

        if (themeIsValid(preference)) {
            themeToSet = preference;
        } else {
            const implicitPreference = getImplicitPreference();

            if (implicitPreference) {
                themeToSet = implicitPreference;
            }
        }

        document.documentElement.dataset.theme = themeToSet;
        setThemeState(themeToSet);
    }, []);

    return (
        <ThemeContext.Provider value={{setTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    );
};
