import type {Page, Post} from "@my-project/payload";

interface CmsLinkType {
    newTab?: boolean | null;
    reference?: {
        relationTo: "pages" | "posts";
        value: Page | Post | string | number;
    } | null;
    type?: "custom" | "reference" | null;
    url?: string | null;
}

export const useCmsLink = (props: CmsLinkType) => {
    const {type, newTab, reference, url} = props;

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
    const newTabProps = newTab
        ? {rel: "noopener noreferrer", target: "_blank"}
        : {};

    return {
        href,
        newTabProps,
    };
};
