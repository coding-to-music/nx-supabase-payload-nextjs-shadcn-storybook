import type {Page} from "@my-project/payload";
import type React from "react";

import {RichText} from "~/components/utils/RichText";

type LowImpactHeroType =
    | {
          children?: React.ReactNode;
          richText?: never;
      }
    | (Omit<Page["hero"], "richText"> & {
          children?: never;
          richText?: Page["hero"]["richText"];
      });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
    children,
    richText,
}) => (
    <div className={"container mt-16"}>
        <div className={"max-w-[48rem]"}>
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress] */}
            {children ||
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                (richText && (
                    <RichText content={richText} enableGutter={false} />
                ))}
        </div>
    </div>
);
