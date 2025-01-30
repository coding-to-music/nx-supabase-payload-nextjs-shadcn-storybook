"use client";
import {Input} from "@my-project/react-components/ui/input";
import {Label} from "@my-project/react-components/ui/label";
import {useRouter} from "next/navigation";
import React from "react";
import {useTranslation} from "react-i18next";

import {useDebounce} from "~/hooks/useDebounce";

export const SearchInput: React.FC = () => {
    const [value, setValue] = React.useState("");
    const router = useRouter();

    const debouncedValue = useDebounce(value);

    const {t} = useTranslation();

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ""}`);
    }, [debouncedValue, router]);

    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <Label className={"sr-only"} htmlFor={"search"}>
                    {t("search.label")}
                </Label>
                <Input
                    id={"search"}
                    placeholder={t("search.label")}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />
                <button className={"sr-only"} type={"submit"}>
                    submit
                </button>
            </form>
        </div>
    );
};
