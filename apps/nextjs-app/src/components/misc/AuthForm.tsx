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
                                <Button
                                    className={"w-full"}
                                    variant={"outline"}
                                >
                                    <svg
                                        viewBox={"0 0 24 24"}
                                        xmlns={"http://www.w3.org/2000/svg"}
                                    >
                                        <path
                                            d={
                                                "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            }
                                            fill={"currentColor"}
                                        />
                                    </svg>
                                    {signInSignUpText} with Google
                                </Button>
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
                By clicking &ldquo;{signInSignUpText}&rdquo;, you agree to our{" "}
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
