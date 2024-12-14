import {
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@my-project/react-components";
import type {CountryField} from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {Control, FieldErrorsImpl, FieldValues} from "react-hook-form";
import {Controller} from "react-hook-form";

import {Error} from "../Error";
import {Width} from "../Width";

import {countryOptions} from "./options";

export const Country: React.FC<
    CountryField & {
        control: Control;
        errors: Partial<FieldErrorsImpl<Record<string, any>>>;
    }
> = ({name, control, errors, label, required, width}) => (
    <Width width={width}>
        <Label className={""} htmlFor={name}>
            {label}
        </Label>
        <Controller
            control={control}
            defaultValue={""}
            name={name}
            render={({field: {onChange, value}}) => {
                const controlledValue = countryOptions.find(
                    (t) => t.value === value,
                );

                return (
                    <Select
                        value={controlledValue?.value}
                        onValueChange={(value_) => {
                            onChange(value_);
                        }}
                    >
                        <SelectTrigger className={"w-full"} id={name}>
                            <SelectValue placeholder={label} />
                        </SelectTrigger>
                        <SelectContent>
                            {countryOptions.map(({label, value}) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            }}
            rules={{required}}
        />
        {required && errors[name] && <Error />}
    </Width>
);
