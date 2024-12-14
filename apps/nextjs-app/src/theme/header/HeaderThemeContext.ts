"use client";

import React from "react";

import type {Theme} from "~/theme/types";

export interface ContextType {
    setHeaderTheme: (theme: Theme | null) => void;
    headerTheme?: Theme | null;
}

const initialContext: ContextType = {
    setHeaderTheme: () => null,
    headerTheme: undefined,
};

export const HeaderThemeContext = React.createContext(initialContext);
