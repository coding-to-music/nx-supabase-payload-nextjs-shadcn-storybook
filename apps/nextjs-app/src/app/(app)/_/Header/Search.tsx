"use client";

import type {Header} from "@my-project/payload";
import {cn} from "@my-project/react-components/lib/utils";
import {Button} from "@my-project/react-components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@my-project/react-components/ui/command";
import {Laptop, Moon, SearchIcon, Sun} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";

import {CmsLink} from "~/components/utils/CmsLink";
import {useCmsLink} from "~/hooks/useCmsLink";
import {useTheme} from "~/theme/useTheme";

type CmsLinkCommandItemProps = NonNullable<
    NonNullable<Header["navItems"]>[number]["link"]
> & {
    runCommand: (command: () => unknown) => void;
};

const CmsLinkCommandItem = (props: CmsLinkCommandItemProps) => {
    const router = useRouter();
    const {href, newTabProps} = useCmsLink(props);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!href) {
        return null;
    }
    return (
        <CommandItem
            value={props.label}
            onSelect={() => {
                props.runCommand(() => {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    if (Object.keys(newTabProps).length > 0) {
                        window.open(href, newTabProps.target, newTabProps.rel);
                    } else {
                        router.push(href);
                    }
                });
            }}
        >
            <CmsLink {...props} appearance={"link"} />
        </CommandItem>
    );
};

export const Search = ({header}: {header: Header}) => {
    const [open, setOpen] = React.useState(false);
    const {setTheme} = useTheme();

    React.useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (
                (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
                event.key === "/"
            ) {
                if (
                    (event.target instanceof HTMLElement &&
                        event.target.isContentEditable) ||
                    event.target instanceof HTMLInputElement ||
                    event.target instanceof HTMLTextAreaElement ||
                    event.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                event.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
        };
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                className={cn(
                    "relative hidden h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:flex md:w-40 lg:w-64",
                )}
                variant={"outline"}
                onClick={() => {
                    setOpen(true);
                }}
            >
                <span className={"hidden lg:inline-flex"}>
                    Search documentation...
                </span>
                <span className={"inline-flex lg:hidden"}>Search...</span>
                <kbd
                    className={
                        "pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
                    }
                >
                    <span className={"text-xs"}>⌘</span>K
                </kbd>
            </Button>
            <Button
                className={"md:hidden"}
                size={"icon"}
                variant={"ghost"}
                onClick={() => {
                    setOpen(true);
                }}
            >
                <SearchIcon />
                <span className={"sr-only"}>Search...</span>
            </Button>
            <CommandDialog
                open={open}
                title={"Type a command or search..."}
                onOpenChange={setOpen}
            >
                <CommandInput placeholder={"Type a command or search..."} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading={"Nav items"}>
                        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress] */}
                        {(header?.navItems || []).map(({id, link}) => (
                            <CmsLinkCommandItem
                                key={id}
                                runCommand={runCommand}
                                {...link}
                            />
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={"Theme"}>
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => {
                                    setTheme("light");
                                });
                            }}
                        >
                            <Sun />
                            Light
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => {
                                    setTheme("dark");
                                });
                            }}
                        >
                            <Moon />
                            Dark
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => {
                                    setTheme(null);
                                });
                            }}
                        >
                            <Laptop />
                            System
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};
