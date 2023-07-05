interface ButtonLinkProps {
	url: string;
	text: string;
}

export function ButtonLink({ url, text }: ButtonLinkProps) {
	return (
		<a className="button" href={url} target="_blank" rel="noopener noreferrer">
			{text}
		</a>
	);
}
