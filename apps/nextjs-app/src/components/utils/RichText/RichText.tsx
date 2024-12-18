import {cn} from "@my-project/react-components/lib/utils";
import type React from "react";

import {serializeLexical} from "./serialize";

interface Props {
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
    content: Record<string, any>;
    enableGutter?: boolean;
    enableProse?: boolean;
}

export const RichText: React.FC<Props> = ({
    className,
    content,
    enableGutter = true,
    enableProse = true,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (!content) {
        return null;
    }

    return (
        <div
            className={cn(
                {
                    container: enableGutter,
                    "max-w-none": !enableGutter,
                    "prose mx-auto dark:prose-invert": enableProse,
                },
                className,
            )}
        >
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- [bulk suppress] */}
            {content &&
                !Array.isArray(content) &&
                typeof content === "object" &&
                "root" in content &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-member-access -- [bulk suppress]
                serializeLexical({nodes: content?.root?.children})}
        </div>
    );
};
