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
	import { suggest } from '~lib/llm';
	browser.runtime.onMessage.addListener(async function (message: MessageToContentScriptRequest) {
		if (message.command === 'update-ai-response') {
			const aiRes = await suggest(message.content);
			console.log('aiRes', aiRes);
			aiResponse.set(aiRes);
		}
	});
</script>

{#if $aiResponse}
	<!-- float on top of the cursor -->
	<section class="bg-teal-500">
		{$aiResponse}
	</section>
{/if}
