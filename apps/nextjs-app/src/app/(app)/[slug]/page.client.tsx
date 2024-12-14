"use client";
import React from "react";

import {useHeaderTheme} from "~/theme/header/useHeaderTheme";

const PageClient: React.FC = () => {
    /* Force the header to be dark mode while we have an image behind it */
    const {setHeaderTheme} = useHeaderTheme();

    React.useEffect(() => {
        setHeaderTheme("light");
    }, [setHeaderTheme]);
    return <></>;
};

export default PageClient;
