"use client";

import Script from "next/script";
import React from "react";

import {createClient} from "~/supabase/client";

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

declare global {
    interface Window {
        /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#onGoogleLibraryLoad */
        onGoogleLibraryLoad: () => void;
    }
    interface CredentialResponse {
        credential: string;
    }
    /** @link https://developers.google.com/identity/gsi/web/reference/js-reference#client_id */
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
    const google:
        | {
              accounts: {
                  id: {
                      initialize: (idConfig: IdConfiguration) => void;
                      prompt: () => void;
                  };
              };
          }
        | undefined;
}

/** @link https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=environment&environment=client#one-tap-with-nextjs */
export const GoogleOneTap = () => {
    React.useEffect(() => {
        const initializeGoogleOneTap = async () => {
            console.log("Initializing Google One Tap");
            const [nonce, hashedNonce] = await generateNonce();
            console.log("Nonce:", nonce, hashedNonce);

            // check if there's already an existing session before initializing the One Tap UI
            const supabase = createClient();
            const {data, error} = await supabase.auth.getSession();
            if (error != null) {
                console.error("Error getting session", error);
            }
            if (data.session != null) {
                console.log(
                    "Existing Supabase Auth session; Aborting initialization of Google One Tap",
                );
                return;
            }

            /* global google */
            google!.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                callback: (response) => {
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
                            console.log("Session data:", data);
                            console.log(
                                "Successfully signed in with Google One Tap",
                            );

                            // TODO: propagate auth state change
                            debugger;
                        })
                        .catch((error) => {
                            console.error(
                                "Error signing in with Google One Tap",
                                error,
                            );
                        });
                },
                nonce: hashedNonce,
                // with Chrome's removal of third-party cookies, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
                use_fedcm_for_prompt: true,
            });
            google!.accounts.id.prompt(); // Display the One Tap UI
        };
        if (typeof google === "undefined") {
            globalThis.window.onGoogleLibraryLoad = () => {
                initializeGoogleOneTap().catch((error) => {
                    console.error(error);
                });
            };
        } else {
            initializeGoogleOneTap().catch((error) => {
                console.error(error);
            });
        }
    }, []);

    return <Script src={"https://accounts.google.com/gsi/client"} />;
};
