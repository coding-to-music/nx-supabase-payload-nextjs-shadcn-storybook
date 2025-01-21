"use client";

import {Button} from "@my-project/react-components/ui/button";
import {CircleUserRoundIcon, LogOutIcon} from "lucide-react";
import Link from "next/link";

import {createClient} from "~/supabase/client";
import {useSupabaseAuth} from "~/supabase/useSupabaseAuth";

const signOut = () => {
    const supabase = createClient();
    supabase.auth
        .signOut({scope: "local"})
        .then(({error}) => {
            if (error != null) {
                throw error;
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

const SignOut = () => (
    <>
        <Button className={"hidden h-8 md:flex"} onClick={signOut}>
            Sign out
        </Button>
        <Button
            className={"h-8 md:hidden"}
            size={"icon"}
            variant={"ghost"}
            onClick={signOut}
        >
            <LogOutIcon />
            <span className={"sr-only"}>Sign out</span>
        </Button>
    </>
);

export const SignUpInOut = () => {
    const {session} = useSupabaseAuth();
    if (session != null) {
        return <SignOut />;
    }
    return (
        <>
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
        </>
    );
};
