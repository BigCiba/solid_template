import { existsSync, mkdirSync, readFileSync } from 'fs';
import path from 'path';
import { Plugin } from 'rollup';
import ts from 'typescript';
import { writeFileCache } from './utils';

interface PolyfillPluginOptions {
	packageFile: string;
	rootDir: string;
	outputFile: string;
	banner?: string;
}

export function GeneratePolyfill(options: PolyfillPluginOptions): Plugin {
	return {
		name: 'plugin-polyfill',
		buildStart() {
			this.addWatchFile(options.packageFile);
			this.addWatchFile(options.rootDir);
			const entries = loadPolyfillEntries(options.packageFile);
			for (const entry of entries) {
				const absPath = path.join(options.rootDir, entry);
				if (existsSync(absPath)) {
					this.addWatchFile(absPath);
				} else {
					this.warn(`Polyfill file not found: ${entry}`);
				}
			}
		},
		writeBundle() {
			const result = buildPolyfillBundle(options);
			if (result.files.length > 0) {
				console.log(`✅ Polyfill files compiled: ${result.files.join(', ')}`);
			}
			if (result.missing.length > 0) {
				console.warn(`⚠️ Missing polyfill files: ${result.missing.join(', ')}`);
			}
		}
	};
}

interface PolyfillConfigOptions {
	packageFile: string;
	rootDir: string;
	outputFile: string;
	banner?: string;
}

interface PolyfillCompileResult {
	files: string[];
	missing: string[];
	code: string;
}

function loadPolyfillEntries(packageFile: string): string[] {
	try {
		const pkgRaw = readFileSync(packageFile, 'utf8');
		const pkg = JSON.parse(pkgRaw);
		const panorama = pkg?.panorama ?? {};
		const entries: unknown = panorama?.Polyfill ?? [];
		if (!Array.isArray(entries)) {
			return [];
		}
		return entries
			.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
			.map(item => item.replace(/\\/g, '/'));
	} catch (error) {
		console.error('读取 package.json 的 Polyfill 配置失败:', error);
		return [];
	}
}

function compilePolyfills(rootDir: string, entries: string[], banner?: string): PolyfillCompileResult {
	const compiled: string[] = [];
	const missing: string[] = [];
	let code = '';

	for (const entry of entries) {
		const filePath = path.join(rootDir, entry);
		if (!existsSync(filePath)) {
			missing.push(entry);
			continue;
		}

		try {
			const ext = path.extname(filePath).toLowerCase();
			const source = readFileSync(filePath, 'utf8');
			let compiledCode = source;
			if (ext === '.ts' || ext === '.tsx') {
				compiledCode = ts.transpileModule(source, {
					compilerOptions: {
						target: ts.ScriptTarget.ES5,
						module: ts.ModuleKind.None,
						sourceMap: false,
						removeComments: false,
						noImplicitUseStrict: true,
						sx: ts.JsxEmit.None
					},
					fileName: entry
				}).outputText;
			}

			code += `\n// ========== ${entry} ==========\n`;
			code += compiledCode;
			compiled.push(entry);
		} catch (error) {
			missing.push(entry);
			console.error(`编译 polyfill 文件失败: ${entry}`, error);
		}
	}

	if (compiled.length > 0) {
		const header = banner ?? '';
		const info = `// Auto-generated from package.json Polyfill (${compiled.join(', ')})\n`;
		code = header + info + code;
	}

	return { files: compiled, missing, code };
}

function buildPolyfillBundle(options: PolyfillConfigOptions): PolyfillCompileResult {
	const entries = loadPolyfillEntries(options.packageFile);
	const result = compilePolyfills(options.rootDir, entries, options.banner);

	if (!result.code) {
		return result;
	}

	const dir = path.dirname(options.outputFile);
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}

	writeFileCache(options.outputFile, result.code);
	return result;
}
