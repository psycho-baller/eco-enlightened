import { createStoreSyncedWithStorage } from './createStore';

export const aiResponse = createStoreSyncedWithStorage<string>({
	key: 'aiResponse',
	initialValue: 'hi'
});
