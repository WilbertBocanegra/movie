<script lang="ts">
	import { drawer } from '$lib/store';
</script>
 
<div class="drawer-side" >
	<label for={$drawer} class="drawer-overlay" />
	<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
		<!-- Sidebar content here -->
		<slot />
	</ul>
</div>
