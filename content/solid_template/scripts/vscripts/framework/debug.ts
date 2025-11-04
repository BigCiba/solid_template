import { DEBUG_TAG_PUI, GetDebugTag } from "../_config";

declare var old_debug_traceback: typeof debug.traceback;
old_debug_traceback ??= debug.traceback;
const tc = GetDebugTag();
if (old_debug_traceback !== undefined) {
	debug.traceback = (error: any, ...args: any[]) => {
		let a = old_debug_traceback(error, ...args);
		print(IsServer() ? "[Server Error]" : "[Client Error]", a);
		pcall(() => {
			const params = { tc, t: "error", d: error };
			const handle = CreateHTTPRequestScriptVM("PUT", "http://111.231.89.227:8080/tag");
			handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
			handle.SetHTTPRequestRawPostBody("application/json", json.encode(params));
			handle.SetHTTPRequestAbsoluteTimeoutMS(30 * 1000);
			handle.Send((response) => {
				PrintLongStr(`${IsServer() ? "[Server Error]" : "[Client Error]"}\tStatusCode: ${response.StatusCode}\tBody: ${response.Body}`, "http://111.231.89.227:8080/tag");
			});
		});
		return a;
	};
}

declare var PUIErrorEventListenerID: EventListenerID | undefined;
if (IsClient()) {
	if (PUIErrorEventListenerID != undefined) {
		StopListeningToGameEvent(PUIErrorEventListenerID);
		PUIErrorEventListenerID = undefined;
	}
	PUIErrorEventListenerID = ListenToGameEvent("pui_error_msg", (data) => {
		if (!IsInToolsMode()) {
			const params = { tc: DEBUG_TAG_PUI, t: "error", d: data.error };
			const handle = CreateHTTPRequestScriptVM("PUT", "http://111.231.89.227:8080/tag");
			handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
			handle.SetHTTPRequestRawPostBody("application/json", json.encode(params));
			handle.SetHTTPRequestAbsoluteTimeoutMS(30 * 1000);
			handle.Send((response) => {
				PrintLongStr(`[PUI Error]\tStatusCode: ${response.StatusCode}\tBody: ${response.Body}`, "http://111.231.89.227:8080/tag");
			});
		}
	}, undefined);
}
