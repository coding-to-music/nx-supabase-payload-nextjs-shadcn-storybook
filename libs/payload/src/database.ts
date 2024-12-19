import path from "node:path";
import {fileURLToPath} from "node:url";

import {postgresAdapter} from "@payloadcms/db-postgres";

const getPoolConfig = () => {
    const connectionString = process.env["POSTGRES_URL"];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!connectionString) {
        return {};
    }
    const url = new URL(connectionString);
    if (url.searchParams.has("sslmode")) {
        url.searchParams.delete("sslmode");
        return {
            connectionString: url.toString(),
            ssl: {
                ca: process.env["POSTGRES_CA"],
            },
        };
    }
    return {
        connectionString: url.toString(),
    };
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const database = postgresAdapter({
    pool: getPoolConfig(),
    migrationDir: path.resolve(dirname, "migrations"),
});
