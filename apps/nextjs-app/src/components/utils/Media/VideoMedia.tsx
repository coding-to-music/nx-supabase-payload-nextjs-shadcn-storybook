"use client";

import {cn} from "@my-project/react-components/lib/utils";
import {getClientSideUrl} from "@my-project/utils";
import React from "react";

import type {Props as MediaProps} from "./types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
    const {onClick, resource, videoClassName} = props;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- [bulk suppress]
    const videoRef = React.seRef<HTMLVideoElement>(null);
    // const [showFallback] = useState<boolean>()

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
        const {current: video} = videoRef;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        if (video) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- [bulk suppress]
            video.addEventListener("suspend", () => {
                // setShowFallback(true);
                // console.warn('Video was suspended, rendering fallback image.')
            });
        }
    }, [videoRef]);

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (resource && typeof resource === "object") {
        const {filename} = resource;

        return (
            <video
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
                ref={videoRef}
                className={cn(videoClassName)}
                controls={false}
                autoPlay
                loop
                muted
                playsInline
                onClick={onClick}
            >
                <source src={`${getClientSideUrl()}/media/${filename}`} />
            </video>
        );
    }

    return null;
};
