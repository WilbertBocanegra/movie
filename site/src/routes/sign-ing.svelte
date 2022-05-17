<script lang="ts">
	import { goto } from '$app/navigation';
	import logoEnthous from '$lib/assets/enthous.jpg';
	import type { IUser } from '@enthous/movie';
	let isDisable = false;
	let errorMessage = '';
	let data = {
		name: '',
		lastName: '',
		email: '',
		password: '',
		gender: 'MEN'
	};
	let isErrorAlert: boolean = false;

	const handleSubmit = async () => {
		isDisable = true;

		const req = await fetch('http://localhost:3005/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
					mutation($data: SignInInput!) {
						signUp(data: $data) {
							info
							message
							statusCode
						}
					}
				`,
				variables: { data }
			})
		});
		const res = await req.json();
		if (res.data.signUp.statusCode === 200) {
			isErrorAlert = false;
		} else {
			isErrorAlert = true;
		}
		errorMessage = res.data.signUp.message;
		isDisable = false;
		setTimeout(() => {
			errorMessage = '';
		}, 3000);
	};
</script>

<div>
	<div
		class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300 m-0 absolute	top-2/4	left-1/2	translate-y-[-50%] translate-x-[-50%]"
	>
		<div class="card-body">
			<div class="avatar mx-auto mb-5">
				<div class="w-28 rounded-full ring ring-info-content ring-offset-base-300 ring-offset-2">
					<img src={logoEnthous} alt="logo-enthous" />
				</div>
			</div>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="form-control mb-5">
					<label for="email" class="label mb-1">
						<span class="label-text">Nombre/s</span>
					</label>
					<input
						bind:value={data.name}
						type="text"
						placeholder="nombre/s"
						class="input input-bordered"
						disabled={isDisable}
					/>
				</div>
				<div class="form-control mb-5">
					<label for="email" class="label mb-1">
						<span class="label-text">Apellido/s</span>
					</label>
					<input
						bind:value={data.lastName}
						type="text"
						placeholder="apellido/s"
						class="input input-bordered"
						disabled={isDisable}
					/>
				</div>

				<div class="form-control mb-5">
					<label for="email" class="label mb-1">
						<span class="label-text">Correo</span>
					</label>
					<input
						bind:value={data.email}
						type="text"
						placeholder="correo"
						class="input input-bordered"
						disabled={isDisable}
					/>
				</div>

				<div class="form-control mb-5">
					<label for="password" class="label mb-1">
						<span class="label-text">Contraseña</span>
					</label>
					<input
						bind:value={data.password}
						type="password"
						placeholder="contraseña"
						class="input input-bordered"
						disabled={isDisable}
					/>
				</div>
				<div class="form-control mb-5">
					<label for="email" class="label mb-1">
						<span class="label-text">Genero</span>
					</label>
					<select class="select select-bordered w-full max-w-xs">
						<option disabled selected>Seleccionar</option>
						<option value="WOMEN">Mujer</option>
						<option value="MAN">Hombre</option>
					</select>
				</div>
				<div class="text-center">
					<p class="my-5 text-center">
						<a class="link" href="/">Iniciar Sesión</a>
					</p>
				</div>
				<div class="form-control mt-6">
					{#if isDisable}
						<button class="btn loading ">loading</button>
					{:else}
						<button type="submit" class="btn btn-primary">aceptar</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

{#if errorMessage}
	<div
		class="alert alert-{isErrorAlert
			? 'error'
			: 'success'} shadow-lg w-1/5	 absolute right-0 mr-10 mt-10"
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
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{errorMessage}</span>
		</div>
	</div>
{/if}
