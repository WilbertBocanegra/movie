<script lang="ts">
	import { onMount } from 'svelte';
	import { drawer, isOpenDrawer } from '$lib/store';
	export let name: string = '';

	onMount(() => {
		drawer.set(name);
	});
</script>

<div class="drawer">
	<input id={name} type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here 	{$isOpenDrawer} -->
	
		<slot />
	</div>
	<slot name="content" />
</div>
