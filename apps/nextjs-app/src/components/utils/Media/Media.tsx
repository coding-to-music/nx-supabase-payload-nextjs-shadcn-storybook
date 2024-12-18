import React from "react";

import {ImageMedia} from "./ImageMedia";
import {VideoMedia} from "./VideoMedia";
import type {Props} from "./types";

export const Media: React.FC<Props> = (props) => {
    const {className, htmlElement = "div", resource} = props;

    const isVideo =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        typeof resource === "object" && resource?.mimeType?.includes("video");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-explicit-any -- [bulk suppress]
    const Tag = (htmlElement as any) || React.Fragment;

    return (
        <Tag
            {...(htmlElement === null
                ? {}
                : {
                      className,
                  })}
        >
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
            {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
        </Tag>
    );
};
