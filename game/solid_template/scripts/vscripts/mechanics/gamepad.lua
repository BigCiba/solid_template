local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 5,["15"] = 6,["16"] = 7,["18"] = 10,["19"] = 11,["20"] = 12,["21"] = 12,["22"] = 12,["23"] = 13,["24"] = 12,["25"] = 12,["26"] = 12,["28"] = 16,["29"] = 17,["31"] = 6,["32"] = 20,["33"] = 21,["35"] = 22,["36"] = 22,["37"] = 23,["38"] = 24,["39"] = 22,["42"] = 26,["43"] = 27,["44"] = 28,["45"] = 29,["46"] = 30,["47"] = 31,["48"] = 20,["49"] = 33,["50"] = 34,["51"] = 35,["52"] = 35,["53"] = 35,["54"] = 35,["55"] = 36,["56"] = 35,["57"] = 35,["58"] = 35,["59"] = 35,["60"] = 38,["61"] = 38,["62"] = 38,["63"] = 38,["64"] = 39,["65"] = 38,["66"] = 38,["67"] = 38,["68"] = 38,["69"] = 41,["70"] = 33,["71"] = 4,["72"] = 50,["73"] = 50});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 手柄
local CGamepad = __TS__Class()
CGamepad.name = "CGamepad"
__TS__ClassExtends(CGamepad, CModule)
function CGamepad.prototype.init(self, bReload)
    if not bReload then
    end
    self:print("Gamepad initialized")
    if IsServer() then
        ListenToGameEvent(
            "pui_error_msg",
            function(data)
                self:print("PUI Error Server: " .. data.error)
            end,
            nil
        )
    end
    if IsClient() then
        self:RegisterGamepadInputs()
    end
end
function CGamepad.prototype.RegisterGamepadInputs(self)
    print("Registering gamepad inputs")
    do
        local index = 1
        while index <= 32 do
            local name = "joy" .. tostring(index)
            self:RegisterCommand(name)
            index = index + 1
        end
    end
    self:RegisterCommand("Z AXIS POS")
    self:RegisterCommand("Z AXIS NEG")
    self:RegisterCommand("pov_up")
    self:RegisterCommand("pov_right")
    self:RegisterCommand("pov_down")
    self:RegisterCommand("pov_left")
end
function CGamepad.prototype.RegisterCommand(self, name)
    local command = DoUniqueString(name)
    Convars:RegisterCommand(
        "+" .. command,
        function(name, ...)
            local args = {...}
            print(name, args)
        end,
        "",
        0
    )
    Convars:RegisterCommand(
        "-" .. command,
        function(name, ...)
            local args = {...}
            print(name, args)
        end,
        "",
        0
    )
    SendToConsole((("bind " .. name) .. " +") .. command)
end
CGamepad = __TS__DecorateLegacy({reloadable}, CGamepad)
if Gamepad == nil then
    Gamepad = __TS__New(CGamepad)
end
return ____exports
