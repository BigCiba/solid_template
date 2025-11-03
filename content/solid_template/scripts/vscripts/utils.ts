// 重写 print 函数，在专用服务器上禁用输出
{
	if (!_G.print_Engine) {
		_G.print_Engine = print;
		_G.print = (...args: any[]) => {
			if (!IsDedicatedServer()) {
				print_Engine(...args);
			}
		};
	}
}

/**
 * 获取当前文件路径
 */
function getFileScope(): LuaMultiReturn<[any, string]> {
	let level = 1;
	while (true) {
		const info = debug.getinfo(level, "S");
		if (info && info.what === "main") {
			return $multi(getfenv(level), info.source!);
		}

		level += 1;
	}
}

/**
 * 递归打印表格内容（不遍历 metatable）
 * @noSelf
 */
function PrintTable<T extends AnyTable | T[]>(table: T, depth: number = 0, maxDepth: number = 5) {
	if (depth === 0) {
		print("----------------------------------------PrintTable----------------------------------------");
	}

	if (depth > maxDepth) {
		print(string.rep("  ", depth) + "[Max depth reached]");
		return;
	}

	if (type(table) !== "table") {
		print(string.rep("  ", depth) + tostring(table));
		return;
	}

	for (const [k, v] of pairs(table)) {
		const indent = string.rep("  ", depth);
		const keyStr = (type(k) === "string" ? k : `[${tostring(k)}]`) as string;

		if (type(v) === "table") {
			// 检查是否有 metatable，如果有则不深入遍历 metatable 本身
			const mt = getmetatable(v);
			if (mt !== undefined) {
				print(`${indent}${keyStr} = <table with metatable>`);
			} else {
				print(`${indent}${keyStr} = {`);
				PrintTable(v, depth + 1, maxDepth);
				print(`${indent}}`);
			}
		} else {
			const valueStr = type(v) === "string" ? `"${v}"` : tostring(v);
			print(`${indent}${keyStr} = ${valueStr}`);
		}
	}

	if (depth === 0) {
		print("-------------------------------------------End--------------------------------------------");
	}
}

/**
 * 打印长字符串，超过1000字符时使用链接控制台消息
 * @noSelf
 */
function PrintLongStr(str: string, key?: string) {
	if (IsDedicatedServer()) return;
	if (string.len(str) > 1000) {
		PrintLinkedConsoleMessage(type(key) == "string" ? key + "\n" : "文字过长，鼠标悬浮以查看详情，若想复制请点击最左侧的方块箭头图标\n", str);
	} else {
		print(str, key);
	}
}

/**
 * 转化为有效数字，如不是则返回默认值，默认为0
 * @param i 任意值
 * @param defaultVar 默认值，默认为0
 * @returns 返回数字
 */
function FiniteNumber(i: any, defaultVar = 0) {
	let n = tonumber(i);
	if (n != undefined && Number.isFinite(n)) {
		return n;
	}
	return defaultVar;
}

/**
 * 从数组里移除值
 * @param t 数组
 * @param v 值
 */
function ArrayRemove<T>(t: T[], v: T) {
	for (const i of $range(t.length - 1, 0, -1)) {
		if (t[i] == v) {
			table.remove(t, i + 1);
			return $multi(v, i);
		}
	}
	return $multi(undefined, undefined);
}


/**
 * 浅拷贝
 * @param orig 任意值
 * @returns 新值
 * @noSelf
 */
function shallowcopy<T>(orig: T): T {
	let copy: T;
	if (typeof orig == "object") {
		copy = {} as T;
		for (const [key, value] of pairs(orig)) {
			copy[key] = value;
		}
	} else {
		copy = orig;
	}
	return copy;
}

/**
 * 深拷贝，会把表深度复制
 * @param orig 任意值
 * @returns 新值
 */
function deepcopy<T>(orig: T): T {
	let copy: T;
	if (typeof orig == "object") {
		copy = {} as T;
		for (const [key, value] of pairs(orig)) {
			copy[deepcopy(key)] = deepcopy(value);
		}
		setmetatable(copy as any, deepcopy(getmetatable(orig)));
	} else {
		copy = orig;
	}
	return copy;
}

/**
 * 乱序
 * @param orig_list 数组
 * @returns 数组
 */
function ShuffledList<T>(orig_list: Array<T>): Array<T> {
	for (let i = orig_list.length - 1; i > 0; i--) {
		let j = math.random(0, i);
		[orig_list[j], orig_list[i]] = [orig_list[i], orig_list[j]];
	}
	return orig_list;
}

/**
 * 乱序
 * @param orig_list 数组
 * @returns 数组
 */
function CopyAndShuffledList<T>(orig_list: Array<T>): Array<T> {
	return ShuffledList(shallowcopy(orig_list));
}

/**
 * 从数组中随机取出几个元素
 * @param arr 数组
 * @param count 取出数量
 * @param remove 是否从原数组移除取出的元素，默认不移除
 */
function PickList<T>(arr: Array<T>, count: number, remove: boolean = false): Array<T> {
	if (count > arr.length) {
		return arr;
	}
	const copy = remove ? ShuffledList(arr) : CopyAndShuffledList(arr);
	const taken = [];
	for (let i = 0; i < count; i++) {
		taken.push(copy[i]);
	}
	if (remove) {
		for (const element of taken) {
			ArrayRemove(arr, element);
		}
	}
	return taken;
}

/**
 * table覆盖，会直接将主表内的值直接覆盖，没有则会新建
 * @param mainTable
 * @param table
 */
function TableOverride(mainTable: AnyTable, table: AnyTable) {
	for (const k in table) {
		const v = table[k];
		if (typeof v == "object") {
			if (typeof mainTable[k] == "object") {
				mainTable[k] = TableOverride(mainTable[k], v);
			} else {
				mainTable[k] = TableOverride({}, v);
			}
		} else {
			mainTable[k] = v;
		}
	}
	return mainTable;
}

/**
 * table替换，会检测主表的值是否存在，存在才会进行override
 * @param mainTable
 * @param table
 * @returns 新表
 */
function TableReplace(mainTable: AnyTable, table: AnyTable) {
	for (const k in table) {
		if (mainTable[k] != undefined) {
			const v = table[k];
			if (typeof v == "object") {
				if (typeof mainTable[k] == "object") {
					mainTable[k] = TableOverride(mainTable[k], v);
				} else {
					mainTable[k] = TableOverride({}, v);
				}
			} else {
				mainTable[k] = v;
			}
		}
	}
	return mainTable;
}

/**
 * 获取表里随机一个值
 * @param t 表
 * @returns 随机值
 */
function RandomValue<T>(t: T[] | Record<string | number, T>): T | undefined {
	let keys = Object.keys(t);
	if (keys.length > 0) {
		let i = math.random(0, keys.length - 1);
		let k: any = keys[i];
		return t[k];
	}
	return undefined;
}
/**
 * 获取表里随机
 * @param t 表
 * @param num 数量
 * @returns 随机值
 */
function RandomElements<T>(a: T[], num: number = 1): T[] | undefined {
	if (num < 1) return;
	a.sort(() => math.random() - 0.5);
	return a.slice(0, num);
}

/**
 * 获取数组里随机一个值
 * @param a 数组
 * @returns 值
 */
function GetRandomElement<T>(a: T[]): T | undefined {
	if (a.length > 0) {
		return a[math.random(0, a.length - 1)];
	}
	return undefined;
}

/**
 * 从表里寻找值的键
 * @param t
 * @param v
 * @returns 找得到的键
 */
function TableFindKey(t: any[], v: any): number | undefined;
function TableFindKey<T>(t: T, v: any): keyof T | undefined {
	for (const key in t) {
		const _v = t[key];
		if (v == _v) {
			return key;
		}
	}
}

function TableCount(t: object) {
	let n = 0;
	for (const [_] of pairs(t)) {
		n++;
	}
	return n;
}

/**
 * 四舍五入，s为小数点几位
 * @param fNumber 数
 * @param prec 进度
 * @returns 数
 */
function Round(fNumber: number, prec = 0) {
	let iSign = fNumber > 0 ? 1 : -1;
	fNumber = Math.abs(fNumber);
	let i = Math.pow(10, prec);
	return iSign * Math.round(fNumber * i) / i;
}

/**
 * 将c++里传出来的str形式的vector转换为vector
 * @param str
 * @returns Vector
 */
function StringToVector(str: string) {
	let a = string.split(str, " ");
	return Vector(FiniteNumber(a[0]), FiniteNumber(a[1]), FiniteNumber(a[2]));
}

/**
 * 将vector转为为c++传出来的str形式
 * @param v 矢量
 */
function VectorToString(v: Vector) {
	return `${v.x} ${v.y} ${v.z}`;
}

/**
 * 以逆时针方向旋转
 */
function Rotation2D(vVector: Vector, radian: number, isDegree: boolean = false): Vector {
	if (isDegree) {
		radian = math.rad(radian);
	}
	let fLength2D = vVector.Length2D();
	let vUnitVector2D = Vdiv(vVector, fLength2D);
	let fCos = math.cos(radian);
	let fSin = math.sin(radian);
	return Vmul(Vector(vUnitVector2D.x * fCos - vUnitVector2D.y * fSin, vUnitVector2D.x * fSin + vUnitVector2D.y * fCos, vUnitVector2D.z), fLength2D);
}

function Deg2Rad(deg: number) {
	return deg * (Math.PI / 180);
}

function Rad2Deg(rad: number) {
	return rad * (180 / Math.PI);
}

/**
 * 限定数值区间
 * @param n 数
 * @param a 最小值
 * @param b 最大值
 * @returns 小于最小值返回最小值，大于最大值返回最大值，否则返回自己
 */
function Clamp(val: number, min: number, max: number) {
	if (val > max) {
		val = max;
	} else if (val < min) {
		val = min;
	}
	return val;
}

function Lerp(t: number, a: number, b: number) {
	return a + t * (b - a);
}

function VectorDistanceSq(v1: Vector, v2: Vector) {
	return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z);
}

function VectorDistance(v1: Vector, v2: Vector) {
	return Math.sqrt(VectorDistanceSq(v1, v2));
}

/**
 * 向量值在[0，1]上的线性插值。跟另一个全局函数LerpVectors功能一样
 * @param t
 * @param a
 * @param b
 * @returns
 */
function VectorLerp(t: number, a: Vector, b: Vector) {
	return Vector(Lerp(t, a.x, b.x), Lerp(t, a.y, b.y), Lerp(t, a.z, b.z));
}

/**
 * 是否是零向量
 * @param v
 * @returns
 */
function VectorIsZero(v: Vector) {
	return (v.x == 0.0) && (v.y == 0.0) && (v.z == 0.0);
}

function RemapVal(v: number, a: number, b: number, c: number, d: number) {
	if (a == b) {
		return (v >= b) ? d : c;
	}

	return c + (d - c) * (v - a) / (b - a);
}

function RemapValClamped(v: number, a: number, b: number, c: number, d: number) {
	if (a == b) {
		return (v >= b) ? d : c;
	}

	let t = (v - a) / (b - a);
	t = Clamp(t, 0.0, 1.0);
	return c + (d - c) * t;
}

/**
 * 判断一个handle是否有效
 * @param h handle
 */
function IsValid(h: CEntityInstance | undefined): h is CEntityInstance;
function IsValid(h: CDOTA_Buff | undefined): h is CDOTA_Buff;
function IsValid(h: CEntityPointer | undefined): h is CEntityPointer {
	return h != undefined && !h.IsNull();
}