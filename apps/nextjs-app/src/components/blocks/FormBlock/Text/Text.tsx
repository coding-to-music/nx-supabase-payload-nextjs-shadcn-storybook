import {Input} from "@my-project/react-components/ui/input";
import {Label} from "@my-project/react-components/ui/label";
import type {TextField} from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
    FieldErrorsImpl,
    FieldValues,
    UseFormRegister,
} from "react-hook-form";

import {Error} from "../Error";
import {Width} from "../Width";

export const Text: React.FC<
    TextField & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
        errors: Partial<FieldErrorsImpl<Record<string, any>>>;
        register: UseFormRegister<FieldValues>;
    }
> = ({
    name,
    defaultValue,
    errors,
    label,
    register,
    required: requiredFromProps,
    width,
}) => (
    <Width width={width}>
        <Label htmlFor={name}>{label}</Label>
        <Input
            defaultValue={defaultValue}
            id={name}
            type={"text"}
            {...register(name, {required: requiredFromProps})}
        />
        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
        {requiredFromProps && errors[name] && <Error />}
    </Width>
);
