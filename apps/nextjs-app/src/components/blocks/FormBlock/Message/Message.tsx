import type React from "react";

import {Width} from "../Width";

import {RichText} from "~/components/utils/RichText";

export const Message: React.FC = ({
    message,
}: {
    message: Record<string, any>;
}) => (
    <Width className={"my-12"} width={"100"}>
        {message && <RichText content={message} />}
    </Width>
);
