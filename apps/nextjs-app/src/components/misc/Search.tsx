"use client";
import {Input, Label} from "@my-project/react-components";
import {useRouter} from "next/navigation";
import React from "react";

import {useDebounce} from "~/hooks/useDebounce";

export const Search: React.FC = () => {
    const [value, setValue] = React.useState("");
    const router = useRouter();

    const debouncedValue = useDebounce(value);

    React.useEffect(() => {
        router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ""}`);
    }, [debouncedValue, router]);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Label className={"sr-only"} htmlFor={"search"}>
                    Search
                </Label>
                <Input
                    id={"search"}
                    placeholder={"Search"}
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
