export async function suggest(text: string): Promise<string> {
	const res = await fetch('http://fastapi.localhost/chat/018bc44c-f1b3-7f2e-843c-2eae3a1f52c7', {
		method: 'POST',
		body: JSON.stringify({ user_id: '018bc44c-f1b3-7f2e-843c-2eae3a1f52c7', message: text }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const json = await res.json();
	console.log(json);
	return json.message;
}
