import path from "node:path";
import {fileURLToPath} from "node:url";

import {getServerSideUrl} from "@my-project/utils";
import {postgresAdapter} from "@payloadcms/db-postgres";
import {s3Storage} from "@payloadcms/storage-s3";
import {buildConfig} from "payload";
import sharp from "sharp";

import {Categories, Media, Pages, Posts, Users} from "./collections";
import {defaultLexical} from "./default-lexical";
import {Footer, Header} from "./globals";
import {plugins} from "./plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
            beforeLogin: ["~/components/admin/BeforeLogin"],
            // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
            beforeDashboard: ["~/components/admin/BeforeDashboard"],
        },
        livePreview: {
            breakpoints: [
                {
                    label: "Mobile",
                    name: "mobile",
                    width: 375,
                    height: 667,
                },
                {
                    label: "Tablet",
                    name: "tablet",
                    width: 768,
                    height: 1024,
                },
                {
                    label: "Desktop",
                    name: "desktop",
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },
    collections: [Pages, Posts, Media, Categories, Users],
    globals: [Header, Footer],
    secret: process.env["PAYLOAD_SECRET"]!,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env["POSTGRES_URL"]!,
        },
    }),
    cors: [getServerSideUrl()].filter(Boolean),
    sharp,
    editor: defaultLexical,
    plugins: [
        ...plugins,
        s3Storage({
            collections: {
                media: {
                    prefix: "media",
                },
            },
            bucket: process.env["S3_BUCKET"]!,
            config: {
                forcePathStyle: true, // Important for using Supabase
                credentials: {
                    accessKeyId: process.env["S3_ACCESS_KEY_ID"]!,
                    secretAccessKey: process.env["S3_SECRET_ACCESS_KEY"]!,
                },
                region: process.env["S3_REGION"],
                endpoint: process.env["S3_ENDPOINT"],
            },
        }),
    ],
});
