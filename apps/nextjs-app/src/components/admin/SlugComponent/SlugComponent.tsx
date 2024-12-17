"use client";
import {formatSlug} from "@my-project/utils";
import {
    Button,
    FieldLabel,
    TextInput,
    useField,
    useForm,
    useFormFields,
} from "@payloadcms/ui";
import type {TextFieldClientProps} from "payload";
import React from "react";
import "./index.scss";

type SlugComponentProps = {
    fieldToUse: string;
    checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
    field,
    fieldToUse,
    checkboxFieldPath: checkboxFieldPathFromProps,
    path,
    readOnly: readOnlyFromProps,
}) => {
    const {label} = field;

    const checkboxFieldPath = path?.includes(".")
        ? `${path}.${checkboxFieldPathFromProps}`
        : checkboxFieldPathFromProps;

    const {value, setValue} = useField<string>({path: path || field.name});

    const {dispatchFields} = useForm();

    // The value of the checkbox
    // We're using separate useFormFields to minimise re-renders
    const checkboxValue = useFormFields(
        ([fields]) => fields[checkboxFieldPath]?.value as string,
    );

    // The value of the field we're listening to for the slug
    const targetFieldValue = useFormFields(
        ([fields]) => fields[fieldToUse]?.value as string,
    );

    React.useEffect(() => {
        if (checkboxValue) {
            if (targetFieldValue) {
                const formattedSlug = formatSlug(targetFieldValue);

                if (value !== formattedSlug) setValue(formattedSlug);
            } else {
                if (value !== "") setValue("");
            }
        }
    }, [targetFieldValue, checkboxValue, setValue, value]);

    const handleLock = React.useCallback(
        (event) => {
            event.preventDefault();

            dispatchFields({
                type: "UPDATE",
                path: checkboxFieldPath,
                value: !checkboxValue,
            });
        },
        [checkboxValue, checkboxFieldPath, dispatchFields],
    );

    const readOnly = readOnlyFromProps || checkboxValue;

    return (
        <div className={"field-type slug-field-component"}>
            <div className={"label-wrapper"}>
                <FieldLabel htmlFor={`field-${path}`} label={label} />

                <Button
                    buttonStyle={"none"}
                    className={"lock-button"}
                    onClick={handleLock}
                >
                    {checkboxValue ? "Unlock" : "Lock"}
                </Button>
            </div>

            <TextInput
                path={path || field.name}
                readOnly={Boolean(readOnly)}
                value={value}
                onChange={setValue}
            />
        </div>
    );
};
