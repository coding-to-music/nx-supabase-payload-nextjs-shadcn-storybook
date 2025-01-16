import {Button} from "@my-project/react-components/ui/button";
import {CircleUserRoundIcon} from "lucide-react";
import Link from "next/link";

export const SignUpInOut = () => (
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
