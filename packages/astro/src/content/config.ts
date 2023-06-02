import { z, defineCollection } from 'astro:content';

const standardWritingSchema = {
	schema: z
		.object({
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
			image_alt: z.string().optional(),
			splash_image: z
				.string()
				.regex(/^img\/.*\.(?:jpg|jpeg|png|webp|gif|avif)/)
				.optional(),
			use_canonical_url: z.boolean().optional(),
		})
		.refine(
			data => {
				if (data.image && !data.image_alt) {
					return false;
				}
				return true;
			},
			{ message: 'Image alt text is required if an image is provided.' },
		),
};

const dataStructuresAndAlgorithms = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		link: z.string().optional(),
	}),
});
const essays = defineCollection(standardWritingSchema);
const technicalWriting = defineCollection(standardWritingSchema);
const notes = defineCollection(standardWritingSchema);

export const collections = {
	'ds-and-a': dataStructuresAndAlgorithms,
	essays,
	'technical-writing': technicalWriting,
	notes,
};
