"use client";

import {QueryClientProvider as QueryClientProvider_} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {queryClient} from "~/queryClient";

export const QueryClientProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    // eslint-disable-next-line react/jsx-pascal-case
    <QueryClientProvider_ client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider_>
);
