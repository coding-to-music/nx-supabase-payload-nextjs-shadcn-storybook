"use client";

import {MainContentMinHeight} from "@my-project/react-components/components/main-content-min-height";

export const Main = ({children}: {children: React.ReactNode}) => (
    <MainContentMinHeight.Main>{children}</MainContentMinHeight.Main>
);
