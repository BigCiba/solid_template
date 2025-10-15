import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

/**
 * 扫描 polyfill 目录下的所有 TypeScript 文件
 * @param polyfillDir polyfill 目录路径
 * @returns 文件路径数组
 */
function scanPolyfillFiles(polyfillDir: string): string[] {
	const files: string[] = [];
	const entries = fs.readdirSync(polyfillDir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(polyfillDir, entry.name);
		if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'README.md') {
			files.push(fullPath);
		}
	}

	return files.sort(); // 排序确保一致的构建顺序
}

/**
 * 使用 TypeScript 编译器直接编译文件
 * @param filePath 文件路径
 * @returns 编译后的 JavaScript 代码
 */
function compileTypeScriptFile(filePath: string): string {
	// 读取源代码
	const sourceCode = fs.readFileSync(filePath, 'utf8');

	// TypeScript 编译选项
	const compilerOptions: ts.CompilerOptions = {
		target: ts.ScriptTarget.ES5,
		module: ts.ModuleKind.None,
		strict: false,
		skipLibCheck: true,
		allowSyntheticDefaultImports: true,
		esModuleInterop: true,
		removeComments: false
	};

	// 编译代码
	const result = ts.transpile(sourceCode, compilerOptions, filePath);

	return result;
}
/**
 * 构建 polyfill TypeScript 文件到 JavaScript
 */
export async function buildPolyfill(): Promise<void> {
	const polyfillDir = path.join(__dirname, '../src/polyfill');
	const outputFile = path.join(__dirname, 'custom-polyfill.js');

	// 扫描所有 polyfill 文件
	const polyfillFiles = scanPolyfillFiles(polyfillDir);
	console.log(`📁 发现 polyfill 文件: ${polyfillFiles.map(f => path.basename(f)).join(', ')}`);

	try {
		let combinedCode = '';
		const fileList: string[] = [];

		// 逐个编译并合并所有文件
		for (const filePath of polyfillFiles) {
			const fileName = path.basename(filePath);
			console.log(`🔨 编译文件: ${fileName}`);

			const compiledCode = compileTypeScriptFile(filePath);

			// 添加文件分隔注释
			combinedCode += `\n// ========== 来自 ${fileName} ==========\n`;
			combinedCode += compiledCode;

			fileList.push(fileName);
		}

		// 添加注释头部
		const banner = `// Auto-generated from src/polyfill/ (${fileList.join(', ')})\n`;
		const finalCode = banner + combinedCode;

		// 写入文件
		fs.writeFileSync(outputFile, finalCode, 'utf8');

		console.log(`✅ Polyfill compiled: ${outputFile}`);
		console.log(`📦 Merged ${fileList.length} files: ${fileList.join(', ')}`);
	} catch (error) {
		console.error('❌ Polyfill build failed:', error);
		throw error;
	}
}

// 如果直接运行此脚本
if (require.main === module) {
	buildPolyfill().catch(console.error);
}