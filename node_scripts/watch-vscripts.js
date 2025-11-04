const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
const { getAddonPaths } = require('./get-addon-name');
const { generateVScriptsTsConfig } = require('./generate-tsconfig');

const paths = getAddonPaths();
const ROOT_DIR = paths.root;
const SOURCE_DIR = paths.contentScripts;
const OUTPUT_DIR = paths.gameScripts;

console.log('🔍 Starting TSTL watch with auto-cleanup...');

// 先生成 tsconfig.json（确保配置是最新的）
try {
	generateVScriptsTsConfig();
} catch (error) {
	console.error('❌ Failed to generate tsconfig.json:', error);
	process.exit(1);
}

console.log(`📂 Source: ${SOURCE_DIR}`);
console.log(`📂 Output: ${OUTPUT_DIR}`);

// 启动 TSTL 监听进程 (在源码目录运行，自动读取 tsconfig.json)
const tstlProcess = spawn('tstl', ['--watch'], {
	stdio: 'inherit',
	shell: true,
	cwd: SOURCE_DIR
});

tstlProcess.on('error', (error) => {
	console.error('❌ Failed to start TSTL:', error);
	process.exit(1);
});

// 监听源文件删除
const watcher = chokidar.watch('**/*.ts', {
	cwd: SOURCE_DIR,
	ignored: ['node_modules/**', '*.d.ts'],
	persistent: true,
	ignoreInitial: true
});

/**
 * 将 TypeScript 文件路径转换为对应的 Lua 文件路径
 */
function getLuaPathFromTsPath(tsPath) {
	const relativePath = path.relative(SOURCE_DIR, tsPath);
	const luaRelativePath = relativePath.replace(/\.tsx?$/, '.lua');
	return path.join(OUTPUT_DIR, luaRelativePath);
}

watcher.on('unlink', (filePath) => {
	const fullPath = path.join(SOURCE_DIR, filePath);
	const luaPath = getLuaPathFromTsPath(fullPath);

	if (fs.existsSync(luaPath)) {
		try {
			fs.unlinkSync(luaPath);
			console.log(`🗑️  Deleted: ${path.relative(OUTPUT_DIR, luaPath)}`);

			// 同时删除对应的 .lua.map 文件（如果存在）
			const luaMapPath = luaPath + '.map';
			if (fs.existsSync(luaMapPath)) {
				fs.unlinkSync(luaMapPath);
				console.log(`🗑️  Deleted: ${path.relative(OUTPUT_DIR, luaMapPath)}`);
			}
		} catch (error) {
			console.error(`❌ Failed to delete ${luaPath}:`, error.message);
		}
	}
});

watcher.on('error', (error) => {
	console.error('❌ Watcher error:', error);
});

watcher.on('ready', () => {
	console.log('👁️  Watching for file deletions...');
});

// 优雅退出
process.on('SIGINT', () => {
	console.log('\n⏹️  Stopping watch...');
	watcher.close();
	tstlProcess.kill();
	process.exit(0);
});

process.on('SIGTERM', () => {
	watcher.close();
	tstlProcess.kill();
	process.exit(0);
});
