"use client";
import type {Header} from "@my-project/payload";
import {MainContentMinHeight} from "@my-project/react-components/components/main-content-min-height";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

import {noHeaderFooterPathnames} from "../noHeaderFooterPathnames";

import {Search} from "./Search";
import {SignUpInOut} from "./SignUpInOut";

import {Logo} from "~/components/misc/Logo";
import {useHeaderTheme} from "~/theme/header/useHeaderTheme";

interface HeaderClientProps {
    header: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({header}) => {
    /* Storing the value in a useState to avoid hydration errors */
    const [theme, setTheme] = React.useState<string | null>(null);
    const {headerTheme, setHeaderTheme} = useHeaderTheme();
    const pathname = usePathname();
    const regionRef = MainContentMinHeight.useRegionRef("header");

    React.useEffect(() => {
        setHeaderTheme(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerTheme]);

    if (noHeaderFooterPathnames.includes(pathname)) {
        return null;
    }

    return (
        <header
            ref={regionRef}
            className={"sticky inset-0 z-20 bg-background"}
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
            {...(theme ? {"data-theme": theme} : {})}
        >
            <div className={"container"}>
                <div
                    className={
                        "flex h-16 items-center justify-between border-b border-border"
                    }
                >
                    <Link href={"/"}>
                        <Logo
                            className={"invert dark:invert-0"}
                            loading={"eager"}
                            priority={"high"}
                        />
                    </Link>
                    <nav className={"flex items-center gap-3"}>
                        <Search header={header} />
                        <SignUpInOut />
                    </nav>
                </div>
            </div>
        </header>
    );
};
