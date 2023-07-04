interface Props {
	title: string;
	url: string;
	image?: string;
	imageAlt?: string;
}

export function Card({ title, url, image, imageAlt }: Props) {
	if (image && !imageAlt) {
		throw new Error('Image alt text is required if an image is provided');
	}
	return (
		<li className="card">
			<a href={url} className="card__link"></a>
			<picture>
				<img src={image} alt={imageAlt} />
			</picture>
			<h2 className="card__title">{title}</h2>
		</li>
	);
}
