import '../../css/style.scss';

interface Props {
	title: string;
	ignore: boolean;
	description: string;
	author: string;
	url: string;
	canonical?: string;
	twitter: string;
	image: string;
}

export const Head = ({
	title,
	ignore = false,
	description,
	author,
	url,
	canonical,
	twitter,
	image,
}: Props) => {
	return (
		<head>
			<meta charSet="utf-8" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon/favicon-16x16.png"
			/>
			<link rel="manifest" href="/favicon/site.webmanifest" />
			<link
				rel="mask-icon"
				href="/favicon/safari-pinned-tab.svg"
				color="#ef5556"
			/>
			<meta name="msapplication-TileColor" content="#21252b" />
			<meta name="theme-color" content="#21252b" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" href="/css/style.css" />
			<link
				rel="preload"
				as="style"
				href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
				integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
				crossOrigin="anonymous"
				onLoad="this.rel='stylesheet'"
			/>
			<title>{title}</title>
			<meta name="description" content={description} />
			{ignore ? (
				<meta name="robots" content="noindex" />
			) : (
				<meta name="robots" content="index,follow" />
			)}
			<meta name="author" content={author} />
			{canonical ? (
				<link rel="canonical" href={canonical} />
			) : (
				<link rel="canonical" href={url} />
			)}
			<meta property="og:title" content={title} />
			<meta property="og:type" content="article" />
			<meta property="og:url" content={url} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={twitter} />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
		</head>
	);
};
