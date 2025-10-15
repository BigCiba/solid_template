import { existsSync, writeFile } from 'fs-extra';
import { basename, extname, join } from 'node:path';
import { Plugin, PluginContext } from 'rollup';
import {
	formatXML,
	getAllCacheXML,
	XMLFile
} from 'solid-panorama-all-in-jsx/xml.macro';

export function rollupPluginXML(options: {
	inputFiles: string[];
	dir: string;
	resolvePath?: (path: string) => string | undefined;
	resolveFilename?: (filename: string) => string | undefined;
}): Plugin {
	function findAndMergeXML(
		ctx: PluginContext,
		id: string,
		cache: Record<string, XMLFile>,
		list: Set<XMLFile>
	): void {
		const info = ctx.getModuleInfo(id);
		const importedIds = info?.importedIds;
		if (!importedIds) {
			return;
		}

		for (const child of importedIds) {
			findAndMergeXML(ctx, child, cache, list);
		}

		if (cache[id]) {
			list.add(cache[id]);
		}
	}

	return {
		name: 'rollup-plugin-xml',
		async generateBundle() {
			const cache = getAllCacheXML();
			for (const path of options.inputFiles) {
				const sourcePath = path.replace(/\.tsx?$/, '.xml');
				if (existsSync(sourcePath)) {
					continue;
				}

				let outFilename = basename(path, extname(path));
				if (options.resolveFilename) {
					outFilename = options.resolveFilename(outFilename) ?? outFilename;
				}
				let outPath = join(
					options.dir,
					outFilename + '.xml'
				);
				if (options.resolvePath) {
					outPath = options.resolvePath(outPath) ?? outPath;
				}
				const files = new Set<XMLFile>();
				findAndMergeXML(this, path, cache, files);
				await writeFile(outPath, formatXML(Array.from(files.values())));
			}
		}
	};
}
