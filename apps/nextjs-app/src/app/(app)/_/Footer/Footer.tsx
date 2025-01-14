import type {Footer as FooterType} from "@my-project/payload";

import {FooterClient} from "./Footer.client";

import {getCachedGlobal} from "~/utils/getGlobals";

export const Footer = async () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- [bulk suppress]
    const footer: FooterType = await getCachedGlobal("footer", 1)();

    return <FooterClient footer={footer} />;
};
