const fs = require('fs');
const path = require('path');
const { getAddonPaths } = require('./get-addon-name');

const paths = getAddonPaths();

// 定义文件夹路径和目标文件名
const outputFileName = path.join('content', paths.addonName, 'scripts', 'vscripts', 'precache_auto.ts');

// 存储已经存在的vcpf字符串
const vcpfStrings = new Set();
const vcpfInToolStrings = new Set();
const vpcfRegex = /(['"])[^.'"]+.vpcf\1/g; // 正则表达式匹配.vpcf字符串

const vmdlRegex = /\"[^.^"^']+\.vmdl\"/g; // 正则表达式匹配.vmdl字符串
const courierRegex = /\"520\d{4}\"\s*\{[^\}]+\}/g;

const fileExtList = ['.kv', '.txt', '.ts', '.tsx'];

const particleBlackList = [
	"items_game.kv",
	"precache.ts",
	"precache_auto.ts",
];
const particleFiles = [
	"./solid/src/ui",
	path.join("./content", paths.addonName, "scripts", "vscripts"),
	path.join("./game", paths.addonName, "scripts", "npc"),
];
const modelfile = [
	// path.join("./game", paths.addonName, "scripts", "npc", "kv", "gameplay", "cosmetics.kv")
	path.join("./game", paths.addonName, "scripts", "npc", "kv", "units", "heroes.kv"),
	path.join("./game", paths.addonName, "scripts", "npc", "dropped_items.txt"),
	path.join("./game", paths.addonName, "scripts", "npc"),
];
const defaultPrecacheModelList = [
	"\"models/props_gameplay/salve.vmdl\"",
	"\"models/props_gameplay/aghs21_device/aghs21_device.vmdl\"",
	"\"models/creeps/lane_creeps/creep_bad_melee/creep_bad_melee.vmdl\"",
	"\"models/creeps/lane_creeps/creep_radiant_melee/radiant_melee.vmdl\"",
	"\"models/items/courier/duskie/duskie.vmdl\"",
	"\"models/items/courier/flightless_dod/flightless_dod_flying.vmdl\"",
	"\"models/items/courier/shagbark/shagbark.vmdl\"",
	"\"models/courier/huntling/huntling_flying.vmdl\"",
	"\"models/courier/ram/ram_flying.vmdl\"",
	"\"models/courier/venoling/venoling_flying.vmdl\"",
	"\"models/items/courier/pw_zombie/pw_zombie.vmdl\"",
	"\"models/items/courier/devourling/devourling_flying.vmdl\"",
	"\"models/items/courier/jin_yin_white_fox/jin_yin_white_fox_flying.vmdl\"",
	"\"models/items/courier/courier_ti9/courier_ti9_lvl7/courier_ti9_lvl7_flying.vmdl\"",
	"\"models/courier/seekling/seekling_flying.vmdl\"",
	"\"models/items/warlock/golem/ti_8_warlock_darkness_apostate_golem/ti_8_warlock_darkness_apostate_golem.vmdl\"",
];
// 存储已经存在的.vmdl字符串
const vmdlStrings = new Set(defaultPrecacheModelList);
// 递归读取文件夹中的文件
function readFiles(dir, func) {
	if (fs.statSync(dir).isDirectory()) {
		const files = fs.readdirSync(dir);
		files.forEach(file => {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				readFiles(filePath, func); // 递归处理子文件夹
			} else {
				func(file, filePath);
			}
		});
	} else {
		func(dir, dir);
	}
}


// 递归读取文件夹中的文件
function searchFiles() {
	particleFiles.forEach(dir => {
		readFiles(dir, (file, filePath) => {
			if (particleBlackList.includes(file)) return;
			if (fileExtList.some(ext => file.endsWith(ext))) {
				const content = fs.readFileSync(filePath, 'utf-8');
				let matches = content.match(vpcfRegex);

				if (matches) {
					matches.forEach(match => {
						if (!match.includes("particles/units/heroes") && !match.includes("particles/econ/items")) {
							vcpfStrings.add(match);
						} else {
							vcpfInToolStrings.add(match);
						}
					});
				}
			}
		});
	});
	modelfile.forEach(dir => {
		readFiles(dir, (file, filePath) => {
			if (particleBlackList.includes(file)) return;
			if (fileExtList.some(ext => file.endsWith(ext))) {
				const content = fs.readFileSync(filePath, 'utf-8');
				// let matchesCourier = content.match(courierRegex);
				let matches = content.match(vmdlRegex);
				// matchesCourier.forEach(_match => {

				if (matches) {
					matches.forEach(match => {
						vmdlStrings.add(match);
					});
				}
				// });
				// if (matchesCourier) {
				// }
			}
		});
	});
}

// 写入结果到output.txt
function particleReplaceResult() {
	const outputPath = path.join("./", outputFileName);
	let vpcfText = "";
	vcpfStrings.forEach(string => {
		vpcfText += `\n\t\t` + string + ',';
	});
	let vpcfInToolText = "";
	vcpfInToolStrings.forEach(string => {
		vpcfInToolText += `\n\t\t` + string + ',';
	});

	let vmdlText = "";
	vmdlStrings.forEach(string => {
		vmdlText += `\n\t\t` + string + ',';
	});
	fs.readFile(outputPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		// 匹配并替换precach: [ .. ]中的内容
		const updatedParticleData = data.replace(/particle: \[.*?\]/s, `particle: [${vpcfText}\n\t]`).replace(/model: \[.*?\]/s, `model: [${vmdlText}\n\t]`).replace(/particle_tool: \[.*?\]/s, `particle_tool: [${vpcfInToolText}\n\t]`);
		// 写入更新后的内容到ts文件
		fs.writeFile(outputPath, updatedParticleData, 'utf8', (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('updated successfully');
		});
	});
}

function extractItemsGameById(rawData, itemId) {
	const regex = new RegExp(`"${itemId}"\\s*{[\\s\\S]*?\\n\\t}`, 'g');

	const match = rawData.match(regex);
	if (match) {
		return match[0];
	} else {
		return null;
	}
}

const itemsGamePath = path.join("./game", paths.addonName, "scripts", "npc", "items_game.kv");
// wearablesID读取文件
const itemsGameIDFiles = [
	// path.join("./game", paths.addonName, "scripts", "npc", "kv", "gameplay", "cosmetics.kv"),
	// path.join("./game", paths.addonName, "scripts", "npc", "kv", "units", "npc_common.kv"),
];
// 提取items_game.kv会用到的饰品id
// const itemsGameIDs = new Set();
// itemsGameIDFiles.forEach(file => {
// 	readFiles(file, (file, filePath) => {
// 		const content = fs.readFileSync(filePath, 'utf-8');
// 		const regex = /"wearable(\d+)"\s*"(\d+)"/g;
// 		let matches;

// 		while ((matches = regex.exec(content)) !== null) {
// 			// console.log(matches[2]);
// 			itemsGameIDs.add(matches[2]);
// 		}
// 	});
// });
// readFiles(itemsGamePath, (file, filePath) => {
// 	const itemsGameContent = fs.readFileSync(filePath, 'utf-8');
// 	itemsGameIDs.forEach(id => {
// 		const matchContent = extractItemsGameById(itemsGameContent, id);
// 		if (matchContent === null) return;
// 		const modelPlayerRegex = /"model_player"\s*"([^"]*)"/;
// 		const modelPlayerMatch = matchContent.match(modelPlayerRegex);
// 		if (modelPlayerMatch) {
// 			if (!modelPlayerMatch[1].match(/models\/heroes/)) {
// 				vmdlStrings.add(`\"${modelPlayerMatch[1]}\"`);
// 			}
// 		}
// 		const visualsRegex = new RegExp(`"visuals"\\s*{[\\s\\S]*?\\n\\t\\t}`, 'g');
// 		const visualsMatch = matchContent.match(visualsRegex);
// 		if (visualsMatch) {
// 			visualsMatch.forEach(match => {
// 				let vmdlMatches = match.match(vmdlRegex);
// 				if (vmdlMatches) {
// 					vmdlMatches.forEach(_match => {
// 						vmdlStrings.add(_match);
// 					});
// 				}
// 				let vpcfMatches = match.match(vpcfRegex);
// 				if (vpcfMatches) {
// 					vpcfMatches.forEach(_match => {
// 						vcpfStrings.add(_match);
// 					});
// 				}
// 			});
// 		}
// 	});
// });
// 扫描vpcf
searchFiles();
particleReplaceResult();