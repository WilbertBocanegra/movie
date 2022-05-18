<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let modal: any;
</script>

<Modal bind:this={modal}>
	<h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
	<p class="py-4">
		You've been selected for a chance to get one year of subscription to use Wikipedia for free!
	</p>
	<div class="modal-action">
		<button on:click={() => modal.close()} class="btn">Yay!</button>
	</div>
</Modal>

<button on:click={() => modal.toggle()}>abrir</button>
