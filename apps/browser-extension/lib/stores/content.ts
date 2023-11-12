import { sendMessageToBackground } from '~lib/utils/messaging';
import { createStoreSyncedWithStorage } from './createStore';

export const content = createStoreSyncedWithStorage<string>({
	key: 'content',
	initialValue: ''
});

let timeoutId: NodeJS.Timeout;
content.subscribe((value) => {
	// only send if length > 10
	if (value.length < 10) return;
	console.log(value);
	// debounce: wait 1 second before sending
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		console.log('sending message to background');
		sendMessageToBackground({ action: 'updateContent', content: value });
		// clearTimeout(timeoutId);
	}, 500);
});
