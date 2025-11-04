local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 1,["6"] = 1,["7"] = 1,["8"] = 4,["9"] = 4,["11"] = 5,["12"] = 6,["13"] = 7,["14"] = 8,["15"] = 9,["16"] = 9,["17"] = 9,["18"] = 9,["19"] = 10,["20"] = 11,["21"] = 12,["22"] = 13,["23"] = 14,["24"] = 14,["25"] = 14,["26"] = 14,["27"] = 15,["28"] = 16,["29"] = 17,["30"] = 17,["31"] = 17,["32"] = 17,["33"] = 16,["34"] = 10,["35"] = 20,["36"] = 7,["38"] = 25,["39"] = 26,["40"] = 27,["41"] = 28,["43"] = 30,["44"] = 30,["45"] = 30,["46"] = 31,["47"] = 32,["48"] = 33,["49"] = 34,["50"] = 35,["51"] = 35,["52"] = 35,["53"] = 35,["54"] = 36,["55"] = 37,["56"] = 38,["57"] = 38,["58"] = 38,["59"] = 38,["60"] = 37,["62"] = 30,["63"] = 30,["64"] = 30});
local ____exports = {}
local _____config = require("_config")
local DEBUG_TAG_PUI = _____config.DEBUG_TAG_PUI
local GetDebugTag = _____config.GetDebugTag
if old_debug_traceback == nil then
    old_debug_traceback = debug.traceback
end
local tc = GetDebugTag(nil)
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
                local params = {tc = DEBUG_TAG_PUI, t = "error", d = data.error}
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
return ____exports
