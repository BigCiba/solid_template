import { promises } from 'fs';

// 重写 Node.js 中的 promises.writeFile 方法。主要的作用是在尝试写入文件之前，先检查文件的内容是否与要写入的数据相同，如果相同就不进行写入操作，从而避免不必要的文件写入操作，提高性能和效率。
const w = promises.writeFile;
const r = promises.readFile;
const ww: typeof w = async function (file, data, options): Promise<void> {
    if (typeof data == "string" && data.startsWith("/*forceFresh*/")) {
        await w(file, data.slice("/*forceFresh*/".length), options);
        return;
    }
    try {
        const content = await r(file, options);
        if (typeof content === 'string') {
            if (content === data) {
                return;
            }
        } else if (Buffer.isBuffer(content)) {
            if (
                content.equals(
                    Buffer.isBuffer(data) ? data : Buffer.from(data as string)
                )
            ) {
                return;
            }
        }
    } catch (err) { }
    await w(file, data, options);
};
promises.writeFile = ww;
