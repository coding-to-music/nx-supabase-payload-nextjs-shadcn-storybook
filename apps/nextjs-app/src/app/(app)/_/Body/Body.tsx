"use client";

import {MainContentMinHeight} from "@my-project/react-components/components/main-content-min-height";
import {usePathname} from "next/navigation";

import {initialRegionHeights} from "../initialRegionHeights";
import {noHeaderFooterPathnames} from "../noHeaderFooterPathnames";

export const Body = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();
    return (
        <MainContentMinHeight.Provider
            initialRegionHeights={
                noHeaderFooterPathnames.includes(pathname)
                    ? undefined
                    : initialRegionHeights
            }
        >
            <MainContentMinHeight.Body>{children}</MainContentMinHeight.Body>
        </MainContentMinHeight.Provider>
    );
};
