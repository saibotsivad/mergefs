export interface MergefsArguments {
	input: string,
	output: Array<string>,
	single?: string
}

export async function mergefs(arguments: MergefsArguments): void;
