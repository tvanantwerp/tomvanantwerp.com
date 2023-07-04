interface Props {
	title: string;
	year: number;
	twitter: string;
	github: string;
}

export const Footer = ({ title, year, twitter, github }: Props) => {
	return (
		<footer className="footer">
			<div className="footer__content">
				<div>{`© ${title} ${year}`}</div>
				<div>
					Find me at{' '}
					<a
						href={`https://twitter.com/${twitter}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Twitter
					</a>{' '}
					and{' '}
					<a
						href={`https://github.com/${github}/`}
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					.
				</div>
			</div>
		</footer>
	);
};
