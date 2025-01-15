import Link from "next/link";

import {AuthForm} from "~/components/auth/AuthForm";
import {Logo} from "~/components/misc/Logo";

export default function Page() {
    return (
        <div
            className={
                "flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
            }
        >
            <div className={"flex w-full max-w-sm flex-col gap-6"}>
                <Link
                    className={
                        "flex items-center gap-2 self-center font-medium"
                    }
                    href={"/"}
                >
                    <Logo
                        className={"invert dark:invert-0"}
                        loading={"eager"}
                        priority={"high"}
                    />
                </Link>
            </div>
            <AuthForm variant={"signIn"} />
        </div>
    );
}
