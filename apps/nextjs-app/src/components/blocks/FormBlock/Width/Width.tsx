import type React from "react";

export const Width: React.FC<{
    children: React.ReactNode;
    className?: string;
    width?: number | string;
}> = ({children, className, width}) => (
    <div
        className={className}
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        style={{maxWidth: width ? `${width}%` : undefined}}
    >
        {children}
    </div>
);
