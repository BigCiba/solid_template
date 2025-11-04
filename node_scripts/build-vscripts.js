/**
 * 构建 VScripts 的包装脚本
 * 动态读取 addon name 并执行 tstl 编译
 */

const { spawn } = require('child_process');
const { getAddonPaths } = require('./get-addon-name');
const { generateVScriptsTsConfig } = require('./generate-tsconfig');

const paths = getAddonPaths();
const args = process.argv.slice(2); // 获取传递给脚本的参数

console.log(`📦 Building VScripts for addon: ${paths.addonName}`);

// 先生成 tsconfig.json（确保配置是最新的）
try {
	generateVScriptsTsConfig();
} catch (error) {
	console.error('❌ Failed to generate tsconfig.json:', error);
	process.exit(1);
}

console.log(`📂 Config: ${paths.vscriptsTsConfig}`);

// 执行 tstl 命令
const tstlProcess = spawn('tstl', ['--project', paths.vscriptsTsConfig, ...args], {
	stdio: 'inherit',
	shell: true,
});

tstlProcess.on('error', (error) => {
	console.error('❌ Failed to run TSTL:', error);
	process.exit(1);
});

tstlProcess.on('exit', (code) => {
	process.exit(code || 0);
});
