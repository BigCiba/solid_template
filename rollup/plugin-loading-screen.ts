import * as fs from "fs";
import { existsSync } from "fs-extra";
import path from "path";
import { Plugin } from "rollup";
import { writeFileCache } from "./utils";

// 生成custom_loading_screen.xml文件
export function GenerateLoadingScreen(options: {
	loadingScreen?: string;
	rootPath: string;
	dir: string;
}): Plugin {
	return {
		name: 'plugin-loading-screen',
		async buildStart() {
			const sourcePath = path.join(options.rootPath, `${options.loadingScreen}/${options.loadingScreen}.xml`);
			this.addWatchFile(sourcePath);
		},
		writeBundle() {
			if (options.loadingScreen) {
				const sourcePath = path.join(options.rootPath, `${options.loadingScreen}/${options.loadingScreen}.xml`);
				if (existsSync(sourcePath)) {
					const manifestPath = path.join(
						options.dir,
						"custom_loading_screen.xml"
					);
					writeFileCache(manifestPath, fs.readFileSync(sourcePath, "utf-8"));
				}
			}
		}
	};
}