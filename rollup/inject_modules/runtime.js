import { createContext, createMemo, splitProps, untrack, useContext } from 'solid-js';
import { createRenderer } from 'solid-js/universal';
export { ErrorBoundary, For, Index, Match, Show, Suspense, SuspenseList, Switch } from 'solid-js';

const StyleKeyAutoConvertToPixelList = [
	'x',
	'y',
	'z',
	'width',
	'height',
	'minHeight',
	'maxHeight',
	'minWidth',
	'maxWidth',
	'border-radius',
	'borderRadius',
	'fontSize',
	'lineHeight',
	'margin',
	'marginBottom',
	'marginLeft',
	'marginRight',
	'marginTop',
	'padding',
	'paddingBottom',
	'paddingLeft',
	'paddingRight',
	'paddingTop'
];

const __ContextPanelContext__ = createContext({ panel: null });

function noop() { }

function setDragEvent(node, event, callback) {
	event = event.slice(2);
	if (!callback) {
		$.RegisterEventHandler(event, node, noop);
		return;
	}
	if (event === 'DragStart') {
		node.SetDraggable(true);
	}
	$.RegisterEventHandler(event, node, callback);
}

function setTooltipText(node, text) {
	if (!text) {
		node.ClearPanelEvent('onmouseover');
		node.ClearPanelEvent('onmouseout');
		return;
	}
	node.SetPanelEvent('onmouseover', () => {
		$.DispatchEvent('DOTAShowTextTooltip', node, text);
	});
	node.SetPanelEvent('onmouseout', () => {
		$.DispatchEvent('DOTAHideTextTooltip', node);
	});
}
function setCustomTooltip(node, args) {
	if (!args) {
		node.ClearPanelEvent('onmouseover');
		node.ClearPanelEvent('onmouseout');
		return;
	}
	let path = args[1];
	if (!path.startsWith('file://')) {
		path = `file://{resources}/layout/custom_game/${path.replace('.xml', '')}.xml`;
	}
	node.SetPanelEvent('onmouseover', () => {
		const params = node.GetAttributeString('__CustomTooltipParams__', '');
		$.DispatchEvent('UIShowCustomLayoutParametersTooltip', node, args[0], path, params);
	});
	node.SetPanelEvent('onmouseout', () => {
		$.DispatchEvent('UIHideCustomLayoutTooltip', args[0]);
	});
}
function setCustomTooltipParams(node, params) {
	if (!params) {
		node.SetAttributeString('__CustomTooltipParams__', '');
		return;
	}
	let paramsString = Object.entries(params)
		.map(v => `${v[0]}=${v[1]}`)
		.join('&');
	node.SetAttributeString('__CustomTooltipParams__', paramsString);
}

const hasOwn = Object.prototype.hasOwnProperty;
const nodeTrash = (function () {
	let root = $.GetContextPanel();
	while (root.GetParent()) {
		root = root.GetParent();
	}
	return $.CreatePanel('Panel', root, '', {
		style: 'visibility: collapse;'
	});
})();
const { render: _render, effect, memo, createComponent, createElement, createTextNode, insertNode, insert, spread, setProp, mergeProps, use } = createRenderer({
	createElement(type, props, parent) {
		const { id, snippet, vars, dialogVariables, style, visible, ..._props } = props;
		const styleIsString = typeof style === 'string';
		if (styleIsString) {
			props.style = style;
		}
		let handler = useContext(__ContextPanelContext__);
		const el = $.CreatePanel(type, handler.panel || parent || $.GetContextPanel(), id || '', _props);
		if (parent) {
			el.SetParent(parent);
			if (parent.__solidjsRenderContainer) {
				node.__solidjsCreated = true;
			}
		} else {
			el.SetParent($.GetContextPanel());
		}
		if (visible === false) {
			el.visible = false;
		}
		if (type != "TextEntry") {
			el.SetDisableFocusOnMouseDown(true);
		}
		if (!styleIsString) {
			applyStyles(el, style);
		}
		if (snippet) {
			el.BLoadLayoutSnippet(snippet);
		}
		if (vars) {
			setDialogVariables(el, vars, {});
		}
		if (dialogVariables) {
			setDialogVariables(el, dialogVariables, {});
		}
		if (_props.text) {
			el.__solidText = _props.text;
		}
		return el;
	},
	createTextNode(value, parent) {
		if (typeof value !== 'string') {
			value = String(value);
		}
		if (value[0] === '#') {
			value = $.Localize(value, parent);
		}
		const child = $.CreatePanel('Label', parent || $.GetContextPanel(), '', {
			text: value,
			html: 'true'
		});
		child.SetDisableFocusOnMouseDown(true);
		if (value[0] === '#') {
			child.__solidText = value;
		}
		return child;
	},
	createEmptyNode(parent) {
		let node = $.CreatePanel('Panel', parent || $.GetContextPanel(), '');
		node.visible = false;
		return node;
	},
	replaceText(textNode, value) {
		if (!textNode || !textNode.IsValid()) {
			return;
		}
		if (value[0] === '#') {
			textNode.__solidText = value;
			value = $.Localize(value, textNode);
		}
		textNode.text = value;
	},
	isTextNode(node) {
		if (!node || !node.IsValid()) {
			return false;
		}
		return node.paneltype === 'Label';
	},
	insertNode(parent, node, anchor) {
		if (!parent || !parent.IsValid() || !node || !node.IsValid()) {
			return;
		}
		node.SetParent(parent);
		if (parent.__solidjsRenderContainer) {
			node.__solidjsCreated = true;
		}
		if (anchor && anchor.IsValid()) {
			parent.MoveChildBefore(node, anchor);
		}
	},
	removeNode(parent, node) {
		if (!parent || !parent.IsValid() || !node || !node.IsValid()) {
			return;
		}
		node.SetParent(nodeTrash);
		node.DeleteAsync(0);
	},
	getParentNode(node) {
		if (!node || !node.IsValid()) {
			return;
		}
		const parent = node.GetParent();
		if (parent) {
			return parent;
		}
	},
	getFirstChild(node) {
		if (!node || !node.IsValid()) {
			return;
		}
		const child = node.GetChild(0);
		if (!child) {
			return;
		}
		return child;
	},
	getNextSibling(node) {
		if (!node || !node.IsValid()) {
			return;
		}
		const parent = node.GetParent();
		if (!parent) {
			return;
		}
		const el = parent.GetChild(parent.GetChildIndex(node) + 1);
		if (!el) {
			return;
		}
		return el;
	},
	setProperty(node, name, value, prev) {
		if (!node || !node.IsValid()) {
			return;
		}
		if (name === 'id') {
			return;
		}
		if (name === 'class' || name === 'className') {
			applyClassNames(node, value || '', prev || '');
		}
		else if (name === 'text') {
			if (value[0] === '#') {
				node.__solidText = value;
				node.text = $.Localize(value, node);
			}
			else {
				node.text = value;
			}
		}
		else if (name === 'src' && node.SetImage) {
			node.SetImage(value);
		}
		else if (name === 'classList') {
			updateClassList(node, value, prev);
		}
		else if (name === 'style') {
			applyStyles(node, value, prev);
		}
		else if (name === 'vars' || name === 'dialogVariables') {
			setDialogVariables(node, value, prev);
		}
		else if (name === 'attrs') {
			setAttributes(node, value);
		}
		else if (name === 'inputnamespace') {
			node.SetInputNamespace(value || '');
		}
		else if (name === 'draggable') {
			node.SetDraggable(value === true);
		}
		else if (name === 'acceptsfocus') {
			node.SetAcceptsFocus(value === true);
		}
		else if (name === 'tooltip_text') {
			setTooltipText(node, value);
		}
		else if (name === 'custom_tooltip') {
			setCustomTooltip(node, value);
		}
		else if (name === 'custom_tooltip_params') {
			setCustomTooltipParams(node, value);
		}
		else if (name === 'onDragStart' ||
			name === 'onDragEnd' ||
			name === 'onDragEnter' ||
			name === 'onDragDrop' ||
			name === 'onDragLeave') {
			setDragEvent(node, name, value);
		}
		else if (name.startsWith('data-')) {
			setData(node, name.slice(5), value);
		}
		else if (name.startsWith('on')) {
			setPanelEvent(node, name, value);
		}
		else {
			if (hasOwn.call(node, name)) {
				node[name] = value;
			}
			else {
				node.SetAttributeString(name, String(value));
			}
		}
	}
});
function Dynamic(props) {
	const [p, others] = splitProps(props, ['component']);
	const cached = createMemo(() => p.component);
	return createMemo(() => {
		const component = cached();
		switch (typeof component) {
			case 'function':
				return untrack(() => component(others));
			case 'string':
				const el = createElement(component);
				spread(el, others);
				return el;
		}
	});
}
export function render(code, container, contextPanel) {
	if (container.__solidDisposer) {
		container.__solidDisposer();
		container.Children().forEach((c) => {
			if (c.__solidjsCreated) {
				c.DeleteAsync(-1);
			}
		});
	}
	container.__solidjsRenderContainer = true;
	Object.defineProperty(container, '__solidDisposer', {
		configurable: true,
		value: _render(() => {
			return createComponent(__ContextPanelContext__.Provider, {
				value: {
					panel: contextPanel ?? container
				},
				get children() {
					return createComponent(code, {});
				}
			});
		}, container)
	});
	return container.__solidDisposer;
}
const splitClassName = /\s+/;
function applyClassNames(node, names, prev) {
	const nameList = names.split(splitClassName);
	const oldList = prev.split(splitClassName);
	for (let i = oldList.length - 1; i >= 0; i--) {
		const name = oldList[i];
		if (nameList.includes(name)) {
			continue;
		}
		else {
			node.RemoveClass(name);
		}
	}
	for (const name of nameList) {
		node.AddClass(name);
	}
}
function updateClassList(node, state, prev) {
	state = state || {};
	if (prev) {
		for (const k in prev) {
			if (state[k] === undefined) {
				node.RemoveClass(k);
			}
		}
	}
	for (const k in state) {
		node.SetHasClass(k, state[k] === true);
	}
}
function applyStyles(node, styles, prev) {
	styles = styles || {};
	prev = prev || {};
	for (const k in prev) {
		if (!hasOwn.call(styles, k)) {
			node.style[k] = null;
		}
	}
	for (const k in styles) {
		if (typeof styles[k] === 'number') {
			if (StyleKeyAutoConvertToPixelList.includes(k)) {
				node.style[k] = `${styles[k]}px`;
				continue;
			}
		}
		node.style[k] = styles[k] === undefined ? null : styles[k];
	}
}
function setPanelEvent(node, event, handle) {
	if (!handle) {
		node.ClearPanelEvent(event);
		return;
	}
	node.SetPanelEvent(event, function () {
		handle(node);
	});
}
const PANORAMA_INVALID_DATE = 2 ** 52;
function setDialogVariables(node, vars, prev) {
	prev = prev || {};
	for (const key in prev) {
		if (!vars[key]) {
			const value = prev[key];
			if (typeof value === 'string') {
				node.SetDialogVariable(key, `[!s:${key}]`);
			}
			else if (typeof value === 'number') {
				node.SetDialogVariableInt(key, NaN);
			}
			else {
				node.SetDialogVariableTime(key, PANORAMA_INVALID_DATE);
			}
		}
	}
	for (const key in vars) {
		const value = vars[key];
		if (typeof value === 'string') {
			if (value[0] === '#') {
				node.SetDialogVariableLocString(key, value);
			}
			else {
				node.SetDialogVariable(key, value);
			}
		}
		else if (typeof value === 'number') {
			node.SetDialogVariableInt(key, value);
		}
		else if (typeof value.getTime === 'function') {
			node.SetDialogVariableTime(key, Math.floor(value.getTime() / 1000));
		}
	}
	if (node.__solidText) {
		node.text = $.Localize(node.__solidText, node);
	}
}
function setAttributes(node, attrs) {
	for (const key in attrs) {
		const value = attrs[key];
		if (typeof value === 'number') {
			node.SetAttributeInt(key, value);
		}
		else {
			node.SetAttributeString(key, value);
		}
	}
}
function setData(node, key, v) {
	if (!node.Data) {
		const data = {};
		Object.defineProperty(node, 'Data', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function () {
				return data;
			}
		});
	}
	node.Data()[key] = v;
}

export { createComponent, createElement, createTextNode, Dynamic, effect, insert, insertNode, memo, mergeProps, setProp, spread, use };

