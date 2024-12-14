"use client";

import {cn} from "@my-project/react-components/lib/utils";
import {getClientSideUrl} from "@my-project/utils";
import React from "react";

import type {Props as MediaProps} from "./types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
    const {onClick, resource, videoClassName} = props;

    const videoRef = React.seRef<HTMLVideoElement>(null);
    // const [showFallback] = useState<boolean>()

    React.useEffect(() => {
        const {current: video} = videoRef;
        if (video) {
            video.addEventListener("suspend", () => {
                // setShowFallback(true);
                // console.warn('Video was suspended, rendering fallback image.')
            });
        }
    }, []);

    if (resource && typeof resource === "object") {
        const {filename} = resource;

        return (
            <video
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
