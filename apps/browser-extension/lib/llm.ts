export async function suggest(text: string): Promise<string> {
	const res = await fetch(
		'https://suggestqueries.google.com/complete/search?client=firefox&q=' + text
	);
	const json = await res.json();
	return json[1][0];
}
