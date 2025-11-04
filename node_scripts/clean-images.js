const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const { getAddonPaths } = require('./get-addon-name');

const paths = getAddonPaths();
const ROOT_DIR = paths.root;
const CONTENT_IMAGES_DIR = paths.contentImages;
const GAME_IMAGES_DIR = paths.gameImages;

console.log('🔍 Checking for orphaned compiled images...');
console.log(`📂 Source: ${CONTENT_IMAGES_DIR}`);
console.log(`📂 Output: ${GAME_IMAGES_DIR}`);

// 检查目录是否存在
if (!fs.existsSync(CONTENT_IMAGES_DIR)) {
	console.log('⚠️  Content images directory not found, skipping cleanup.');
	process.exit(0);
}

if (!fs.existsSync(GAME_IMAGES_DIR)) {
	console.log('⚠️  Game images directory not found, nothing to clean.');
	process.exit(0);
}

/**
 * 获取源图片文件列表（相对路径）
 * 支持的图片格式
 */
function getSourceImages() {
	const imageExtensions = ['png', 'jpg', 'jpeg', 'psd', 'tga', 'bmp'];
	const patterns = imageExtensions.map(ext => `**/*.${ext}`);

	const allImages = new Set();
	patterns.forEach(pattern => {
		const files = glob.sync(pattern, {
			cwd: CONTENT_IMAGES_DIR,
			nocase: true
		});
		files.forEach(file => allImages.add(file));
	});

	return allImages;
}

/**
 * 获取编译后的 vtex_c 文件列表
 */
function getCompiledImages() {
	const files = glob.sync('**/*.vtex_c', {
		cwd: GAME_IMAGES_DIR
	});
	return files;
}

/**
 * 将源文件路径转换为编译后的文件路径
 * 例如: "subfolder/loading_bg.png" -> "subfolder/loading_bg_png.vtex_c"
 */
function getCompiledPath(sourcePath) {
	const parsed = path.parse(sourcePath);
	const ext = parsed.ext.slice(1).toLowerCase(); // 去掉 "." 并转小写
	const compiledName = `${parsed.name}_${ext}.vtex_c`;
	return path.join(parsed.dir, compiledName);
}

/**
 * 将编译后的文件路径还原为可能的源文件路径
 * 例如: "subfolder/loading_bg_png.vtex_c" -> "subfolder/loading_bg.png"
 */
function getSourcePathFromCompiled(compiledPath) {
	const parsed = path.parse(compiledPath);
	const match = parsed.name.match(/^(.+)_(png|jpg|jpeg|psd|tga|bmp)$/i);

	if (!match) {
		return null;
	}

	const originalName = match[1];
	const originalExt = match[2];
	return path.join(parsed.dir, `${originalName}.${originalExt}`);
}

// 主逻辑
const sourceImages = getSourceImages();
const compiledImages = getCompiledImages();

console.log(`\n📊 Found ${sourceImages.size} source images`);
console.log(`📊 Found ${compiledImages.length} compiled images\n`);

let deletedCount = 0;
const orphanedImages = [];

// 检查每个编译后的文件
compiledImages.forEach(compiledPath => {
	const possibleSourcePath = getSourcePathFromCompiled(compiledPath);

	if (!possibleSourcePath) {
		console.log(`⚠️  Cannot parse compiled file: ${compiledPath}`);
		return;
	}

	// 规范化路径以进行比较（统一使用正斜杠）
	const normalizedSourcePath = possibleSourcePath.replace(/\\/g, '/');

	// 检查源文件是否存在
	let sourceExists = false;
	for (const sourcePath of sourceImages) {
		if (sourcePath.replace(/\\/g, '/') === normalizedSourcePath) {
			sourceExists = true;
			break;
		}
	}

	if (!sourceExists) {
		orphanedImages.push({
			compiled: compiledPath,
			expectedSource: possibleSourcePath
		});
	}
});

if (orphanedImages.length === 0) {
	console.log('✅ No orphaned compiled images found. Everything is in sync!');
	process.exit(0);
}

console.log(`🗑️  Found ${orphanedImages.length} orphaned compiled image(s):\n`);

orphanedImages.forEach(({ compiled, expectedSource }) => {
	const fullPath = path.join(GAME_IMAGES_DIR, compiled);

	try {
		if (fs.existsSync(fullPath)) {
			fs.unlinkSync(fullPath);
			console.log(`   ✓ Deleted: ${compiled}`);
			console.log(`     (source missing: ${expectedSource})`);
			deletedCount++;
		}
	} catch (error) {
		console.error(`   ✗ Failed to delete ${compiled}:`, error.message);
	}
});

console.log(`\n🎉 Cleanup complete! Deleted ${deletedCount} orphaned file(s).`);
