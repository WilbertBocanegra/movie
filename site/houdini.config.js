/** @type {import('houdini').ConfigFile} */
const config = {
	schemaPath: '.json',
	sourceGlob: 'src/**/*.svelte',
	module: 'esm',
	framework: 'kit',
	apiUrl: 'http://localhost:3005/graphql'
}

export default config
