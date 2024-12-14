"use client";
import type {Header} from "@my-project/payload";
import Link from "next/link";
import {usePathname} from "next/navigation";
import type React from "react";
import {useEffect, useState} from "react";

import {HeaderNav} from "./Nav";

import {Logo} from "~/components/misc/Logo";
import {useHeaderTheme} from "~/theme/header/useHeaderTheme";

interface HeaderClientProps {
    header: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({header}) => {
    /* Storing the value in a useState to avoid hydration errors */
    const [theme, setTheme] = useState<string | null>(null);
    const {headerTheme, setHeaderTheme} = useHeaderTheme();
    const pathname = usePathname();

    useEffect(() => {
        setHeaderTheme(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerTheme]);

    return (
        <header
            className={"container relative z-20"}
            {...(theme ? {"data-theme": theme} : {})}
        >
            <div className={"flex justify-between border-b border-border py-8"}>
                <Link href={"/"}>
                    <Logo
                        className={"invert dark:invert-0"}
                        loading={"eager"}
                        priority={"high"}
                    />
                </Link>
                <HeaderNav header={header} />
            </div>
        </header>
    );
};
