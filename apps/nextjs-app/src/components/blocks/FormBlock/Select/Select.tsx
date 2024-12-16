import {
    Label,
    Select as SelectComponent,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@my-project/react-components";
import type {SelectField} from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {Control, FieldErrorsImpl} from "react-hook-form";
import {Controller} from "react-hook-form";

import {Error} from "../Error";
import {Width} from "../Width";

export const Select: React.FC<
    SelectField & {
        control: Control;
        errors: Partial<FieldErrorsImpl<Record<string, any>>>;
    }
> = ({name, control, errors, label, options, required, width}) => (
    <Width width={width}>
        <Label htmlFor={name}>{label}</Label>
        <Controller
            control={control}
            defaultValue={""}
            name={name}
            render={({field: {onChange, value}}) => {
                const controlledValue = options.find((t) => t.value === value);

                return (
                    <SelectComponent
                        value={controlledValue?.value}
                        onValueChange={(value_) => {
                            onChange(value_);
                        }}
                    >
                        <SelectTrigger className={"w-full"} id={name}>
                            <SelectValue placeholder={label} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(({label, value}) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectComponent>
                );
            }}
            rules={{required}}
        />
        {required && errors[name] && <Error />}
    </Width>
);
