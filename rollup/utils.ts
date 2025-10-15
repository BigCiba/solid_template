import color from 'cli-color';
import * as fs from 'fs';

export function normalizedPath(p: string): string {
    return p.replace(/\\/g, '/');
}

export const Panorama = `[${color.magenta('Panorama')}]`;
export const Tooltip = `[${color.cyan('Tooltips')}]`;
export const ContextMenu = `[${color.yellow('ContextMenus')}]`;
export const Common = `[${color.green('Commons')}]`;

export function fileColor(s: string) {
    return color.green(s);
}

export function isDir(p: string) {
    return fs.statSync(p).isDirectory();
}



/**
 * 读取package
 */
export async function ReadPackage() {
    return fs.promises.readFile('package.json', 'utf8').then(data => {
        try {
            const packageJson = JSON.parse(data);
            return packageJson;
        } catch (parseError) {
            console.error('解析 package.json 文件出错：', parseError);
        }
    }).catch(err => {
        console.error('读取 package.json 文件出错：', err);
    });
}

/**
 * 读取项目名
 */
export async function ReadAddonName() {
    return fs.promises.readFile('package.json', 'utf8').then(data => {
        try {
            const packageJson = JSON.parse(data);
            const packageName: string = packageJson.name;
            return packageName;
        } catch (parseError) {
            console.error('解析 package.json 文件出错：', parseError);
        }
    }).catch(err => {
        console.error('读取 package.json 文件出错：', err);
    });
}

/**
 * 判断文件夹是否存在
 */
export async function dirExists(directoryPath: string) {
    // 使用 fs.promises.stat 方法检查目录的状态
    return fs.promises.stat(directoryPath)
        .then(stats => {
            if (stats.isDirectory()) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            if (err.code === 'ENOENT') {
                return false;
            } else {
                console.error(`检查 ${directoryPath} 文件夹时发生错误：`, err);
                return false;
            }
        });
}

export function writeFileCache(file: string, data: string) {
    try {
        const content = fs.readFileSync(file, "utf-8");
        if (typeof content === 'string') {
            if (content === data) {
                return;
            }
        }
    } catch (err) { }
    fs.writeFileSync(file, data);
}