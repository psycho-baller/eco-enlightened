import { sendMessageToContentScript, type MessageToBackgroundRequest } from 'lib/utils/messaging';
import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener((details) => {
	if (details.reason === 'install') {
		browser.runtime.openOptionsPage();
	}
});

// browser.commands.onCommand.addListener(async (command) => {
// 	if (command === 'toggle-recording') {
// 		sendMessageToContentScript({ command: 'toggle-recording' });
// 	}
// });

browser.runtime.onMessage.addListener(async (message: MessageToBackgroundRequest) => {
	switch (message.action) {
		case 'updateContent':
			console.log(message.content);
			// send response to content script UI with AI response
			sendMessageToContentScript({ command: 'update-ai-response', content: message.content });
			break;
		case 'openOptionsPage':
			browser.runtime.openOptionsPage();
			break;
	}
});

export {};
