export interface MergefsStrategy {
    cwd: string;
    filepaths: Array<string>;
}

export interface MergefsArguments {
	input: string;
	output: Array<string>;
	files?: Array<string>;
    strategy?: (mergeStrategyArguments: MergefsStrategy) => Promise<void>;
}

export interface Mergefs {
    (mergefsArguments: MergefsArguments): Promise<void>;
}

export = Mergefs;
