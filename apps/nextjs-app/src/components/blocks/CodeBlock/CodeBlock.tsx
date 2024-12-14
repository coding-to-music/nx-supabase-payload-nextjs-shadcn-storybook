import type React from "react";

import {CodeBlockClient} from "./CodeBlock.client";

export interface CodeBlockProps {
    code: string;
    language?: string;
    blockType: "code";
}

type Props = CodeBlockProps & {
    className?: string;
};

export const CodeBlock: React.FC<Props> = ({className, code, language}) => (
    <div className={[className, "not-prose"].filter(Boolean).join(" ")}>
        <CodeBlockClient code={code} language={language} />
    </div>
);
