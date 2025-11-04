local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__Delete = ____lualib.__TS__Delete
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 1,["13"] = 1,["15"] = 4,["16"] = 4,["17"] = 5,["19"] = 5,["20"] = 6,["21"] = 7,["22"] = 14,["23"] = 4,["24"] = 16,["25"] = 17,["26"] = 18,["27"] = 19,["28"] = 16,["29"] = 22,["30"] = 23,["31"] = 24,["32"] = 25,["33"] = 27,["35"] = 28,["36"] = 30,["37"] = 32,["38"] = 33,["40"] = 36,["41"] = 37,["43"] = 40,["44"] = 43,["45"] = 44,["47"] = 46,["48"] = 48,["49"] = 49,["50"] = 50,["51"] = 51,["52"] = 54,["53"] = 55,["54"] = 57,["56"] = 61,["62"] = 22,["63"] = 67,["64"] = 68,["66"] = 67,["67"] = 78,["68"] = 79,["69"] = 79,["70"] = 79,["71"] = 79,["72"] = 80,["73"] = 80,["74"] = 80,["75"] = 80,["76"] = 80,["77"] = 80,["78"] = 80,["79"] = 87,["80"] = 88,["81"] = 78,["82"] = 92,["83"] = 93,["84"] = 94,["85"] = 95,["86"] = 96,["88"] = 98,["89"] = 92,["90"] = 102,["91"] = 103,["92"] = 104,["93"] = 105,["94"] = 106,["96"] = 108,["97"] = 102,["98"] = 112,["99"] = 113,["100"] = 112,["101"] = 117,["102"] = 118,["103"] = 119,["105"] = 117,["106"] = 4,["107"] = 128,["108"] = 129});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 计时器，不会被游戏暂停
local CTimer = __TS__Class()
CTimer.name = "CTimer"
__TS__ClassExtends(CTimer, CModule)
function CTimer.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.index = 1
    self.timerList = {}
    self.record = 0
end
function CTimer.prototype.reset(self)
    self.index = 1
    self.timerList = {}
    self.record = 0
end
function CTimer.prototype.Think(self)
    self.record = self.record + 1
    local frame = FrameTime()
    local keys = __TS__ArraySort(__TS__ObjectKeys(self.timerList))
    for i = #keys, 1, -1 do
        do
            local index = keys[i]
            local timerData = self.timerList[index]
            if timerData == nil then
                goto __continue4
            end
            if GameRules:IsGamePaused() and (timerData.type == "GameTimer" or timerData.type == "Modifier") then
                goto __continue4
            end
            if timerData.entity ~= nil and not IsValid(nil, timerData.entity) then
                self.timerList[index] = nil
                goto __continue4
            end
            timerData.stack = timerData.stack + frame
            if timerData.stack >= timerData.interval then
                local _, interval = xpcall(timerData.callback, debug.traceback, timerData.entity or self)
                if type(interval) == "number" then
                    timerData.stack = timerData.stack - timerData.interval
                    timerData.interval = interval
                elseif timerData.type == "Modifier" then
                    timerData.stack = timerData.stack - timerData.interval
                else
                    self.timerList[index] = nil
                end
            end
        end
        ::__continue4::
    end
end
function CTimer.prototype.init(self, bReload)
    if not bReload then
    end
end
function CTimer.prototype.StartInternalThinker(self, ____type, entity, fInterval, funcThink)
    fInterval = math.max(
        fInterval,
        FrameTime()
    )
    self.timerList[self.index] = {
        interval = fInterval,
        stack = 0,
        type = ____type,
        entity = entity,
        callback = funcThink
    }
    self.index = self.index + 1
    return tostring(self.index - 1)
end
function CTimer.prototype.Timer(self, entity, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = entity
        entity = nil
    end
    return self:StartInternalThinker("Timer", entity, fInterval, funcThink)
end
function CTimer.prototype.GameTimer(self, entity, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = entity
        entity = nil
    end
    return self:StartInternalThinker("GameTimer", entity, fInterval, funcThink)
end
function CTimer.prototype.StartIntervalThink(self, modifier, fInterval, funcThink)
    return self:StartInternalThinker("Modifier", modifier, fInterval, funcThink)
end
function CTimer.prototype.StopTimer(self, index)
    if self.timerList[index] then
        __TS__Delete(self.timerList, index)
    end
end
CTimer = __TS__DecorateLegacy({reloadable}, CTimer)
if _G.Timer == nil then
    _G.Timer = __TS__New(CTimer)
end
return ____exports
