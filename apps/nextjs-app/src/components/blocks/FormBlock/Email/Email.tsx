import {Input, Label} from "@my-project/react-components";
import type {EmailField} from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
    FieldErrorsImpl,
    FieldValues,
    UseFormRegister,
} from "react-hook-form";

import {Error} from "../Error";
import {Width} from "../Width";

export const Email: React.FC<
    EmailField & {
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
            {...register(name, {
                pattern: /^\S[^\s@]*@\S+$/,
                required: requiredFromProps,
            })}
        />

        {requiredFromProps && errors[name] && <Error />}
    </Width>
);
