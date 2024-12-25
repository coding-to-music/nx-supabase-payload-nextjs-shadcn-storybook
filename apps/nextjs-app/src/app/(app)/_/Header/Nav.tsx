"use client";

import type {Header as HeaderType} from "@my-project/payload";
import {Button} from "@my-project/react-components";
import {SearchIcon} from "lucide-react";
import Link from "next/link";
import type React from "react";

import {CmsLink} from "~/components/utils/CmsLink";

export const HeaderNav: React.FC<{header: HeaderType}> = ({header}) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    const navItems = header?.navItems || [];

    return (
        <nav className={"flex items-center gap-3"}>
            {navItems.map(({link}, index) => (
                <CmsLink key={index} {...link} appearance={"link"} />
            ))}
            <Link href={"/search"}>
                <span className={"sr-only"}>Search</span>
                <SearchIcon className={"w-5 text-primary"} />
            </Link>
            <Button
                className={"dark:text-foreground"}
                variant={"outline"}
                asChild
            >
                <Link href={"/sign-up"}>Sign up</Link>
            </Button>
            <Button asChild>
                <Link href={"/sign-in"}>Sign in</Link>
            </Button>
        </nav>
    );
};
