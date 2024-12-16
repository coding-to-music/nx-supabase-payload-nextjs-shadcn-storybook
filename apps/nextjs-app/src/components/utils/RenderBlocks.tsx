import type {Page} from "@my-project/payload";
import type React from "react";

import {ArchiveBlock} from "~/components/blocks/ArchiveBlock";
import {CallToActionBlock} from "~/components/blocks/CallToActionBlock";
import {ContentBlock} from "~/components/blocks/ContentBlock";
import {FormBlock} from "~/components/blocks/FormBlock";
import {MediaBlock} from "~/components/blocks/MediaBlock";

const blockComponents = {
    archive: ArchiveBlock,
    content: ContentBlock,
    cta: CallToActionBlock,
    formBlock: FormBlock,
    mediaBlock: MediaBlock,
};

export const RenderBlocks: React.FC<{
    blocks: Array<Page["layout"][0]>;
}> = (props) => {
    const {blocks} = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <>
                {blocks.map((block, index) => {
                    const {blockType} = block;

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType];

                        if (Block) {
                            return (
                                <div key={index} className={"my-16"}>
                                    {/* @ts-expect-error */}
                                    <Block {...block} />
                                </div>
                            );
                        }
                    }
                    return null;
                })}
            </>
        );
    }

    return null;
};
