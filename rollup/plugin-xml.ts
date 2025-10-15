import * as fs from "fs";
import { existsSync } from "fs-extra";
import { basename, extname, join } from "path";
import { Plugin } from "rollup";
import { writeFileCache } from "./utils";

// 生成XML文件
export function GenerateXML(options: {
	inputFiles: string[];
	rootPath: string;
	dir: string;
	resolvePath?: (path: string) => string | undefined;
	resolveFilename?: (filename: string) => string | undefined;
}): Plugin {
	return {
		name: 'plugin-xml',
		async buildStart() {
			for (const file of options.inputFiles) {
				const xmlFile = file.replace(/\.tsx?$/, '.xml');
				if (existsSync(xmlFile)) {
					this.addWatchFile(xmlFile);
				}
			}
		},
		async writeBundle() {
			for (const path of options.inputFiles) {
				const sourcePath = path.replace(/\.tsx?$/, '.xml');
				if (!existsSync(sourcePath)) {
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

				let sourceContent = fs.readFileSync(sourcePath, "utf-8");
				// css
				if (!sourceContent.includes(`<include src="file://{resources}/styles/custom_game/${outFilename}`) && existsSync(path.replace(/\.tsx?$/, '.less'))) {
					sourceContent = sourceContent.replace('</styles>', `\t<include src="file://{resources}/styles/custom_game/${outFilename}.css" />\n\t</styles>`);
				}


				// js无法处理为对应路径的，只能直接储存在同一个目录下
				// js
				if (!sourceContent.includes(`<include src="file://{resources}/scripts/custom_game/${basename(outFilename)}`)) {
					sourceContent = sourceContent.replace('<scripts>', `<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/${basename(outFilename)}.js" />`);
				}
				// 自动加入common.js和polyfill.js
				// if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/libs.js" />')) {
				// 	sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/libs.js" />');
				// }

				if (!sourceContent.includes('<include src="s2r://panorama/scripts/sequence_actions.vts_c" />')) {
					sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="s2r://panorama/scripts/sequence_actions.vts_c" />');
				}
				// 自动加入common.js和polyfill.js
				if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/panorama-polyfill.js" />')) {
					sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/panorama-polyfill.js" />');
				}

				// loading screen 特例加入
				if (outFilename == "custom_loading_screen") {
					// 自动加入common.js和polyfill.js
					if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/solid-core.js" />')) {
						sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/solid-core.js" />');
					}
				}
				// if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/common.js" />')) {
				// 	sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/common.js" />');
				// }
				writeFileCache(outPath, sourceContent);
			}
		}
	};
}