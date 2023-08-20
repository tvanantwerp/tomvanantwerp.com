interface Props {
	type: 'info' | 'warning';
	children: React.ReactNode;
}

export function Banner({ type, children }: Props) {
	return <div className={`banner banner--${type}`}>{children}</div>;
}
