import type {Meta, StoryObj} from "@storybook/react";

import {Button} from "./button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import {Input} from "./input";
import {Label} from "./label";

const meta: Meta<typeof Dialog> = {
    component: Dialog,
    title: "Dialog",
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px]"}>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className={"grid gap-4 py-4"}>
                    <div className={"grid grid-cols-4 items-center gap-4"}>
                        <Label className={"text-right"} htmlFor={"name"}>
                            Name
                        </Label>
                        <Input
                            className={"col-span-3"}
                            defaultValue={"Pedro Duarte"}
                            id={"name"}
                        />
                    </div>
                    <div className={"grid grid-cols-4 items-center gap-4"}>
                        <Label className={"text-right"} htmlFor={"username"}>
                            Username
                        </Label>
                        <Input
                            className={"col-span-3"}
                            defaultValue={"@peduarte"}
                            id={"username"}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type={"submit"}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};
