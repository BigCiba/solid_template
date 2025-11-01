import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";

/**
 * 处理组件 props 的辅助函数
 * 简化 Solid.js 组件中的 props 处理：设置默认值、拆分属性、合并 class
 * 
 * @example
 * const { local, others, mergedClass } = useComponentProps(props, {
 *   defaultValues: { color: "Purple", size: "Normal" },
 *   localKeys: ["color", "size", "icon", "loading"],
 *   componentClass: "EOM_Button"
 * });
 */
export function useComponentProps<
	TProps extends { class?: string; },
	TLocalKeys extends keyof TProps
>(
	props: TProps,
	options: {
		defaultValues?: Partial<TProps>;
		localKeys: readonly TLocalKeys[];
		componentClass?: string | string[];
	}
) {
	// 1. 合并默认值
	const merged = options.defaultValues
		? mergeProps(options.defaultValues, props)
		: props;

	// 2. 拆分本地属性和其他属性
	const [local, others] = splitProps(merged, options.localKeys as any);

	// 3. 合并 class 名称
	const mergedClass = classNames(
		options.componentClass,
		props.class
	);

	return {
		local,
		others,
		mergedClass
	};
}

/**
 * 简化版本 - 直接返回带有合并 class 的 others
 * 最常用的模式：拆分属性并自动合并 class
 * 
 * @example
 * const { local, others } = useSimpleProps(props, {
 *   defaultValues: { color: "Purple" },
 *   localKeys: ["color", "icon"],
 *   componentClass: "EOM_Button"
 * });
 * return <Button {...others}>{local.icon}</Button>
 */
export function useSimpleProps<
	TProps extends { class?: string; },
	TLocalKeys extends keyof TProps
>(
	props: TProps,
	options: {
		defaultValues?: Partial<TProps>;
		localKeys: readonly TLocalKeys[];
		componentClass?: string | string[];
	}
) {
	const { local, others, mergedClass } = useComponentProps(props, options);

	return {
		local,
		others: {
			...others,
			class: mergedClass
		}
	};
}
