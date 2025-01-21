import React from "react";

import {SupabaseAuthContext} from "./SupabaseAuthContext";

export const useSupabaseAuth = () => React.useContext(SupabaseAuthContext);
