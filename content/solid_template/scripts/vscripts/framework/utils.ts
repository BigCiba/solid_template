/** @noSelfInFile */
// 重写 print 函数，在专用服务器上禁用输出
declare var print_Engine: typeof print;
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
 * 判断点是否在不规则图形里（不规则图形里是点集，点集每个都是固定住的）
 * @param point 检测点
 * @param polygonPoints 点数组
 * @returns 点是否在其中
 */
function IsPointInPolygon(point: Vector, polygonPoints: Polygon<Vector>) {
	let j = polygonPoints.length - 1;
	let bool = 0;
	for (const i of $range(0, polygonPoints.length - 1, 1)) {
		const polygonPoint1 = polygonPoints[j];
		const polygonPoint2 = polygonPoints[i];
		if (((polygonPoint2.y < point.y && polygonPoint1.y >= point.y) || (polygonPoint1.y < point.y && polygonPoint2.y >= point.y)) && (polygonPoint2.x <= point.x || polygonPoint1.x <= point.x)) {
			bool = bool ^ (((polygonPoint2.x + (point.y - polygonPoint2.y) / (polygonPoint1.y - polygonPoint2.y) * (polygonPoint1.x - polygonPoint2.x)) < point.x) ? 1 : 0);
		}
		j = i;
	}
	return bool == 1;
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

// 加法相乘（百分比）
function CompoundIncreaseSimple(a: number, b: number) {
	return ((1 + a * 0.01) * (1 + b * 0.01) - 1) * 100;
}
function CompoundIncreaseSimple_Reverse(a: number, b: number) {
	return ((1 + a * 0.01) / (1 + b * 0.01) - 1) * 100;
}

function CompoundIncrease(...args: number[]) {
	let V = args[0];
	for (const i of $range(1, args.length - 1, 1)) {
		V = ((1 + (V ?? 0) * 0.01) * (1 + args[i] * 0.01) - 1) * 100;
	}
	return V ?? 0;
}

// 减法相乘（百分比）
function CompoundDecreaseSimple(a: number, b: number) {
	return (1 - (1 - a * 0.01) * (1 - b * 0.01)) * 100;
}
function CompoundDecreaseSimple_Reverse(a: number, b: number) {
	return (1 - (1 - a * 0.01) / (1 - b * 0.01)) * 100;
}
function CompoundDecrease(...args: number[]) {
	let V = args[0];
	for (const i of $range(1, args.length - 1, 1)) {
		V = (1 - (1 - (V ?? 0) * 0.01) * (1 - args[i] * 0.01)) * 100;
	}
	return V ?? 0;
}

// 映射
function GetReverseSettleFunction(func: Function) {
	if (func == CompoundIncreaseSimple) {
		return CompoundIncreaseSimple_Reverse;
	} else if (func == CompoundDecreaseSimple) {
		return CompoundDecreaseSimple_Reverse;
	}
}
// 最大值
function MaximumSimple(a: number, b: number) {
	return Math.max(a, b);
}
function Maximum(...args: number[]) {
	let V = args[0];
	for (const i of $range(1, args.length - 1, 1)) {
		V = Math.max(V ?? Number.NEGATIVE_INFINITY, args[i]);
	}
	return V ?? 0;
}

// 最小值
function MinimumSimple(a: number, b: number) {
	return Math.min(a, b);
}
function Minimum(...args: number[]) {
	let V = args[0];
	for (const i of $range(1, args.length - 1, 1)) {
		V = Math.min(V ?? Number.POSITIVE_INFINITY, args[i]);
	}
	return V ?? 0;;
}

// 优先前值
function FirstSimple(a: any, b: any) {
	if (a != undefined) {
		return a;
	} else {
		return b;
	}
}
function First(...args: any[]): any {
	let V = args[0];
	for (const i of $range(1, args.length - 1, 1)) {
		const v = args[i];
		if (v != undefined) {
			V = v;
		}
	}
	return V;
}

/**
 * 转化为有效数字，如不是则返回默认值，默认为0
 * @param i 任意值
 * @param defaultVar 默认值，默认为0
 * @returns 返回数字
 */
function toFiniteNumber(i: any, defaultVar = 0) {
	let n = tonumber(i);
	if (n != undefined && Number.isFinite(n)) {
		return n;
	}
	return defaultVar;
}

/**
 * 转化为字符串，仅有number、string和boolean这类变量可以转化为字符串，其余会返回undefined
 * @param i 任意值
 * @returns 返回字符串
 */
function toString(i: any) {
	let t = type(i);
	return (t == "number" || t == "string" || t == "boolean") ? tostring(i) : undefined;
}
/**
 * 转化为有效字符串，如不是则返回默认值，默认为""。
 * 仅有number、string和boolean这类变量可以算作有效的字符串，其余会返回默认值
 * @param i 任意值
 * @param defaultVar 默认值，默认为""
 * @returns 返回字符串
 */
function toFiniteString(i: any, defaultVar = "") {
	return toString(i) ?? defaultVar;
}

function SimplifyValues<T extends any>(t: T[]) {
	if (t.length <= 1) {
		return t;
	}
	let first = t[0];
	for (const v of t) {
		if (v != first) {
			return t;
		}
	}
	return [first];
}

function GetArrayDefaultLastValidValue(t: any[], index: number) {
	const lastValue = t[t.length - 1];
	if (index >= t.length) {
		return lastValue;
	}
	return t[index];
}


/**
 * 获取某单位范围内单位最多的单位
 * @param vSearchPosition 搜索点
 * @param fSearchRange 搜索范围
 * @param iTeamNumber 队伍
 * @param fRadius 范围
 * @param iTeamFilter 队伍过滤
 * @param iTypeFilter 类型过滤
 * @param iFlagFilter 特殊过滤
 * @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
 * @param exclude 排除单位，可缺省，可以填单位表或者单位
 * @returns 如果没有则会返回undefined
 */
function GetAOEMostTargetsSpellTarget(vSearchPosition: Vector, fSearchRange: number, iTeamNumber: DOTATeam_t, fRadius: number, iTeamFilter: DOTA_UNIT_TARGET_TEAM, iTypeFilter: DOTA_UNIT_TARGET_TYPE, iFlagFilter: DOTA_UNIT_TARGET_FLAGS, iOrder: FindOrder = FindOrder.FIND_ANY_ORDER, exclude?: CDOTA_BaseNPC | CDOTA_BaseNPC[]) {
	let aTargets = FindUnitsInRadius(iTeamNumber, vSearchPosition, undefined, fSearchRange + fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, false);
	if (exclude != undefined) {
		if (Array.isArray(exclude)) {
			for (const i of $range(0, exclude.length - 1, 1)) {
				ArrayRemove(aTargets, exclude[i]);
			}
		} else {
			ArrayRemove(aTargets, exclude);
		}
	}

	let hTarget;
	// let N = 0;
	let iMax = 0;
	for (const i of $range(0, aTargets.length - 1, 1)) {
		const hFirstTarget = aTargets[i];
		let n = 0;
		if (hFirstTarget.IsPositionInRange(vSearchPosition, fSearchRange)) {
			if (hTarget == undefined) hTarget = hFirstTarget;
			for (const j of $range(0, aTargets.length - 1, 1)) {
				// N = N + 1;
				const hSecondTarget = aTargets[j];
				if (hSecondTarget.IsPositionInRange(hFirstTarget.GetAbsOrigin(), fRadius + hSecondTarget.GetHullRadius())) {
					n = n + 1;
				}
			}
		}
		if (n > iMax) {
			hTarget = hFirstTarget;
			iMax = n;
		}
	}
	// print("O(n):" + N);
	return hTarget;
}

/**
 * 获取一定范围内单位最多的点
 * @param vSearchPosition 搜索点
 * @param fSearchRange 搜索范围
 * @param iTeamNumber 队伍
 * @param fRadius 范围
 * @param iTeamFilter 队伍过滤
 * @param iTypeFilter 类型过滤
 * @param iFlagFilter 特殊过滤
 * @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
 * @param exclude 排除单位，可缺省，可以填单位表或者单位
 * @returns 如果没有该点则会返回vec3_invalid
 */
function GetAOEMostTargetsPosition(vSearchPosition: Vector, fSearchRange: number, iTeamNumber: DOTATeam_t, fRadius: number, iTeamFilter: DOTA_UNIT_TARGET_TEAM, iTypeFilter: DOTA_UNIT_TARGET_TYPE, iFlagFilter: DOTA_UNIT_TARGET_FLAGS, iOrder: FindOrder = FindOrder.FIND_ANY_ORDER, exclude?: CDOTA_BaseNPC | CDOTA_BaseNPC[]) {
	let aTargets = FindUnitsInRadius(iTeamNumber, vSearchPosition, undefined, fSearchRange + fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, false);
	if (exclude != undefined) {
		if (Array.isArray(exclude)) {
			for (const i of $range(0, exclude.length - 1, 1)) {
				ArrayRemove(aTargets, exclude[i]);
			}
		} else {
			ArrayRemove(aTargets, exclude);
		}
	}

	let vTargetPosition = vec3_invalid;
	// let N = 0;
	if (aTargets.length == 1) {
		let vDirection = Vsub(aTargets[0].GetAbsOrigin(), vSearchPosition);
		vDirection.z = 0;
		vTargetPosition = Vadd(vSearchPosition, Vmul(vDirection.Normalized(), Math.min(fSearchRange - 1, vDirection.Length2D())));
	} else if (aTargets.length > 1) {
		let aPositions: Vector[] = [];
		let funcInsertCheckPosition = (vPosition: Vector) => {
			// DebugDrawCircle(GetGroundPosition(vPosition, undefined), Vector(0, 0, 255), 32, 32, true, 0.5);
			aPositions.push(vPosition);
		};
		// 取圆中点或交点
		for (const i of $range(0, aTargets.length - 1, 1)) {
			const hFirstTarget = aTargets[i];
			// DebugDrawCircle(hFirstTarget.GetAbsOrigin(), Vector(0, 255, 0), 32, fRadius, false, 0.5);
			for (const j of $range(i + 1, aTargets.length - 1, 1)) {
				// N = N + 1;
				const hSecondTarget = aTargets[j];
				let vDirection = Vsub(hSecondTarget.GetAbsOrigin(), hFirstTarget.GetAbsOrigin());
				vDirection.z = 0;
				let fDistance = vDirection.Length2D();
				if (fDistance <= fRadius * 2 && fDistance > 0) {
					let vMid = Vdiv(Vadd(hSecondTarget.GetAbsOrigin(), hFirstTarget.GetAbsOrigin()), 2);
					if (Vsub(vMid, vSearchPosition).Length2D() <= fSearchRange) {
						funcInsertCheckPosition(vMid);
					} else {
						let fHalfLength = Math.sqrt(fRadius ^ 2 - (fDistance / 2) ^ 2);
						let v = Vmul(RotatePosition(vec3_zero, QAngle(0, 90, 0), vDirection.Normalized()), fHalfLength);
						let p = [
							Vsub(vMid, v),
							Vadd(vMid, v),
						];
						p.forEach((vPosition) => {
							if (Vsub(vPosition, vSearchPosition).Length2D() <= fSearchRange) {
								funcInsertCheckPosition(vPosition);
							}
						});
					}
				}
			}
		}
		// print("O(n):" + N);
		let iMax = 0;
		for (const i of $range(0, aPositions.length - 1, 1)) {
			const vPosition = aPositions[i];
			let n = 0;
			for (const j of $range(0, aTargets.length - 1, 1)) {
				// N = N + 1;
				const hTarget = aTargets[j];
				if (hTarget.IsPositionInRange(vPosition, fRadius + hTarget.GetHullRadius())) {
					n = n + 1;
				}
			}
			if (n > iMax) {
				vTargetPosition = vPosition;
				iMax = n;
			}
		}
		// 如果
		if (vTargetPosition == vec3_invalid) {
			let vDirection = Vsub(aTargets[1].GetAbsOrigin(), vSearchPosition);
			vDirection.z = 0;
			vTargetPosition = Vadd(vSearchPosition, Vmul(vDirection.Normalized(), Math.min(fSearchRange - 1, vDirection.Length2D())));
		}
	}
	// print("O(n):" + N);
	// 获取地面坐标
	if (vTargetPosition != vec3_invalid) {
		vTargetPosition = GetGroundPosition(vTargetPosition, undefined);
	}
	// DebugDrawCircle(vTargetPosition, Vector(0, 255, 255), 32, 64, true, 0.5)
	return vTargetPosition;
}

/**
 * 获取一条线上单位最多的施法点
 * @param vSearchPosition 搜索点
 * @param fSearchRange 搜索范围
 * @param iTeamNumber 队伍
 * @param fStartWidth 开始宽度
 * @param fEndWidth 结束宽度
 * @param iTeamFilter 队伍过滤
 * @param iTypeFilter 类型过滤
 * @param iFlagFilter 特殊过滤
 * @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
 * @param exclude 排除单位，可缺省，可以填单位表或者单位
 * @returns 如果没有该点则会返回vec3_invalid
 */
function GetLinearMostTargetsPosition(vSearchPosition: Vector, fSearchRange: number, iTeamNumber: DOTATeam_t, fStartWidth: number, fEndWidth: number, iTeamFilter: DOTA_UNIT_TARGET_TEAM, iTypeFilter: DOTA_UNIT_TARGET_TYPE, iFlagFilter: DOTA_UNIT_TARGET_FLAGS, iOrder: FindOrder = FindOrder.FIND_ANY_ORDER, exclude: CDOTA_BaseNPC | CDOTA_BaseNPC[]) {
	let aTargets = FindUnitsInRadius(iTeamNumber, vSearchPosition, undefined, fSearchRange + fEndWidth, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, false);
	if (exclude != undefined) {
		if (Array.isArray(exclude)) {
			for (const i of $range(0, exclude.length - 1, 1)) {
				ArrayRemove(aTargets, exclude[i]);
			}
		} else {
			ArrayRemove(aTargets, exclude);
		}
	}

	let vTargetPosition = vec3_invalid;
	// let N = 0;
	if (aTargets.length == 1) {
		let vDirection = Vsub(aTargets[1].GetAbsOrigin(), vSearchPosition);
		vDirection.z = 0;
		vTargetPosition = Vadd(vSearchPosition, Vmul(vDirection.Normalized(), fSearchRange - 1));
	} else if (aTargets.length > 1) {
		let aPolygons: Polygon[] = [];
		let funcInsertCheckPolygon = (pPolygon: Polygon) => {
			// for (const i of $range(0, pPolygon.length - 1, 1)) {
			// 	let vP1 = pPolygon[i];
			// 	let vP2 = pPolygon[i + 1];
			// 	if (vP2 == undefined) {
			// 		vP2 = pPolygon[0];
			// 	}
			// 	DebugDrawLine(vP1, vP2, 255, 0, 0, false, 0.5);
			// }
			// DebugDrawCircle(pPolygon[3], Vector(255, 0, 0), 32, fEndWidth, false, 0.5);
			aPolygons.push(pPolygon);
		};
		for (const i of $range(0, aTargets.length - 1, 1)) {
			const hFirstTarget = aTargets[i];
			for (const j of $range(i + 1, aTargets.length - 1, 1)) {
				// N = N + 1;
				const hSecondTarget = aTargets[j];
				let vDirection1 = Vsub(hFirstTarget.GetAbsOrigin(), vSearchPosition);
				vDirection1.z = 0;
				let vDirection2 = Vsub(hSecondTarget.GetAbsOrigin(), vSearchPosition);
				vDirection2.z = 0;
				let vDirection = Vdiv(Vadd(vDirection1, vDirection2), 2);
				vDirection.z = 0;
				let v = RotatePosition(vec3_zero, QAngle(0, 90, 0), vDirection.Normalized());
				let vEndPosition = Vadd(vSearchPosition, Vmul(vDirection.Normalized(), fSearchRange - 1));
				let pPolygon: Polygon = [
					Vadd(vSearchPosition, Vmul(v, fStartWidth)),
					Vadd(vEndPosition, Vmul(v, fEndWidth)),
					vEndPosition,
					Vsub(vEndPosition, Vmul(v, fEndWidth)),
					Vsub(vSearchPosition, Vmul(v, fStartWidth)),
				];
				if ((IsPointInPolygon(hFirstTarget.GetAbsOrigin(), pPolygon) || hFirstTarget.IsPositionInRange(vEndPosition, fEndWidth + hFirstTarget.GetHullRadius())) && (IsPointInPolygon(hSecondTarget.GetAbsOrigin(), pPolygon) || hSecondTarget.IsPositionInRange(vEndPosition, fEndWidth + hSecondTarget.GetHullRadius()))) {
					funcInsertCheckPolygon(pPolygon);
				}
			}
			let vDirection = Vsub(hFirstTarget.GetAbsOrigin(), vSearchPosition);
			vDirection.z = 0;
			let v = RotatePosition(vec3_zero, QAngle(0, 90, 0), vDirection.Normalized());
			let vEndPosition = Vadd(vSearchPosition, Vmul(vDirection.Normalized(), fSearchRange - 1));
			let pPolygon: Polygon = [
				Vadd(vSearchPosition, Vmul(v, fStartWidth)),
				Vadd(vEndPosition, Vmul(v, fEndWidth)),
				vEndPosition,
				Vsub(vEndPosition, Vmul(v, fEndWidth)),
				Vsub(vSearchPosition, Vmul(v, fStartWidth)),
			];
			funcInsertCheckPolygon(pPolygon);
		}
		// print("O(n):" + N);
		let iMax = 0;
		for (const i of $range(0, aPolygons.length - 1, 1)) {
			const pPolygon = aPolygons[i];
			let n = 0;
			for (const j of $range(0, aTargets.length - 1, 1)) {
				// N = N + 1;
				const hTarget = aTargets[j];
				if (IsPointInPolygon(hTarget.GetAbsOrigin(), pPolygon) || hTarget.IsPositionInRange(pPolygon[3], fEndWidth + hTarget.GetHullRadius())) {
					n = n + 1;
				}
			}
			if (n > iMax) {
				vTargetPosition = pPolygon[3];
				iMax = n;
			}
		}
	}
	// print("O(n):" + N);
	if (vTargetPosition != vec3_invalid) {
		vTargetPosition = GetGroundPosition(vTargetPosition, undefined);
	}
	// DebugDrawCircle(vTargetPosition, Vector(0, 255, 255), 32, 64, true, 0.5);
	return vTargetPosition;
}

declare var TimerEventListenerIDs: string[];
TimerEventListenerIDs ??= [];
/**
 * 计时器事件
 * @param fInterval
 * @param func
 * @param context
 */
function TimerEvent<TContext extends {}>(
	fInterval: number,
	func: (this: TContext) => number | void,
	context: TContext,
): string;
function TimerEvent(
	fInterval: number,
	func: () => number | void,
	context?: undefined,
): string;
function TimerEvent(fInterval: number, func: (...args: any[]) => any, context: any) {
	let hGameMode = GameRules.GetGameModeEntity();
	let s = hGameMode.Timer(fInterval, () => {
		if (context != undefined) {
			return func(context);
		}
		return func();
	});
	TimerEventListenerIDs.push(s);
	return s;
}

/**
 * 计时器事件，暂停不会计时
 * @param fInterval
 * @param func
 * @param context
 */
function GameTimerEvent<TContext extends {}>(
	fInterval: number,
	func: (this: TContext) => number | void,
	context: TContext,
): string;
function GameTimerEvent(
	fInterval: number,
	func: () => number | void,
	context?: undefined,
): string;
function GameTimerEvent(fInterval: number, func: (...args: any[]) => any, context: any) {
	let hGameMode = GameRules.GetGameModeEntity();
	let s = hGameMode.GameTimer(fInterval, () => {
		if (context != undefined) {
			return func(context);
		}
		return func();
	});
	TimerEventListenerIDs.push(s);
	return s;
}

/**
 * 触发实体的Input事件
 * @param h 实体Index或实体
 * @param sInputName Input事件名
 */
function FireInputNameOnly(h: EntityIndex | CBaseEntity, sInputName: string) {
	if (typeof h == "number") {
		let a = EntIndexToHScript<CBaseEntity>(h);
		if (IsValid(a)) {
			h = a;
		} else {
			return;
		}
	}
	if (IsValid(h)) {
		let e = h.GetEntityHandle();
		FireEntityIOInputNameOnly(e, sInputName);
	}
}

/**
 * 触发实体的Input事件，附带字符串
 * @param h 实体Index或实体
 * @param sInputName Input事件名
 * @param sString 字符串
 */
function FireInputString(h: EntityIndex | CBaseEntity, sInputName: string, sString: string) {
	print(`FireInputString: ${h} ${sInputName} ${sString}`);
	if (typeof h == "number") {
		let a = EntIndexToHScript<CBaseEntity>(h);
		if (a != undefined) {
			h = a;
		} else {
			return;
		}
	}
	if (h != undefined) {
		let e = h.GetEntityHandle();
		FireEntityIOInputString(e, sInputName, sString);
	}
}