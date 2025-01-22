"use client";
import {Button} from "@my-project/react-components/ui/button";
import {CopyIcon} from "@payloadcms/ui/icons/Copy";
import React from "react";

export const CopyButton = ({code}: {code: string}) => {
    const [text, setText] = React.useState("Copy");

    const updateCopyStatus = () => {
        if (text === "Copy") {
            setText(() => "Copied!");
            setTimeout(() => {
                setText(() => "Copy");
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- [bulk suppress]
            }, 1000);
        }
    };

    return (
        <div className={"flex justify-end align-middle"}>
            <Button
                className={"flex gap-1"}
                variant={"secondary"}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises -- [bulk suppress]
                onClick={async () => {
                    await navigator.clipboard.writeText(code);
                    updateCopyStatus();
                }}
            >
                <p>{text}</p>

                <div className={"h-6 w-6 dark:invert"}>
                    <CopyIcon />
                </div>
            </Button>
        </div>
    );
};
