import { mergefs } from './src/index.js'

mergefs({
	input: [
		'./node_modules/bundt',
		'./node_modules/buffer-from'
	],
	output: './test',
	single: 'package.json'
})
	.then(() => { console.log('done') })
	.catch(err => { console.error(err) })
