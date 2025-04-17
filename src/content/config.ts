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

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    projectLink: z.string(),
    description: z.string(),
    image: z.string(),
    authors: z.array(z.string()),
  }),
});

const events = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

export const collections = { coordinators, projects, events };
