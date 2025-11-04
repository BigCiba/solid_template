import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { existsSync } from 'node:fs';
import path, { join } from 'node:path';
import { RollupWatchOptions } from 'rollup';
import { fixLibs } from "./plugin-libs-inject";
import { GenerateCustomUIManifest } from './plugin-manifest';
import { GeneratePolyfill } from './plugin-polyfill';
import { SaveFresh } from "./plugin-save-fresh";
import { GenerateXML } from './plugin-xml';
import { rollupPluginLess } from './rollup-plugin-less';
import compatiblePanorama from './rollup-plugin-panorama';
import { rollupPluginXML } from './rollup-plugin-xml';
import { ContextMenu, Panorama, Tooltip } from './utils';

interface PackageInfo {
	name: string,
	panorama?: {
		CustomLoadingScreen?: string,
		Hud?: string[],
		FlyoutScoreboard?: string[],
		Tooltip?: string[],
		ContextMenu?: string[],
		ManifestScripts?: string[],
		kv?: string[],
		ServiceConfig?: Record<string, any>,
	};
}
export default function GetRollupWatchOptions(rootPath: string, packageInfo: PackageInfo) {
	let pagesUrl = rootPath + "/ui";
	const addonName = packageInfo.name;
	const panorama = packageInfo.panorama ?? {};

	let PanelList: {
		name: string;
		type: 'Hud' | 'FlyoutScoreboard';
	}[] = [];
	let ManifestScripts: string[] = [];
	let KVList: string[] = [];
	let ConfigureList: string[] = [];
	let TooltipList: string[] = [];
	if (panorama.Hud) {
		for (const hud of panorama.Hud) {
			PanelList.push({ name: hud, type: 'Hud' });
		}
	}
	if (panorama.FlyoutScoreboard) {
		for (const flyoutScoreboard of panorama.FlyoutScoreboard) {
			PanelList.push({ name: flyoutScoreboard, type: 'FlyoutScoreboard' });
		}
	}

	if (panorama.kv) {
		for (const kv of panorama.kv) {
			KVList.push(kv);
		}
	}
	if (panorama.ServiceConfig) {
		for (const configure in panorama.ServiceConfig) {
			ConfigureList.push(panorama.ServiceConfig[configure].output_name ?? configure);
		}
	}
	if (panorama.ManifestScripts) {
		for (const script of panorama.ManifestScripts) {
			ManifestScripts.push(script);
		}
	}
	// 入口文件夹
	const pages = PanelList.filter(v => {
		return existsSync(path.join(pagesUrl, `${v.name}/${v.name}.tsx`));
	});
	const inputFiles = pages.map(v => {
		return path.join(pagesUrl, `${v.name}/${v.name}.tsx`);
	});
	if (panorama.Tooltip) {
		panorama.Tooltip.filter(v => {
			let p = path.join(pagesUrl, `tooltips/${v}/${v}.tsx`);
			if (existsSync(p)) {
				inputFiles.push(p);
				TooltipList.push(v);
				return true;
			}
			return false;
		});
	}
	if (panorama.ContextMenu) {
		panorama.ContextMenu.filter(v => {
			let p = path.join(pagesUrl, `context_menus/${v}/${v}.tsx`);
			if (existsSync(p)) {
				inputFiles.push(p);
				return true;
			}
			return false;
		});
	}
	if (panorama.CustomLoadingScreen) {
		inputFiles.push(path.join(pagesUrl, `${panorama.CustomLoadingScreen}/${panorama.CustomLoadingScreen}.tsx`));
	}
	console.log(pages.map(v => Panorama + ' 👁️  ' + v.name).join('\n'));
	if (panorama.Tooltip) {
		console.log(panorama.Tooltip.map(v => Tooltip + ' 👁️  ' + v).join('\n'));
	}
	if (panorama.ContextMenu) {
		console.log(panorama.ContextMenu.map(v => ContextMenu + ' 👁️  ' + v).join('\n'));
	}

	const layoutDir = join(
		__dirname,
		'../content/' + addonName + '/panorama/layout/custom_game'
	);

	const scriptsDir = join(
		__dirname,
		'../content/' + addonName + '/panorama/scripts/custom_game'
	);

	const polyfillRoot = join(__dirname, '../src/polyfill');
	const packageFile = join(__dirname, '../package.json');
	const polyfillOutput = join(
		__dirname,
		'../content/' + addonName + '/panorama/scripts/custom_game/panorama-polyfill.js'
	);

	const stylesDir = join(
		__dirname,
		'../content/' + addonName + '/panorama/styles/custom_game'
	);

	const options: RollupWatchOptions = {
		input: inputFiles,
		output: {
			sourcemap: false,
			dir: scriptsDir,
			format: 'cjs',
			entryFileNames: `[name].js`,
			chunkFileNames: `[name].js`,
			assetFileNames: `[name].[ext]`,
			manualChunks(id, api) {
				// const u = new URL(id, 'file:');
				if (id.search(/[\\/]common[\\/]/) >= 0) {
					return 'common';
				}
				if (
					id.includes('commonjsHelpers.js') ||
					id.includes('rollupPluginBabelHelpers.js') ||
					id.search(/[\\/]node_modules[\\/]/) >= 0 ||
					id.search(/[\\/]inject_modules[\\/]/) >= 0
				) {
					return 'libs';
				}
			}
		},
		plugins: [
			babel({
				comments: false,
				exclude: 'node_modules/**',
				extensions: ['.js', '.ts', '.tsx'],
				babelHelpers: 'bundled',
				presets: [
					['@babel/preset-env', { targets: { node: '18.12' } }],
					'@babel/preset-typescript',
					[
						'@bigciba/babel-preset-solid-panorama',
						{
							moduleName: '@bigciba/solid-panorama-runtime',
							generate: 'universal'
						}
					]
				],
				plugins: [
					'@babel/plugin-transform-typescript',
					'babel-plugin-macros'
				]
			}),
			alias({
				entries: [
					{
						find: '@common/(.*)',
						replacement: join(__dirname, 'pages/common/$1.ts')
					}
				]
			}),
			replace({
				preventAssignment: true,
				'process.env.NODE_ENV': JSON.stringify('production')
				// 'process.env.NODE_ENV': JSON.stringify('development'),
			}),
			// rollupTypescript({
			//     tsconfig: path.join(rootPath, `tsconfig.json`)
			// }),
			commonjs(),
			nodeResolve({ extensions: ['.tsx', '.ts', '.js', '.jsx'] }),
			compatiblePanorama({ addonName }),
			rollupPluginXML({
				inputFiles,
				dir: layoutDir,
				resolveFilename(filename) {
					if (panorama.Tooltip && panorama.Tooltip.indexOf(filename) != -1) {
						return `tooltips/${filename}`;
					} else if (panorama.ContextMenu && panorama.ContextMenu.indexOf(filename) != -1) {
						return `context_menus/${filename}`;
					}
					return filename;
				}
			}),
			GenerateXML({
				inputFiles,
				rootPath: pagesUrl,
				dir: layoutDir,
				resolveFilename(filename) {
					if (panorama.Tooltip && panorama.Tooltip.indexOf(filename) != -1) {
						return `tooltips/${filename}`;
					} else if (panorama.ContextMenu && panorama.ContextMenu.indexOf(filename) != -1) {
						return `context_menus/${filename}`;
					}
					return filename;
				}
			}),
			rollupPluginLess({
				inputFiles,
				dir: stylesDir,
				rootPath: rootPath,
				resolveFilename(filename) {
					if (panorama.Tooltip && panorama.Tooltip.indexOf(filename) != -1) {
						return `tooltips/${filename}`;
					} else if (panorama.ContextMenu && panorama.ContextMenu.indexOf(filename) != -1) {
						return `context_menus/${filename}`;
					}
					return filename;
				}
			}),
			GeneratePolyfill({
				packageFile,
				rootDir: polyfillRoot,
				outputFile: polyfillOutput
			}),
			GenerateCustomUIManifest({
				PanelList,
				ManifestScripts: ManifestScripts,
				KVList,
				TooltipList,
				ConfigureList,
				rootPath: pagesUrl,
				dir: layoutDir,
				scriptsDir: scriptsDir,
			}),
			fixLibs(),
			SaveFresh(),
		]
	};

	return options;
}
