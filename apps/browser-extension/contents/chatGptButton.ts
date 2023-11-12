import { toggleRecording } from './toggleRecording';
import type { PlasmoCSConfig } from 'plasmo';
import browser from 'webextension-polyfill';
import { writeTextToCursor } from '~lib/utils/dom';
import { sendMessageToBackground, type MessageToContentScriptRequest } from 'lib/utils/messaging';
import { content } from '~lib/stores/content';

export const config: PlasmoCSConfig = {
	matches: ['https://www.notion.so/*'],
	run_at: 'document_idle'
};

// browser.runtime.onMessage.addListener(async function (message: MessageToContentScriptRequest) {
// 	if (message.command === 'toggle-recording')
// 		await toggleRecording({
// 			switchIcon: () => {
// 				console.log('switchIcon');
// 			},
// 			onSuccessfulTranscription: (text: string) => writeTextToCursor(text)
// 		});
// });

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.type === 'childList') {
			// injectMicrophoneButtonIntoTextarea();
		}
	});
});

content.init();
document.addEventListener('keypress', (event) => {
	const mainContent = document.querySelector('.notion-page-content');
	console.log(mainContent);
	if (!mainContent) return;

	const textContent = Array.from(mainContent.children)
		.filter((child) => !child.classList.contains('notion-collection_view-block'))
		.map((child) => child.textContent)
		.join('\n');
	console.log(textContent);
	if (!textContent) return;

	content.set(textContent);

	// const config = { childList: true, subtree: true };
	// observer.observe(document.body, config); // adjust this to the element you want to observe
});

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
