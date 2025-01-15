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

import {SignInWithGoogleButton} from "./SignInWithGoogleButton";

export interface AuthFormProps {
    variant: "signIn" | "signUp";
}

export const AuthForm = ({variant}: AuthFormProps) => {
    const signInSignUpText = {signIn: "Sign in", signUp: "Sign up"}[variant];
    return (
        <div className={"flex flex-col gap-6"}>
            <Card className={"bg-background"}>
                <CardHeader className={"text-center"}>
                    <CardTitle className={"text-xl"}>
                        {signInSignUpText}
                    </CardTitle>
                    <CardDescription>
                        {signInSignUpText} with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className={"grid gap-6"}>
                            <div className={"flex flex-col gap-4"}>
                                <SignInWithGoogleButton />
                            </div>
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
                                    {
                                        {
                                            signIn: "Or continue with",
                                            signUp: "Or sign up with",
                                        }[variant]
                                    }
                                </span>
                            </div>
                            <div className={"grid gap-6"}>
                                <div className={"grid gap-2"}>
                                    <Label htmlFor={"email"}>Email</Label>
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
                                            Password
                                        </Label>
                                        {variant === "signIn" && (
                                            <Link
                                                className={
                                                    "ml-auto text-sm underline-offset-4 hover:underline"
                                                }
                                                href={"/forgot-password"}
                                            >
                                                Forgot your password?
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
                                    {signInSignUpText}
                                </Button>
                            </div>
                            {variant === "signIn" && (
                                <div className={"text-center text-sm"}>
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        className={
                                            "underline underline-offset-4"
                                        }
                                        href={"/sign-up"}
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div
                className={
                    "text-balance text-center text-xs text-muted-foreground"
                }
            >
                By {{signIn: "signing in", signUp: "signing up"}[variant]}, you
                agree to our{" "}
                <Link
                    className={
                        "underline underline-offset-4 hover:text-primary"
                    }
                    href={"/tos"}
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    className={
                        "underline underline-offset-4 hover:text-primary"
                    }
                    href={"/privacy-policy"}
                >
                    Privacy Policy
                </Link>
                .
            </div>
        </div>
    );
};
