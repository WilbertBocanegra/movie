<script lang="ts">
	import { onDestroy } from 'svelte';

	export let isOpen: boolean = false;

	export function open(): void {
		isOpen = true;
	}
	export function close(): void {
		isOpen = false;
	}

	export function toggle(): void {
		isOpen = !isOpen;
	}

	onDestroy((): void => {
		isOpen = false;
	});
</script>

<!-- The button to open modal -->

<!-- Put this part before </body> tag -->

<input type="checkbox" class="modal-toggle" checked={isOpen} />

<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<slot />
	</div>
</div>
