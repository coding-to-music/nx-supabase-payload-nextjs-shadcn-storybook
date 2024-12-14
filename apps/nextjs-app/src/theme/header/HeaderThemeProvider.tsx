"use client";

import {canUseDom} from "@my-project/utils";
import React from "react";

import type {Theme} from "../types";

import {HeaderThemeContext} from "./HeaderThemeContext";

export const HeaderThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [headerTheme, setThemeState] = React.useState<
        Theme | undefined | null
    >(
        canUseDom
            ? (document.documentElement.dataset.theme as Theme)
            : undefined,
    );

    const setHeaderTheme = React.useCallback((themeToSet: Theme | null) => {
        setThemeState(themeToSet);
    }, []);

    return (
        <HeaderThemeContext.Provider value={{headerTheme, setHeaderTheme}}>
            {children}
        </HeaderThemeContext.Provider>
    );
};
