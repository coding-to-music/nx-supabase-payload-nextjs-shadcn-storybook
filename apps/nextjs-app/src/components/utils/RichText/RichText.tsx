import {cn} from "@my-project/react-components/lib/utils";
import type React from "react";

import {serializeLexical} from "./serialize";

interface Props {
    className?: string;
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
            {content &&
                !Array.isArray(content) &&
                typeof content === "object" &&
                "root" in content &&
                serializeLexical({nodes: content?.root?.children})}
        </div>
    );
};
