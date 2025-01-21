/* eslint-disable unicorn/filename-case */
"use client";

import type {Session} from "@supabase/supabase-js";
import React from "react";

interface SupabaseAuthContextType {
    session: Session | null;
}

const initialContext: SupabaseAuthContextType = {
    session: null,
};

export const SupabaseAuthContext =
    React.createContext<SupabaseAuthContextType>(initialContext);
