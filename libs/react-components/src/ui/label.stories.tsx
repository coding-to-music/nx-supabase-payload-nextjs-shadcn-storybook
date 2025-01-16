import type {Meta, StoryObj} from "@storybook/react";

import {Checkbox} from "./checkbox";
import {Label} from "./label";

const meta: Meta<typeof Label> = {
    component: Label,
    title: "Label",
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
    render: () => (
        <div>
            <div className={"flex items-center space-x-2"}>
                <Checkbox id={"terms"} />
                <Label htmlFor={"terms"}>Accept terms and conditions</Label>
            </div>
        </div>
    ),
};
