import { PriorityQueue } from "./priority_queue";

let math_pow = math.pow;
let math_log = math.log;
let math_floor = math.floor;
let math_random = math.random;


/**
 * 权重池
 * 用于处理各种权重随机计算
 * 
 * 权重池仅提供2个相关参数：
 * item: string | number | symbol
 * weight: number
 * 
 * constructor的参数tList是以item为key，weight为value的表
 * 
 * 例子：const pool = new CWeightPool({})
 */
export class CWeightPool<T extends string | number | symbol> {
	private _weightData: Record<T, number> = {} as Record<T, number>;
	private _totalWeight = 0; // 总权重
	private _count = 0; // 数量
	private _validCount = 0; // 有效数量

	constructor(tList?: Record<T, number>) {
		if (tList != null) {
			for (const [item, weight] of pairs(tList)) {
				this._weightData[item] = weight;
				this._totalWeight += weight;
				this._count++;
				if (weight > 0) {
					this._validCount++;
				}
			}
		}
	}

	Each(func: (item: T, weight: number) => boolean | void, ignoreZero = false) {
		for (const [item, weight] of pairs(this._weightData)) {
			if (ignoreZero == true && weight <= 0) {
				continue;
			}

			if (func(item, weight) == true) {
				return;
			}
		}
	}

	Has(item: T) {
		return this._weightData[item] != null;
	}

	Get(item: T) {
		return this._weightData[item] ?? 0;
	}

	Set(item: T, weight: number) {
		if (!this.Has(item)) {
			this._count++;
		}
		let old = this.Get(item);
		this._weightData[item] = weight;
		this._totalWeight += weight - old;
		if (old > 0 && weight <= 0) {
			this._validCount--;
		} else if (old <= 0 && weight > 0) {
			this._validCount++;
		}
	}

	Add(item: T, iWeight: number) {
		this.Set(item, this.Get(item) + iWeight);
	}

	Remove(item: T) {
		let old = this.Get(item);
		delete this._weightData[item];
		this._totalWeight -= old;
		this._count--;
		if (old > 0) {
			this._validCount--;
		}
	}

	get Count() {
		return this._validCount;
	}

	get ValidCount() {
		return this._validCount;
	}

	get TotalWeight() {
		return this._totalWeight;
	}

	/**
	 * 根据权重随机
	 * @param excluded 排除的项
	 * @returns 
	 */
	Random(excluded?: T[]): T | undefined {
		if (this._validCount <= 0) {
			return undefined;
		}

		let randomNumber = math_random(1, this._totalWeight);

		let cumulativeWeight = 0;

		for (const [item, weight] of pairs(this._weightData)) {
			if (weight <= 0 || (excluded != undefined && excluded.indexOf(item) != -1)) {
				continue;
			}

			cumulativeWeight += weight;

			if (randomNumber <= cumulativeWeight) {
				return item;
			}
		}
	}

	/**
	 * 多次根据权重随机（结果可重复）
	 * @param count 次数
	 * @param excluded 排除的项
	 * @returns 
	 */
	MultipleRandom(count: number, excluded?: T[]): T[] {
		let result: T[] = [];

		if (this._validCount <= 0) {
			return result;
		}

		let randomNumbers = [];
		for (let i = 0; i < count; i++) {
			randomNumbers[i] = math_random(1, this._totalWeight);
		}
		count = randomNumbers.length; // 以防count传进浮点数

		let cumulativeWeight = 0;

		for (const [item, weight] of pairs(this._weightData)) {
			if (weight <= 0 || (excluded != undefined && excluded.indexOf(item) != -1)) {
				continue;
			}

			cumulativeWeight += weight;

			for (let i = randomNumbers.length; i >= 1; i--) {
				if (randomNumbers[i - 1] > cumulativeWeight) {
					continue;
				}

				result[count - randomNumbers.length] = item;
				table.remove(randomNumbers, i);

				if (randomNumbers.length <= 0) {
					return result;
				}
			}
		}

		return result;
	}

	/**
	 * 多次根据权重随机（结果不重复）
	 * @param count 次数
	 * @param excluded 排除的项
	 * @returns 
	 * @see https://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf 算法来源
	 */
	MultipleRandomWithoutReplacement(count: number, excluded?: T[]): T[] {
		if (this._validCount <= 0) {
			return [];
		} else if (count > this._validCount) {
			count = this._validCount;
		}

		count = math_floor(count); // 以防count传进浮点数

		let queue = new PriorityQueue<T, number>();

		let Xw = NaN;
		let Tw = 0;
		let w_acc = 0;
		let i = 0;

		for (const [item, weight] of pairs(this._weightData)) {
			if (weight <= 0 || (excluded != undefined && excluded.indexOf(item) != -1)) {
				continue;
			}

			if (i < count) {
				let u = math_random();
				let k = math_pow(u, 1 / weight);
				queue.Enqueue(item, k);

				i++;
				continue;
			}

			if (w_acc == 0) {
				Tw = queue.PeekPriority() ?? 0;
				let r = math_random();
				Xw = math_log(r) / math_log(Tw);
			}

			let w = weight;

			if (w_acc + w < Xw) {
				w_acc += w;

				i++;
				continue;
			}

			w_acc = 0;

			let tw = math_pow(Tw, w);
			let r2 = tw + (1 - tw) * math_random();
			let ki = math_pow(r2, 1 / w);
			queue.DequeueEnqueue(item, ki);

			i++;
		}

		return queue.ToElementArray();
	}

	Copy() {
		return new CWeightPool(this._weightData);
	}
}