import {Checkbox as CheckboxUi, Label} from "@my-project/react-components";
import type {CheckboxField} from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
    FieldErrorsImpl,
    FieldValues,
    UseFormRegister,
} from "react-hook-form";
import {useFormContext} from "react-hook-form";

import {Error} from "../Error";
import {Width} from "../Width";

export const Checkbox: React.FC<
    CheckboxField & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
        errors: Partial<FieldErrorsImpl<Record<string, any>>>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
        getValues: any;
        register: UseFormRegister<FieldValues>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- [bulk suppress]
        setValue: any;
    }
> = ({
    name,
    defaultValue,
    errors,
    label,
    register,
    required: requiredFromProps,
    width,
}) => {
    const props = register(name, {required: requiredFromProps});
    const {setValue} = useFormContext();

    return (
        <Width width={width}>
            <div className={"flex items-center gap-2"}>
                <CheckboxUi
                    defaultChecked={defaultValue}
                    id={name}
                    {...props}
                    onCheckedChange={(checked) => {
                        setValue(props.name, checked);
                    }}
                />
                <Label htmlFor={name}>{label}</Label>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
            {requiredFromProps && errors[name] && <Error />}
        </Width>
    );
};
