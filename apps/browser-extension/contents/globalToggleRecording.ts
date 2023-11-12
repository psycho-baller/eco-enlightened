import { toggleRecording } from './toggleRecording';
import type { PlasmoCSConfig } from 'plasmo';
import browser from 'webextension-polyfill';
import { writeTextToCursor } from '~lib/utils/dom';
import { sendMessageToBackground, type MessageToContentScriptRequest } from 'lib/utils/messaging';

export const config: PlasmoCSConfig = {
	matches: ['<all_urls>'],
	exclude_matches: ['https://chat.openai.com/*']
};

browser.runtime.onMessage.addListener(async function (message: MessageToContentScriptRequest) {
	if (message.command === 'toggle-recording')
		await toggleRecording({
			switchIcon: (icon: unknown) => sendMessageToBackground({ action: 'setExtensionIcon', icon }),
			onSuccessfulTranscription: (text: string) => writeTextToCursor(text)
		});
});
