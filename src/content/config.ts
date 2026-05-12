import { defineCollection, z } from "astro:content";

// https://docs.astro.build/en/guides/content-collections/

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    author: z.string(),
  }),
});

const coordinators = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      isActive: z.boolean(),
      emoji: z.string(),
      grade: z.string(),
      image: image(),
      study: z.optional(z.array(z.string())),
      personalLink: z.optional(z.string()),
      github: z.optional(z.string()),
    }),
});

const projects = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      source: z.string(),
      writeup: z.optional(z.string()),
      description: z.string(),
      image: image(),
      authors: z.array(z.string()),
    }),
});

const events = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO 8601 (https://dencode.com/en/date/iso8601)
    link: z.optional(z.string()),
    description: z.string(),
    location: z.optional(z.string()),
  }),
});

export const collections = { blog, coordinators, projects, events };
