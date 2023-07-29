import { z, defineCollection } from 'astro:content';

const sharedSchema = z.object({
	title: z.string(),
	description: z.string(),
});

const standardWritingSchema = sharedSchema
	.extend({
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
			.regex(
				/^\/img\/[\w\-\_\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*\.(?:jpg|jpeg|png|webp|gif|avif)$/,
			)
			.optional(),
		image_alt: z.string().optional(),
		splash_image: z
			.string()
			.regex(
				/^\/img\/[\w\-\_\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*\.(?:jpg|jpeg|png|webp|gif|avif)$/,
			)
			.optional(),
		canonical: z.string().url().optional(),
		use_canonical_url: z.boolean().optional(),
	})
	.refine(
		data => {
			if (data.image && !data.image_alt) {
				return false;
			}
			if (
				data.canonical &&
				(data.use_canonical_url === undefined ||
					data.use_canonical_url === null)
			) {
				return false;
			}
			return true;
		},
		{ message: 'Image alt text is required if an image is provided.' },
	);

export type StandardWritingSchema = z.infer<typeof standardWritingSchema>;

const dataStructuresAndAlgorithms = defineCollection({
	schema: sharedSchema.extend({
		link: z.string().optional(),
	}),
});
const essays = defineCollection({ schema: standardWritingSchema });
const technicalWriting = defineCollection({ schema: standardWritingSchema });
const notes = defineCollection({ schema: standardWritingSchema });
const projects = defineCollection({ schema: standardWritingSchema });

export const collections = {
	'ds-and-a': dataStructuresAndAlgorithms,
	essays,
	'technical-writing': technicalWriting,
	notes,
	projects,
};
