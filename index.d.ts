export interface MergefsArguments {
	input: string,
	output: Array<string>,
	files?: Array<string>
}

export async function mergefs(arguments: MergefsArguments): void;
