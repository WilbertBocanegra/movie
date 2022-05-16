<script>
	import '../app.css';
	import { Drawer, DrawerContent } from '$lib/components';

	import logo from '$lib/assets/enthous.jpg';
</script>

<Drawer name="panel">
	<slot />

	<DrawerContent slot="content">
		<div class="avatar mx-auto mb-10 mt-5">
			<div class="w-32 rounded-full ring ring-info-content ring-offset-base-300 ring-offset-2">
				<img src={logo} alt="logo enthous" />
			</div>
		</div>

		<li>
			<a href={undefined}> Usuarios </a>
		</li>
	</DrawerContent>
</Drawer>

<style>
	:global(*) {
		letter-spacing: 2px;
	}
</style>
