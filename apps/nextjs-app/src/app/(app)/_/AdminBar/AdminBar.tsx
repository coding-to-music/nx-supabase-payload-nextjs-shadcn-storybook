"use client";

import {cn} from "@my-project/react-components/lib/utils";
import {getClientSideUrl} from "@my-project/utils";
import {useRouter, useSelectedLayoutSegments} from "next/navigation";
import type {PayloadAdminBarProps} from "payload-admin-bar";
import {PayloadAdminBar} from "payload-admin-bar";
import React from "react";

import "./index.scss";

const baseClass = "admin-bar";

const collectionLabels = {
    pages: {
        plural: "Pages",
        singular: "Page",
    },
    posts: {
        plural: "Posts",
        singular: "Post",
    },
    projects: {
        plural: "Projects",
        singular: "Project",
    },
};

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
    adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    const {adminBarProps} = props || {};
    const segments = useSelectedLayoutSegments();
    const [show, setShow] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-magic-numbers -- [bulk suppress]
    const collection = collectionLabels?.[segments?.[1]]
        ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-magic-numbers -- [bulk suppress]
          segments?.[1]
        : "pages";
    const router = useRouter();

    const onAuthChange = React.useCallback((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access -- [bulk suppress]
        setShow(user?.id);
    }, []);

    return (
        <div
            className={cn(baseClass, "bg-black py-2 text-white", {
                block: show,
                hidden: !show,
            })}
        >
            <div className={"container"}>
                <PayloadAdminBar
                    {...adminBarProps}
                    className={"py-2 text-white"}
                    classNames={{
                        controls: "font-medium text-white",
                        logo: "text-white",
                        user: "text-white",
                    }}
                    cmsURL={getClientSideUrl()}
                    collection={collection}
                    collectionLabels={{
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-member-access -- [bulk suppress]
                        plural: collectionLabels[collection]?.plural || "Pages",
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
                        singular:
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-member-access -- [bulk suppress]
                            collectionLabels[collection]?.singular || "Page",
                    }}
                    logo={<Title />}
                    style={{
                        backgroundColor: "transparent",
                        padding: 0,
                        position: "relative",
                        zIndex: "unset",
                    }}
                    onAuthChange={onAuthChange}
                    onPreviewExit={() => {
                        void fetch("/next/exit-preview").then(() => {
                            router.push("/");
                            router.refresh();
                        });
                    }}
                />
            </div>
        </div>
    );
};
