local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 53,["5"] = 54,["6"] = 55,["7"] = 54,["8"] = 57,["9"] = 58,["10"] = 59,["12"] = 61,["13"] = 57,["14"] = 63,["15"] = 64,["16"] = 64,["17"] = 64,["18"] = 64,["20"] = 64,["21"] = 63,["22"] = 66,["23"] = 67,["24"] = 68,["25"] = 69,["26"] = 70,["28"] = 72,["29"] = 66,["30"] = 74,["31"] = 75,["32"] = 76,["33"] = 77,["34"] = 78,["36"] = 80,["37"] = 74,["38"] = 82,["39"] = 83,["40"] = 82,["41"] = 90,["42"] = 91,["43"] = 92,["44"] = 93,["45"] = 94,["46"] = 95,["48"] = 98,["49"] = 99,["50"] = 100,["51"] = 102,["55"] = 107,["56"] = 108,["58"] = 110,["59"] = 110,["60"] = 110,["61"] = 110,["62"] = 111,["63"] = 112,["65"] = 114,["66"] = 115,["68"] = 110,["69"] = 110,["70"] = 118,["72"] = 91,["74"] = 127,["75"] = 128,["76"] = 129,["77"] = 130,["78"] = 131,["79"] = 132,["81"] = 134,["82"] = 128,["83"] = 136,["84"] = 137,["85"] = 136});
BaseEntity = IsServer() and CBaseEntity or C_BaseEntity
BaseEntity.IsAbility = function(self)
    return false
end
BaseEntity.SaveData = function(self, key, value)
    if self._saveData_ == nil then
        self._saveData_ = {}
    end
    self._saveData_[key] = value
end
BaseEntity.LoadData = function(self, key, defaultValue)
    local ____opt_0 = self._saveData_
    local ____temp_2 = ____opt_0 and ____opt_0[key]
    if ____temp_2 == nil then
        ____temp_2 = defaultValue
    end
    return ____temp_2
end
BaseEntity.Timer = function(self, sContextName, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = sContextName
        sContextName = DoUniqueString("Timer")
    end
    return Timer:GameTimer(self, fInterval, funcThink)
end
BaseEntity.GameTimer = function(self, sContextName, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = sContextName
        sContextName = DoUniqueString("GameTimer")
    end
    return self:Timer(sContextName, fInterval, funcThink)
end
BaseEntity.StopTimer = function(self, sContextName)
    Timer:StopTimer(sContextName)
end
if IsServer() then
    CBaseEntity.StartThink = function(self, interval, name, callback)
        if IsServer() then
            local timerName = name or self:GetName()
            if self._ThinkList == nil then
                self._ThinkList = {}
            end
            if interval == -1 then
                if self._ThinkList[timerName] then
                    Timer:StopTimer(self._ThinkList[timerName])
                    self._ThinkList[timerName] = nil
                end
                return
            end
            if self._ThinkList[timerName] ~= nil then
                Timer:StopTimer(self._ThinkList[timerName])
            end
            local index = Timer:StartIntervalThink(
                self,
                interval,
                function()
                    if callback ~= nil then
                        callback(timerName)
                    end
                    if self.OnThink ~= nil then
                        self:OnThink(timerName)
                    end
                end
            )
            self._ThinkList[timerName] = index
        end
    end
end
if IsClient() then
    C_BaseEntity.GameTimer = function(self, sContextName, fInterval, funcThink)
        if funcThink == nil then
            funcThink = fInterval
            fInterval = sContextName
            sContextName = DoUniqueString("GameTimer")
        end
        return self:Timer(sContextName, fInterval, funcThink)
    end
    C_BaseEntity.StopTimer = function(self, sContextName)
        self:SetContextThink(sContextName, nil, -1)
    end
end
