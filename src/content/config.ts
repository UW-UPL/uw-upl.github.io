import { defineCollection, z } from "astro:content";

// https://docs.astro.build/en/guides/content-collections/

const coordinators = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    isActive: z.boolean(),
    emoji: z.string(),
    grade: z.string(),
    image: z.string(),
    study: z.optional(z.array(z.string())),
    personalLink: z.optional(z.string()),
    github: z.optional(z.string()),
  }),
});

export const collections = { coordinators };
