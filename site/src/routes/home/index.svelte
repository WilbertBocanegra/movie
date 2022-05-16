<script lang="ts">
	import { Navbar, NavLeft, NavRight, List } from '$lib/components';
	import { goto } from '$app/navigation';
	import type { IMovie } from '@enthous/movie';

	let movie: IMovie;
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
				<li>
					<a href={undefined} class="justify-between">
						Perfil
						<!--<span class="badge">New</span>-->
					</a>
				</li>
				<li><a href={undefined}>Configuración</a></li>
				<li>
					<a on:click={() => goto('/', { replaceState: true })} href={undefined}>Cerrar Sesión</a>
				</li>
			</ul>
		</div>
	</NavRight>
</Navbar>

<div class="grid grid-cols-3 gap-2 mt-10">
	<div class="m-auto h-full relative ">
		<div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-body">
				<div class="normal-case text-xl text-center mb-5">Movie</div>

				<div class="form-control">
					<label for="" class="label">
						<span class="label-text">Nombre</span>
					</label>
					<input type="text" placeholder="nombre" class="input input-bordered" />
				</div>

				<div class="form-control">
					<label for="" class="label">
						<span class="label-text">Busqueda</span>
					</label>
					<input type="text" placeholder="busqueda" class="input input-bordered" />
				</div>
				<div class="form-control w-full max-w-xs">
					<label for="" class="label">
						<span class="label-text">Autor</span>
					</label>
					<select class="select select-bordered">
						<option disabled selected>Selecciona uno</option>
						<option>Star Wars</option>
						<option>Harry Potter</option>
						<option>Lord of the Rings</option>
						<option>Planet of the Apes</option>
						<option>Star Trek</option>
					</select>
				</div>

				<div class="form-control">
					<label for="" class="label">
						<span class="label-text">Descripción</span>
					</label>
					<textarea class="textarea textarea-bordered" placeholder="descripción" />
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary">aceptar</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ... -->
	<div class="col-span-2 relative ">
		<div class="grid grid-cols-2 gap-8 px-5 h-4/5 fixed overflow-auto">
			<div>
				<!-- -->
				<div class="card w-full bg-base-300">
					<div class="card-body ">
						<h2 class="card-title text-center px-14">
							Los titanes del pacifico una nueva era de jagers
						</h2>

						<p class="text-xl  font-bold my-5">Autor</p>

						<div class="ml-5">
							<img
								alt="logo"
								class="h-16 mb-5 rounded-full"
								src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80"
							/>
							<strong class="text-slate-900 text-xs font-medium dark:text-slate-200 text-white"
								>Wilbert Bocanegra Velazquez</strong
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
							<div class="collapse-content ">
								<p class="text-justify pb-5">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eveniet molestias
									recusandae ratione veritatis veniam, sequi laudantium velit maxime magnam
									cupiditate nostrum similique exercitationem rerum quae soluta. Voluptate, vero
									adipisci!
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- -->
			</div>
		</div>
	</div>
</div>
