import type {Post} from "@my-project/payload";
import clsx from "clsx";
import type React from "react";

import {Card} from "./Card";

import {RichText} from "~/components/utils/RichText";

export interface RelatedPostsProps {
    className?: string;
    docs?: Post[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
    introContent?: any;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
    const {className, docs, introContent} = props;

    return (
        <div className={clsx("container", className)}>
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
            {introContent && (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
                <RichText content={introContent} enableGutter={false} />
            )}

            <div
                className={
                    "grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8"
                }
            >
                {docs?.map((document_, index) => {
                    if (typeof document_ === "string") return null;

                    return (
                        <Card
                            key={index}
                            doc={document_}
                            relationTo={"posts"}
                            showCategories
                        />
                    );
                })}
            </div>
        </div>
    );
};
