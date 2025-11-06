local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 45,["5"] = 46,["6"] = 47,["8"] = 49,["9"] = 50,["10"] = 50,["11"] = 51,["13"] = 50,["14"] = 50,["15"] = 50,["16"] = 55,["17"] = 56,["18"] = 57,["19"] = 58,["21"] = 60,["22"] = 61,["24"] = 63,["25"] = 64,["26"] = 64,["27"] = 66,["28"] = 67,["31"] = 70,["32"] = 49,["33"] = 72,["34"] = 73,["35"] = 74,["37"] = 76,["38"] = 72,["39"] = 78,["40"] = 79,["41"] = 80,["42"] = 82,["43"] = 78,["44"] = 84,["45"] = 85,["46"] = 87,["47"] = 89,["50"] = 93,["51"] = 94,["52"] = 84,["54"] = 101,["55"] = 102,["56"] = 103,["58"] = 105,["59"] = 106,["60"] = 107,["61"] = 108,["62"] = 109,["64"] = 111,["65"] = 112,["66"] = 112,["67"] = 113,["68"] = 114,["69"] = 114,["70"] = 114,["72"] = 116,["74"] = 118,["75"] = 105,["76"] = 120,["77"] = 121,["78"] = 122,["79"] = 123,["81"] = 125,["83"] = 128,["84"] = 129,["85"] = 130,["86"] = 131,["88"] = 133,["89"] = 134,["90"] = 134,["91"] = 135,["92"] = 137,["93"] = 139,["94"] = 141,["95"] = 141,["96"] = 141,["99"] = 144,["101"] = 146,["102"] = 120});
if IsServer() then
    if CCustomNetTableManager.SetTableValue_Engine == nil then
        CCustomNetTableManager.SetTableValue_Engine = CCustomNetTableManager.SetTableValue
    end
    CCustomNetTableManager.SetTableValue = function(self, tableName, keyName, value)
        xpcall(
            function()
                if type(value) == "table" then
                end
            end,
            debug.traceback
        )
        local bSuccess = self:SetTableValue_Engine(tableName, keyName, value)
        if bSuccess then
            if CCustomNetTableManager.TablesKeys == nil then
                CCustomNetTableManager.TablesKeys = {}
            end
            if CCustomNetTableManager.TablesKeys[tableName] == nil then
                CCustomNetTableManager.TablesKeys[tableName] = {}
            end
            if value ~= nil and TableFindKey(CCustomNetTableManager.TablesKeys[tableName], keyName) == nil then
                local ____CCustomNetTableManager_TablesKeys_tableName_0 = CCustomNetTableManager.TablesKeys[tableName]
                ____CCustomNetTableManager_TablesKeys_tableName_0[#____CCustomNetTableManager_TablesKeys_tableName_0 + 1] = keyName
            elseif value == nil then
                ArrayRemove(CCustomNetTableManager.TablesKeys[tableName], keyName)
            end
        end
        return bSuccess
    end
    CCustomNetTableManager.GetAllTableKeys = function(self, tableName)
        if CCustomNetTableManager.TablesKeys ~= nil and CCustomNetTableManager.TablesKeys[tableName] ~= nil then
            return shallowcopy(CCustomNetTableManager.TablesKeys[tableName])
        end
        return {}
    end
    CCustomNetTableManager.SetNetData = function(self, tableName, tableKey, value, playerID)
        local keyName = playerID ~= nil and tableKey + playerID or tableKey
        local data = value == nil and "" or json.encode(value)
        CustomNetTables:SetTableValue(tableName, keyName, {data = data})
    end
    CCustomNetTableManager.GetNetData = function(self, tableName, tableKey, playerID)
        local keyName = playerID ~= nil and tableKey + playerID or tableKey
        local t = CustomNetTables:GetTableValue(tableName, keyName)
        if t == nil or t.data == nil then
            return
        end
        local a = (json.decode(t.data))
        return a
    end
end
if IsClient() then
    if CCustomNetTableManager.GetTableValue_Engine == nil then
        CCustomNetTableManager.GetTableValue_Engine = CCustomNetTableManager.GetTableValue
    end
    CCustomNetTableManager.GetTableValue = function(self, tableName, keyName)
        local key = (tableName .. ",") .. keyName
        local key2 = GetFrameCount()
        if CCustomNetTableManager.ClientNetTable == nil then
            CCustomNetTableManager.ClientNetTable = {}
        end
        local t
        local ____opt_1 = CCustomNetTableManager.ClientNetTable[key]
        if (____opt_1 and ____opt_1[key2]) == nil then
            CCustomNetTableManager.ClientNetTable[key] = {}
            local ____temp_3 = self:GetTableValue_Engine(tableName, keyName)
            CCustomNetTableManager.ClientNetTable[key][key2] = ____temp_3
            t = ____temp_3
        else
            t = CCustomNetTableManager.ClientNetTable[key][key2]
        end
        return t
    end
    CCustomNetTableManager.GetNetData = function(self, tableName, tableKey, playerID)
        local keyName
        if playerID ~= nil then
            keyName = tableKey + playerID
        else
            keyName = tableKey
        end
        local key = (tableName .. ",") .. tostring(keyName)
        local key2 = GetFrameCount()
        if CCustomNetTableManager.ClientNetData == nil then
            CCustomNetTableManager.ClientNetData = {}
        end
        local t
        local ____opt_4 = CCustomNetTableManager.ClientNetData[key]
        if (____opt_4 and ____opt_4[key2]) == nil then
            CCustomNetTableManager.ClientNetData[key] = {}
            local a = CustomNetTables:GetTableValue(tableName, keyName)
            if a ~= nil and a.data ~= nil then
                local ____temp_6 = (json.decode(a.data))
                CCustomNetTableManager.ClientNetData[key][key2] = ____temp_6
                t = ____temp_6
            end
        else
            t = CCustomNetTableManager.ClientNetData[key][key2]
        end
        return t
    end
end
