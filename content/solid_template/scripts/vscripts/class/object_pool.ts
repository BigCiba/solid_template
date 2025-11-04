export class ObjectPool<T> {
	private _list: T[] = [];
	private readonly _createFunc: () => T;
	private readonly _actionOnGet: (obj: T) => void;
	private readonly _actionOnRelease: (obj: T) => void;
	private readonly _actionOnDestroy: (obj: T) => void;
	private readonly _maxSize: number;
	private _collectionCheck: boolean;

	public CountAll: number = 0;
	public get CountActive(): number {
		return this.CountAll - this._list.length;
	}
	public get CountInactive(): number {
		return this._list.length;
	}

	constructor(
		createFunc: () => T,
		actionOnGet?: (obj: T) => void,
		actionOnRelease?: (obj: T) => void,
		actionOnDestroy?: (obj: T) => void,
		collectionCheck: boolean = true,
		maxSize: number = 10000
	) {
		if (createFunc == undefined) {
			throw new Error("createFunc is undefined");
		}
		if (maxSize <= 0) {
			throw new Error("Max Size must be greater than 0");
		}

		this._list = [];
		this._createFunc = createFunc;
		this._maxSize = maxSize;
		if (actionOnGet != undefined) {
			this._actionOnGet = actionOnGet;
		}
		if (actionOnRelease != undefined) {
			this._actionOnRelease = actionOnRelease;
		}
		if (actionOnDestroy != undefined) {
			this._actionOnDestroy = actionOnDestroy;
		}
		this._collectionCheck = collectionCheck;
	}

	public Get(): T {
		let obj: T;
		if (this._list.length == 0) {
			obj = this._createFunc();
			++this.CountAll;
		} else {
			obj = this._list.pop()!;
		}
		let actionOnGet = this._actionOnGet;
		if (actionOnGet != undefined) {
			actionOnGet(obj);
		}
		return obj;
	}

	public Release(element: T) {
		if (this._collectionCheck && this._list.length > 0) {
			for (let index = 0; index < this._list.length; index++) {
				if (element == this._list[index]) {
					print("Trying to release an object that has already been released to the pool.");
					return;
				}
			}
		}

		let actionOnRelease = this._actionOnRelease;
		if (actionOnRelease != undefined) {
			actionOnRelease(element);
		}
		if (this.CountInactive < this._maxSize) {
			this._list.push(element);
		} else {
			let actionOnDestroy = this._actionOnDestroy;
			if (actionOnDestroy != undefined) {
				actionOnDestroy(element);
			}
		}
	}

	public Clear() {
		let actionOnDestroy = this._actionOnDestroy;
		if (actionOnDestroy != null) {
			for (let index = 0; index < this._list.length; index++) {
				actionOnDestroy(this._list[index]);
			}
		}
		this._list = [];
		this.CountAll = 0;
	}
}