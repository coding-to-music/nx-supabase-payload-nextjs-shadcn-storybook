import type {Footer} from "@my-project/payload";
import Link from "next/link";
import React from "react";

import {Logo} from "~/components/misc/Logo";
import {CmsLink} from "~/components/utils/CmsLink";
import {ThemeSelector} from "~/theme/ThemeSelector";
import {getCachedGlobal} from "~/utils/getGlobals";

export async function Footer() {
    const footer: Footer = await getCachedGlobal("footer", 1)();

    const navItems = footer?.navItems || [];

    return (
        <footer
            className={
                "border-t border-border bg-black text-white dark:bg-card"
            }
        >
            <div
                className={
                    "container flex flex-col gap-8 py-8 md:flex-row md:justify-between"
                }
            >
                <Link className={"flex items-center"} href={"/"}>
                    <Logo />
                </Link>

                <div
                    className={
                        "flex flex-col-reverse items-start gap-4 md:flex-row md:items-center"
                    }
                >
                    <ThemeSelector />
                    <nav className={"flex flex-col gap-4 md:flex-row"}>
                        {navItems.map(({link}, index) => (
                            <CmsLink
                                key={index}
                                className={"text-white"}
                                {...link}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
