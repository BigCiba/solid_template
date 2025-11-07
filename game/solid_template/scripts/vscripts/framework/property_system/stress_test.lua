local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["13"] = 3,["14"] = 3,["15"] = 34,["16"] = 34,["17"] = 35,["19"] = 35,["20"] = 36,["21"] = 37,["22"] = 38,["23"] = 39,["24"] = 40,["25"] = 43,["26"] = 43,["27"] = 43,["28"] = 43,["29"] = 43,["30"] = 43,["31"] = 43,["32"] = 43,["33"] = 43,["34"] = 43,["35"] = 34,["36"] = 54,["37"] = 55,["38"] = 56,["39"] = 57,["41"] = 59,["43"] = 54,["44"] = 63,["45"] = 64,["46"] = 63,["47"] = 70,["48"] = 71,["49"] = 72,["50"] = 73,["53"] = 77,["54"] = 78,["55"] = 79,["56"] = 82,["57"] = 85,["58"] = 88,["59"] = 91,["60"] = 94,["61"] = 96,["62"] = 97,["63"] = 99,["64"] = 100,["65"] = 101,["66"] = 70,["67"] = 105,["68"] = 106,["69"] = 107,["72"] = 112,["73"] = 114,["75"] = 118,["76"] = 121,["77"] = 123,["78"] = 105,["79"] = 128,["80"] = 129,["81"] = 130,["82"] = 131,["83"] = 132,["84"] = 133,["85"] = 128,["86"] = 136,["87"] = 137,["88"] = 140,["89"] = 140,["90"] = 140,["91"] = 140,["92"] = 140,["93"] = 140,["94"] = 140,["96"] = 148,["97"] = 148,["98"] = 149,["99"] = 150,["100"] = 152,["101"] = 152,["102"] = 152,["103"] = 152,["104"] = 152,["105"] = 152,["106"] = 152,["107"] = 152,["108"] = 152,["109"] = 152,["110"] = 152,["111"] = 164,["112"] = 164,["113"] = 148,["116"] = 167,["117"] = 136,["118"] = 170,["119"] = 171,["120"] = 173,["121"] = 174,["123"] = 176,["124"] = 176,["125"] = 178,["126"] = 178,["127"] = 178,["128"] = 178,["129"] = 178,["130"] = 185,["131"] = 185,["132"] = 185,["133"] = 185,["134"] = 185,["135"] = 185,["136"] = 185,["137"] = 190,["138"] = 191,["139"] = 191,["141"] = 176,["144"] = 195,["145"] = 170,["146"] = 198,["147"] = 199,["148"] = 201,["149"] = 202,["150"] = 204,["151"] = 205,["153"] = 208,["154"] = 208,["155"] = 209,["157"] = 212,["158"] = 212,["159"] = 213,["160"] = 214,["161"] = 216,["162"] = 223,["163"] = 212,["166"] = 208,["170"] = 228,["171"] = 228,["172"] = 229,["174"] = 231,["175"] = 231,["176"] = 232,["177"] = 235,["178"] = 236,["179"] = 235,["180"] = 239,["181"] = 239,["182"] = 239,["183"] = 239,["184"] = 239,["185"] = 239,["186"] = 239,["187"] = 247,["188"] = 231,["191"] = 228,["195"] = 252,["196"] = 253,["197"] = 198,["198"] = 258,["199"] = 259,["200"] = 261,["201"] = 261,["202"] = 261,["203"] = 262,["204"] = 265,["205"] = 266,["206"] = 267,["208"] = 271,["209"] = 273,["210"] = 261,["211"] = 261,["212"] = 258,["213"] = 277,["214"] = 278,["215"] = 281,["216"] = 284,["218"] = 286,["219"] = 286,["221"] = 287,["222"] = 288,["223"] = 288,["225"] = 290,["226"] = 293,["227"] = 294,["228"] = 295,["229"] = 296,["230"] = 299,["231"] = 300,["232"] = 307,["235"] = 286,["238"] = 312,["239"] = 312,["240"] = 312,["241"] = 313,["242"] = 314,["244"] = 319,["245"] = 319,["246"] = 319,["247"] = 319,["249"] = 320,["250"] = 320,["252"] = 321,["253"] = 322,["254"] = 322,["256"] = 324,["258"] = 326,["259"] = 326,["260"] = 327,["261"] = 328,["262"] = 326,["267"] = 320,["270"] = 277,["271"] = 335,["272"] = 336,["273"] = 338,["274"] = 339,["275"] = 340,["276"] = 341,["277"] = 344,["278"] = 345,["279"] = 346,["280"] = 347,["281"] = 348,["282"] = 349,["283"] = 352,["284"] = 353,["285"] = 354,["286"] = 355,["287"] = 357,["288"] = 358,["289"] = 359,["290"] = 360,["293"] = 365,["294"] = 365,["295"] = 365,["296"] = 365,["297"] = 366,["299"] = 367,["300"] = 367,["301"] = 368,["302"] = 367,["305"] = 372,["306"] = 373,["307"] = 374,["308"] = 375,["309"] = 335,["310"] = 378,["311"] = 379,["312"] = 380,["313"] = 381,["314"] = 382,["315"] = 383,["316"] = 384,["317"] = 385,["318"] = 386,["319"] = 387,["320"] = 389,["321"] = 390,["322"] = 378,["323"] = 395,["324"] = 396,["325"] = 399,["326"] = 402,["327"] = 403,["328"] = 404,["329"] = 405,["332"] = 409,["333"] = 410,["334"] = 411,["335"] = 395,["336"] = 416,["337"] = 418,["338"] = 418,["339"] = 418,["340"] = 419,["341"] = 420,["342"] = 418,["343"] = 418,["344"] = 418,["345"] = 418,["346"] = 424,["347"] = 424,["348"] = 424,["349"] = 425,["350"] = 425,["351"] = 425,["352"] = 425,["353"] = 425,["354"] = 425,["355"] = 425,["356"] = 425,["357"] = 424,["358"] = 424,["359"] = 424,["360"] = 424,["361"] = 436,["362"] = 436,["363"] = 436,["364"] = 437,["365"] = 437,["366"] = 437,["367"] = 437,["368"] = 437,["369"] = 437,["370"] = 437,["371"] = 437,["372"] = 436,["373"] = 436,["374"] = 436,["375"] = 436,["376"] = 448,["377"] = 448,["378"] = 448,["379"] = 449,["380"] = 448,["381"] = 448,["382"] = 448,["383"] = 448,["384"] = 453,["385"] = 453,["386"] = 453,["387"] = 454,["388"] = 455,["391"] = 459,["392"] = 460,["393"] = 461,["394"] = 463,["395"] = 464,["396"] = 465,["397"] = 466,["398"] = 467,["399"] = 468,["400"] = 453,["401"] = 453,["402"] = 453,["403"] = 453,["404"] = 472,["405"] = 472,["406"] = 472,["407"] = 473,["408"] = 472,["409"] = 472,["410"] = 472,["411"] = 472,["412"] = 416,["413"] = 480,["414"] = 481,["415"] = 482,["416"] = 485,["417"] = 486,["418"] = 489,["419"] = 494,["420"] = 495,["423"] = 499,["424"] = 500,["425"] = 503,["426"] = 504,["427"] = 507,["428"] = 507,["429"] = 507,["430"] = 507,["431"] = 507,["432"] = 507,["433"] = 507,["435"] = 516,["436"] = 516,["437"] = 517,["438"] = 517,["439"] = 517,["440"] = 517,["441"] = 517,["442"] = 517,["443"] = 516,["446"] = 525,["447"] = 528,["448"] = 529,["449"] = 531,["450"] = 532,["451"] = 533,["452"] = 534,["455"] = 538,["456"] = 539,["460"] = 545,["461"] = 545,["462"] = 545,["463"] = 546,["464"] = 547,["465"] = 548,["466"] = 549,["467"] = 551,["468"] = 552,["469"] = 553,["470"] = 554,["473"] = 559,["474"] = 560,["475"] = 545,["476"] = 545,["477"] = 480,["478"] = 34,["479"] = 570,["480"] = 570});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MPropertySystemStressTest = __TS__Class()
MPropertySystemStressTest.name = "MPropertySystemStressTest"
__TS__ClassExtends(MPropertySystemStressTest, CModule)
function MPropertySystemStressTest.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.testUnits = {}
    self.testPropertyIds = {}
    self.testStartTime = 0
    self.testEndTime = 0
    self.updateCount = 0
    self.DEFAULT_CONFIG = {
        unitCount = 100,
        propertiesPerUnit = 20,
        staticPropertiesPerUnit = 10,
        dynamicPropertiesPerUnit = 10,
        sourcesPerProperty = 3,
        duration = 60,
        updateInterval = 0.1,
        enableNetTableSync = true
    }
end
function MPropertySystemStressTest.prototype.init(self, reload)
    if not reload then
        if IsServer() then
            self:RegisterCommands()
        end
        self:print("Stress test module loaded")
    end
end
function MPropertySystemStressTest.prototype.initPriority(self)
    return 5
end
function MPropertySystemStressTest.prototype.StartStressTest(self, config)
    print("StartStressTest")
    if self.testStartTime > 0 then
        self:print("Test already running! Use stop_stress_test first.")
        return
    end
    local finalConfig = __TS__ObjectAssign({}, self.DEFAULT_CONFIG, config)
    self:print("=== Starting Property System Stress Test ===")
    self:PrintConfig(finalConfig)
    self:PrepareTestEnvironment(finalConfig)
    self:RegisterTestProperties(finalConfig)
    self:CreateTestUnits(finalConfig)
    self:AddPropertiesToUnits(finalConfig)
    self:StartUpdateLoop(finalConfig)
    self.testStartTime = GameRules:GetGameTime()
    self.testEndTime = self.testStartTime + finalConfig.duration
    self:print(("Test started! Duration: " .. tostring(finalConfig.duration)) .. "s")
    self:print("Use \"property_test_status\" to check progress")
    self:print("Use \"property_test_stop\" to stop test")
end
function MPropertySystemStressTest.prototype.StopStressTest(self)
    if self.testStartTime == 0 then
        self:print("No test running")
        return
    end
    if self.updateTimer then
        self.updateTimer = nil
    end
    self:GenerateTestReport()
    self:CleanupTest()
    self:print("Test stopped")
end
function MPropertySystemStressTest.prototype.PrepareTestEnvironment(self, config)
    self.testUnits = {}
    self.testPropertyIds = {}
    self.updateCount = 0
    self.testStartTime = 0
    self.testEndTime = 0
end
function MPropertySystemStressTest.prototype.RegisterTestProperties(self, config)
    self:print("Registering test properties...")
    local propertyTypes = {
        {prefix = "damage", aggregation = AggregationStrategy.SUM},
        {prefix = "armor", aggregation = AggregationStrategy.SUM},
        {prefix = "speed", aggregation = AggregationStrategy.MULTIPLY},
        {prefix = "crit", aggregation = AggregationStrategy.MAX},
        {prefix = "resist", aggregation = AggregationStrategy.MIN}
    }
    do
        local i = 0
        while i < config.propertiesPerUnit do
            local ____type = propertyTypes[i % #propertyTypes + 1]
            local propertyId = (("test_" .. ____type.prefix) .. "_") .. tostring(i)
            PropertySystem:RegisterProperty({
                id = propertyId,
                scope = PropertyScope.UNIT,
                valueType = PropertyValueType.NUMBER,
                aggregation = ____type.aggregation,
                defaultValue = ____type.prefix == "speed" and 1 or 0,
                syncToClient = config.enableNetTableSync,
                syncPriority = i,
                enableCache = true,
                cacheDuration = 1
            })
            local ____self_testPropertyIds_0 = self.testPropertyIds
            ____self_testPropertyIds_0[#____self_testPropertyIds_0 + 1] = propertyId
            i = i + 1
        end
    end
    self:print(("Registered " .. tostring(#self.testPropertyIds)) .. " test properties")
end
function MPropertySystemStressTest.prototype.CreateTestUnits(self, config)
    self:print("Creating test units...")
    local spawnPoint = Entities:FindByClassname(nil, "info_player_start_goodguys")
    local position = spawnPoint ~= nil and spawnPoint:GetAbsOrigin() or Vector(0, 0, 128)
    do
        local i = 0
        while i < config.unitCount do
            local offset = Vector(
                RandomFloat(-500, 500),
                RandomFloat(-500, 500),
                0
            )
            local unit = SpawnEntityFromTableSynchronous(
                "dota_prop_customtexture",
                {
                    origin = position:__add(offset),
                    model = "models/props_gameplay/tombstone.vmdl"
                }
            )
            if unit ~= nil then
                local ____self_testUnits_1 = self.testUnits
                ____self_testUnits_1[#____self_testUnits_1 + 1] = unit
            end
            i = i + 1
        end
    end
    self:print(("Created " .. tostring(#self.testUnits)) .. " test units")
end
function MPropertySystemStressTest.prototype.AddPropertiesToUnits(self, config)
    self:print("Adding properties to units...")
    local totalStaticProps = 0
    local totalDynamicProps = 0
    for ____, unit in ipairs(self.testUnits) do
        local entIndex = unit:GetEntityIndex()
        do
            local i = 0
            while i < config.staticPropertiesPerUnit do
                local propertyId = self.testPropertyIds[i + 1]
                do
                    local s = 0
                    while s < config.sourcesPerProperty do
                        local sourceId = (("source_" .. tostring(i)) .. "_") .. tostring(s)
                        local value = RandomFloat(1, 100)
                        PropertySystem:AddStaticProperty(entIndex, propertyId, sourceId, value)
                        totalStaticProps = totalStaticProps + 1
                        s = s + 1
                    end
                end
                i = i + 1
            end
        end
        do
            local i = 0
            while i < config.dynamicPropertiesPerUnit do
                local propertyId = self.testPropertyIds[config.staticPropertiesPerUnit + i + 1]
                do
                    local s = 0
                    while s < config.sourcesPerProperty do
                        local sourceId = (("dynamic_" .. tostring(i)) .. "_") .. tostring(s)
                        local function callback()
                            return unit:GetHealth() * 0.01
                        end
                        PropertySystem:RegisterDynamicProperty(
                            entIndex,
                            propertyId,
                            sourceId,
                            callback,
                            s
                        )
                        totalDynamicProps = totalDynamicProps + 1
                        s = s + 1
                    end
                end
                i = i + 1
            end
        end
    end
    self:print(("Added " .. tostring(totalStaticProps)) .. " static properties")
    self:print(("Added " .. tostring(totalDynamicProps)) .. " dynamic properties")
end
function MPropertySystemStressTest.prototype.StartUpdateLoop(self, config)
    self:print("Starting update loop...")
    self.updateTimer = Timer:GameTimer(
        config.updateInterval,
        function()
            local currentTime = GameRules:GetGameTime()
            if currentTime >= self.testEndTime then
                self:StopStressTest()
                return nil
            end
            self:PerformUpdate(config)
            return config.updateInterval
        end
    )
end
function MPropertySystemStressTest.prototype.PerformUpdate(self, config)
    self.updateCount = self.updateCount + 1
    local updateCount = math.floor(config.unitCount * 0.1)
    local updatedUnits = {}
    do
        local i = 0
        while i < updateCount do
            do
                local unit = self.testUnits[RandomInt(0, #self.testUnits - 1) + 1]
                if not unit or not IsValid(unit) then
                    goto __continue36
                end
                local entIndex = unit:GetEntityIndex()
                local propIndex = RandomInt(0, config.staticPropertiesPerUnit - 1)
                local propertyId = self.testPropertyIds[propIndex + 1]
                local sourceIndex = RandomInt(0, config.sourcesPerProperty - 1)
                local sourceId = (("source_" .. tostring(propIndex)) .. "_") .. tostring(sourceIndex)
                local newValue = RandomFloat(1, 100)
                PropertySystem:UpdateStaticPropertyValue(entIndex, propertyId, sourceId, newValue)
                updatedUnits[#updatedUnits + 1] = {unit = unit, propertyId = propertyId}
            end
            ::__continue36::
            i = i + 1
        end
    end
    for ____, ____value in ipairs(updatedUnits) do
        local unit = ____value.unit
        local propertyId = ____value.propertyId
        local entIndex = unit:GetEntityIndex()
        PropertySystem:GetPropertyValue(PropertyScope.UNIT, entIndex, propertyId)
    end
    local hotUnitCount = math.max(
        1,
        math.floor(config.unitCount * 0.1)
    )
    do
        local i = 0
        while i < hotUnitCount do
            do
                local unit = self.testUnits[i % #self.testUnits + 1]
                if not unit or not IsValid(unit) then
                    goto __continue41
                end
                local entIndex = unit:GetEntityIndex()
                do
                    local p = 0
                    while p < math.min(3, config.propertiesPerUnit) do
                        local propertyId = self.testPropertyIds[p + 1]
                        PropertySystem:GetPropertyValue(PropertyScope.UNIT, entIndex, propertyId)
                        p = p + 1
                    end
                end
            end
            ::__continue41::
            i = i + 1
        end
    end
end
function MPropertySystemStressTest.prototype.GenerateTestReport(self)
    local duration = GameRules:GetGameTime() - self.testStartTime
    self:print("=== Property System Stress Test Report ===")
    self:print(("Duration: " .. __TS__NumberToFixed(duration, 2)) .. "s")
    self:print("Updates: " .. tostring(self.updateCount))
    self:print("Average UPS: " .. __TS__NumberToFixed(self.updateCount / duration, 2))
    local stats = PropertyData.stats
    self:print("\n=== Performance Stats ===")
    self:print("Total Reads: " .. tostring(stats.totalReads))
    self:print(((("Cache Hits: " .. tostring(stats.cacheHits)) .. " (") .. __TS__NumberToFixed(stats.cacheHits / stats.totalReads * 100, 2)) .. "%)")
    self:print("Total Writes: " .. tostring(stats.totalWrites))
    self:print("Sync Count: " .. tostring(stats.syncCount))
    local sizeStats = PropertySystem:GetNetTableSizeStats()
    self:print("\n=== NetTable Size Stats ===")
    self:print(("Total Size: " .. tostring(sizeStats.total)) .. " bytes")
    self:print("Entity Count: " .. tostring(sizeStats.entities.size))
    if #sizeStats.warnings > 0 then
        self:print("\n⚠️ SIZE WARNINGS:")
        for ____, warning in ipairs(sizeStats.warnings) do
            self:print("  " .. warning)
        end
    end
    local sorted = __TS__ArraySort(
        __TS__ArrayFrom(sizeStats.entities:entries()),
        function(____, a, b) return b[2] - a[2] end
    )
    self:print("\nTop 5 largest entities:")
    do
        local i = 0
        while i < math.min(5, #sorted) do
            self:print(((("  " .. sorted[i + 1][1]) .. ": ") .. tostring(sorted[i + 1][2])) .. " bytes")
            i = i + 1
        end
    end
    self:print("\n=== Storage Stats ===")
    self:print("Player Storages: " .. tostring(PropertyData.playerStorage.size))
    self:print("Unit Storages: " .. tostring(PropertyData.unitStorage.size))
    self:print("Dirty Keys: " .. tostring(PropertyData.dirtyKeys.size))
end
function MPropertySystemStressTest.prototype.PrintConfig(self, config)
    self:print("Test Configuration:")
    self:print("  Units: " .. tostring(config.unitCount))
    self:print("  Properties/Unit: " .. tostring(config.propertiesPerUnit))
    self:print("  Static: " .. tostring(config.staticPropertiesPerUnit))
    self:print("  Dynamic: " .. tostring(config.dynamicPropertiesPerUnit))
    self:print("  Sources/Property: " .. tostring(config.sourcesPerProperty))
    self:print(("  Duration: " .. tostring(config.duration)) .. "s")
    self:print(("  Update Interval: " .. tostring(config.updateInterval)) .. "s")
    self:print("  NetTable Sync: " .. tostring(config.enableNetTableSync))
    local totalProps = config.unitCount * config.propertiesPerUnit * config.sourcesPerProperty
    self:print("  Total Properties: " .. tostring(totalProps))
end
function MPropertySystemStressTest.prototype.CleanupTest(self)
    self:print("Cleaning up test...")
    PropertySystem:ForceSyncAllDirty()
    for ____, unit in ipairs(self.testUnits) do
        if unit and IsValid(unit) then
            PropertySystem:CleanupUnitProperties(unit)
            UTIL_Remove(unit)
        end
    end
    self.testUnits = {}
    self.testPropertyIds = {}
    self:print("Test stopped")
end
function MPropertySystemStressTest.prototype.RegisterCommands(self)
    Convars:RegisterCommand(
        "property_test_start",
        function()
            print("property_test_start")
            self:StartStressTest()
        end,
        "Start property system stress test",
        0
    )
    Convars:RegisterCommand(
        "property_test_start_small",
        function()
            self:StartStressTest({
                unitCount = 10,
                propertiesPerUnit = 10,
                staticPropertiesPerUnit = 5,
                dynamicPropertiesPerUnit = 5,
                sourcesPerProperty = 2,
                duration = 30
            })
        end,
        "Start small stress test (10 units, 30s)",
        0
    )
    Convars:RegisterCommand(
        "property_test_start_large",
        function()
            self:StartStressTest({
                unitCount = 200,
                propertiesPerUnit = 30,
                staticPropertiesPerUnit = 15,
                dynamicPropertiesPerUnit = 15,
                sourcesPerProperty = 5,
                duration = 120
            })
        end,
        "Start large stress test (200 units, 120s)",
        0
    )
    Convars:RegisterCommand(
        "property_test_stop",
        function()
            self:StopStressTest()
        end,
        "Stop current stress test",
        0
    )
    Convars:RegisterCommand(
        "property_test_status",
        function()
            if self.testStartTime == 0 then
                self:print("No test running")
                return
            end
            local currentTime = GameRules:GetGameTime()
            local elapsed = currentTime - self.testStartTime
            local remaining = self.testEndTime - currentTime
            self:print("=== Test Status ===")
            self:print(("Elapsed: " .. __TS__NumberToFixed(elapsed, 2)) .. "s")
            self:print(("Remaining: " .. __TS__NumberToFixed(remaining, 2)) .. "s")
            self:print("Updates: " .. tostring(self.updateCount))
            self:print("Units: " .. tostring(#self.testUnits))
            self:print("Properties: " .. tostring(#self.testPropertyIds))
        end,
        "Show test status",
        0
    )
    Convars:RegisterCommand(
        "property_test_nettable",
        function()
            self:TestNetTableSize()
        end,
        "Test NetTable size limit with single unit",
        0
    )
end
function MPropertySystemStressTest.prototype.TestNetTableSize(self)
    self:print("=== NetTable Size Test ===")
    self:print("Creating unit with increasing properties until size limit...")
    local spawnPoint = Entities:FindByClassname(nil, "info_player_start_goodguys")
    local position = spawnPoint ~= nil and spawnPoint:GetAbsOrigin() or Vector(0, 0, 128)
    local unit = SpawnEntityFromTableSynchronous("dota_prop_customtexture", {origin = position, model = "models/props_gameplay/tombstone.vmdl"})
    if not unit then
        self:print("Failed to create test unit")
        return
    end
    local entIndex = unit:GetEntityIndex()
    local propertyCount = 0
    while true do
        local propertyId = "nettable_test_prop_" .. tostring(propertyCount)
        PropertySystem:RegisterProperty({
            id = propertyId,
            scope = PropertyScope.UNIT,
            valueType = PropertyValueType.NUMBER,
            aggregation = AggregationStrategy.SUM,
            syncToClient = true
        })
        do
            local s = 0
            while s < 10 do
                PropertySystem:AddStaticProperty(
                    entIndex,
                    propertyId,
                    "source_" .. tostring(s),
                    RandomFloat(1, 100)
                )
                s = s + 1
            end
        end
        propertyCount = propertyCount + 1
        local size = PropertySystem:EstimateEntityNetTableSize(PropertyScope.UNIT, entIndex)
        self:print(((("Properties: " .. tostring(propertyCount)) .. ", Estimated Size: ") .. tostring(size)) .. " bytes")
        if size > 13000 then
            self:print("\n⚠️ Approaching size limit!")
            self:print("Maximum safe properties: ~" .. tostring(propertyCount))
            self:print(("With 10 sources per property: " .. tostring(propertyCount * 10)) .. " total values")
            break
        end
        if propertyCount > 1000 then
            self:print("Reached safety limit (1000 properties)")
            break
        end
    end
    Timer:GameTimer(
        0.5,
        function()
            local sizeStats = PropertySystem:GetNetTableSizeStats()
            self:print("\n=== Final Stats ===")
            self:print("Total entities: " .. tostring(sizeStats.entities.size))
            self:print(("Total size: " .. tostring(sizeStats.total)) .. " bytes")
            if #sizeStats.warnings > 0 then
                self:print("\n⚠️ WARNINGS:")
                for ____, warning in ipairs(sizeStats.warnings) do
                    self:print("  " .. warning)
                end
            end
            UTIL_Remove(unit)
            return nil
        end
    )
end
MPropertySystemStressTest = __TS__DecorateLegacy({reloadable}, MPropertySystemStressTest)
if PropertySystemStressTest == nil then
    PropertySystemStressTest = __TS__New(MPropertySystemStressTest)
end
return ____exports
