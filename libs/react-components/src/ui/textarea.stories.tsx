import type {Meta, StoryObj} from "@storybook/react";

import {Textarea} from "./textarea";

const meta: Meta<typeof Textarea> = {
    component: Textarea,
    title: "Textarea",
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
