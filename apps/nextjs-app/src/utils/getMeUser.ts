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

    if (validUserRedirect && meUserRequest.ok && user) {
        redirect(validUserRedirect);
    }

    if (nullUserRedirect && (!meUserRequest.ok || !user)) {
        redirect(nullUserRedirect);
    }

    // Token will exist here because if it doesn't the user will be redirected
    return {
        token: token!,
        user,
    };
};
