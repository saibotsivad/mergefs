# mergefs

Like `Object.assign` but recursive and for files.

## The Idea

Specify an output folder, and any number of input folders. They will
be merged in order to the output, overwriting files duplicated by name.

In addition, you can also specify a single filepath, in which case *only*
that one file will be merged from the input folders and written to the
output folders.

## The CLI

You specify one output with `--output` or `-o` and multiple inputs
with `--input` or `-i` for example:

```bash
mergefs -o="./out" -i="./foo" -i="./bar" -i="./bizz"
```

Remember that the order of parameters matters here: the last will override
the first, if there are files with the same name.

With `--single` or `-s` you can specify merging a single file path. In
this case, only the single file is merged to the output. For example:

```bash
mergefs -s="fizz/buzz.txt" -o="./out" -i="./foo" -i="./bar" -i="./bizz"
```

In this case, if `./bizz/fizz/buzz.txt` exists, it will be copied over
to `./out/fizz/buzz.txt` and that will be the end of the process.

## The Library

You can import or require or whatnot the usual ways:

```js
const mergefs = require('mergefs')
// or
import { mergefs } from 'mergefs'
```

Then you call it in a similar way, specifying a single output path and an
ordered array of input paths, with an optional single file path:

```js
await mergefs({
	output: './out',
	input: [
		'./foo',
		'./bar',
		'./bizz'
	],
	single: 'fizz/buzz.txt'
});
```

There is no output from calling this function, and if there is an error
it will be thrown.

## Path Details

Both the input and output paths will be resolved using the builtin NodeJS
[`path.resolve`](https://nodejs.org/api/path.html#path_path_resolve_paths).

You can use relative or absolute paths, and they will be interpreted using
that module.

The `single` property will be resolved using the input paths using
[`path.join`](https://nodejs.org/api/path.html#path_path_join_paths)
and then the `path.resolve` on the resulting filepath.

## The License

Published and released under the
[Very Open License](http://veryopenlicense.com).



