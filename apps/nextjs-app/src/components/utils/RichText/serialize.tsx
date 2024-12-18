/* eslint-disable unicorn/filename-case */
import type {
    BannerBlock as BannerBlockProps,
    CallToActionBlock as CTABlockProps,
    MediaBlock as MediaBlockProps,
} from "@my-project/payload";
import type {
    DefaultNodeTypes,
    SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import React from "react";

import {
    IS_BOLD,
    IS_CODE,
    IS_ITALIC,
    IS_STRIKETHROUGH,
    IS_SUBSCRIPT,
    IS_SUPERSCRIPT,
    IS_UNDERLINE,
} from "./nodeFormat";

import {BannerBlock} from "~/components/blocks/BannerBlock";
import {CallToActionBlock} from "~/components/blocks/CallToActionBlock";
import {CodeBlock, type CodeBlockProps} from "~/components/blocks/CodeBlock";
import {MediaBlock} from "~/components/blocks/MediaBlock";
import {CmsLink} from "~/components/utils/CmsLink";

export type NodeTypes =
    | DefaultNodeTypes
    | SerializedBlockNode<
          CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps
      >;

interface Props {
    nodes: NodeTypes[];
}

export const serializeLexical = ({nodes}: Props): React.JSX.Element => (
    <>
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress] */}
        {nodes?.map((node, index): React.JSX.Element | null => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
            if (node == null) {
                return null;
            }

            if (node.type === "text") {
                let text = (
                    <React.Fragment key={index}>{node.text}</React.Fragment>
                );
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_BOLD) {
                    text = <strong key={index}>{text}</strong>;
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_ITALIC) {
                    text = <em key={index}>{text}</em>;
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_STRIKETHROUGH) {
                    text = (
                        <span
                            key={index}
                            style={{textDecoration: "line-through"}}
                        >
                            {text}
                        </span>
                    );
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_UNDERLINE) {
                    text = (
                        <span key={index} style={{textDecoration: "underline"}}>
                            {text}
                        </span>
                    );
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_CODE) {
                    text = <code key={index}>{node.text}</code>;
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_SUBSCRIPT) {
                    text = <sub key={index}>{text}</sub>;
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (node.format & IS_SUPERSCRIPT) {
                    text = <sup key={index}>{text}</sup>;
                }

                return text;
            }

            // NOTE: Hacky fix for
            // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
            // which does not return checked: false (only true - i.e. there is no prop for false)
            const serializedChildrenFunction = (
                node: NodeTypes,
            ): React.JSX.Element | null => {
                if (node.children == null) {
                    return null;
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                    if (node?.type === "list" && node?.listType === "check") {
                        for (const item of node.children) {
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                            if ("checked" in item && !item?.checked) {
                                item.checked = false;
                            }
                        }
                    }
                    return serializeLexical({
                        nodes: node.children as NodeTypes[],
                    });
                }
            };

            const serializedChildren =
                "children" in node ? serializedChildrenFunction(node) : "";

            if (node.type === "block") {
                const block = node.fields;

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                const blockType = block?.blockType;

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                if (!block || !blockType) {
                    return null;
                }

                switch (blockType) {
                    case "cta": {
                        return <CallToActionBlock key={index} {...block} />;
                    }
                    case "mediaBlock": {
                        return (
                            <MediaBlock
                                key={index}
                                className={"col-span-3 col-start-1"}
                                imgClassName={"m-0"}
                                {...block}
                                captionClassName={"mx-auto max-w-[48rem]"}
                                enableGutter={false}
                                disableInnerContainer
                            />
                        );
                    }
                    case "banner": {
                        return (
                            <BannerBlock
                                key={index}
                                className={"col-start-2 mb-4"}
                                {...block}
                            />
                        );
                    }
                    case "code": {
                        return (
                            <CodeBlock
                                key={index}
                                className={"col-start-2"}
                                {...block}
                            />
                        );
                    }
                    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- [bulk suppress]
                    default: {
                        return null;
                    }
                }
            } else {
                switch (node.type) {
                    case "linebreak": {
                        return <br key={index} className={"col-start-2"} />;
                    }
                    case "paragraph": {
                        return (
                            <p key={index} className={"col-start-2"}>
                                {serializedChildren}
                            </p>
                        );
                    }
                    case "heading": {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                        const Tag = node?.tag;
                        return (
                            <Tag key={index} className={"col-start-2"}>
                                {serializedChildren}
                            </Tag>
                        );
                    }
                    case "list": {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                        const Tag = node?.tag;
                        return (
                            <Tag key={index} className={"list col-start-2"}>
                                {serializedChildren}
                            </Tag>
                        );
                    }
                    case "listitem": {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                        return node?.checked == null ? (
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                            <li key={index} value={node?.value}>
                                {serializedChildren}
                            </li>
                        ) : (
                            <li
                                key={index}
                                aria-checked={node.checked ? "true" : "false"}
                                className={` ${node.checked ? "" : ""}`}
                                role={"checkbox"}
                                tabIndex={-1}
                                value={node.value}
                            >
                                {serializedChildren}
                            </li>
                        );
                    }
                    case "quote": {
                        return (
                            <blockquote key={index} className={"col-start-2"}>
                                {serializedChildren}
                            </blockquote>
                        );
                    }
                    case "link": {
                        const fields = node.fields;

                        return (
                            <CmsLink
                                key={index}
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
                                newTab={Boolean(fields?.newTab)}
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- [bulk suppress]
                                reference={fields.doc as any}
                                type={
                                    fields.linkType === "internal"
                                        ? "reference"
                                        : "custom"
                                }
                                url={fields.url}
                            >
                                {serializedChildren}
                            </CmsLink>
                        );
                    }

                    default: {
                        return null;
                    }
                }
            }
        })}
    </>
);
