import { mergefs } from '../src/index.js'
import { strict as assert } from 'assert'
import fs from 'fs'
import path from 'path'

const mkdir = dir => {
	try {
		fs.mkdirSync(dir, { recursive: true })
	} catch (error) {
		if (error.code !== 'EEXIST') {
			throw error
		}
	}
}

const rootInput = path.join(__dirname, 'fixtures', 'input')
const rootOutput = path.join(__dirname, 'fixtures', 'output')

mkdir(rootInput)

const fixtureFiles = [
	'001/a/b.txt',
	'002/a/b.txt',
	'003/a/b.txt', // ✅

	'001/b/c.txt',
	'003/b/c.txt', // ✅

	'002/c/d.txt',
	'003/c/d.txt', // ✅
]

fixtureFiles.forEach((file, index) => {
	const { dir, base } = path.parse(file)
	mkdir(path.join(rootInput, dir))
	fs.writeFileSync(path.join(rootInput, file), `text-${index}`, 'utf8')
})

const test = async () => {
	const options = {
		input: [
			path.join(rootInput, '001'),
			path.join(rootInput, '002'),
			path.join(rootInput, '003'),
		],
		output: rootOutput
	}

	// basic operation
	await mergefs(options)
	assert.equal(
		fs.readFileSync(path.join(rootOutput, 'a/b.txt'), 'utf8'),
		'text-2'
	)
	assert.equal(
		fs.readFileSync(path.join(rootOutput, 'b/c.txt'), 'utf8'),
		'text-4'
	)
	assert.equal(
		fs.readFileSync(path.join(rootOutput, 'c/d.txt'), 'utf8'),
		'text-6'
	)

	// files
	fs.writeFileSync(path.join(rootInput, '003/a/b.txt'), 'single', 'utf8')
	await mergefs(Object.assign(
		options,
		{ files: [ 'a/b.txt' ] }
	))
	assert.equal(
		fs.readFileSync(path.join(rootOutput, 'a/b.txt'), 'utf8'),
		'single'
	)
}

test()
	.then(() => {})
	.catch(error => {
		console.error(error)
	})
