import type {Decorator, Parameters} from "@storybook/react";
import React from "react";
import {useDarkMode} from "storybook-dark-mode";

import "./global.css";

export const decorators: Decorator[] = [
    (Story) => {
        const darkMode = useDarkMode();
        React.useEffect(() => {
            const className = darkMode ? "dark" : "light";
            const root = globalThis.document.documentElement;
            root.dataset.theme = className;
            return () => {
                delete root.dataset.theme;
            };
        }, [darkMode]);
        return <Story />;
    },
];

export const parameters: Parameters = {
    darkMode: {
        classTarget: "html",
        stylePreview: true,
    },
};
