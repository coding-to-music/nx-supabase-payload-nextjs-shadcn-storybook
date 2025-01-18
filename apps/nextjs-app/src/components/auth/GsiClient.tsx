"use client";

import {usePathname} from "next/navigation";
import Script from "next/script";
import React from "react";
import {ReplaySubject, combineLatestWith} from "rxjs";

import {createClient} from "~/supabase/client";

declare global {
    interface Window {
        /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#onGoogleLibraryLoad */
        onGoogleLibraryLoad: () => void;
    }
    interface CredentialResponse {
        credential: string;
    }
    /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration */
    interface IdConfiguration {
        /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#client_id */
        client_id: string;
        /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#callback */
        callback?: (response: CredentialResponse) => void;
        /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#nonce */
        nonce?: string;
        /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#use_fedcm_for_prompt */
        use_fedcm_for_prompt?: boolean;
    }
    /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton */
    interface GsiButtonConfiguration {
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#type
         */
        type: "standard" | "icon";
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#theme
         * @default "outline"
         */
        theme?: "outline" | "filled_blue" | "filled_black";
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#size
         * @default "large"
         */
        size?: "large" | "medium" | "small";
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#text
         * @default "signup_with"
         */
        text?: "signin_with" | "signup_with" | "continue_with" | "signin";
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#shape
         * @default "rectangular"
         */
        shape?: "rectangular" | "pill" | "circle" | "square";
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment
         * @default "left"
         */
        logo_alignment?: "left" | "center";
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#width
         */
        width?: string;
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#locale
         */
        locale?: string;
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#click_listener
         */
        click_listener?: () => void;
        /**
         * @link https://developers.google.com/identity/gsi/web/reference/js-reference#state
         */
        state?: string;
    }
    const google:
        | {
              accounts: {
                  id: {
                      initialize: (idConfig: IdConfiguration) => void;
                      prompt: () => void;
                      renderButton: (
                          parent: HTMLElement,
                          options: GsiButtonConfiguration,
                      ) => void;
                  };
              };
          }
        | undefined;
}

export const google$ = new ReplaySubject<NonNullable<typeof google>>(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    1,
);

export const renderButtonArgs$ = new ReplaySubject<
    [HTMLElement, GsiButtonConfiguration]
>(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    1,
);

/** Generate nonce to use for Google ID token sign-in */
const generateNonce = async () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const nonce = btoa(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        String.fromCodePoint(...crypto.getRandomValues(new Uint8Array(32))),
    );
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
    const hashArray = [...new Uint8Array(hashBuffer)];
    const hashedNonce = hashArray
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return [nonce, hashedNonce];
};

const initializeGsiClient = async () => {
    await new Promise<void>((resolve) => {
        if (typeof google === "undefined") {
            globalThis.window.onGoogleLibraryLoad = () => {
                resolve();
            };
        } else {
            resolve();
        }
    });
    const [nonce, hashedNonce] = await generateNonce();

    /* global google */
    google!.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (response) => {
            const supabase = createClient();
            supabase.auth
                .signInWithIdToken({
                    provider: "google",
                    token: response.credential,
                    nonce,
                })
                .then(({data, error}) => {
                    if (error != null) {
                        throw error;
                    }
                    console.log("Successfully signed in with Google", data);

                    // TODO: propagate auth state change
                })
                .catch((error) => {
                    console.error("Error signing in with Google", error);
                });
        },
        nonce: hashedNonce,
        // with Chrome's removal of third-party cookies, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
        use_fedcm_for_prompt: true,
    });
    google$.next(google!);
};

const oneTapBlacklist = new Set(["/sign-in", "/sign-up"]);

const GoogleOneTap = () => {
    const [prompted, setPrompted] = React.useState(false);
    const pathname = usePathname();
    React.useEffect(() => {
        if (oneTapBlacklist.has(pathname) || prompted) {
            return;
        }
        const prompt = google$.subscribe((google) => {
            google.accounts.id.prompt();
            setPrompted(true);
        });
        return () => {
            prompt.unsubscribe();
        };
    }, [prompted, pathname]);
    return null;
};

export const GsiClient = () => {
    React.useEffect(() => {
        initializeGsiClient().catch((error) => {
            console.error(error);
        });
        const renderButton = google$
            .pipe(combineLatestWith(renderButtonArgs$))
            .subscribe(([google, [parent, options]]) => {
                google.accounts.id.renderButton(parent, {
                    ...options,
                    locale: "en",
                    // TODO: react to parent width changes
                    width: Math.floor(
                        parent.getBoundingClientRect().width,
                    ).toString(),
                });
            });
        return () => {
            renderButton.unsubscribe();
        };
    }, []);
    return (
        <>
            <Script src={"https://accounts.google.com/gsi/client?hl=en"} />
            <GoogleOneTap />
        </>
    );
};
