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

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
    const checkboxFieldPath = path?.includes(".")
        ? `${path}.${checkboxFieldPathFromProps}`
        : checkboxFieldPathFromProps;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    const {value, setValue} = useField<string>({path: path || field.name});

    const {dispatchFields} = useForm();

    // The value of the checkbox
    // We're using separate useFormFields to minimise re-renders
    const checkboxValue = useFormFields(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        ([fields]) => fields[checkboxFieldPath]?.value as string,
    );

    // The value of the field we're listening to for the slug
    const targetFieldValue = useFormFields(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
        ([fields]) => fields[fieldToUse]?.value as string,
    );

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        if (checkboxValue) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- [bulk suppress]
            event.preventDefault();

            dispatchFields({
                type: "UPDATE",
                path: checkboxFieldPath,
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                value: !checkboxValue,
            });
        },
        [checkboxValue, checkboxFieldPath, dispatchFields],
    );

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
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
                    {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress] */}
                    {checkboxValue ? "Unlock" : "Lock"}
                </Button>
            </div>

            <TextInput
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
                path={path || field.name}
                readOnly={Boolean(readOnly)}
                value={value}
                onChange={setValue}
            />
        </div>
    );
};
