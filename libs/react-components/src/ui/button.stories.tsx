import type {Meta, StoryObj} from "@storybook/react";

import {Button} from "./button";

const meta: Meta<typeof Button> = {
    component: Button,
    title: "Button",
    argTypes: {
        variant: {
            control: "inline-radio",
            options: [
                "default",
                "destructive",
                "outline",
                "secondary",
                "ghost",
                "link",
            ],
        },
        size: {
            control: "inline-radio",
            options: ["default", "sm", "lg", "icon", "clear"],
        },
    },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Button",
        variant: "default",
        size: "default",
    },
};
