import type {CollectionSlug, File, GlobalSlug, Payload} from "payload";

import {contactForm as contactFormData} from "./contactForm";
import {contact as contactPageData} from "./contactPage";
import {home} from "./home";
import {image1} from "./image1";
import {image2} from "./image2";
import {post1} from "./post1";
import {post2} from "./post2";
import {post3} from "./post3";

const collections: CollectionSlug[] = [
    "categories",
    "media",
    "pages",
    "posts",
    "forms",
    "form-submissions",
    "search",
];
const globals: GlobalSlug[] = ["header", "footer"];

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({payload}: {payload: Payload}): Promise<void> => {
    payload.logger.info("Seeding database...");

    // we need to clear the media directory before seeding
    // as well as the collections and globals
    // this is because while `yarn seed` drops the database
    // the custom `/api/seed` endpoint does not

    payload.logger.info("— Clearing media...");
    payload.logger.info("— Clearing collections and globals...");

    // clear the database
    for (const global of globals) {
        await payload.updateGlobal({
            slug: global,
            data: {
                navItems: [],
            },
        });
    }

    for (const collection of collections) {
        await payload.delete({
            collection,
            where: {
                id: {
                    exists: true,
                },
            },
        });
    }

    await payload.delete({
        collection: "pages",
        where: {},
    });

    payload.logger.info("— Seeding demo author and user...");

    await payload.delete({
        collection: "users",
        where: {
            email: {
                equals: "demo-author@payloadcms.com",
            },
        },
    });

    const demoAuthor = await payload.create({
        collection: "users",
        data: {
            email: "demo-author@payloadcms.com",
            name: "Demo Author",
            supabaseUid: "cdfd7a69-44fa-4a8e-a506-abd49a45f0b4",
            supabaseUserMetadata: {
                name: "Demo Author",
                email: "demo-author@payloadcms.com",
            },
        },
    });

    let demoAuthorID: number | string = demoAuthor.id;

    payload.logger.info("— Seeding media...");
    const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] =
        await Promise.all([
            fetchFileByURL(
                "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp",
            ),
            fetchFileByURL(
                "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp",
            ),
            fetchFileByURL(
                "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp",
            ),
            fetchFileByURL(
                "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp",
            ),
        ]);

    const image1Document = await payload.create({
        collection: "media",
        data: image1,
        file: image1Buffer,
    });
    const image2Document = await payload.create({
        collection: "media",
        data: image2,
        file: image2Buffer,
    });
    const image3Document = await payload.create({
        collection: "media",
        data: image2,
        file: image3Buffer,
    });
    const imageHomeDocument = await payload.create({
        collection: "media",
        data: image2,
        file: hero1Buffer,
    });

    payload.logger.info("— Seeding categories...");
    const technologyCategory = await payload.create({
        collection: "categories",
        data: {
            title: "Technology",
        },
    });

    const newsCategory = await payload.create({
        collection: "categories",
        data: {
            title: "News",
        },
    });

    const financeCategory = await payload.create({
        collection: "categories",
        data: {
            title: "Finance",
        },
    });

    await payload.create({
        collection: "categories",
        data: {
            title: "Design",
        },
    });

    await payload.create({
        collection: "categories",
        data: {
            title: "Software",
        },
    });

    await payload.create({
        collection: "categories",
        data: {
            title: "Engineering",
        },
    });

    let image1ID: number | string = image1Document.id;
    let image2ID: number | string = image2Document.id;
    let image3ID: number | string = image3Document.id;
    let imageHomeID: number | string = imageHomeDocument.id;

    if (payload.db.defaultIDType === "text") {
        image1ID = `"${image1Document.id}"`;
        image2ID = `"${image2Document.id}"`;
        image3ID = `"${image3Document.id}"`;
        imageHomeID = `"${imageHomeDocument.id}"`;
        demoAuthorID = `"${demoAuthorID}"`;
    }

    payload.logger.info("— Seeding posts...");

    // Do not create posts with `Promise.all` because we want the posts to be created in order
    // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
    const post1Document = await payload.create({
        collection: "posts",
        data: JSON.parse(
            JSON.stringify({...post1, categories: [technologyCategory.id]})
                .replaceAll('"{{IMAGE_1}}"', String(image1ID))
                .replaceAll('"{{IMAGE_2}}"', String(image2ID))
                .replaceAll('"{{AUTHOR}}"', String(demoAuthorID)),
        ) as never,
    });

    const post2Document = await payload.create({
        collection: "posts",
        data: JSON.parse(
            JSON.stringify({...post2, categories: [newsCategory.id]})
                .replaceAll('"{{IMAGE_1}}"', String(image2ID))
                .replaceAll('"{{IMAGE_2}}"', String(image3ID))
                .replaceAll('"{{AUTHOR}}"', String(demoAuthorID)),
        ) as never,
    });

    const post3Document = await payload.create({
        collection: "posts",
        data: JSON.parse(
            JSON.stringify({...post3, categories: [financeCategory.id]})
                .replaceAll('"{{IMAGE_1}}"', String(image3ID))
                .replaceAll('"{{IMAGE_2}}"', String(image1ID))
                .replaceAll('"{{AUTHOR}}"', String(demoAuthorID)),
        ) as never,
    });

    // update each post with related posts
    await payload.update({
        id: post1Document.id,
        collection: "posts",
        data: {
            relatedPosts: [post2Document.id, post3Document.id],
        },
    });
    await payload.update({
        id: post2Document.id,
        collection: "posts",
        data: {
            relatedPosts: [post1Document.id, post3Document.id],
        },
    });
    await payload.update({
        id: post3Document.id,
        collection: "posts",
        data: {
            relatedPosts: [post1Document.id, post2Document.id],
        },
    });

    payload.logger.info("— Seeding home page...");

    await payload.create({
        collection: "pages",
        data: JSON.parse(
            JSON.stringify(home)
                .replaceAll('"{{IMAGE_1}}"', String(imageHomeID))
                .replaceAll('"{{IMAGE_2}}"', String(image2ID)),
        ) as never,
    });

    payload.logger.info("— Seeding contact form...");

    const contactForm = await payload.create({
        collection: "forms",
        // eslint-disable-next-line unicorn/prefer-structured-clone -- [bulk suppress]
        data: JSON.parse(JSON.stringify(contactFormData)) as never,
    });

    let contactFormID: number | string = contactForm.id;

    if (payload.db.defaultIDType === "text") {
        contactFormID = `"${contactFormID}"`;
    }

    payload.logger.info("— Seeding contact page...");

    const contactPage = await payload.create({
        collection: "pages",
        data: JSON.parse(
            JSON.stringify(contactPageData).replaceAll(
                '"{{CONTACT_FORM_ID}}"',
                String(contactFormID),
            ),
        ) as never,
    });

    payload.logger.info("— Seeding header...");

    await payload.updateGlobal({
        slug: "header",
        data: {
            navItems: [
                {
                    link: {
                        type: "custom",
                        label: "Posts",
                        url: "/posts",
                    },
                },
                {
                    link: {
                        type: "reference",
                        label: "Contact",
                        reference: {
                            relationTo: "pages",
                            value: contactPage.id,
                        },
                    },
                },
            ],
        },
    });

    payload.logger.info("— Seeding footer...");

    await payload.updateGlobal({
        slug: "footer",
        data: {
            navItems: [
                {
                    link: {
                        type: "custom",
                        label: "Admin",
                        url: "/admin",
                    },
                },
                {
                    link: {
                        type: "custom",
                        label: "Source Code",
                        newTab: true,
                        url: "https://github.com/payloadcms/payload/tree/main/templates/website",
                    },
                },
                {
                    link: {
                        type: "custom",
                        label: "Payload",
                        newTab: true,
                        url: "https://payloadcms.com/",
                    },
                },
            ],
        },
    });

    payload.logger.info("Seeded database successfully!");
};

const fetchFileByURL = async (url: string): Promise<File> => {
    const response = await fetch(url, {
        credentials: "include",
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch file from ${url}, status: ${response.status}`,
        );
    }

    const data = await response.arrayBuffer();

    return {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
        name: url.split("/").pop() || `file-${Date.now()}`,
        data: Buffer.from(data),
        mimetype: `image/${url.split(".").pop()}`,
        size: data.byteLength,
    };
};
