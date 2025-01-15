import type {ZodSchema} from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const zodToFieldJsonSchema = (zodSchema: ZodSchema) => ({
    uri: "a://b/foo.json",
    fileMatch: ["a://b/foo.json"],
    schema: zodToJsonSchema(zodSchema, {
        // required to not get "unknown format" error
        emailStrategy: "pattern:zod",
    }) as never,
});
