import type React from "react";
import {useTranslation} from "react-i18next";

export const Error: React.FC = () => {
    const {t} = useTranslation();
    return (
        <div className={"mt-2 text-sm text-red-500"}>
            {t("form.field.error.required")}
        </div>
    );
};
