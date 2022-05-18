<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte';
	import { goto } from '$app/navigation';
	import { Navbar, NavLeft, NavRight, Modal } from '$lib/components';
	import type { StatusEnum, IUser } from '@enthous/movie';
	import About from '../about.svelte';

	let modal: SvelteComponent;

	let users: IUser[] = [];
	onMount(async () => {
		const findAllUser = await fetch('http://localhost:3005/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
					query {
						findAllUser {
							data {
								id
								name
								lastName
								gender
								email
								status
								rol
							}
							info
							message
							statusCode
						}
					
					}`
			})
		});
		const user = await findAllUser.json();

		users = user.data.findAllUser.data;
	});
</script>

<Navbar>
	<NavLeft>
		<label for="panel" tabindex="0" class="btn btn-ghost btn-circle">
			<svg
				drawer-button
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h7"
				/></svg
			>
		</label>
		<div class="normal-case text-xl ml-5">Usuarios</div>
	</NavLeft>
	<NavRight>
		<div class="dropdown dropdown-end mr-1">
			<label for="" tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="https://api.lorem.space/image/face?hash=33791" alt="logo avatar" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
			>
				<!--<li>
					<a href={undefined} class="justify-between">
						Perfil
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href={undefined}>Configuración</a></li>
			-->
				<li>
					<a on:click={() => goto('/', { replaceState: true })} href={undefined}>Cerrar Sesión</a>
				</li>
			</ul>
		</div>
	</NavRight>
</Navbar>

<main class="px-80 mt-10  grid grid-cols-3 gap-8 mb-10 ">
	{#each users as user}
		<div>
			<div class="card w-full bg-base-300  shadow-xl">
				<div class="card-body">
					<button on:click={modal.open} class="btn btn-circle absolute right-5 top-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/></svg
						>
					</button>
					<button class="btn btn-circle absolute right-5 top-20">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class="bi bi-pencil-square h-6 w-6"
							viewBox="0 0 16 16"
						>
							<path
								d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
							/>
							<path
								fill-rule="evenodd"
								d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
							/>
						</svg>
					</button>
					<h2 class="card-title text-center px-10 mb-5 justify-center">
						{user.name}
						{user.lastName}
					</h2>

					<div class="avatar justify-center my-5">
						<div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
							<img alt="logo {user.name}" src="https://api.lorem.space/image/face?hash=3174" />
						</div>
					</div>

					<div class="collapse collapse-arrow ">
						<input type="checkbox" class="peer" />

						<div class="collapse-title text-xl font-medium">Información</div>
						<div class="collapse-content">
							<div class="form-control w-full max-w-xs mb-5">
								<label for="email" class="label">
									<span class="label-text">Correo</span>
								</label>
								<input
									disabled
									type="text"
									value={user.email}
									class="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div class="form-control w-full max-w-xs mb-5">
								<label for="email" class="label">
									<span class="label-text">Estatus</span>
								</label>
								<input
									disabled
									type="text"
									value={user.status}
									class="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div class="form-control w-full max-w-xs mb-5">
								<label for="email" class="label">
									<span class="label-text">Permisos</span>
								</label>

								<input
									disabled
									type="text"
									value={user.rol}
									class="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div class="form-control w-full max-w-xs mb-5">
								<label for="email" class="label">
									<span class="label-text">Genero</span>
								</label>

								<input
									disabled
									type="text"
									value={user.gender}
									class="input input-bordered w-full max-w-xs"
								/>
							</div>
						</div>
					</div>
					<!--
					<div class="card-actions justify-center mt-5">
						<button class="btn btn-primary">Buy Now</button>
					</div>
					-->
				</div>
			</div>
		</div>
	{/each}
</main>

<Modal bind:this={modal}>
	<h3 class="font-bold text-lg text-center uppercase">alerta</h3>
	<p class="py-4 text-center">Se eliminara para siempre</p>
	<div class="modal-action justify-center">
		<button class="btn mx-5">eliminar</button>

		<button on:click={modal.close} class="btn btn-primary">cancelar</button>
	</div>
</Modal>
