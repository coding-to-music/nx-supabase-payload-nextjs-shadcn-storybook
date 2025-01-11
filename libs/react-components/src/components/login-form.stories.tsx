import type {Meta, StoryObj} from "@storybook/react";
import {GalleryVerticalEnd} from "lucide-react";

import {LoginForm} from "./login-form";

const meta: Meta<typeof LoginForm> = {
    component: LoginForm,
    title: "LoginForm",
};
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    render: () => (
        <div
            className={
                "flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
            }
        >
            <div className={"flex w-full max-w-sm flex-col gap-6"}>
                <a
                    className={
                        "flex items-center gap-2 self-center font-medium"
                    }
                    href={"#"}
                >
                    <div
                        className={
                            "flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
                        }
                    >
                        <GalleryVerticalEnd className={"size-4"} />
                    </div>
                    Acme Inc.
                </a>
                <LoginForm />
            </div>
        </div>
    ),
};
