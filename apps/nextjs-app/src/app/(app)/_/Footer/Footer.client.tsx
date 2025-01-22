"use client";

import type {Footer as FooterType} from "@my-project/payload";
import {MainContentMinHeight} from "@my-project/react-components/components/main-content-min-height";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {noHeaderFooterPathnames} from "../noHeaderFooterPathnames";

import {Logo} from "~/components/misc/Logo";
import {CmsLink} from "~/components/utils/CmsLink";
import {ThemeSelector} from "~/theme/ThemeSelector";

export const FooterClient: React.FC<{footer: FooterType}> = ({footer}) => {
    const pathname = usePathname();
    const regionRef = MainContentMinHeight.useRegionRef("footer");

    if (noHeaderFooterPathnames.includes(pathname)) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    const navItems = footer?.navItems || [];

    return (
        <footer
            ref={regionRef}
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
};
