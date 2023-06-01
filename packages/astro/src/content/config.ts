import { z, defineCollection } from 'astro:content';

const dataStructuresAndAlgorithms = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		link: z.string().optional(),
	}),
});
const essays = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z
			.string()
			.or(z.date())
			.transform(val => new Date(val)),
		updated: z
			.string()
			.optional()
			.transform(str => (str ? new Date(str) : undefined)),
		emoji: z.string().optional(),
		tags: z.array(z.string()).optional(),
		layout: z.string().optional(),
		image: z
			.string()
			.regex(/^img\/.*\.(?:jpg|jpeg|png|webp|gif|avif)/)
			.optional(),
		splash: z.boolean().optional(),
	}),
});

const technicalWriting = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z
			.string()
			.or(z.date())
			.transform(val => new Date(val)),
		updated: z
			.string()
			.optional()
			.transform(str => (str ? new Date(str) : undefined)),
		emoji: z.string().optional(),
		tags: z.array(z.string()).optional(),
		layout: z.string().optional(),
		image: z
			.string()
			.regex(/^img\/.*\.(?:jpg|jpeg|png|webp|gif|avif)/)
			.optional(),
		splash: z.boolean().optional(),
		use_canonical_url: z.boolean().optional(),
	}),
});

export const collections = {
	'ds-and-a': dataStructuresAndAlgorithms,
	essays,
	'technical-writing': technicalWriting,
};
