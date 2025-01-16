"use client";

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
import type {DialogProps} from "@radix-ui/react-dialog";
import {Circle, File, Laptop, Moon, SearchIcon, Sun} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";

import {useTheme} from "~/theme/useTheme";

// eslint-disable-next-line unicorn/prevent-abbreviations
const docsConfig = {
    mainNav: [
        {
            title: "Home",
            href: "/",
            external: false,
        },
    ],
    sidebarNav: [
        {
            title: "Getting started",
            items: [
                {title: "Installation", href: "/getting-started/installation"},
                {
                    title: "Configuration",
                    href: "/getting-started/configuration",
                },
                {title: "Usage", href: "/getting-started/usage"},
            ],
        },
    ],
};

export const Search = ({...props}: DialogProps) => {
    const router = useRouter();
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
                {...props}
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
                {...props}
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
                    <CommandGroup heading={"Links"}>
                        {docsConfig.mainNav
                            .filter((navitem) => !navitem.external)
                            .map((navItem) => (
                                <CommandItem
                                    key={navItem.href}
                                    value={navItem.title}
                                    onSelect={() => {
                                        runCommand(() => {
                                            router.push(navItem.href);
                                        });
                                    }}
                                >
                                    <File />
                                    {navItem.title}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    {docsConfig.sidebarNav.map((group) => (
                        <CommandGroup key={group.title} heading={group.title}>
                            {group.items.map((navItem) => (
                                <CommandItem
                                    key={navItem.href}
                                    value={navItem.title}
                                    onSelect={() => {
                                        runCommand(() => {
                                            router.push(navItem.href);
                                        });
                                    }}
                                >
                                    <div
                                        className={
                                            "mr-2 flex h-4 w-4 items-center justify-center"
                                        }
                                    >
                                        <Circle className={"h-3 w-3"} />
                                    </div>
                                    {navItem.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
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
