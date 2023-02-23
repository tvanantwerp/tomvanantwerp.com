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
		date: z.string().transform(str => new Date(str)),
		updated: z
			.string()
			.transform(str => new Date(str))
			.optional(),
		emoji: z.string().optional(),
		tags: z.array(z.string()).optional(),
		layout: z.string().optional(),
		image: z
			.string()
			.regex(/^img\/.*\.(?:jpg|jpeg|png|webp|gif|avif)/)
			.optional(),
	}),
});

export const collections = {
	'ds-and-a': dataStructuresAndAlgorithms,
	essays,
};
