export function readableDate(date: Date): string {
	const formatter = Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
	return formatter.format(date);
}
