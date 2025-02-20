import type {MediaBlock as MediaBlockProps} from "@my-project/payload";
import {cn} from "@my-project/react-components/lib/utils";
import type {StaticImageData} from "next/image";
import type React from "react";

import {Media} from "~/components/utils/Media";
import {RichText} from "~/components/utils/RichText";

type Props = MediaBlockProps & {
    breakout?: boolean;
    captionClassName?: string;
    className?: string;
    enableGutter?: boolean;
    imgClassName?: string;
    staticImage?: StaticImageData;
    disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
    const {
        captionClassName,
        className,
        enableGutter = true,
        imgClassName,
        media,
        staticImage,
        disableInnerContainer,
    } = props;

    let caption;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (media && typeof media === "object") caption = media.caption;

    return (
        <div
            className={cn(
                "",
                {
                    container: enableGutter,
                },
                className,
            )}
        >
            <Media
                imgClassName={cn(
                    "border border-border rounded-[0.8rem]",
                    imgClassName,
                )}
                resource={media}
                src={staticImage}
            />
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
            {caption && (
                <div
                    className={cn(
                        "mt-6",
                        {
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                            container: !disableInnerContainer,
                        },
                        captionClassName,
                    )}
                >
                    <RichText content={caption} enableGutter={false} />
                </div>
            )}
        </div>
    );
};
