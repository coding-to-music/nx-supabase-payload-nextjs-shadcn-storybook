import {createServerClient} from "@supabase/ssr";
import type {SupabaseClient} from "@supabase/supabase-js";
import {parse as parseCookies, serialize as serializeCookies} from "cookie";

export const createSupabaseClient = (
    requestHeaders: Headers,
    responseHeaders: Headers,
): SupabaseClient =>
    createServerClient(
        process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
        process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]!,
        {
            cookies: {
                getAll() {
                    return Object.entries(
                        parseCookies(requestHeaders.get("cookie") ?? ""),
                    ).map(([key, value]) => ({
                        name: key,
                        value: value ?? "",
                    }));
                },
                setAll(cookiesToSet) {
                    for (const cookie of cookiesToSet) {
                        responseHeaders.append(
                            "set-cookie",
                            serializeCookies(
                                cookie.name,
                                cookie.value,
                                cookie.options,
                            ),
                        );
                    }
                },
            },
        },
    );
