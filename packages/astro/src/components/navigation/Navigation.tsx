interface Props {
	title: string;
	links: { slug: string; title: string }[];
}

export const Navigation = ({ title, links }: Props) => {
	return (
		<header className="nav__header">
			<nav className="nav__nav">
				<h1 className="nav__site-name">
					<a href="/">{title}</a>
				</h1>
				<ul className="nav__links">
					{links.map(link => (
						<li key={link.slug}>
							<a className="nav__links__link" href={`/${link.slug}`}>
								{link.title}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
