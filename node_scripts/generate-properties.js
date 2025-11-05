const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const packageJson = require(path.join(ROOT_DIR, 'package.json'));
const PROJECT_NAME = packageJson.name;

/**
 * 解析 KV 文件
 * @param {string} content - KV 文件内容
 * @returns {Object} 解析后的对象
 */
function parseKV(content) {
	const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));
	const root = {};
	const stack = [root];
	let current = root;
	let i = 0;

	while (i < lines.length) {
		const trimmed = lines[i];

		// 跳过 "KeyValue" 顶层标记
		if (trimmed === '"KeyValue"') {
			i++;
			continue;
		}

		// 处理对象开始 "{" 
		if (trimmed === '{') {
			i++;
			continue;
		}

		// 处理对象结束
		if (trimmed === '}') {
			stack.pop();
			current = stack[stack.length - 1];
			i++;
			continue;
		}

		// 处理键值对: "key" "value"
		const kvMatch = trimmed.match(/^"([^"]+)"\s+"([^"]*)"$/);
		if (kvMatch) {
			const [, key, value] = kvMatch;
			current[key] = value;
			i++;
			continue;
		}

		// 处理对象键: "key" 后面跟 "{"
		const keyMatch = trimmed.match(/^"([^"]+)"$/);
		if (keyMatch && i + 1 < lines.length && lines[i + 1] === '{') {
			const [, key] = keyMatch;
			const newObj = {};
			current[key] = newObj;
			stack.push(newObj);
			current = newObj;
			i++; // 跳过当前键
			continue;
		}

		i++;
	}

	return root;
}

/**
 * 从本地 KV 文件读取属性数据
 */
function loadPropertiesFromKV() {
	const kvPath = path.join(ROOT_DIR, `content/${PROJECT_NAME}/scripts/vscripts/modifiers/eom_modifier/properties.kv`);

	if (!fs.existsSync(kvPath)) {
		console.error(`❌ 错误: 找不到文件 ${kvPath}`);
		process.exit(1);
	}

	console.log(`📄 读取属性文件: ${kvPath}`);
	const content = fs.readFileSync(kvPath, 'utf-8');
	const kvData = parseKV(content);

	// 转换 KV 数据格式为属性对象
	const properties = {};
	for (const key in kvData) {
		if (typeof kvData[key] === 'object' && kvData[key] !== null) {
			properties[key] = kvData[key];
		}
	}

	console.log(`✅ 成功读取 ${Object.keys(properties).length} 个属性定义\n`);
	return properties;
}

(() => {
	const properties = loadPropertiesFromKV();
	let demoProperty = "export const properties = [";
	let demoMultipleProperty = "export const multiple_properties = [";
	let EOMModifierFunction = "enum EOMModifierFunction {";
	let ATTRIBUTE_MAP = "const ATTRIBUTE_MAP: Record<string, EOMModifierFunction> = {";
	let ATTRIBUTE_MULTIPLE_MAP = "const ATTRIBUTE_MULTIPLE_MAP: Record<string, EOMModifierFunction> = {";
	let EOMModifierFunctionSettleCallback = "const EOMModifierFunctionSettleCallback: Partial<Record<EOMModifierFunction, (a: any, b: any) => any>> = {";
	let EOMModifierFunctionType = "const EOMModifierFunctionType: Partial<Record<EOMModifierFunction, EOMModifierPropertyType>> = {";
	let EOMModifierFunctionCheckValueCallback = "const EOMModifierFunctionCheckValueCallback: Partial<Record<EOMModifierFunction, (value: any, tParams?: any) => any>> = {";
	let generate_function = "";
	let lang = `"lang"
{
	"Language"		"Schinese"
	"Tokens"
	{`;
	let index = 0;
	for (const attr in properties) {
		const propData = properties[attr];

		// 注释处理
		if (propData.note != null && propData.note !== '' || propData.localization != null && propData.localization !== '') {
			EOMModifierFunction += `\n	/** ${propData.note || propData.localization} */`;
		}

		// 枚举定义
		if (index == 0) {
			EOMModifierFunction += `\n	${attr} = modifierfunction.MODIFIER_FUNCTION_LAST + 1,`;
		} else {
			EOMModifierFunction += `\n	${attr},`;
		}

		// 属性字符串映射
		if (propData.string != null && propData.string !== '') {
			if (propData.multiple == '1' || propData.multiple === 1) {
				ATTRIBUTE_MULTIPLE_MAP += `\n	${propData.string}: EOMModifierFunction.${attr},`;
				demoMultipleProperty += `\n	\"${propData.string}\",`;
			} else {
				ATTRIBUTE_MAP += `\n	${propData.string}: EOMModifierFunction.${attr},`;
				demoProperty += `\n	\"${propData.string}\",`;
			}

			// 本地化字符串
			if (propData.localization != null && propData.localization !== '') {
				lang += `\n		"dota_ability_attribute_${propData.string}" "${propData.localization}"`;
			}
			if (propData.localization_desc != null && propData.localization_desc !== '') {
				lang += `\n		"dota_ability_attribute_${propData.string}_description" "${propData.localization_desc}"`;
			}
		}

		// 结算回调
		if (propData.settle != null && propData.settle !== '') {
			EOMModifierFunctionSettleCallback += `\n	[EOMModifierFunction.${attr}]: ${propData.settle},`;
		}

		// 属性类型
		if (propData.type != null && propData.type !== '' && propData.type != "NONE") {
			EOMModifierFunctionType += `\n	[EOMModifierFunction.${attr}]: EOMModifierPropertyType.${propData.type},`;
		}

		// 值检查回调
		if (propData.check_value != null && propData.check_value !== '') {
			EOMModifierFunctionCheckValueCallback += `\n	[EOMModifierFunction.${attr}]: ${propData.check_value},`;
		}

		// 生成访问函数
		if (propData.generate_function != null && (propData.generate_function == '1' || propData.generate_function === 1)) {
			let funcName = attr
				.replace("EOM_MODIFIER_PLAYER_PROPERTY_", "")
				.replace("EOM_MODIFIER_TEAM_PROPERTY_", "")
				.replace("EOM_MODIFIER_PROPERTY_", "")
				.replace("EOM_MODIFIER_TEAMHERO_PROPERTY_", "");
			funcName = funcName.split("_")
				.map(word => word.toLowerCase())
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join("");

			if (propData.type != null && propData.type == "PLAYER") {
				generate_function += `\n/** ${propData.note || propData.localization} */\nfunction Get${funcName}(playerID: PlayerID) {
	return GetModifierProperty(playerID, EOMModifierFunction.${attr});
}`;
			} else {
				generate_function += `\n/** ${propData.note || propData.localization} */\nfunction Get${funcName}(unit: CDOTA_BaseNPC, params?: any) {
	return GetModifierProperty(unit, EOMModifierFunction.${attr}, params);
}`;
			}
		}
		index++;
	}
	demoProperty += `\n]`;
	demoMultipleProperty += `\n]`;
	EOMModifierFunction += `\n	EOM_MODIFIER_PROPERTY_LAST,\n}`;
	ATTRIBUTE_MAP += `\n}`;
	ATTRIBUTE_MULTIPLE_MAP += `\n}`;
	EOMModifierFunctionSettleCallback += `\n}`;
	EOMModifierFunctionType += `\n}`;
	EOMModifierFunctionCheckValueCallback += `\n}`;
	lang += `\n	}\n}`;

	const sheet_properties = `/** @noSelfInFile */\n${EOMModifierFunction}\n${ATTRIBUTE_MAP}\n${ATTRIBUTE_MULTIPLE_MAP}\n${EOMModifierFunctionSettleCallback}\n${EOMModifierFunctionType}\n${EOMModifierFunctionCheckValueCallback}\n${generate_function}`;

	// 使用动态路径
	const dirPath = path.join(ROOT_DIR, `content/${PROJECT_NAME}/scripts/vscripts/modifiers/eom_modifier`);
	fs.mkdirSync(dirPath, { recursive: true });
	fs.writeFileSync(path.join(dirPath, 'sheet_properties.ts'), sheet_properties);
	console.log(`✅ 生成文件: ${path.join(dirPath, 'sheet_properties.ts')}`);

	const demoTsPath = path.join(ROOT_DIR, 'src/ui/hud_demo');
	fs.mkdirSync(demoTsPath, { recursive: true });
	fs.writeFileSync(path.join(demoTsPath, 'property.ts'), `${demoProperty}\n${demoMultipleProperty}`);
	console.log(`✅ 生成文件: ${path.join(demoTsPath, 'property.ts')}`);

	const langPath = path.join(ROOT_DIR, `content/${PROJECT_NAME}/localization/schinese`);
	fs.mkdirSync(langPath, { recursive: true });
	fs.writeFileSync(path.join(langPath, 'properties.vdf'), lang);
	console.log(`✅ 生成文件: ${path.join(langPath, 'properties.vdf')}`);

	console.log('\n🎉 所有属性文件生成完成！');
})();