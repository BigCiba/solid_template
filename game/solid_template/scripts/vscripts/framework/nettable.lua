local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 44,["5"] = 45,["6"] = 46,["8"] = 48,["9"] = 49,["10"] = 49,["11"] = 50,["13"] = 49,["14"] = 49,["15"] = 49,["16"] = 54,["17"] = 55,["18"] = 56,["19"] = 57,["21"] = 59,["22"] = 60,["24"] = 62,["25"] = 63,["26"] = 63,["27"] = 65,["28"] = 66,["31"] = 69,["32"] = 48,["33"] = 71,["34"] = 72,["35"] = 73,["37"] = 75,["38"] = 71,["39"] = 77,["40"] = 78,["41"] = 79,["42"] = 81,["43"] = 77,["44"] = 83,["45"] = 84,["46"] = 86,["47"] = 88,["50"] = 92,["51"] = 93,["52"] = 83,["54"] = 100,["55"] = 101,["56"] = 102,["58"] = 104,["59"] = 105,["60"] = 106,["61"] = 107,["62"] = 108,["64"] = 110,["65"] = 111,["66"] = 111,["67"] = 112,["68"] = 113,["69"] = 113,["70"] = 113,["72"] = 115,["74"] = 117,["75"] = 104,["76"] = 119,["77"] = 120,["78"] = 121,["79"] = 122,["81"] = 124,["83"] = 127,["84"] = 128,["85"] = 129,["86"] = 130,["88"] = 132,["89"] = 133,["90"] = 133,["91"] = 134,["92"] = 136,["93"] = 138,["94"] = 140,["95"] = 140,["96"] = 140,["99"] = 143,["101"] = 145,["102"] = 119});
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
            if value ~= nil and TableFindKey(nil, CCustomNetTableManager.TablesKeys[tableName], keyName) == nil then
                local ____CCustomNetTableManager_TablesKeys_tableName_0 = CCustomNetTableManager.TablesKeys[tableName]
                ____CCustomNetTableManager_TablesKeys_tableName_0[#____CCustomNetTableManager_TablesKeys_tableName_0 + 1] = keyName
            elseif value == nil then
                ArrayRemove(nil, CCustomNetTableManager.TablesKeys[tableName], keyName)
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
