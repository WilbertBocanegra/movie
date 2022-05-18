<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte';
	import { Navbar, NavLeft, NavRight, List, Modal } from '$lib/components';
	import { goto } from '$app/navigation';
	import type { IMovie, IResponse, IUser } from '@enthous/movie';
	import { movieDelete } from '$lib/services';

	let movies: IMovie[] = [];
	let authors: IUser[] = [];
	let idRemove: string = '';
	let modal: SvelteComponent;

	let isEdit: string = '';

	let data: any = {
		author: '',
		name: '',
		slug: '',
		description: ''
	};

	let alertMessage: string;

	let isErrorAlert: boolean;
	$: console.log(isErrorAlert, alertMessage);
	onMount(async () => {
		const findAll = await fetch('http://localhost:3005/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
					query {
						findAll {
							info
							statusCode
							message
							data {
								id
								name
								description
								slug
								author {
									id
									name
									lastName
								}
							}
						}
					}
				`
			})
		});

		const res = await findAll.json();

		const findAllAuthor = await fetch('http://localhost:3005/graphql', {
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
							}
							info
							message
							statusCode
						}
					
					}`
			})
		});
		const author = await findAllAuthor.json();

		movies = res.data.findAll.data;

		authors = author.data.findAllUser.data;
	});

	const handleSubmit = async () => {
		console.log('isEdit', isEdit);
		const res = await fetch('http://localhost:3005/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: isEdit
					? `mutation($data: MovieInsertInput!){
						updateMovie(data: $data) {
							info
							message
							statusCode
						}
					}`
					: `
					mutation($data: MovieInput!) {
						createMovie(data: $data) {
							info
							message
							statusCode
						}
					}
				`,
				variables: { data }
			})
		});

		const movieRes = await res.json();
		if (!isEdit) {
			if (movieRes.data?.createMovie?.statusCode === 200) {
				isErrorAlert = false;
			} else {
				isErrorAlert = true;
			}
			alertMessage = movieRes.data?.createMovie.message;
		} else {
			if (movieRes.data?.updateMovie?.statusCode === 200) {
				isErrorAlert = false;
			} else {
				isErrorAlert = true;
			}

			alertMessage = movieRes.data?.updateMovie.message;
		}

		setTimeout(() => {
			alertMessage = '';
		}, 3000);
	};

	const handleRemove = async () => {
		const messageRemove = await movieDelete(idRemove);
		if (messageRemove.statusCode === 200) {
			isErrorAlert = false;
		} else {
			isErrorAlert = true;
		}
		modal.close();
		alertMessage = messageRemove.message || '';

		setTimeout(() => {
			alertMessage = '';
		}, 3000);
	};

	$: console.log(data);
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
		<div class="normal-case text-xl ml-5">Movies</div>
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
				<!--
				<li>
					<a href={undefined} class="justify-between">
						Perfil
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href={undefined}>Configuración</a></li>-->
				<li>
					<a on:click={() => goto('/', { replaceState: true })} href={undefined}>Cerrar Sesión</a>
				</li>
			</ul>
		</div>
	</NavRight>
</Navbar>

<div class="grid grid-cols-3 gap-2 mt-10">
	<div class="m-auto h-full  ">
		<!-- Card  -->

		<div class="card w-96 bg-base-300 shadow-xl ">
			<div class="card-body">
				{#if isEdit}
					<div class="absolute right-5 top-5">
						<button
							on:click={() => {
								(isEdit = ''),
									(data = {
										author: '',
										name: '',
										slug: '',
										description: ''
									});
							}}
							class="btn btn-circle"
						>
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
					</div>
				{/if}
				<div class="normal-case text-xl text-center mb-5">Movie</div>
				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-control mb-5">
						<label for="" class="label">
							<span class="label-text">Nombre</span>
						</label>
						<input
							bind:value={data.name}
							type="text"
							placeholder="nombre"
							class="input input-bordered"
						/>
					</div>

					<div class="form-control mb-5 ">
						<label for="" class="label">
							<span class="label-text">Busqueda</span>
						</label>
						<input
							bind:value={data.slug}
							type="text"
							placeholder="busqueda"
							class="input input-bordered"
						/>
					</div>
					<div class="form-control w-full max-w-xs mb-5">
						<label for="" class="label">
							<span class="label-text">Autor</span>
						</label>
						<select bind:value={data.author} class="select select-bordered">
							<option disabled selected>Selecciona uno</option>

							{#each authors as author (author.id)}
								<option value={author.id}> {author.name} {author.lastName}</option>
							{/each}
						</select>
					</div>

					<div class="form-control mb-5">
						<label for="" class="label">
							<span class="label-text">Descripción</span>
						</label>
						<textarea
							bind:value={data.description}
							class="textarea textarea-bordered h-40"
							placeholder="descripción"
						/>
					</div>
					<div class="form-control mb-5">
						<button type="submit" class="btn btn-primary"
							>{isEdit ? 'actualizar' : 'aceptar'}</button
						>
					</div>
				</form>
			</div>
		</div>

		<!-- Card -->
	</div>
	<!-- ... -->
	<div class="col-span-2 w-full snap-y ">
		<div class="grid grid-cols-2 w-7/12 overflow-auto gap-8 px-5 h-5/6 fixed ">
			{#each movies as movie}
				<div>
					<!-- -->
					<div class="card w-full bg-base-300">
						<div class="absolute right-5 top-5">
							<button
								on:click={() => {
									(isEdit = movie.id || ''), (data = { ...movie, author: movie.author.id });
								}}
								href="#my-modal-2"
								class="btn btn-circle mr-2"
							>
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

							<a
								on:click={() => {
									(idRemove = movie.id || ''), modal.open();
								}}
								href="#my-modal-2"
								class="btn btn-circle"
							>
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
							</a>
						</div>
						<div class="card-body">
							<h2 class="card-title text-center px-14 justify-center">
								{movie.name}
							</h2>

							<p class="text-xl  font-bold my-5">Autor</p>

							<div class="ml-5">
								<img
									alt="logo"
									class="h-16 mb-5 rounded-full"
									src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80"
								/>
								<strong class="text-slate-900 text-xs font-medium dark:text-slate-200 text-white"
									>{movie.author.name} {movie.author.lastName}</strong
								>
							</div>

							<!--<div class="card-actions justify-end">
							<button class="btn">Buy Now</button>
						</div>-->
							<div class="collapse collapse-arrow my-5">
								<input type="checkbox" class="peer" />
								<div class="collapse-title ">
									<p class=" text-xl  font-bold">Descripción de la pelicula</p>
								</div>
								<div class="collapse-content pt-5">
									<p class="text-justify pb-5">
										{movie.description}
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- -->
				</div>
			{:else}
				<h1>no hay peliculas</h1>
			{/each}
		</div>
	</div>
</div>

{#if alertMessage}
	<div
		class="alert alert-{isErrorAlert
			? 'error'
			: 'success'} shadow-lg w-1/5 absolute top-0 right-0 mr-10 mt-16"
	>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{alertMessage}</span>
		</div>
	</div>
{/if}

<Modal bind:this={modal}>
	<h3 class="font-bold text-lg text-center uppercase">alerta</h3>
	<p class="py-4 text-center">Se eliminara para siempre</p>
	<div class="modal-action justify-center">
		<a href={undefined} on:click={handleRemove} class="btn mx-5">eliminar</a>

		<button on:click={modal.close} class="btn btn-primary">cancelar</button>
	</div>
</Modal>
