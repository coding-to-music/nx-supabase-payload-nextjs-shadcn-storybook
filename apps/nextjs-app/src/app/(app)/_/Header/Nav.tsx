"use client";

import type {Header as HeaderType} from "@my-project/payload";
import {Button} from "@my-project/react-components";
import {CircleUserRoundIcon} from "lucide-react";
import Link from "next/link";
import type React from "react";

import {CommandMenu} from "~/components/misc/CommandMenu";
import {CmsLink} from "~/components/utils/CmsLink";

export const HeaderNav: React.FC<{header: HeaderType}> = ({header}) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    const navItems = header?.navItems || [];

    return (
        <nav className={"flex items-center gap-3"}>
            {navItems.map(({link}, index) => (
                <CmsLink key={index} {...link} appearance={"link"} />
            ))}
            <CommandMenu />
            <Button
                className={"hidden h-8 md:flex dark:text-foreground"}
                variant={"outline"}
                asChild
            >
                <Link href={"/sign-up"}>Sign up</Link>
            </Button>
            <Button className={"hidden h-8 md:flex"} asChild>
                <Link href={"/sign-in"}>Sign in</Link>
            </Button>
            <Button
                className={"h-8 md:hidden"}
                size={"icon"}
                variant={"ghost"}
                asChild
            >
                <Link href={"/sign-in"}>
                    <CircleUserRoundIcon />
                    <span className={"sr-only"}>Sign in</span>
                </Link>
            </Button>
        </nav>
    );
};
