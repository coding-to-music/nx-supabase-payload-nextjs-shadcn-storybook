import type React from "react";

import {Width} from "../Width";

import {RichText} from "~/components/utils/RichText";

export const Message: React.FC = ({
    message,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
    message: Record<string, any>;
}) => (
    <Width className={"my-12"} width={"100"}>
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
        {message && <RichText content={message} />}
    </Width>
);
