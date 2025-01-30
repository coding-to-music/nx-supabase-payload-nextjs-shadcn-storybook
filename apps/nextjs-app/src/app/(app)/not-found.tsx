import {Button} from "@my-project/react-components/ui/button";
import Link from "next/link";

import {translation} from "~/i18n/server";

export default async function NotFound() {
    const {t} = await translation();
    return (
        <div className={"container py-28"}>
            <div className={"prose max-w-none"}>
                <h1 style={{marginBottom: 0}}>404</h1>
                <p className={"mb-4"}>{t("notFound")}</p>
            </div>
            <Button variant={"default"} asChild>
                <Link href={"/"}>{t("goHome")}</Link>
            </Button>
        </div>
    );
}
