import browser from 'webextension-polyfill';
export type MessageToBackgroundRequest = {
	action: 'openOptionsPage';
};

/** Sends a message to the background script, captured in {@link ~background/index.ts}. */
export function sendMessageToBackground(message: MessageToBackgroundRequest) {
	browser.runtime.sendMessage(message);
}

export type MessageToContentScriptRequest = {
	command: 'toggle-recording';
};
/** Sends a message to the content script, captured in {@link ~contents/globalToggleRecording}. */
export async function sendMessageToContentScript(message: MessageToContentScriptRequest) {
	const [tab] = await browser.tabs.query({
		active: true,
		lastFocusedWindow: true
	});
	browser.tabs.sendMessage(tab.id, message);
}
