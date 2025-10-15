const fs = require('fs');
const readline = require('readline');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const packageJson = require(path.join(ROOT_DIR, 'package.json'));
const addonName = packageJson.name || 'addon';
const folderPath = path.join(ROOT_DIR, 'game', addonName, 'resource');
const schineseFile = path.join(folderPath, 'addon_schinese.txt');
const backupFile = path.join(folderPath, 'addon_schinese_backup.txt');
const englishFile = path.join(folderPath, 'addon_english.txt');
const russianFile = path.join(folderPath, 'addon_russian.txt');

// 备份文件
fs.copyFileSync(schineseFile, backupFile);
console.log('已备份 addon_schinese.txt 文件为 addon_schinese_backup.txt');

// 创建读取接口
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// 提示用户选择覆盖文件
rl.question('请选择要覆盖到 addon_schinese.txt 的文件 (1: addon_english.txt, 2: addon_russian.txt): ', (answer) => {
	let sourceFile;
	if (answer === '1') {
		sourceFile = englishFile;
	} else if (answer === '2') {
		sourceFile = russianFile;
	} else {
		console.log('无效的选择');
		rl.close();
		return;
	}

	// 覆盖文件
	fs.copyFileSync(sourceFile, schineseFile);
	console.log(`已将 ${path.basename(sourceFile)} 覆盖到 addon_schinese.txt`);

	// 等待用户按下回车键
	rl.question('按下回车键以恢复原文件...', () => {
		// 恢复备份文件
		fs.copyFileSync(backupFile, schineseFile);
		console.log('已恢复原 addon_schinese.txt 文件');
		// 删除备份文件
		fs.unlinkSync(backupFile);
		console.log('已删除备份文件 addon_schinese_backup.txt');
		rl.close();
	});
});

