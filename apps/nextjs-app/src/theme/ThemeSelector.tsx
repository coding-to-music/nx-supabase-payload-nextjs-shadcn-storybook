"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@my-project/react-components/ui/select";
import React from "react";

import {themeLocalStorageKey} from "./shared";
import type {Theme} from "./types";
import {useTheme} from "./useTheme";

export const ThemeSelector: React.FC = () => {
    const {setTheme} = useTheme();
    const [value, setValue] = React.useState("");

    const onThemeChange = (themeToSet: Theme & "auto") => {
        if (themeToSet === "auto") {
            setTheme(null);
            setValue("auto");
        } else {
            setTheme(themeToSet);
            setValue(themeToSet);
        }
    };

    React.useEffect(() => {
        const preference =
            globalThis.localStorage.getItem(themeLocalStorageKey);
        setValue(preference ?? "auto");
    }, []);

    return (
        <Select value={value} onValueChange={onThemeChange}>
            <SelectTrigger
                aria-label={"Select a theme"}
                className={
                    "w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
                }
            >
                <SelectValue placeholder={"Theme"} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"auto"}>Auto</SelectItem>
                <SelectItem value={"light"}>Light</SelectItem>
                <SelectItem value={"dark"}>Dark</SelectItem>
            </SelectContent>
        </Select>
    );
};
