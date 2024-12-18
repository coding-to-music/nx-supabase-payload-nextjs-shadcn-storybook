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
        {nodes?.map((node, index): React.JSX.Element | null => {
            if (node == null) {
                return null;
            }

            if (node.type === "text") {
                let text = (
                    <React.Fragment key={index}>{node.text}</React.Fragment>
                );
                if (node.format & IS_BOLD) {
                    text = <strong key={index}>{text}</strong>;
                }
                if (node.format & IS_ITALIC) {
                    text = <em key={index}>{text}</em>;
                }
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
                if (node.format & IS_UNDERLINE) {
                    text = (
                        <span key={index} style={{textDecoration: "underline"}}>
                            {text}
                        </span>
                    );
                }
                if (node.format & IS_CODE) {
                    text = <code key={index}>{node.text}</code>;
                }
                if (node.format & IS_SUBSCRIPT) {
                    text = <sub key={index}>{text}</sub>;
                }
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
                    if (node?.type === "list" && node?.listType === "check") {
                        for (const item of node.children) {
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

                const blockType = block?.blockType;

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
                        const Tag = node?.tag;
                        return (
                            <Tag key={index} className={"col-start-2"}>
                                {serializedChildren}
                            </Tag>
                        );
                    }
                    case "list": {
                        const Tag = node?.tag;
                        return (
                            <Tag key={index} className={"list col-start-2"}>
                                {serializedChildren}
                            </Tag>
                        );
                    }
                    case "listitem": {
                        return node?.checked == null ? (
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
                                newTab={Boolean(fields?.newTab)}
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
