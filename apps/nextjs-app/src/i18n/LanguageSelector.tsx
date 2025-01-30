"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@my-project/react-components/ui/select";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";

import {languages} from "./options";

export const LanguageSelector: React.FC = () => {
    const {t, i18n} = useTranslation();
    const router = useRouter();

    const onLanguageChange = (languageToSet: string) => {
        i18n.changeLanguage(languageToSet)
            .then(() => {
                router.refresh();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Select value={i18n.language} onValueChange={onLanguageChange}>
            <SelectTrigger
                aria-label={t("language.ariaLabel")}
                className={
                    "w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
                }
            >
                <SelectValue placeholder={t("language.label")} />
            </SelectTrigger>
            <SelectContent>
                {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                        {t(`language.option.${language}.label`)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
