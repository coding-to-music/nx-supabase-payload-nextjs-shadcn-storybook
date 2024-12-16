import {cn} from "@my-project/react-components/lib/utils";
import type React from "react";

import {Card, type CardPostData} from "~/components/misc/Card";

export interface Props {
    posts: CardPostData[];
}

export const CollectionArchive: React.FC<Props> = (props) => {
    const {posts} = props;

    return (
        <div className={cn("container")}>
            <div>
                <div
                    className={
                        "grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8"
                    }
                >
                    {posts?.map((result, index) => {
                        if (typeof result === "object" && result !== null) {
                            return (
                                <div key={index} className={"col-span-4"}>
                                    <Card
                                        className={"h-full"}
                                        doc={result}
                                        relationTo={"posts"}
                                        showCategories
                                    />
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};
