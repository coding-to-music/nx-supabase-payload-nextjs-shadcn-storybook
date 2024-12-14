import {searchPlugin} from "@payloadcms/plugin-search";

import {beforeSyncWithSearch} from "./hooks";
import {searchFields} from "./search-fields";

export const search = searchPlugin({
    collections: ["posts"],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
        fields: ({defaultFields}) => [...defaultFields, ...searchFields],
    },
});
