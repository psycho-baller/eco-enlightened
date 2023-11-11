import { sendMessageToContentScript, type MessageToBackgroundRequest } from 'lib/utils/messaging';
import browser from 'webextension-polyfill';

export {};

browser.runtime.onInstalled.addListener((details) => {
	if (details.reason === 'install') {
		browser.runtime.openOptionsPage();
	}
});

browser.commands.onCommand.addListener(async function (command) {
	if (command === 'toggle-recording') {
		sendMessageToContentScript({ command: 'toggle-recording' });
	}
});

browser.runtime.onMessage.addListener(function (message: MessageToBackgroundRequest) {
	switch (message.action) {
		case 'setExtensionIcon':
			break;
		case 'openOptionsPage':
			browser.runtime.openOptionsPage();
			break;
	}
});
