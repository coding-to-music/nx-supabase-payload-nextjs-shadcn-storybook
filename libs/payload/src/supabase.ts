import {createServerClient} from "@supabase/ssr";
import type {SupabaseClient} from "@supabase/supabase-js";
import {parse as parseCookies} from "cookie";

export const createSupabaseClient = (
    headers: Request["headers"],
): SupabaseClient =>
    createServerClient(
        process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
        process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]!,
        {
            cookies: {
                getAll() {
                    return Object.entries(
                        parseCookies(headers.get("cookie") ?? ""),
                    ).map(([key, value]) => ({
                        name: key,
                        value: value ?? "",
                    }));
                },
                setAll(cookiesToSet) {
                    console.warn(
                        "The `setAll` method was called. Cookies to set:",
                        cookiesToSet,
                    );
                },
            },
        },
    );
