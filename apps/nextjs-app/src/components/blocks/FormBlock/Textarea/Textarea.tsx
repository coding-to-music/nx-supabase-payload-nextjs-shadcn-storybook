import {
    Label,
    Textarea as TextAreaComponent,
} from "@my-project/react-components";
import type {TextField} from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
    FieldErrorsImpl,
    FieldValues,
    UseFormRegister,
} from "react-hook-form";

import {Error} from "../Error";
import {Width} from "../Width";

export const Textarea: React.FC<
    TextField & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
        errors: Partial<FieldErrorsImpl<Record<string, any>>>;
        register: UseFormRegister<FieldValues>;
        rows?: number;
    }
> = ({
    name,
    defaultValue,
    errors,
    label,
    register,
    required: requiredFromProps,
    rows = 3,
    width,
}) => (
    <Width width={width}>
        <Label htmlFor={name}>{label}</Label>

        <TextAreaComponent
            defaultValue={defaultValue}
            id={name}
            rows={rows}
            {...register(name, {required: requiredFromProps})}
        />

        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
        {requiredFromProps && errors[name] && <Error />}
    </Width>
);
