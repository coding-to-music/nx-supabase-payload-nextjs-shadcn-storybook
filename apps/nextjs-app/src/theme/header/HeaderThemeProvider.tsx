"use client";

import {canUseDom} from "@my-project/utils";
import type React from "react";
import {useCallback, useState} from "react";

import type {Theme} from "../types";

import {HeaderThemeContext} from "./HeaderThemeContext";

export const HeaderThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
        canUseDom
            ? (document.documentElement.dataset.theme as Theme)
            : undefined,
    );

    const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
        setThemeState(themeToSet);
    }, []);

    return (
        <HeaderThemeContext.Provider value={{headerTheme, setHeaderTheme}}>
            {children}
        </HeaderThemeContext.Provider>
    );
};
