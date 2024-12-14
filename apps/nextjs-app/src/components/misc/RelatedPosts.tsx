import type {Post} from "@my-project/payload";
import clsx from "clsx";
import type React from "react";

import {Card} from "./Card";

import {RichText} from "~/components/utils/RichText";

export interface RelatedPostsProps {
    className?: string;
    docs?: Post[];
    introContent?: any;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
    const {className, docs, introContent} = props;

    return (
        <div className={clsx("container", className)}>
            {introContent && (
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
