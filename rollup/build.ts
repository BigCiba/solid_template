import color from 'cli-color';
import path, { join } from 'path';
import * as rollup from 'rollup';
import { bundlePanoramaPolyfill } from 'solid-panorama-polyfill';
import { buildPolyfill } from './build-polyfill';
import GetRollupWatchOptions from './build-rollup-config';
import { dirExists, fileColor, normalizedPath, Panorama, ReadAddonName, ReadPackage, Tooltip } from './utils';

const rootPath = normalizedPath(path.join(__dirname, '../src'));

/**
 * 启动Rollup编译
 */
async function StartRollup(): Promise<void> {
    const packageInfo = await ReadPackage();
    let options: rollup.RollupWatchOptions = GetRollupWatchOptions(rootPath, packageInfo);
    let watcher = rollup.watch(options);

    // 监听错误
    watcher.on('event', async evt => {
        if (evt.code === 'ERROR') {
            const f = normalizedPath(evt.error.loc?.file || '').replace(
                rootPath + '/',
                ''
            );
            console.log(evt);
            console.log(
                Panorama +
                ' Build Error: ' +
                color.red(f) +
                ': ' +
                color.yellow(evt.error.loc?.line)
            );
            console.log(
                Panorama + ' Build Error: ' + color.red(evt.error.message)
            );
        }
    });

    let cacheLog = "🥇 First compilation complete";
    watcher.on('change', p => {
        if (p.includes("tooltips")) {
            cacheLog = Tooltip + ' ✒️  ' + fileColor(path.basename(p));
            console.log(Tooltip + " 👁️  change detected");
        } else {
            cacheLog = Panorama + ' ✒️  ' + fileColor(path.basename(p));
            console.log(Panorama + " 👁️  change detected");
        }
    });

    watcher.on("event", (event) => {
        if (event.code == "END") {
            console.log(cacheLog);
        }
    });
}

/**
 * 任务入口
 */
export default async function TaskPUI() {
    const addonName = await ReadAddonName();
    if (addonName) {
        if (await dirExists(`./content/${addonName}`)) {
            // 首先编译 polyfill TypeScript 文件
            console.log('🔨 Building polyfill...');
            await buildPolyfill();

            await bundlePanoramaPolyfill({
                output: `./content/${addonName}/panorama/scripts/custom_game/panorama-polyfill.js`,
                using: { console: true, timers: true },
                merges: [join(__dirname, 'custom-polyfill.js')]
            });
            await bundlePanoramaPolyfill({
                output: `./content/${addonName}/panorama/scripts/custom_game/solid-core.js`,
                using: {},
                merges: [join(__dirname, 'solid-core.js')]
            });

            StartRollup();
        } else {
            console.error(`./content/${addonName} 目录不存在，检查package.json的name属性`);
        }
    } else {
        console.error('package.json 没有配置正确的 name 属性');
    }
}

TaskPUI();
