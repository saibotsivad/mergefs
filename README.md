# mergefs

Like `Object.assign` but recursive and for files.

## The Idea

Specify an output folder, and any number of input folders. They will
be merged in order to the output, overwriting files duplicated by name.

In addition, you can also list specific filepaths, in which case *only*
those files will be merged from the input folders and written to the
output folders.

## The Library

You can import or require or whatnot the usual ways:

```js
const mergefs = require('mergefs')
// or
import { mergefs } from 'mergefs'
```

Then you call that function, specifying a single output path and an
ordered array of input paths, with an optional list of file paths:

```js
await mergefs({
	// required
	output: './out',
	// required
	input: [
		'./foo',
		'./bar',
		'./bizz'
	],
	// optional
	files: [
		'fizz/buzz.txt'
	]
});
```

There is no output from calling this function. If there is an error
it will be thrown.

## The API

#### `output: String` **required**

The path to the output folder.

If the folder doesn't exist, it will be made.

#### `input: Array<String>` **required**

An *ordered* list of paths to input folders.

The order matters: the last input will override the first, if
there are files with the same name.

#### `files: Array<String>`

An unordered list of specific file paths to merge.

#### `strategy: async Function<{ cwd: string, filepaths: Array<string>, output: string }>`

By default the merge strategy is last-file-wins, meaning that the
last file in the set of folders will be the one written.

You can, however, specify a custom merge strategy function. In this
case, you are responsible for reading and writing **all** files (or
copying, etc., whatever your specific merge strategy is).

For example, if your merge strategy is to append files, you might
have something like:

```js
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
const strategy = ({ cwd, filepaths, output }) => {
	let string = ''
	for (const filepath of filepaths) {
		string += readFileSync(join(cwd, filepath), 'utf8')
	}
	writeFileSync(output, string, 'utf8')
};
```

## The Examples

Suppose you have a folder structure like this:

```
input
  ├─ 001
  │  ├─ aaa
  │  │  └─ file.txt // "text-1"
  │  └─ bbb
  │     └─ file.txt // "text-2"
  ├─ 002
  │  ├─ aaa
  │  │  └─ file.txt // "text-3"
  │  └─ ccc
  │     └─ file.txt // "text-4"
  └─ 003
     ├─ bbb
     │  └─ file.txt // "text-5"
     └─ ccc
        └─ file.txt // "text-6"
```

#### The Example 1: Merge Everything

If you wanted to merge all input folders, you would do:

```js
await mergefs({
	output: '/output',
	input: [
		'/input/001',
		'/input/002',
		'/input/003'
	]
});
```

Then the structure of the output folder would be:

```
output
  ├─ aaa
  │  └─ file.txt // "text-3"
  ├─ bbb
  │  └─ file.txt // "text-5"
  └─ ccc
     └─ file.txt // "text-6"
```

#### The Example 2: Change Merge Order

If we take the same example but change the order of the input folders:

```js
await mergefs({
	output: '/output',
	input: [
		'/input/003',
		'/input/002',
		'/input/001'
	]
});
```

Then the structure of the output folder would be:

```
output
  ├─ aaa
  │  └─ file.txt // "text-1"
  ├─ bbb
  │  └─ file.txt // "text-2"
  └─ ccc
     └─ file.txt // "text-4"
```

### The Example 3: Merge Specific Files

If we take the same input folder structure but list specific files:

```js
await mergefs({
	output: '/output',
	input: [
		'/input/001',
		'/input/002',
		'/input/003'
	],
	files: [
		'ccc/file.txt'
	]
});
```

Then the structure of the output folder would be:

```
output
  └─ ccc
     └─ file.txt // "text-6"
```

## The Path Details

Both the input and output paths will be resolved using the builtin NodeJS
[`path.resolve`](https://nodejs.org/api/path.html#path_path_resolve_paths).

You can use relative or absolute paths, and they will be interpreted using
that module.

The `files` properties will be resolved with the input paths using
[`path.join`](https://nodejs.org/api/path.html#path_path_join_paths)
and then `path.resolve` on the resulting filepath.

## The License

Published and released under the
[Very Open License](http://veryopenlicense.com).
