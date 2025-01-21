import {redirect} from "next/navigation";
import type React from "react";

export const BeforeLogin: React.FC = () => {
    redirect("/sign-in?return-to=/admin");
};
