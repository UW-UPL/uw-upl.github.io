import { defineCollection, z } from "astro:content";

// https://docs.astro.build/en/guides/content-collections/

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
  }),
});

const blogs = defineCollection({
  type: "data",
  schema: z.object({
    posts: z.array(
      z.object({
        title: z.string(),
        link: z.string(),
        author: z.string(),
        date: z.string(),
        description: z.string(),
      })
    ),
  }),
});

export const collections = { coordinators, projects, events, blogs };
