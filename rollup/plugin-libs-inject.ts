import path from "path";
import { Plugin } from 'rollup';


/**
 * 修复某些情况下css不生效的问题
 * 修复重载js会导致container下不由solidjs创建的panel也会被删除的问题
 */
export function fixLibs(): Plugin {
	return {
		name: 'compatible-panorama',

		// 将实际的源文件定位到修复了bug的版本
		resolveId(source, importer, options) {
			// 修复For里的child重排序后会丢失的bug
			if (source == "solid-js/universal") {
				return path.join(__dirname, "./inject_modules/universal.js");
			}
			// 保证css正确应用
			// 修复重载js会导致container下不由solidjs创建的panel也会被删除的问题
			// ...
			//   if (source == "solid-panorama-runtime") {
			//     return path.join(__dirname, "./inject_modules/runtime.js");
			//   }
		},

		// renderChunk(code, chunk, options) {
		//   // 处理 chunk 的代码
		//   console.log(chunk.name);

		//   if (chunk.name == "libs") {
		//     // 处理 libs.js 的代码
		//     const updatedCode = code.replace(
		//       /setTooltipText\(node, value\);/g,
		//       "setCustomTooltipText(node, value);"
		//     );
		//     return {
		//       code: updatedCode,
		//       map: null, // 如果需要支持 source map，可以生成对应的 map
		//     };
		//   }
		// },

		footer(chunk) {
			if (chunk.name == "libs") {
				return footer;
			}
			return '';
		},
	};
}

// 让报错信息完整显示
const footer = `function handleError(err, owner = Owner) {
  let msg = err.stack ?? err;
  GameEvents.SendEventClientSide("pui_error_msg", {error: msg});
  throw err;
}`;