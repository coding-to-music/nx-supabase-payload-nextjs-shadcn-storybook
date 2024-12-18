import type {User} from "@my-project/payload";
import {getClientSideUrl} from "@my-project/utils";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const getMeUser = async (args?: {
    nullUserRedirect?: string;
    validUserRedirect?: string;
}): Promise<{
    token: string;
    user: User;
}> => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    const {nullUserRedirect, validUserRedirect} = args || {};
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;

    const meUserRequest = await fetch(`${getClientSideUrl()}/api/users/me`, {
        headers: {
            Authorization: `JWT ${token}`,
        },
    });

    const {
        user,
    }: {
        user: User;
    } = await meUserRequest.json();

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
    if (validUserRedirect && meUserRequest.ok && user) {
        redirect(validUserRedirect);
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- [bulk suppress]
    if (nullUserRedirect && (!meUserRequest.ok || !user)) {
        redirect(nullUserRedirect);
    }

    // Token will exist here because if it doesn't the user will be redirected
    return {
        token: token!,
        user,
    };
};
