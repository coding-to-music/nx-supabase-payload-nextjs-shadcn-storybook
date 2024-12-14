"use client";
import type {Page} from "@my-project/payload";
import type React from "react";
import {useEffect} from "react";

import {CmsLink} from "~/components/utils/CmsLink";
import {Media} from "~/components/utils/Media";
import {RichText} from "~/components/utils/RichText";
import {useHeaderTheme} from "~/theme/header/useHeaderTheme";

export const HighImpactHero: React.FC<Page["hero"]> = ({
    links,
    media,
    richText,
}) => {
    const {setHeaderTheme} = useHeaderTheme();

    useEffect(() => {
        setHeaderTheme("dark");
    });

    return (
        <div
            className={
                "relative -mt-[10.4rem] flex items-center justify-center text-white"
            }
            data-theme={"dark"}
        >
            <div
                className={
                    "container relative z-10 mb-8 flex items-center justify-center"
                }
            >
                <div className={"max-w-[36.5rem] text-center"}>
                    {richText && (
                        <RichText
                            className={"mb-6"}
                            content={richText}
                            enableGutter={false}
                        />
                    )}
                    {Array.isArray(links) && links.length > 0 && (
                        <ul className={"flex justify-center gap-4"}>
                            {links.map(({link}, index) => (
                                <li key={index}>
                                    <CmsLink {...link} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className={"min-h-[80vh] select-none"}>
                {media && typeof media === "object" && (
                    <Media
                        imgClassName={"-z-10 object-cover"}
                        loading={"lazy"}
                        priority={false}
                        resource={media}
                        fill
                    />
                )}
            </div>
        </div>
    );
};
