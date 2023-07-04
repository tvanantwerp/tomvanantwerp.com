import type { StandardWritingSchema } from '../../content/config';

interface Props {
	name: string;
	posts: { slug: string; data: StandardWritingSchema }[];
}

function slugify(str: string) {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}

export function FeaturedCollection({ name: collection, posts }: Props) {
	return (
		<div className="writing__collection">
			<h2
				id="{{ collection | slugify }}"
				tabIndex="-1"
				className="writing__collection__title"
			>
				<a className="header-anchor" href={`#${slugify(collection)}`}>
					<span>{collection}</span>
				</a>
			</h2>
			<ul className="writing__collection__list">
				{posts
					.sort((a, b) =>
						a.data.title.localeCompare(b.data.title, 'en', {
							sensitivity: 'base',
							numeric: true,
						}),
					)
					.map(post => (
						<li key={post.slug}>
							{post.data.emoji ? post.data.emoji + ' ' : ''}
							<a href={post.slug}>{post.data.title}</a>
						</li>
					))}
			</ul>
		</div>
	);
}
