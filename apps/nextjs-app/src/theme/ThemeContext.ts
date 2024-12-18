/* eslint-disable unicorn/filename-case */
"use client";

import React from "react";

import type {Theme} from "./types";

export interface ThemeContextType {
    setTheme: (theme: Theme | null) => void;
    theme?: Theme | null;
}

const initialContext: ThemeContextType = {
    setTheme: () => null,
    theme: undefined,
};

export const ThemeContext = React.createContext(initialContext);
