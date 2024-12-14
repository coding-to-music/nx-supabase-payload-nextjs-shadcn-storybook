"use client";
import type React from "react";
import {useEffect} from "react";

import {useHeaderTheme} from "~/theme/header/useHeaderTheme";

const PageClient: React.FC = () => {
    /* Force the header to be dark mode while we have an image behind it */
    const {setHeaderTheme} = useHeaderTheme();

    useEffect(() => {
        setHeaderTheme("dark");
    }, [setHeaderTheme]);
    return <></>;
};

export default PageClient;
