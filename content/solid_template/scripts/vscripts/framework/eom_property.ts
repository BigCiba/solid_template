import { reloadable } from "../lib/tstl-utils";

@reloadable
class CProperty extends CModule {
	init(bReload: boolean): void {
		if (!bReload) {
		}
	}
}

declare global {
	var Property: CProperty;
}

Property ??= new CProperty();