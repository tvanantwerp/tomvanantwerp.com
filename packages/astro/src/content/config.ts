import { z, defineCollection } from 'astro:content';

const dataStructuresAndAlgorithms = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		link: z.string().optional(),
	}),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	'ds-and-a': dataStructuresAndAlgorithms,
};
