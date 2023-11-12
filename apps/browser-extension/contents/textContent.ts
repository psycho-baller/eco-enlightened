import type { PlasmoCSConfig } from 'plasmo';
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

content.init();
document.addEventListener('keypress', (event) => {
	console.log(event);
	const mainContent = document.querySelector('.notion-page-content');
	if (!mainContent) return;

	const textContent = Array.from(mainContent.children)
		// remove blocks that are not text
		.filter((child) => !child.classList.contains('notion-collection_view-block'))
		.map((child) => child.textContent)
		.join('\n');
	if (!textContent) return;
	console.log(textContent);
	content.set(textContent);
});

// const observer = new MutationObserver((mutations) => {
// 	mutations.forEach((mutation) => {
// 		if (mutation.type === 'childList') {
// 			// injectMicrophoneButtonIntoTextarea();
// 		}
// 	});
// });
// window.onload = function () {
// const config = { childList: true, subtree: true };
// observer.observe(document.body, config); // adjust this to the element you want to observe
// };
// window.onunload = function () {
// 	observer.disconnect();
// };
