local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 2,["5"] = 2,["7"] = 3,["8"] = 4,["9"] = 5,["10"] = 6,["11"] = 7,["12"] = 7,["13"] = 7,["14"] = 7,["15"] = 8,["16"] = 9,["17"] = 10,["18"] = 11,["19"] = 12,["20"] = 12,["21"] = 12,["22"] = 12,["23"] = 13,["24"] = 14,["25"] = 15,["26"] = 15,["27"] = 15,["28"] = 15,["29"] = 14,["30"] = 8,["31"] = 18,["32"] = 5,["34"] = 23,["35"] = 24,["36"] = 25,["37"] = 26,["39"] = 28,["40"] = 28,["41"] = 28,["42"] = 29,["43"] = 30,["44"] = 31,["45"] = 32,["46"] = 33,["47"] = 33,["48"] = 33,["49"] = 33,["50"] = 34,["51"] = 35,["52"] = 36,["53"] = 36,["54"] = 36,["55"] = 36,["56"] = 35,["58"] = 28,["59"] = 28,["60"] = 28});
if old_debug_traceback == nil then
    old_debug_traceback = debug.traceback
end
tc = IsServer() and "solid_template_debug" or "solid_template_client_debug"
if old_debug_traceback ~= nil then
    debug.traceback = function(____error, ...)
        local a = old_debug_traceback(____error, ...)
        print(
            IsServer() and "[Server Error]" or "[Client Error]",
            a
        )
        pcall(function()
            local params = {tc = tc, t = "error", d = ____error}
            local handle = CreateHTTPRequestScriptVM("PUT", "http://111.231.89.227:8080/tag")
            handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
            handle:SetHTTPRequestRawPostBody(
                "application/json",
                json.encode(params)
            )
            handle:SetHTTPRequestAbsoluteTimeoutMS(30 * 1000)
            handle:Send(function(response)
                PrintLongStr(
                    ((((IsServer() and "[Server Error]" or "[Client Error]") .. "\tStatusCode: ") .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
                    "http://111.231.89.227:8080/tag"
                )
            end)
        end)
        return a
    end
end
if IsClient() then
    if PUIErrorEventListenerID ~= nil then
        StopListeningToGameEvent(PUIErrorEventListenerID)
        PUIErrorEventListenerID = nil
    end
    PUIErrorEventListenerID = ListenToGameEvent(
        "pui_error_msg",
        function(data)
            if not IsInToolsMode() then
                local params = {tc = "solid_template_pui_debug", t = "error", d = data.error}
                local handle = CreateHTTPRequestScriptVM("PUT", "http://111.231.89.227:8080/tag")
                handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
                handle:SetHTTPRequestRawPostBody(
                    "application/json",
                    json.encode(params)
                )
                handle:SetHTTPRequestAbsoluteTimeoutMS(30 * 1000)
                handle:Send(function(response)
                    PrintLongStr(
                        (("[PUI Error]\tStatusCode: " .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
                        "http://111.231.89.227:8080/tag"
                    )
                end)
            end
        end,
        nil
    )
end
