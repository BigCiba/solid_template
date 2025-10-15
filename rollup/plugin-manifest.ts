import path from "path";
import { Plugin } from "rollup";
import { writeFileCache } from "./utils";

// 生成custom_ui_manifest.xml文件
export function GenerateCustomUIManifest(options: {
	PanelList: {
		name: string;
		type: 'Hud' | 'FlyoutScoreboard';
	}[];
	Scripts: string[];
	KVList: string[];
	TooltipList: string[];
	ConfigureList: string[];
	rootPath: string;
	dir: string;
	scriptsDir: string;
}): Plugin {
	return {
		name: 'plugin-manifest',
		writeBundle() {
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
			const scriptList = options.Scripts.map(v => `\t\t<include src="file://{resources}/scripts/custom_game/${v.replace(".js", "")}.js"/>`).join('\n');
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