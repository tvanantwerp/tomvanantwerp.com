interface Props {
	title: string;
	url: string;
	image: string;
	imageAlt: string;
}

export function Card({ title, url, image, imageAlt }: Props) {
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
