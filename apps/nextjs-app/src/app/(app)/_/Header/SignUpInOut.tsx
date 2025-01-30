"use client";

import {Button} from "@my-project/react-components/ui/button";
import {CircleUserRoundIcon, LogOutIcon} from "lucide-react";
import Link from "next/link";
import {useTranslation} from "react-i18next";

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

const SignOut = () => {
    const {t} = useTranslation();
    return (
        <>
            <Button className={"hidden h-8 md:flex"} onClick={signOut}>
                {t("auth.signOut.label")}
            </Button>
            <Button
                className={"h-8 md:hidden"}
                size={"icon"}
                variant={"ghost"}
                onClick={signOut}
            >
                <LogOutIcon />
                <span className={"sr-only"}>{t("auth.signOut.label")}</span>
            </Button>
        </>
    );
};

export const SignUpInOut = () => {
    const {session} = useSupabaseAuth();
    const {t} = useTranslation();
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
                <Link href={"/sign-up"}>{t("auth.signUp.label")}</Link>
            </Button>
            <Button className={"hidden h-8 md:flex"} asChild>
                <Link href={"/sign-in"}>{t("auth.signIn.label")}</Link>
            </Button>
            <Button
                className={"h-8 md:hidden"}
                size={"icon"}
                variant={"ghost"}
                asChild
            >
                <Link href={"/sign-in"}>
                    <CircleUserRoundIcon />
                    <span className={"sr-only"}>{t("auth.signIn.label")}</span>
                </Link>
            </Button>
        </>
    );
};
