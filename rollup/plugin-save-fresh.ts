import { Plugin } from "rollup";

/** 和build-write-file.ts配合让保存tsx文件触发相关js文件重编译 */
export function SaveFresh(): Plugin {
	let lastChangedTsx = "";

	return {
		name: 'plugin-save-fresh',

		async watchChange(id, change) {
			if (id.endsWith(".tsx") && change.event == "update") {
				lastChangedTsx = id;
			}
		},

		async renderChunk(code, chunk, options) {
			if (chunk.fileName.endsWith(".js")) {
				if (chunk.facadeModuleId == lastChangedTsx || (chunk.moduleIds.includes(lastChangedTsx))) {
					return "/*forceFresh*/" + code;
				}
			}
		},

		async writeBundle(_options, bundle) {
			lastChangedTsx = "";
		},
	};
}