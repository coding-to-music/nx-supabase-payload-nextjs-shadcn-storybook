import type {Post} from "@my-project/payload";
import type React from "react";

import {Media} from "~/components/utils/Media";
import {translation} from "~/i18n/server";

export const PostHero: React.FC<{
    post: Post;
}> = async ({post}) => {
    const {t} = await translation();

    const {
        categories,
        meta: {image: metaImage} = {},
        populatedAuthors,
        publishedAt,
        title,
    } = post;

    return (
        <div className={"relative -mt-32 flex items-end"}>
            <div
                className={
                    "container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]"
                }
            >
                <div
                    className={
                        "col-span-1 col-start-1 md:col-span-2 md:col-start-2"
                    }
                >
                    <div className={"mb-6 text-sm uppercase"}>
                        {t("list", {
                            items: categories
                                ?.map((category) => {
                                    if (
                                        typeof category === "object" &&
                                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                                        category !== null
                                    ) {
                                        const {title: categoryTitle} = category;

                                        const titleToUse =
                                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                                            categoryTitle ||
                                            t("category.untitled");

                                        return titleToUse;
                                    }
                                    return null;
                                })
                                .filter(Boolean),
                        })}
                    </div>

                    <div className={""}>
                        <h1 className={"mb-6 text-3xl md:text-5xl lg:text-6xl"}>
                            {title}
                        </h1>
                    </div>

                    <div
                        className={"flex flex-col gap-4 md:flex-row md:gap-16"}
                    >
                        <div className={"flex flex-col gap-4"}>
                            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                            {populatedAuthors && (
                                <div className={"flex flex-col gap-1"}>
                                    <p className={"text-sm"}>
                                        {t("post.hero.authors.label")}
                                    </p>
                                    {t("list", {
                                        items: populatedAuthors.map(
                                            (author) => author.name,
                                        ),
                                    })}
                                </div>
                            )}
                        </div>
                        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                        {publishedAt && (
                            <div className={"flex flex-col gap-1"}>
                                <p className={"text-sm"}>
                                    {t("post.hero.datePublished.label")}
                                </p>

                                <time dateTime={publishedAt}>
                                    {t("date", {
                                        date: new Date(publishedAt),
                                    })}
                                </time>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={"min-h-[80vh] select-none"}>
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                {metaImage && typeof metaImage !== "string" && (
                    <Media
                        imgClassName={"-z-10 object-cover"}
                        loading={"lazy"}
                        priority={false}
                        resource={metaImage}
                        fill
                    />
                )}
                <div
                    className={
                        "pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent"
                    }
                />
            </div>
        </div>
    );
};
