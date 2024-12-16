import type {Header} from "@my-project/payload";

import {HeaderClient} from "./Header.client";

import {getCachedGlobal} from "~/utils/getGlobals";

export async function Header() {
    const header: Header = await getCachedGlobal("header", 1)();

    return <HeaderClient header={header} />;
}
