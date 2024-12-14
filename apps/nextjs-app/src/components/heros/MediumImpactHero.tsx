import type {Page} from "@my-project/payload";
import type React from "react";

import {CmsLink} from "~/components/utils/CmsLink";
import {Media} from "~/components/utils/Media";
import {RichText} from "~/components/utils/RichText";

export const MediumImpactHero: React.FC<Page["hero"]> = ({
    links,
    media,
    richText,
}) => (
    <div className={""}>
        <div className={"container mb-8"}>
            {richText && (
                <RichText
                    className={"mb-6"}
                    content={richText}
                    enableGutter={false}
                />
            )}

            {Array.isArray(links) && links.length > 0 && (
                <ul className={"flex gap-4"}>
                    {links.map(({link}, index) => (
                        <li key={index}>
                            <CmsLink {...link} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className={"container"}>
            {media && typeof media === "object" && (
                <div>
                    <Media
                        className={"-mx-4 md:-mx-8 2xl:-mx-16"}
                        imgClassName={""}
                        loading={"lazy"}
                        priority={false}
                        resource={media}
                    />
                    {media?.caption && (
                        <div className={"mt-3"}>
                            <RichText
                                content={media.caption}
                                enableGutter={false}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
);
