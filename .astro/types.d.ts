declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"a-cautionary-tale-of-amazon-web-service-classes/index.md": {
	id: "a-cautionary-tale-of-amazon-web-service-classes/index.md";
  slug: "a-cautionary-tale-of-amazon-web-service-classes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"artificial-consciousness-and-phenomenology/index.md": {
	id: "artificial-consciousness-and-phenomenology/index.md";
  slug: "artificial-consciousness-and-phenomenology";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"exploiting-github-actions/index.md": {
	id: "exploiting-github-actions/index.md";
  slug: "exploiting-github-actions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"game-design-and-education/index.md": {
	id: "game-design-and-education/index.md";
  slug: "game-design-and-education";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"incorrect-reification/index.md": {
	id: "incorrect-reification/index.md";
  slug: "incorrect-reification";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning-to-code-with-projects/index.md": {
	id: "learning-to-code-with-projects/index.md";
  slug: "learning-to-code-with-projects";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"swe-job-primer.md": {
	id: "swe-job-primer.md";
  slug: "swe-job-primer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-gpt3-to-write-a-blog-post/index.md": {
	id: "using-gpt3-to-write-a-blog-post/index.md";
  slug: "using-gpt3-to-write-a-blog-post";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-i-use-firefox/index.md": {
	id: "why-i-use-firefox/index.md";
  slug: "why-i-use-firefox";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"events": {
"a-combinatorial-problem-reed-nelson.md": {
	id: "a-combinatorial-problem-reed-nelson.md";
  slug: "a-combinatorial-problem-reed-nelson";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"cache-and-memory-friendly-programming-matt-wildman.md": {
	id: "cache-and-memory-friendly-programming-matt-wildman.md";
  slug: "cache-and-memory-friendly-programming-matt-wildman";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"madhacks-fall-2023.md": {
	id: "madhacks-fall-2023.md";
  slug: "madhacks-fall-2023";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"coordinators": {
"ahmet-ahunbay": {
	id: "ahmet-ahunbay";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"anna-sun": {
	id: "anna-sun";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"ben-lash": {
	id: "ben-lash";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"chris-gottwaldt": {
	id: "chris-gottwaldt";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"david-teather": {
	id: "david-teather";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"emily-yao": {
	id: "emily-yao";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"grace-steinmetz": {
	id: "grace-steinmetz";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"ishan-joshi": {
	id: "ishan-joshi";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"jiamu-chai": {
	id: "jiamu-chai";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"michael-berkey": {
	id: "michael-berkey";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"michael-gira": {
	id: "michael-gira";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"michael-noguera": {
	id: "michael-noguera";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"mihir-achyuta": {
	id: "mihir-achyuta";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"nick-winans": {
	id: "nick-winans";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"nico-salm": {
	id: "nico-salm";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"pranav-dronavalli": {
	id: "pranav-dronavalli";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"rahul-rao": {
	id: "rahul-rao";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"rudy-banerjee": {
	id: "rudy-banerjee";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"sam-baumohl": {
	id: "sam-baumohl";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
};
"docs": {
};
"resources": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
