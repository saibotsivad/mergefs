import { promisify } from 'util'
import { dirname, join } from 'path'
import { copyFile, mkdir, stat } from 'fs'
import { totalist } from 'totalist'

const pCopyFile = promisify(copyFile)
const pMkdir = promisify(mkdir)
const pStat = promisify(stat)

export const mergefs = async ({ input, output, files }) => {
	const fileMap = {}

	for (const inputFolder of (input || [])) {
		if (files) {
			for (const singleFile of files) {
				try {
					const stats = await pStat(join(inputFolder, singleFile))
					if (!stats.isDirectory()) {
						fileMap[singleFile] = inputFolder
					}
				} catch (ignore) {}
			}
		} else {
			await totalist(inputFolder, name => {
				fileMap[name] = inputFolder
			})
		}
	}

	for (const [ file, inputFolder ] of Object.entries(fileMap)) {
		await pMkdir(dirname(join(output, file)), { recursive: true })
		await pCopyFile(join(inputFolder, file), join(output, file))
	}
}
