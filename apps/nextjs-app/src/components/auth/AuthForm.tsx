import {Button} from "@my-project/react-components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@my-project/react-components/ui/card";
import {Input} from "@my-project/react-components/ui/input";
import {Label} from "@my-project/react-components/ui/label";
import Link from "next/link";
import {Trans} from "react-i18next/TransWithoutContext";

import {SignInWithGoogleButton} from "./SignInWithGoogleButton";

import {translation} from "~/i18n/server";

export interface AuthFormProps {
    variant: "signIn" | "signUp";
}

export const AuthForm = async ({variant}: AuthFormProps) => {
    const {t} = await translation();
    return (
        <div className={"flex flex-col gap-6"}>
            <Card className={"h-[498px] bg-background"}>
                <CardHeader className={"text-center"}>
                    <CardTitle className={"text-xl"}>
                        {t(`auth.${variant}.form.heading`)}
                    </CardTitle>
                    <CardDescription>
                        {t(`auth.${variant}.form.subheading`)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className={"grid gap-6"}>
                            <SignInWithGoogleButton />
                            <div
                                className={
                                    "relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
                                }
                            >
                                <span
                                    className={
                                        "relative z-10 bg-background px-2 text-muted-foreground"
                                    }
                                >
                                    {t(`auth.${variant}.form.or`)}
                                </span>
                            </div>
                            <div className={"grid gap-6"}>
                                <div className={"grid gap-2"}>
                                    <Label htmlFor={"email"}>
                                        {t(
                                            `auth.${variant}.form.emailInput.label`,
                                        )}
                                    </Label>
                                    <Input
                                        id={"email"}
                                        placeholder={"m@example.com"}
                                        type={"email"}
                                        required
                                    />
                                </div>
                                <div className={"grid gap-2"}>
                                    <div className={"flex items-center"}>
                                        <Label htmlFor={"password"}>
                                            {t(
                                                `auth.${variant}.form.emailInput.label`,
                                            )}
                                        </Label>
                                        {variant === "signIn" && (
                                            <Link
                                                className={
                                                    "ml-auto text-sm underline-offset-4 hover:underline"
                                                }
                                                href={"/forgot-password"}
                                            >
                                                {t(
                                                    "auth.signIn.form.forgotPasswordLinkText",
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id={"password"}
                                        type={"password"}
                                        required
                                    />
                                </div>
                                <Button className={"w-full"} type={"submit"}>
                                    {t(`auth.${variant}.label`)}
                                </Button>
                            </div>
                            {variant === "signIn" && (
                                <Trans
                                    className={"text-center text-sm"}
                                    i18nKey={"auth.signIn.form.signUpLinkText"}
                                    parent={"div"}
                                    t={t}
                                >
                                    Don't have an account?
                                    <Link
                                        className={
                                            "underline underline-offset-4"
                                        }
                                        href={"/sign-up"}
                                    >
                                        Sign up
                                    </Link>
                                </Trans>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Trans
                className={
                    "text-balance text-center text-xs text-muted-foreground"
                }
                i18nKey={`auth.${variant}.form.tosAndPrivacyPolicyLinkText`}
                parent={"div"}
                t={t}
            >
                By signing up, you agree to our
                <Link
                    className={
                        "underline underline-offset-4 hover:text-primary"
                    }
                    href={"/tos"}
                >
                    Terms of Service
                </Link>
                and
                <Link
                    className={
                        "underline underline-offset-4 hover:text-primary"
                    }
                    href={"/privacy-policy"}
                >
                    Privacy Policy
                </Link>
                .
            </Trans>
        </div>
    );
};
