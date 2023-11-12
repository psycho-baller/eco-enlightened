<script lang="ts" context="module">
	import type { MessageToContentScriptRequest } from '~lib/utils/messaging';
	import type { PlasmoCSConfig } from 'plasmo';

	import cssText from 'data-text:~style.css';
	export const getStyle = () => {
		const style = document.createElement('style');
		style.textContent = cssText;
		return style;
	};

	export const config: PlasmoCSConfig = {
		matches: ['https://www.notion.so/*'],
		run_at: 'document_idle'
	};
</script>

<script lang="ts">
	import { aiResponse } from '~lib/stores/aiResponse';
	import browser from 'webextension-polyfill';
	browser.runtime.onMessage.addListener(async function (message: MessageToContentScriptRequest) {
		if (message.command === 'update-ai-response') {
			console.log('message.content', message.content);
			aiResponse.set(message.content);
		}
	});
</script>

{#if $aiResponse}
	<!-- float on top of the cursor -->
	<section class="bg-teal-500">
		{$aiResponse}
	</section>
{/if}
