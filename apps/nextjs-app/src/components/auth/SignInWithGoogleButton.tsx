"use client";

import React from "react";

import {renderButtonArgs$} from "./GsiClient";

const defaultGsiButtonConfiguration: Omit<GsiButtonConfiguration, "locale"> = {
    type: "standard",
};

export const SignInWithGoogleButton = ({
    gsiButtonConfiguration = defaultGsiButtonConfiguration,
}: {
    gsiButtonConfiguration?: Omit<GsiButtonConfiguration, "locale">;
}) => {
    const callbackRef = React.useCallback(
        (parent: HTMLElement | null) => {
            if (parent == null) {
                return;
            }
            renderButtonArgs$.next([parent, gsiButtonConfiguration]);
        },
        [gsiButtonConfiguration],
    );
    return <div ref={callbackRef} className={"overflow-hidden rounded"} />;
};
