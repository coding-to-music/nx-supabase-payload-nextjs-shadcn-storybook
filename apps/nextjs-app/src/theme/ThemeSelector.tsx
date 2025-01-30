"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@my-project/react-components/ui/select";
import React from "react";
import {useTranslation} from "react-i18next";

import {themeLocalStorageKey} from "./shared";
import type {Theme} from "./types";
import {useTheme} from "./useTheme";

export const ThemeSelector: React.FC = () => {
    const {setTheme} = useTheme();
    const [value, setValue] = React.useState("");
    const {t} = useTranslation();

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
                aria-label={t("theme.ariaLabel")}
                className={
                    "w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
                }
            >
                <SelectValue placeholder={t("theme.label")} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"auto"}>
                    {t("theme.option.system.label")}
                </SelectItem>
                <SelectItem value={"light"}>
                    {t("theme.option.light.label")}
                </SelectItem>
                <SelectItem value={"dark"}>
                    {t("theme.option.dark.label")}
                </SelectItem>
            </SelectContent>
        </Select>
    );
};
