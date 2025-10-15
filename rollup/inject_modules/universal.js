import {
  createComponent,
  createMemo,
  createRenderEffect,
  createRoot,
  mergeProps,
  untrack
} from "solid-js";

function createRenderer({
  createElement,
  createTextNode,
  createEmptyNode,
  isTextNode,
  replaceText,
  insertNode,
  removeNode,
  setProperty,
  getParentNode,
  getFirstChild,
  getNextSibling
}) {
  function insert(parent, accessor, marker, initial) {
    // if (marker !== undefined && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
  }
  function insertExpression(parent, value, current, marker, bUnwrapArray) {
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value;
    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();
      if (current && isTextNode(current)) {
        replaceText(current, value);
      } else {
        current = cleanChildren(parent, current, marker, createTextNode(value));
      }
    } else if (value == null || t === "boolean") {
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === "function") v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      if (normalizeIncomingArray(array, value, bUnwrapArray)) {
        createRenderEffect(
          () => (current = insertExpression(parent, array, current, marker, true))
        );
        return () => current;
      }
      if (array.length === 0) {
        cleanChildren(parent, current, marker);
      } else {
        if (Array.isArray(current)) {
          if (current.length === 0) {
            appendNodes(parent, array, marker);
          } else {
            reconcileArrays(parent, current, array);
          }
        } else {
          if (current) {
            reconcileArrays(parent, [current], array);
          } else {
            appendNodes(parent, array, marker);
          }
        }
      }
      current = array;
    } else {
      current = cleanChildren(parent, current, marker, value);
    }
    return current;
  }
  function normalizeIncomingArray(normalized, array, bUnwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i],
        t;
      if (item == null || item === true || item === false);
      else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === "string" || t === "number") {
        normalized.push(createTextNode(item));
      } else if (t === "function") {
        if (bUnwrap) {
          while (typeof item === "function") item = item();
          dynamic =
            normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else normalized.push(item);
    }
    return dynamic;
  }
  function reconcileArrays(parent, oldArr, newArr) {
    let oldLen = oldArr.length;
    let newLen = newArr.length;
    let end = Math.min(oldLen, newLen);

    // 跳过开头不变的部分
    let start = 0;
    while (start < end) {
      if (oldArr[start] === newArr[start]) {
        start++;
      } else {
        break;
      }
    }

    // 跳过后面不变的部分
    let oldEnd = oldLen,
      newEnd = newLen,
      endMarker = getNextSibling(oldArr[oldLen - 1]);
    while (oldEnd > start && newEnd > start) {
      if (oldArr[oldEnd - 1] === newArr[newEnd - 1]) {
        endMarker = oldArr[oldEnd - 1];
        oldEnd--;
        newEnd--;
      } else {
        break;
      }
    }

    if (oldEnd == start) {
      // 前面增加 23=>123 start=0 oldEnd=0 newEnd=1
      // 后面增加 1=>12 start=1 oldEnd=1 newEnd=2
      // 中间增加 13=>123 start=1 oldEnd=1 newEnd=2
      let marker = start == 0 ? oldArr[0] : endMarker;
      for (let i = start; i < newEnd; i++) {
        insertNode(parent, newArr[i], marker);
      }
    } else if (newEnd == start) {
      // 前面删除 12=>2 start=0 oldEnd=1 newEnd=0
      // 后面删除 12=>1 start=1 oldEnd=2 newEnd=1
      // 中间删除 123=>13 start=1 oldEnd=2 newEnd=1
      for (let i = start; i < oldEnd; i++) {
        removeNode(parent, oldArr[i]);
      }
    } else {
      // 乱序
      let map = new Map();
      for (let i = start; i < oldEnd; i++) {
        map.set(oldArr[i], i);
      }

      if (!endMarker) {
        endMarker = newArr[--newEnd];
        if (endMarker) {
          insertNode(parent, endMarker);
          map.delete(endMarker);
        }
      }
      for (let i = start; i < newEnd; i++) {
        let item = newArr[i];
        insertNode(parent, item, endMarker);
        map.delete(item);
      }

      for (let item of map.keys()) {
        removeNode(parent, item);
      }
    }
  }
  function cleanChildren(parent, current, marker, replacement) {
    const newNode = replacement || createEmptyNode(); // 留下一个空panel占位才能保持排序不变
    if (current) {
      if (Array.isArray(current)) {
        current.forEach((node, idx) => {
          if (idx == 0) {
            insertNode(parent, newNode, node);
          }
          removeNode(parent, node);
        });
      } else {
        insertNode(parent, newNode, current);
        removeNode(parent, current);
      }
    } else {
      insertNode(parent, newNode, marker);
    }
    return newNode;
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) insertNode(parent, array[i], marker);
  }
  function replaceNode(parent, newNode, oldNode) {
    insertNode(parent, newNode, oldNode);
    removeNode(parent, oldNode);
  }
  function spreadExpression(node, props, prevProps = {}, skipChildren) {
    props || (props = {});
    if (!skipChildren) {
      createRenderEffect(
        () => (prevProps.children = insertExpression(node, props.children, prevProps.children))
      );
    }
    createRenderEffect(() => props.ref && props.ref(node));
    createRenderEffect(() => {
      for (const prop in props) {
        if (prop === "children" || prop === "ref") continue;
        const value = props[prop];
        if (value === prevProps[prop]) continue;
        setProperty(node, prop, value, prevProps[prop]);
        prevProps[prop] = value;
      }
    });
    return prevProps;
  }
  return {
    render(code, element) {
      let disposer;
      createRoot(dispose => {
        disposer = dispose;
        insert(element, code());
      });
      return disposer;
    },
    insert,
    spread(node, accessor, skipChildren) {
      if (typeof accessor === "function") {
        createRenderEffect(current => spreadExpression(node, accessor(), current, skipChildren));
      } else spreadExpression(node, accessor, undefined, skipChildren);
    },
    createElement,
    createTextNode,
    insertNode,
    setProp(node, name, value, prev) {
      setProperty(node, name, value, prev);
      return value;
    },
    mergeProps,
    effect: createRenderEffect,
    memo: createMemo,
    createComponent,
    use(fn, element, arg) {
      return untrack(() => fn(element, arg));
    }
  };
}

export { createRenderer };

