import type {Page} from "@my-project/payload";
import type React from "react";

import {HighImpactHero} from "~/components/heros/HighImpactHero";
import {LowImpactHero} from "~/components/heros/LowImpactHero";
import {MediumImpactHero} from "~/components/heros/MediumImpactHero";

const heroes = {
    highImpact: HighImpactHero,
    lowImpact: LowImpactHero,
    mediumImpact: MediumImpactHero,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    const {type} = props || {};

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (!type || type === "none") return null;

    const HeroToRender = heroes[type];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (!HeroToRender) return null;

    return <HeroToRender {...props} />;
};
