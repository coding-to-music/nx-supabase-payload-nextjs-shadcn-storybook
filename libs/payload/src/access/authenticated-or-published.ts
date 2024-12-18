import type {Access} from "payload";

export const authenticatedOrPublished: Access = ({req: {user}}) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (user) {
        return true;
    }

    return {
        _status: {
            equals: "published",
        },
    };
};
