import { defineCollection, z } from "astro:content";

// https://docs.astro.build/en/guides/content-collections/

const blog = defineCollection({
  // Type-check frontmatter using a schema
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    image: z.string().optional(),
    author: z.string(),
  }),
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    location: z.string(),
    description: z.optional(z.string()),
  })
});

const coordinators = defineCollection({
	type: "data",
	schema: z.object(
		{
			name: z.string(),
			isActive: z.boolean(),
			grade: z.string(),
			image: z.string(),
      hover_image: z.optional(z.string()),
			study: z.optional(z.string()),
			personalLink: z.optional(z.string()),
			github: z.optional(z.string()),
			linkedIn: z.optional(z.string()),
			bio: z.optional(z.string()),
		}
	)
})

export const collections = { blog, events, coordinators };
