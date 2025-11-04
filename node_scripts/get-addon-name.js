/**
 * 统一工具：从 package.json 读取 addon name
 * 用于所有需要动态路径配置的脚本
 */

const fs = require('fs');
const path = require('path');

/**
 * 读取 package.json 中的 name 字段
 * @returns {string} addon name
 */
function getAddonName() {
	const packageJsonPath = path.join(__dirname, '..', 'package.json');
	try {
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
		const addonName = packageJson.name;
		if (!addonName) {
			throw new Error('package.json 中缺少 name 字段');
		}
		return addonName;
	} catch (error) {
		console.error('读取 package.json 失败:', error.message);
		process.exit(1);
	}
}

/**
 * 获取常用路径
 * @returns {Object} 包含常用路径的对象
 */
function getAddonPaths() {
	const ROOT_DIR = path.join(__dirname, '..');
	const addonName = getAddonName();

	return {
		addonName,
		root: ROOT_DIR,
		// Content 目录路径
		contentRoot: path.join(ROOT_DIR, 'content', addonName),
		contentScripts: path.join(ROOT_DIR, 'content', addonName, 'scripts', 'vscripts'),
		contentPanorama: path.join(ROOT_DIR, 'content', addonName, 'panorama'),
		contentImages: path.join(ROOT_DIR, 'content', addonName, 'panorama', 'images', 'custom_game'),
		contentDeclarations: path.join(ROOT_DIR, 'content', addonName, 'declarations'),
		// Game 目录路径
		gameRoot: path.join(ROOT_DIR, 'game', addonName),
		gameScripts: path.join(ROOT_DIR, 'game', addonName, 'scripts', 'vscripts'),
		gameNpc: path.join(ROOT_DIR, 'game', addonName, 'scripts', 'npc'),
		gameImages: path.join(ROOT_DIR, 'game', addonName, 'panorama', 'images', 'custom_game'),
		// tsconfig 路径
		vscriptsTsConfig: path.join(ROOT_DIR, 'content', addonName, 'scripts', 'vscripts', 'tsconfig.json'),
	};
}

module.exports = {
	getAddonName,
	getAddonPaths,
};
