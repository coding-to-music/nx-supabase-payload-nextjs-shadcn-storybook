import type {CallToActionBlock as CTABlockProps} from "@my-project/payload";
import type React from "react";

import {CmsLink} from "~/components/utils/CmsLink";
import {RichText} from "~/components/utils/RichText";

export const CallToActionBlock: React.FC<CTABlockProps> = ({
    links,
    richText,
}) => (
    <div className={"container"}>
        <div
            className={
                "flex flex-col gap-8 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between"
            }
        >
            <div className={"flex max-w-[48rem] items-center"}>
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                {richText && (
                    <RichText
                        className={"mb-0"}
                        content={richText}
                        enableGutter={false}
                    />
                )}
            </div>
            <div className={"flex flex-col gap-8"}>
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress] */}
                {(links || []).map(({link}, index) => (
                    <CmsLink key={index} size={"lg"} {...link} />
                ))}
            </div>
        </div>
    </div>
);
