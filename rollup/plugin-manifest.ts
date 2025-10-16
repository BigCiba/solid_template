import { existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { Plugin } from "rollup";
import ts from "typescript";
import { writeFileCache } from "./utils";

// 生成custom_ui_manifest.xml文件
export function GenerateCustomUIManifest(options: {
	PanelList: {
		name: string;
		type: 'Hud' | 'FlyoutScoreboard';
	}[];
	ManifestScripts: string[];
	KVList: string[];
	TooltipList: string[];
	ConfigureList: string[];
	rootPath: string;
	dir: string;
	scriptsDir: string;
}): Plugin {
	return {
		name: 'plugin-manifest',
		// 监听less文件变更
		async buildStart() {
			for (const file of options.ManifestScripts) {
				const scriptFile = path.join(options.rootPath, "../manifest_scripts", file);
				if (existsSync(scriptFile)) {
					this.addWatchFile(scriptFile);
				}
			}
		},
		writeBundle() {
			const compiledScripts = compileManifestScripts(options);
			// const pages = options.PanelList.filter(v => {
			// 	return existsSync(path.join(options.rootPath, `${v.name}/${v.name}.xml`));
			// });
			const manifestPath = path.join(
				options.dir,
				"custom_ui_manifest.xml"
			);
			const tooltipText = `\t\t<include src="file://{resources}/scripts/custom_game/TooltipList.js"/>`;
			const kvList = options.KVList.map(v => `\t\t<include src="file://{resources}/scripts/custom_game/kv/${v}.js"/>`).join('\n');
			const configureList = options.ConfigureList.map(v => `\t\t<include src="file://{resources}/scripts/custom_game/configure/${v}.js"/>`).join('\n');
			const scriptList = compiledScripts.map(v => `\t\t<include src="file://{resources}/scripts/custom_game/manifest_scripts/${v}.js"/>`).join('\n');
			const panel = options.PanelList.map(v => `\t\t<CustomUIElement type="${v.type}" layoutfile="file://{resources}/layout/custom_game/${v.name}.xml"/>`).join('\n');
			writeFileCache(manifestPath, GetManifestContent(tooltipText + "\n" + kvList + "\n" + configureList + "\n" + scriptList, panel));

			const text = `GameUI.CustomUIConfig().TooltipList = [${options.TooltipList.map(v => `"${v}"`).join(",")}];`;
			writeFileCache(path.join(
				options.scriptsDir,
				"TooltipList.js"
			), text);
		}
	};
}

/** 获取custom_ui_manifest.xml的内容 */
function GetManifestContent(script: string, panel: string) {
	return `<root>
	<scripts>
${script}
		<include src="file://{resources}/scripts/custom_game/panorama-polyfill.js"/>
	</scripts>
	<Panel>
${panel}
	</Panel>
</root>`;
}

function compileManifestScripts(options: {
	ManifestScripts: string[];
	rootPath: string;
	scriptsDir: string;
}): string[] {
	const manifestRoot = path.join(options.rootPath, "../manifest_scripts");
	const outputs: string[] = [];
	for (const entry of options.ManifestScripts) {
		const sourcePath = path.join(manifestRoot, entry);
		if (!existsSync(sourcePath)) {
			console.warn(`Manifest script not found: ${entry}`);
			continue;
		}
		const parsed = path.parse(entry);
		const relativeDir = parsed.dir ? parsed.dir : '';
		const baseName = parsed.name;
		const includePath = relativeDir ? path.posix.join(relativeDir.split(path.sep).join('/'), baseName) : baseName;
		const targetDir = path.join(options.scriptsDir, relativeDir, "manifest_scripts");
		ensureDir(targetDir);
		const targetFile = path.join(targetDir, `${baseName}.js`);
		try {
			if (parsed.ext === '.ts' || parsed.ext === '.tsx') {
				const source = readFileSync(sourcePath, 'utf8');
				const result = ts.transpileModule(source, {
					compilerOptions: {
						target: ts.ScriptTarget.ES5,
						module: ts.ModuleKind.None,
						sourceMap: false,
						removeComments: false,
						noImplicitUseStrict: true,
						jsx: ts.JsxEmit.None
					},
					fileName: entry
				});
				writeFileCache(targetFile, result.outputText);
			} else {
				const source = readFileSync(sourcePath, 'utf8');
				writeFileCache(targetFile, source);
			}
			outputs.push(includePath);
		} catch (error) {
			console.error(`Failed to process manifest script ${entry}:`, error);
		}
	}
	return outputs;
}

function ensureDir(dirPath: string) {
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true });
	}
}