import { toggleRecording } from './toggleRecording';
import type { PlasmoCSConfig } from 'plasmo';
import browser from 'webextension-polyfill';
import { writeTextToCursor } from '~lib/utils/dom';
import { sendMessageToBackground, type MessageToContentScriptRequest } from 'lib/utils/messaging';

export const config: PlasmoCSConfig = {
	matches: ['https://chat.openai.com/*']
};

browser.runtime.onMessage.addListener(async function (message: MessageToContentScriptRequest) {
	if (message.command === 'toggle-recording')
		await toggleRecording({
			switchIcon: () => {
				console.log('switchIcon');
			},
			onSuccessfulTranscription: (text: string) => writeTextToCursor(text)
		});
});

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.type === 'childList') {
			// injectMicrophoneButtonIntoTextarea();
		}
	});
});

window.onload = function () {
	// injectMicrophoneButtonIntoTextarea();

	const config = { childList: true, subtree: true };
	observer.observe(document.body, config); // adjust this to the element you want to observe
};

window.onunload = function () {
	observer.disconnect();
};

function setChatgptTextareaContent(text: string) {
	const textarea: HTMLTextAreaElement = document.querySelector('#prompt-textarea');
	if (!textarea) return;

	textarea.value = text;

	const event = new Event('input', { bubbles: true });
	textarea.dispatchEvent(event);
}

function setButtonIsDisabled(isDisabled: boolean) {
	const button: HTMLButtonElement = document.querySelector('#whispering-microphone-button');
	if (!button) return;

	button.disabled = isDisabled;
}
