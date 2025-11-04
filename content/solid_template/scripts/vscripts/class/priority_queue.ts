export class PriorityQueue<TElement, TPriority> {
	private static Log2Arity = 2;
	private static Arity = 4;
	// @ts-ignore
	private static DefaultElement: TElement = Symbol('PriorityQueue.DefaultElement');
	// @ts-ignore
	private static DefaultPriority: TPriority = Symbol('PriorityQueue.DefaultPriority');

	private _elements: TElement[];
	private _priorities: TPriority[];
	private _version = 0;
	private _size = 0;
	private _comparer?: (a: TPriority, b: TPriority) => number;

	constructor(comparer?: (a: TPriority, b: TPriority) => number);
	constructor(nodes: [TElement, TPriority][], comparer?: (a: TPriority, b: TPriority) => number);
	constructor(a: any, comparer?: (a: TPriority, b: TPriority) => number) {
		this._elements = [];
		this._priorities = [];
		if (Array.isArray(a)) {
			for (let index = 0; index < a.length; index++) {
				const t = a[index];
				this._elements[index] = t[0];
				this._priorities[index] = t[1];
			}
			this._size = a.length;
			this._comparer = comparer;
		} else {
			this._size = 0;
			this._comparer = a;
		}

		if (this._size > 1) {
			this.Heapify();
		}
	}

	Enqueue(element: TElement, priority: TPriority) {
		let currentSize = this._size;
		this._version++;

		this._size = currentSize + 1;

		if (this._comparer == null) {
			this.MoveUpDefaultComparer(element, priority, currentSize);
		} else {
			this.MoveUpCustomComparer(element, priority, currentSize);
		}
	}

	Peek() {
		if (this._size == 0) {
			return undefined;
		}
		return this._elements[0];
	}

	PeekPriority() {
		if (this._size == 0) {
			return undefined;
		}
		return this._priorities[0];
	}

	PeekNode(): LuaMultiReturn<[TElement | undefined, TPriority | undefined]> {
		if (this._size == 0) {
			return $multi(undefined, undefined);
		}
		return $multi(this._elements[0], this._priorities[0]);
	}

	Dequeue() {
		if (this._size <= 0) {
			return undefined;
		}
		let element = this._elements[0];
		this.RemoveRootNode();
		return element;
	}

	DequeueEnqueue(element: TElement, priority: TPriority) {
		if (this._size == 0) {
			return;
		}

		let rootElement = this._elements[0];
		let rootPriority = this._priorities[0];

		if (this._comparer == null) {
			if (PriorityQueue.Compare(priority, rootPriority) > 0) {
				this.MoveDownDefaultComparer(element, priority, 0);
			} else {
				this._elements[0] = element;
				this._priorities[0] = priority;
			}
		} else {
			if (this._comparer(priority, rootPriority) > 0) {
				this.MoveDownCustomComparer(element, priority, 0);
			} else {
				this._elements[0] = element;
				this._priorities[0] = priority;
			}
		}

		this._version++;
		return rootElement;
	}

	EnqueueDequeue(element: TElement, priority: TPriority) {
		if (this._size != 0) {
			let rootElement = this._elements[0];
			let rootPriority = this._priorities[0];
			if (this._comparer == null) {
				if (PriorityQueue.Compare(priority, rootPriority) > 0) {
					this.MoveDownDefaultComparer(element, priority, 0);
					this._version++;
					return rootElement;
				}
			} else {
				if (this._comparer(priority, rootPriority) > 0) {
					this.MoveDownCustomComparer(element, priority, 0);
					this._version++;
					return rootElement;
				}
			}
		}

		return element;
	}

	Remove(element: TElement, equalityComparer?: (a: TElement, b: TElement) => boolean) {
		let index = this.FindIndex(element, equalityComparer);

		if (index < 0) {
			return false;
		}

		let elements = this._elements;
		let priorities = this._priorities;
		let newSize = --this._size;

		if (index < newSize) {
			if (this._comparer == null) {
				this.MoveUpDefaultComparer(elements[newSize], priorities[newSize], index);
			} else {
				this.MoveUpCustomComparer(elements[newSize], priorities[newSize], index);
			}
		}

		elements[newSize] = PriorityQueue.DefaultElement;
		priorities[newSize] = PriorityQueue.DefaultPriority;
		this._version++;
		return true;
	}

	Clear() {
		this._elements = [];
		this._priorities = [];
		this._size = 0;
		this._version++;
	}

	RemoveRootNode() {
		let lastNodeIndex = --this._size;
		this._version++;

		if (lastNodeIndex > 0) {
			let lastNodeElement = this._elements[lastNodeIndex];
			let lastNodePriority = this._priorities[lastNodeIndex];
			if (this._comparer == null) {
				this.MoveDownDefaultComparer(lastNodeElement, lastNodePriority, 0);
			}
			else {
				this.MoveDownCustomComparer(lastNodeElement, lastNodePriority, 0);
			}
		}

		this._elements[lastNodeIndex] = PriorityQueue.DefaultElement;
		this._priorities[lastNodeIndex] = PriorityQueue.DefaultPriority;
	}

	Each(callback: (element: TElement, priority: TPriority) => boolean | undefined) {
		for (const [element, priority] of this) {
			if (callback(element, priority) == true) {
				return;
			}
		}
	}

	[Symbol.iterator](): Iterator<[TElement, TPriority]> {
		let elements = this._elements;
		let priorities = this._priorities;
		let version = this._version;
		let index = 0;
		let currentElement = PriorityQueue.DefaultElement;
		let currentPriority = PriorityQueue.DefaultPriority;

		const moveNext = () => {
			if (version == this._version && index < this._size) {
				currentElement = elements[index];
				currentPriority = priorities[index];
				index++;
				return true;
			}

			return moveNextRare();
		};

		const moveNextRare = () => {
			if (version != this._version) {
				throw "PriorityQueue was modified when enumerating.";
			}

			index = this._size + 1;
			currentElement = PriorityQueue.DefaultElement;
			currentPriority = PriorityQueue.DefaultPriority;
			return false;
		};

		return {
			next: (): IteratorResult<[TElement, TPriority]> => {
				if (moveNext() && currentElement != PriorityQueue.DefaultElement) {
					return {
						value: [currentElement, currentPriority],
						done: false
					};
				} else {
					return {
						value: undefined,
						done: true
					};
				}
			}
		};
	}

	ToElementArray() {
		return this._elements;
	}

	private static GetParentIndex(index: number) {
		return index - 1 >> PriorityQueue.Log2Arity;
	}

	private static GetFirstChildIndex(index: number) {
		return (index << PriorityQueue.Log2Arity) + 1;
	}

	private static Compare<TPriority>(a: TPriority, b: TPriority): number {
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		} else {
			return 0;
		}
	}

	private static Equals<TPriority>(a: TPriority, b: TPriority): boolean {
		return a == b;
	}

	private Heapify() {
		let elements = this._elements;
		let priorities = this._priorities;
		let lastParentWithChildren = PriorityQueue.GetParentIndex(this._size - 1);

		if (this._comparer == null) {
			for (let index = lastParentWithChildren; index >= 0; index--) {
				this.MoveDownDefaultComparer(elements[index], priorities[index], index);
			}
		} else {
			for (let index = lastParentWithChildren; index >= 0; index--) {
				this.MoveDownCustomComparer(elements[index], priorities[index], index);
			}
		}
	}

	private FindIndex(element: TElement, equalityComparer?: (a: TElement, b: TElement) => boolean) {
		let elements = this._elements.slice();
		if (equalityComparer == null) {
			for (let i = 0; i < elements.length; i++) {
				if (PriorityQueue.Equals(element, elements[i])) {
					return i;
				}
			}
		} else {
			for (let i = 0; i < elements.length; i++) {
				if (equalityComparer(element, elements[i])) {
					return i;
				}
			}
		}

		return -1;
	}

	private MoveUpDefaultComparer(element: TElement, priority: TPriority, nodeIndex: number) {
		if (this._comparer != null) {
			return;
		}

		if (!(0 <= nodeIndex && nodeIndex < this._size)) {
			return;
		}

		let elements = this._elements;
		let priorities = this._priorities;

		while (nodeIndex > 0) {
			let parentIndex = PriorityQueue.GetParentIndex(nodeIndex);
			let parentElement = elements[parentIndex];
			let parentPriority = priorities[parentIndex];

			if (PriorityQueue.Compare(priority, parentPriority) < 0) {
				elements[nodeIndex] = parentElement;
				priorities[nodeIndex] = parentPriority;
				nodeIndex = parentIndex;
			} else {
				break;
			}
		}

		elements[nodeIndex] = element;
		priorities[nodeIndex] = priority;
	}

	private MoveUpCustomComparer(element: TElement, priority: TPriority, nodeIndex: number) {
		if (this._comparer == null) {
			return;
		}

		if (!(0 <= nodeIndex && nodeIndex < this._size)) {
			return;
		}

		let elements = this._elements;
		let priorities = this._priorities;

		while (nodeIndex > 0) {
			let parentIndex = PriorityQueue.GetParentIndex(nodeIndex);
			let parentElement = elements[parentIndex];
			let parentPriority = priorities[parentIndex];

			if (this._comparer(priority, parentPriority) < 0) {
				elements[nodeIndex] = parentElement;
				priorities[nodeIndex] = parentPriority;
				nodeIndex = parentIndex;
			} else {
				break;
			}
		}

		elements[nodeIndex] = element;
		priorities[nodeIndex] = priority;
	}

	private MoveDownDefaultComparer(element: TElement, priority: TPriority, nodeIndex: number) {
		if (this._comparer != null) {
			return;
		}

		if (!(0 <= nodeIndex && nodeIndex < this._size)) {
			return;
		}

		let elements = this._elements;
		let priorities = this._priorities;
		let size = this._size;

		let i;

		while ((i = PriorityQueue.GetFirstChildIndex(nodeIndex)) < size) {
			let minChildElement = elements[i];
			let minChildPriority = priorities[i];
			let minChildIndex = i;

			let childIndexUpperBound = Math.min(i + PriorityQueue.Arity, size);

			while (++i < childIndexUpperBound) {
				let nextChildElement = elements[i];
				let nextChildPriority = priorities[i];

				if (PriorityQueue.Compare(nextChildPriority, minChildPriority) < 0) {
					minChildElement = nextChildElement;
					minChildPriority = nextChildPriority;
					minChildIndex = i;
				}
			}

			if (PriorityQueue.Compare(priority, minChildPriority) <= 0) {
				break;
			}

			elements[nodeIndex] = minChildElement;
			priorities[nodeIndex] = minChildPriority;
			nodeIndex = minChildIndex;
		}

		elements[nodeIndex] = element;
		priorities[nodeIndex] = priority;
	}

	private MoveDownCustomComparer(element: TElement, priority: TPriority, nodeIndex: number) {
		if (this._comparer == null) {
			return;
		}

		if (!(0 <= nodeIndex && nodeIndex < this._size)) {
			return;
		}

		let comparer = this._comparer;
		let elements = this._elements;
		let priorities = this._priorities;
		let size = this._size;

		let i;

		while ((i = PriorityQueue.GetFirstChildIndex(nodeIndex)) < size) {
			let minChildElement = elements[i];
			let minChildPriority = priorities[i];
			let minChildIndex = i;
			let childIndexUpperBound = Math.min(i + PriorityQueue.Arity, size);

			while (++i < childIndexUpperBound) {
				let nextChildElement = elements[i];
				let nextChildPriority = priorities[i];

				if (comparer(nextChildPriority, minChildPriority) < 0) {
					minChildElement = nextChildElement;
					minChildPriority = nextChildPriority;
					minChildIndex = i;
				}
			}

			if (comparer(priority, minChildPriority) <= 0) {
				break;
			}

			elements[nodeIndex] = minChildElement;
			priorities[nodeIndex] = minChildPriority;
			nodeIndex = minChildIndex;
		}

		elements[nodeIndex] = element;
		priorities[nodeIndex] = priority;
	}
}