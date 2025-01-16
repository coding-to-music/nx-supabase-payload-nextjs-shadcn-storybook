import type {Meta, StoryObj} from "@storybook/react";

import {Checkbox} from "./checkbox";

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
    title: "Checkbox",
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    render: () => (
        <div className={"flex items-center space-x-2"}>
            <Checkbox id={"terms"} />
            <label
                className={
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                }
                htmlFor={"terms"}
            >
                Accept terms and conditions
            </label>
        </div>
    ),
};
