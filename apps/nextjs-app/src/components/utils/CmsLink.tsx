import type {Page, Post} from "@my-project/payload";
import {cn} from "@my-project/react-components/lib/utils";
import {Button, type ButtonProps} from "@my-project/react-components/ui/button";
import Link from "next/link";
import type React from "react";

interface CmsLinkType {
    appearance?: "inline" | ButtonProps["variant"];
    children?: React.ReactNode;
    className?: string;
    label?: string | null;
    newTab?: boolean | null;
    reference?: {
        relationTo: "pages" | "posts";
        value: Page | Post | string | number;
    } | null;
    size?: ButtonProps["size"] | null;
    type?: "custom" | "reference" | null;
    url?: string | null;
}

export const CmsLink: React.FC<CmsLinkType> = (props) => {
    const {
        type,
        appearance = "inline",
        children,
        className,
        label,
        newTab,
        reference,
        size: sizeFromProps,
        url,
    } = props;

    const href =
        type === "reference" &&
        typeof reference?.value === "object" &&
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        reference.value.slug
            ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
              `${reference?.relationTo === "pages" ? "" : `/${reference?.relationTo}`}/${
                  reference.value.slug
              }`
            : url;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (!href) return null;

    const size = appearance === "link" ? "clear" : sizeFromProps;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    const newTabProps = newTab
        ? {rel: "noopener noreferrer", target: "_blank"}
        : {};

    /* Ensure we don't break any styles set by richText */
    if (appearance === "inline") {
        return (
            <Link
                className={cn(className)}
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
                href={href || url || ""}
                {...newTabProps}
            >
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                {label && label}
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                {children && children}
            </Link>
        );
    }

    return (
        <Button className={className} size={size} variant={appearance} asChild>
            <Link
                className={cn(className)}
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
                href={href || url || ""}
                {...newTabProps}
            >
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                {label && label}
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                {children && children}
            </Link>
        </Button>
    );
};
