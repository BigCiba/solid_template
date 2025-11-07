local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Set = ____lualib.Set
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["22"] = 3,["23"] = 3,["24"] = 19,["25"] = 22,["26"] = 22,["27"] = 23,["29"] = 23,["30"] = 25,["31"] = 26,["32"] = 27,["33"] = 30,["34"] = 22,["35"] = 32,["36"] = 33,["37"] = 34,["38"] = 36,["39"] = 37,["40"] = 38,["41"] = 39,["43"] = 42,["45"] = 44,["47"] = 32,["48"] = 48,["49"] = 49,["50"] = 48,["51"] = 52,["52"] = 53,["53"] = 52,["54"] = 58,["55"] = 59,["56"] = 60,["57"] = 60,["58"] = 60,["59"] = 60,["60"] = 60,["61"] = 60,["62"] = 60,["63"] = 60,["65"] = 58,["66"] = 79,["67"] = 81,["68"] = 82,["69"] = 83,["70"] = 83,["71"] = 83,["73"] = 84,["74"] = 85,["75"] = 85,["76"] = 85,["78"] = 80,["79"] = 80,["80"] = 80,["81"] = 80,["82"] = 80,["83"] = 80,["84"] = 80,["85"] = 89,["86"] = 90,["87"] = 79,["88"] = 94,["89"] = 95,["90"] = 96,["92"] = 94,["93"] = 110,["94"] = 117,["95"] = 117,["97"] = 119,["98"] = 120,["99"] = 121,["100"] = 123,["101"] = 124,["102"] = 125,["104"] = 129,["105"] = 129,["106"] = 129,["107"] = 129,["108"] = 130,["109"] = 132,["110"] = 133,["112"] = 136,["113"] = 136,["114"] = 136,["115"] = 136,["116"] = 136,["117"] = 136,["119"] = 144,["120"] = 146,["121"] = 147,["123"] = 150,["124"] = 150,["125"] = 151,["126"] = 110,["127"] = 160,["128"] = 165,["129"] = 166,["131"] = 169,["132"] = 170,["133"] = 170,["134"] = 171,["135"] = 172,["138"] = 175,["140"] = 160,["141"] = 179,["142"] = 184,["143"] = 184,["145"] = 186,["146"] = 187,["147"] = 188,["148"] = 190,["149"] = 190,["151"] = 192,["152"] = 192,["153"] = 192,["154"] = 192,["155"] = 193,["156"] = 194,["157"] = 196,["158"] = 197,["159"] = 198,["161"] = 200,["163"] = 203,["164"] = 204,["166"] = 207,["168"] = 210,["169"] = 179,["170"] = 220,["171"] = 226,["172"] = 226,["174"] = 228,["175"] = 229,["176"] = 230,["177"] = 232,["178"] = 232,["180"] = 234,["181"] = 234,["182"] = 234,["183"] = 234,["184"] = 235,["185"] = 236,["186"] = 237,["187"] = 239,["188"] = 240,["190"] = 243,["192"] = 246,["193"] = 220,["194"] = 250,["195"] = 251,["196"] = 252,["197"] = 252,["199"] = 254,["200"] = 255,["201"] = 257,["202"] = 257,["203"] = 258,["204"] = 259,["205"] = 259,["207"] = 262,["208"] = 250,["209"] = 265,["210"] = 266,["211"] = 267,["214"] = 269,["215"] = 270,["216"] = 272,["217"] = 273,["220"] = 278,["221"] = 280,["222"] = 281,["224"] = 284,["225"] = 265,["226"] = 298,["227"] = 303,["228"] = 303,["230"] = 306,["231"] = 306,["233"] = 308,["234"] = 309,["235"] = 310,["236"] = 312,["237"] = 313,["238"] = 314,["240"] = 317,["241"] = 317,["242"] = 317,["243"] = 317,["244"] = 318,["245"] = 320,["246"] = 321,["247"] = 322,["249"] = 325,["250"] = 325,["251"] = 325,["252"] = 325,["253"] = 325,["254"] = 325,["255"] = 325,["257"] = 334,["258"] = 334,["259"] = 334,["260"] = 334,["261"] = 335,["262"] = 337,["263"] = 338,["265"] = 341,["266"] = 341,["267"] = 342,["268"] = 298,["269"] = 351,["270"] = 356,["271"] = 357,["273"] = 360,["274"] = 361,["275"] = 361,["276"] = 362,["277"] = 363,["280"] = 366,["282"] = 351,["283"] = 370,["284"] = 375,["285"] = 375,["287"] = 377,["288"] = 378,["289"] = 379,["290"] = 381,["291"] = 381,["293"] = 383,["294"] = 383,["295"] = 383,["296"] = 383,["297"] = 384,["298"] = 385,["299"] = 387,["300"] = 388,["302"] = 391,["303"] = 393,["304"] = 394,["306"] = 397,["308"] = 400,["309"] = 370,["310"] = 404,["311"] = 405,["312"] = 406,["313"] = 406,["315"] = 408,["316"] = 411,["317"] = 412,["318"] = 413,["319"] = 415,["320"] = 416,["321"] = 417,["322"] = 418,["323"] = 418,["324"] = 419,["325"] = 419,["326"] = 420,["330"] = 426,["331"] = 429,["332"] = 430,["333"] = 430,["334"] = 430,["335"] = 430,["336"] = 430,["337"] = 430,["338"] = 430,["339"] = 430,["341"] = 437,["342"] = 437,["343"] = 438,["344"] = 404,["345"] = 441,["346"] = 442,["347"] = 443,["348"] = 443,["350"] = 445,["351"] = 446,["352"] = 448,["353"] = 449,["355"] = 453,["356"] = 455,["359"] = 462,["362"] = 457,["363"] = 458,["364"] = 459,["372"] = 466,["373"] = 441,["374"] = 470,["375"] = 471,["376"] = 473,["377"] = 474,["379"] = 476,["381"] = 470,["382"] = 483,["383"] = 484,["384"] = 485,["385"] = 489,["386"] = 483,["387"] = 494,["388"] = 495,["389"] = 495,["390"] = 495,["391"] = 495,["392"] = 495,["393"] = 495,["394"] = 495,["395"] = 495,["396"] = 500,["397"] = 500,["398"] = 500,["399"] = 501,["400"] = 502,["401"] = 500,["402"] = 500,["403"] = 505,["404"] = 494,["405"] = 508,["406"] = 509,["409"] = 511,["410"] = 514,["411"] = 514,["412"] = 514,["413"] = 516,["414"] = 516,["415"] = 516,["416"] = 516,["417"] = 516,["418"] = 517,["419"] = 517,["420"] = 517,["421"] = 517,["422"] = 517,["423"] = 519,["424"] = 520,["425"] = 522,["426"] = 523,["427"] = 525,["428"] = 514,["429"] = 514,["430"] = 529,["432"] = 531,["433"] = 531,["434"] = 532,["435"] = 533,["436"] = 531,["439"] = 536,["440"] = 537,["441"] = 538,["442"] = 538,["443"] = 508,["444"] = 541,["445"] = 543,["446"] = 544,["447"] = 544,["448"] = 544,["450"] = 544,["452"] = 544,["453"] = 546,["454"] = 548,["455"] = 548,["456"] = 548,["457"] = 548,["458"] = 548,["459"] = 549,["460"] = 550,["461"] = 552,["462"] = 553,["464"] = 556,["465"] = 541,["466"] = 560,["467"] = 561,["470"] = 563,["471"] = 564,["474"] = 566,["475"] = 567,["476"] = 570,["477"] = 571,["478"] = 571,["479"] = 571,["481"] = 571,["483"] = 571,["484"] = 572,["485"] = 574,["486"] = 560,["487"] = 578,["488"] = 579,["489"] = 579,["491"] = 581,["492"] = 582,["493"] = 584,["494"] = 585,["496"] = 588,["497"] = 578,["498"] = 592,["499"] = 598,["500"] = 599,["503"] = 603,["504"] = 605,["505"] = 605,["506"] = 605,["507"] = 606,["508"] = 607,["509"] = 608,["510"] = 609,["512"] = 611,["513"] = 605,["514"] = 605,["515"] = 592,["516"] = 622,["517"] = 624,["518"] = 627,["519"] = 622,["520"] = 631,["521"] = 632,["524"] = 634,["525"] = 635,["526"] = 637,["527"] = 638,["528"] = 639,["530"] = 631,["531"] = 644,["532"] = 645,["535"] = 646,["536"] = 644,["537"] = 649,["538"] = 650,["539"] = 654,["540"] = 655,["541"] = 656,["542"] = 657,["543"] = 658,["544"] = 659,["545"] = 660,["547"] = 649,["548"] = 665,["549"] = 666,["550"] = 668,["551"] = 668,["552"] = 669,["554"] = 672,["555"] = 672,["556"] = 673,["558"] = 676,["559"] = 677,["561"] = 680,["562"] = 665,["563"] = 683,["564"] = 687,["565"] = 683,["566"] = 691,["567"] = 692,["568"] = 694,["569"] = 694,["570"] = 694,["571"] = 695,["572"] = 696,["573"] = 697,["576"] = 701,["577"] = 701,["578"] = 701,["579"] = 702,["580"] = 703,["581"] = 704,["584"] = 708,["585"] = 691,["586"] = 711,["587"] = 712,["588"] = 711,["589"] = 719,["590"] = 720,["591"] = 720,["592"] = 720,["593"] = 721,["594"] = 722,["595"] = 723,["596"] = 720,["597"] = 720,["598"] = 726,["599"] = 719,["600"] = 730,["601"] = 731,["602"] = 732,["603"] = 733,["604"] = 734,["605"] = 730,["606"] = 744,["607"] = 746,["608"] = 746,["609"] = 746,["610"] = 747,["611"] = 746,["612"] = 746,["613"] = 746,["614"] = 746,["615"] = 751,["616"] = 751,["617"] = 751,["618"] = 752,["619"] = 751,["620"] = 751,["621"] = 751,["622"] = 751,["623"] = 756,["624"] = 756,["625"] = 756,["626"] = 757,["627"] = 763,["628"] = 756,["629"] = 756,["630"] = 756,["631"] = 756,["632"] = 767,["633"] = 767,["634"] = 767,["635"] = 768,["636"] = 769,["637"] = 769,["638"] = 769,["639"] = 770,["641"] = 767,["642"] = 767,["643"] = 767,["644"] = 767,["645"] = 775,["646"] = 775,["647"] = 775,["648"] = 776,["649"] = 777,["650"] = 778,["651"] = 775,["652"] = 775,["653"] = 775,["654"] = 775,["655"] = 781,["656"] = 744,["657"] = 784,["658"] = 785,["659"] = 786,["660"] = 787,["661"] = 788,["662"] = 789,["663"] = 790,["664"] = 784,["665"] = 793,["666"] = 794,["667"] = 795,["668"] = 799,["669"] = 800,["670"] = 801,["671"] = 802,["672"] = 803,["673"] = 793,["674"] = 808,["675"] = 809,["676"] = 813,["677"] = 814,["678"] = 815,["679"] = 815,["680"] = 815,["681"] = 815,["682"] = 815,["683"] = 815,["684"] = 821,["686"] = 824,["687"] = 808,["688"] = 827,["689"] = 828,["690"] = 827,["691"] = 831,["692"] = 832,["693"] = 833,["694"] = 834,["696"] = 836,["697"] = 831,["698"] = 845,["699"] = 846,["700"] = 846,["702"] = 849,["703"] = 850,["704"] = 851,["706"] = 855,["707"] = 856,["708"] = 856,["709"] = 856,["710"] = 856,["712"] = 859,["713"] = 845,["714"] = 862,["716"] = 863,["717"] = 864,["719"] = 865,["721"] = 866,["723"] = 867,["725"] = 868,["727"] = 869,["729"] = 870,["731"] = 871,["733"] = 872,["735"] = 873,["737"] = 874,["739"] = 875,["741"] = 876,["743"] = 877,["744"] = 878,["746"] = 880,["749"] = 882,["752"] = 862,["753"] = 886,["755"] = 887,["756"] = 888,["758"] = 889,["760"] = 890,["762"] = 891,["764"] = 892,["766"] = 893,["768"] = 894,["770"] = 896,["773"] = 898,["776"] = 886,["777"] = 902,["778"] = 904,["779"] = 902,["780"] = 907,["781"] = 908,["782"] = 909,["783"] = 907,["784"] = 912,["785"] = 913,["786"] = 912,["787"] = 916,["788"] = 917,["789"] = 916,["790"] = 22,["791"] = 939,["792"] = 939});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
require("framework.property_system.property_system_types")
local MPropertySystem = __TS__Class()
MPropertySystem.name = "MPropertySystem"
__TS__ClassExtends(MPropertySystem, CModule)
function MPropertySystem.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.NETTABLE_NAME = "property_system"
    self.SYNC_INTERVAL = 0.1
    self.MAX_SYNC_PER_BATCH = 50
    self.autoCleanupInterval = 30
end
function MPropertySystem.prototype.init(self, reload)
    if not reload then
        self:InitializeCore()
        if IsServer() then
            self:InitializeNetTableSync()
            self:StartAutoCleanup()
            self:RegisterDebugCommands()
        end
        self:print("Property System initialized")
    else
        self:print("Property System reloaded")
    end
end
function MPropertySystem.prototype.initPriority(self)
    return 10
end
function MPropertySystem.prototype.reset(self)
    self:ResetSystem()
end
function MPropertySystem.prototype.InitializeCore(self)
    if not PropertyData then
        PropertyData = {
            configs = __TS__New(Map),
            playerStorage = __TS__New(Map),
            unitStorage = __TS__New(Map),
            dirtyKeys = __TS__New(Set),
            lastSyncTime = 0,
            stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
        }
    end
end
function MPropertySystem.prototype.RegisterProperty(self, config)
    local ____config_2 = config
    local ____temp_3 = config.defaultValue or 0
    local ____config_syncToClient_0 = config.syncToClient
    if ____config_syncToClient_0 == nil then
        ____config_syncToClient_0 = true
    end
    local ____temp_4 = config.syncPriority or 100
    local ____config_enableCache_1 = config.enableCache
    if ____config_enableCache_1 == nil then
        ____config_enableCache_1 = true
    end
    local finalConfig = __TS__ObjectAssign({}, ____config_2, {
        defaultValue = ____temp_3,
        syncToClient = ____config_syncToClient_0,
        syncPriority = ____temp_4,
        enableCache = ____config_enableCache_1,
        cacheDuration = config.cacheDuration or 0
    })
    PropertyData.configs:set(config.id, finalConfig)
    self:print(((("Registered: " .. config.id) .. " (") .. PropertyScope[config.scope]) .. ")")
end
function MPropertySystem.prototype.RegisterProperties(self, configs)
    for ____, config in ipairs(configs) do
        self:RegisterProperty(config)
    end
end
function MPropertySystem.prototype.AddStaticProperty(self, key, propertyId, sourceId, value, metadata)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.static:get(propertyId)
    if not propertyList then
        propertyList = {}
        storage.static:set(propertyId, propertyList)
    end
    local existingIndex = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        propertyList[existingIndex + 1].value = value
        propertyList[existingIndex + 1].metadata = metadata
    else
        propertyList[#propertyList + 1] = {
            sourceId = sourceId,
            value = value,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
    end
    self:RecalculateStaticProperty(config.scope, key, propertyId)
    if config.syncToClient then
        self:MarkDirty(config.scope, key, propertyId)
    end
    local ____PropertyData_stats_5, ____totalWrites_6 = PropertyData.stats, "totalWrites"
    ____PropertyData_stats_5[____totalWrites_6] = ____PropertyData_stats_5[____totalWrites_6] + 1
    return true
end
function MPropertySystem.prototype.RemoveStaticProperty(self, key, sourceId, propertyId)
    if propertyId then
        return self:RemoveSingleStaticProperty(key, sourceId, propertyId)
    else
        local removed = false
        for ____, ____value in __TS__Iterator(PropertyData.configs) do
            local pid = ____value[1]
            if self:RemoveSingleStaticProperty(key, sourceId, pid) then
                removed = true
            end
        end
        return removed
    end
end
function MPropertySystem.prototype.RemoveSingleStaticProperty(self, key, sourceId, propertyId)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.static:get(propertyId)
    if not propertyList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index ~= -1 then
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            storage.static:delete(propertyId)
            storage.staticCache:delete(propertyId)
        else
            self:RecalculateStaticProperty(config.scope, key, propertyId)
        end
        if config.syncToClient then
            self:MarkDirty(config.scope, key, propertyId)
        end
        return true
    end
    return false
end
function MPropertySystem.prototype.UpdateStaticPropertyValue(self, key, propertyId, sourceId, newValue)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.static:get(propertyId)
    if not propertyList then
        return false
    end
    local data = __TS__ArrayFind(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if data then
        data.value = newValue
        self:RecalculateStaticProperty(config.scope, key, propertyId)
        if config.syncToClient then
            self:MarkDirty(config.scope, key, propertyId)
        end
        return true
    end
    return false
end
function MPropertySystem.prototype.GetStaticPropertyValue(self, scope, key, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    local cachedValue = storage.staticCache:get(propertyId)
    local ____PropertyData_stats_7, ____totalReads_8 = PropertyData.stats, "totalReads"
    ____PropertyData_stats_7[____totalReads_8] = ____PropertyData_stats_7[____totalReads_8] + 1
    if cachedValue ~= nil then
        local ____PropertyData_stats_9, ____cacheHits_10 = PropertyData.stats, "cacheHits"
        ____PropertyData_stats_9[____cacheHits_10] = ____PropertyData_stats_9[____cacheHits_10] + 1
    end
    return cachedValue or config.defaultValue or 0
end
function MPropertySystem.prototype.RecalculateStaticProperty(self, scope, key, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return
    end
    local storage = self:GetStorage(scope, key)
    local propertyList = storage.static:get(propertyId)
    if not propertyList or #propertyList == 0 then
        storage.staticCache:delete(propertyId)
        return
    end
    local result = self:GetAggregationInitialValue(config.aggregation, config.defaultValue or 0)
    for ____, data in ipairs(propertyList) do
        result = self:AggregateValues(config.aggregation, result, data.value, config.customAggregator)
    end
    storage.staticCache:set(propertyId, result)
end
function MPropertySystem.prototype.RegisterDynamicProperty(self, key, propertyId, sourceId, callback, priority, metadata)
    if priority == nil then
        priority = 0
    end
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.dynamic:get(propertyId)
    if not propertyList then
        propertyList = {}
        storage.dynamic:set(propertyId, propertyList)
    end
    local existingIndex = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        propertyList[existingIndex + 1].callback = callback
        propertyList[existingIndex + 1].priority = priority
        propertyList[existingIndex + 1].metadata = metadata
    else
        propertyList[#propertyList + 1] = {
            sourceId = sourceId,
            callback = callback,
            priority = priority,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
    end
    __TS__ArraySort(
        propertyList,
        function(____, a, b) return a.priority - b.priority end
    )
    storage.runtimeCache:delete(propertyId)
    if config.syncToClient then
        self:MarkDirty(config.scope, key, propertyId)
    end
    local ____PropertyData_stats_11, ____totalWrites_12 = PropertyData.stats, "totalWrites"
    ____PropertyData_stats_11[____totalWrites_12] = ____PropertyData_stats_11[____totalWrites_12] + 1
    return true
end
function MPropertySystem.prototype.UnregisterDynamicProperty(self, key, sourceId, propertyId)
    if propertyId then
        return self:UnregisterSingleDynamicProperty(key, sourceId, propertyId)
    else
        local removed = false
        for ____, ____value in __TS__Iterator(PropertyData.configs) do
            local pid = ____value[1]
            if self:UnregisterSingleDynamicProperty(key, sourceId, pid) then
                removed = true
            end
        end
        return removed
    end
end
function MPropertySystem.prototype.UnregisterSingleDynamicProperty(self, key, sourceId, propertyId)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.dynamic:get(propertyId)
    if not propertyList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index ~= -1 then
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            storage.dynamic:delete(propertyId)
        end
        storage.runtimeCache:delete(propertyId)
        if config.syncToClient then
            self:MarkDirty(config.scope, key, propertyId)
        end
        return true
    end
    return false
end
function MPropertySystem.prototype.GetDynamicPropertyValue(self, scope, key, propertyId, params)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    if config.enableCache then
        local cached = storage.runtimeCache:get(propertyId)
        local currentFrame = self:GetCurrentFrame()
        if cached then
            local frameAge = currentFrame - cached.frame
            if frameAge <= (config.cacheDuration or 0) then
                local ____PropertyData_stats_13, ____totalReads_14 = PropertyData.stats, "totalReads"
                ____PropertyData_stats_13[____totalReads_14] = ____PropertyData_stats_13[____totalReads_14] + 1
                local ____PropertyData_stats_15, ____cacheHits_16 = PropertyData.stats, "cacheHits"
                ____PropertyData_stats_15[____cacheHits_16] = ____PropertyData_stats_15[____cacheHits_16] + 1
                return cached.value
            end
        end
    end
    local value = self:CalculateDynamicPropertyValue(scope, key, propertyId, params)
    if config.enableCache then
        storage.runtimeCache:set(
            propertyId,
            {
                value = value,
                frame = self:GetCurrentFrame(),
                time = self:GetCurrentTime()
            }
        )
    end
    local ____PropertyData_stats_17, ____totalReads_18 = PropertyData.stats, "totalReads"
    ____PropertyData_stats_17[____totalReads_18] = ____PropertyData_stats_17[____totalReads_18] + 1
    return value
end
function MPropertySystem.prototype.CalculateDynamicPropertyValue(self, scope, key, propertyId, params)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    local propertyList = storage.dynamic:get(propertyId)
    if not propertyList or #propertyList == 0 then
        return config.defaultValue or 0
    end
    local result = self:GetAggregationInitialValue(config.aggregation, config.defaultValue or 0)
    for ____, data in ipairs(propertyList) do
        do
            local function ____catch(____error)
                self:print((((("Error in callback for " .. propertyId) .. " (sourceId: ") .. data.sourceId) .. "): ") .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                local value = data:callback(params)
                if value ~= nil then
                    result = self:AggregateValues(config.aggregation, result, value, config.customAggregator)
                end
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
    return result
end
function MPropertySystem.prototype.ClearDynamicPropertyCache(self, scope, key, propertyId)
    local storage = self:GetStorage(scope, key)
    if propertyId then
        storage.runtimeCache:delete(propertyId)
    else
        storage.runtimeCache:clear()
    end
end
function MPropertySystem.prototype.GetPropertyValue(self, scope, key, propertyId, params)
    local staticValue = self:GetStaticPropertyValue(scope, key, propertyId)
    local dynamicValue = self:GetDynamicPropertyValue(scope, key, propertyId, params)
    return staticValue + dynamicValue
end
function MPropertySystem.prototype.InitializeNetTableSync(self)
    CustomNetTables:SetTableValue(
        self.NETTABLE_NAME,
        "init",
        {
            version = 1,
            time = self:GetCurrentTime()
        }
    )
    Timer:GameTimer(
        self.SYNC_INTERVAL,
        function()
            self:SyncDirtyProperties()
            return self.SYNC_INTERVAL
        end
    )
    self:print("NetTable sync initialized")
end
function MPropertySystem.prototype.SyncDirtyProperties(self)
    if PropertyData.dirtyKeys.size == 0 then
        return
    end
    local dirtyArray = __TS__ArrayFrom(PropertyData.dirtyKeys)
    __TS__ArraySort(
        dirtyArray,
        function(____, a, b)
            local ____, ____, propIdA = unpack(
                __TS__StringSplit(a, "|"),
                1,
                3
            )
            local ____, ____, propIdB = unpack(
                __TS__StringSplit(b, "|"),
                1,
                3
            )
            local configA = self:GetConfig(propIdA)
            local configB = self:GetConfig(propIdB)
            local priorityA = configA and configA.syncPriority or 100
            local priorityB = configB and configB.syncPriority or 100
            return priorityA - priorityB
        end
    )
    local batchCount = math.ceil(#dirtyArray / self.MAX_SYNC_PER_BATCH)
    do
        local i = 0
        while i < batchCount do
            local batch = __TS__ArraySlice(dirtyArray, i * self.MAX_SYNC_PER_BATCH, (i + 1) * self.MAX_SYNC_PER_BATCH)
            self:SyncPropertyBatch(batch)
            i = i + 1
        end
    end
    PropertyData.dirtyKeys:clear()
    PropertyData.lastSyncTime = self:GetCurrentTime()
    local ____PropertyData_stats_23, ____syncCount_24 = PropertyData.stats, "syncCount"
    ____PropertyData_stats_23[____syncCount_24] = ____PropertyData_stats_23[____syncCount_24] + 1
end
function MPropertySystem.prototype.SyncPropertyBatch(self, dirtyKeys)
    local existingData = CustomNetTables:GetTableValue(self.NETTABLE_NAME, "properties")
    local ____existingData_25
    if existingData then
        ____existingData_25 = __TS__ObjectAssign({}, existingData)
    else
        ____existingData_25 = {}
    end
    local updates = ____existingData_25
    for ____, dirtyKey in ipairs(dirtyKeys) do
        local scopeStr, keyStr, propertyId = unpack(
            __TS__StringSplit(dirtyKey, "|"),
            1,
            3
        )
        local scope = __TS__ParseInt(scopeStr)
        local key = __TS__ParseInt(keyStr)
        local value = self:GetPropertyValue(scope, key, propertyId)
        updates[dirtyKey] = value
    end
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, "properties", updates)
end
function MPropertySystem.prototype.ForceSyncProperty(self, scope, key, propertyId)
    if not IsServer() then
        return
    end
    local config = self:GetConfig(propertyId)
    if not config or not config.syncToClient then
        return
    end
    local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
    local value = self:GetPropertyValue(scope, key, propertyId)
    local existingData = CustomNetTables:GetTableValue(self.NETTABLE_NAME, "properties")
    local ____existingData_26
    if existingData then
        ____existingData_26 = __TS__ObjectAssign({}, existingData)
    else
        ____existingData_26 = {}
    end
    local update = ____existingData_26
    update[dirtyKey] = value
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, "properties", update)
end
function MPropertySystem.prototype.GetPropertyValueFromNetTable(self, scope, key, propertyId)
    if IsServer() then
        return nil
    end
    local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
    local data = CustomNetTables:GetTableValue(self.NETTABLE_NAME, "properties")
    if data and data[dirtyKey] ~= nil then
        return data[dirtyKey]
    end
    return nil
end
function MPropertySystem.prototype.ListenPropertyChange(self, scope, key, propertyId, callback)
    if IsServer() then
        self:print("Warning: ListenPropertyChange should only be called on client")
        return
    end
    local lastValue = self:GetPropertyValueFromNetTable(scope, key, propertyId)
    Timer:GameTimer(
        0.1,
        function()
            local newValue = self:GetPropertyValueFromNetTable(scope, key, propertyId)
            if newValue ~= lastValue then
                callback(lastValue, newValue)
                lastValue = newValue
            end
            return 0.1
        end
    )
end
function MPropertySystem.prototype.CleanupSourceProperties(self, key, sourceId)
    self:RemoveStaticProperty(key, sourceId)
    self:UnregisterDynamicProperty(key, sourceId)
end
function MPropertySystem.prototype.CleanupUnitProperties(self, unit)
    if not unit then
        return
    end
    local entIndex = unit:GetEntityIndex()
    self:CleanupStorage(PropertyScope.UNIT, entIndex)
    local playerID = unit:GetPlayerOwnerID()
    if playerID ~= -1 then
        self:ClearDynamicPropertyCache(PropertyScope.PLAYER, playerID)
    end
end
function MPropertySystem.prototype.CleanupPlayerProperties(self, playerID)
    if playerID < 0 then
        return
    end
    self:CleanupStorage(PropertyScope.PLAYER, playerID)
end
function MPropertySystem.prototype.CleanupStorage(self, scope, key)
    local storageMap = scope == PropertyScope.PLAYER and PropertyData.playerStorage or PropertyData.unitStorage
    local storage = storageMap:get(key)
    if storage then
        storage.static:clear()
        storage.dynamic:clear()
        storage.staticCache:clear()
        storage.runtimeCache:clear()
        storageMap:delete(key)
    end
end
function MPropertySystem.prototype.CleanupInvalidModifiers(self)
    local cleanedCount = 0
    for ____, ____value in __TS__Iterator(PropertyData.playerStorage) do
        local storage = ____value[2]
        cleanedCount = cleanedCount + self:CleanupStorageInvalidModifiers(storage)
    end
    for ____, ____value in __TS__Iterator(PropertyData.unitStorage) do
        local storage = ____value[2]
        cleanedCount = cleanedCount + self:CleanupStorageInvalidModifiers(storage)
    end
    if cleanedCount > 0 then
        self:print(("Cleaned up " .. tostring(cleanedCount)) .. " invalid modifiers")
    end
    return cleanedCount
end
function MPropertySystem.prototype.CleanupStorageInvalidModifiers(self, storage)
    return 0
end
function MPropertySystem.prototype.CleanupEmptyStorages(self)
    local cleanedCount = 0
    for ____, ____value in __TS__Iterator(PropertyData.playerStorage) do
        local key = ____value[1]
        local storage = ____value[2]
        if self:IsStorageEmpty(storage) then
            PropertyData.playerStorage:delete(key)
            cleanedCount = cleanedCount + 1
        end
    end
    for ____, ____value in __TS__Iterator(PropertyData.unitStorage) do
        local key = ____value[1]
        local storage = ____value[2]
        if self:IsStorageEmpty(storage) then
            PropertyData.unitStorage:delete(key)
            cleanedCount = cleanedCount + 1
        end
    end
    return cleanedCount
end
function MPropertySystem.prototype.IsStorageEmpty(self, storage)
    return storage.static.size == 0 and storage.dynamic.size == 0 and storage.staticCache.size == 0 and storage.runtimeCache.size == 0
end
function MPropertySystem.prototype.StartAutoCleanup(self)
    Timer:GameTimer(
        self.autoCleanupInterval,
        function()
            self:CleanupInvalidModifiers()
            self:CleanupEmptyStorages()
            return self.autoCleanupInterval
        end
    )
    self:print(("Auto cleanup started (" .. tostring(self.autoCleanupInterval)) .. "s)")
end
function MPropertySystem.prototype.ResetSystem(self)
    PropertyData.playerStorage:clear()
    PropertyData.unitStorage:clear()
    PropertyData.dirtyKeys:clear()
    PropertyData.stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
end
function MPropertySystem.prototype.RegisterDebugCommands(self)
    Convars:RegisterCommand(
        "property_status",
        function()
            self:PrintSystemStatus()
        end,
        "Print property system status",
        0
    )
    Convars:RegisterCommand(
        "property_stats",
        function()
            self:PrintPerformanceStats()
        end,
        "Print performance statistics",
        0
    )
    Convars:RegisterCommand(
        "property_reset_stats",
        function()
            PropertyData.stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
            self:print("Stats reset")
        end,
        "Reset performance statistics",
        0
    )
    Convars:RegisterCommand(
        "property_list",
        function()
            self:print("=== Registered Properties ===")
            for ____, ____value in __TS__Iterator(PropertyData.configs) do
                local id = ____value[1]
                local config = ____value[2]
                self:print((((tostring(id) .. ": scope=") .. PropertyScope[config.scope]) .. ", type=") .. PropertyValueType[config.valueType])
            end
        end,
        "List all registered properties",
        0
    )
    Convars:RegisterCommand(
        "property_cleanup",
        function()
            local count = self:CleanupInvalidModifiers()
            local storageCount = self:CleanupEmptyStorages()
            self:print(((("Cleaned: " .. tostring(count)) .. " modifiers, ") .. tostring(storageCount)) .. " storages")
        end,
        "Force cleanup invalid modifiers",
        0
    )
    self:print("Debug commands registered")
end
function MPropertySystem.prototype.PrintSystemStatus(self)
    self:print("=== Property System Status ===")
    self:print("Registered Properties: " .. tostring(PropertyData.configs.size))
    self:print("Player Storages: " .. tostring(PropertyData.playerStorage.size))
    self:print("Unit Storages: " .. tostring(PropertyData.unitStorage.size))
    self:print("Dirty Keys: " .. tostring(PropertyData.dirtyKeys.size))
    self:print(("Last Sync: " .. __TS__NumberToFixed(PropertyData.lastSyncTime, 2)) .. "s")
end
function MPropertySystem.prototype.PrintPerformanceStats(self)
    local stats = PropertyData.stats
    local hitRate = stats.totalReads > 0 and __TS__NumberToFixed(stats.cacheHits / stats.totalReads * 100, 2) or "0.00"
    self:print("=== Performance Stats ===")
    self:print("Total Reads: " .. tostring(stats.totalReads))
    self:print(((("Cache Hits: " .. tostring(stats.cacheHits)) .. " (") .. hitRate) .. "%)")
    self:print("Total Writes: " .. tostring(stats.totalWrites))
    self:print("Sync Count: " .. tostring(stats.syncCount))
end
function MPropertySystem.prototype.GetStorage(self, scope, key)
    local storageMap = scope == PropertyScope.PLAYER and PropertyData.playerStorage or PropertyData.unitStorage
    local storage = storageMap:get(key)
    if not storage then
        storage = {
            static = __TS__New(Map),
            dynamic = __TS__New(Map),
            staticCache = __TS__New(Map),
            runtimeCache = __TS__New(Map)
        }
        storageMap:set(key, storage)
    end
    return storage
end
function MPropertySystem.prototype.GetConfig(self, propertyId)
    return PropertyData.configs:get(propertyId)
end
function MPropertySystem.prototype.ValidateProperty(self, propertyId)
    if not PropertyData.configs:has(propertyId) then
        self:print(("Error: Property " .. propertyId) .. " not registered")
        return false
    end
    return true
end
function MPropertySystem.prototype.GetEntityContext(self, entity)
    if not entity or not IsValid(entity) then
        return nil
    end
    if entity.IsPlayer and entity:IsPlayer() then
        local playerID = entity:GetPlayerID()
        return {PropertyScope.PLAYER, playerID}
    end
    if entity.IsBaseNPC and entity:IsBaseNPC() then
        return {
            PropertyScope.UNIT,
            entity:GetEntityIndex()
        }
    end
    return nil
end
function MPropertySystem.prototype.AggregateValues(self, strategy, current, value, customAggregator)
    repeat
        local ____switch154 = strategy
        local ____cond154 = ____switch154 == AggregationStrategy.SUM
        if ____cond154 then
            return current + value
        end
        ____cond154 = ____cond154 or ____switch154 == AggregationStrategy.MULTIPLY
        if ____cond154 then
            return current * value
        end
        ____cond154 = ____cond154 or ____switch154 == AggregationStrategy.MAX
        if ____cond154 then
            return math.max(current, value)
        end
        ____cond154 = ____cond154 or ____switch154 == AggregationStrategy.MIN
        if ____cond154 then
            return math.min(current, value)
        end
        ____cond154 = ____cond154 or ____switch154 == AggregationStrategy.FIRST
        if ____cond154 then
            return current ~= 0 and current or value
        end
        ____cond154 = ____cond154 or ____switch154 == AggregationStrategy.LAST
        if ____cond154 then
            return value
        end
        ____cond154 = ____cond154 or ____switch154 == AggregationStrategy.CUSTOM
        if ____cond154 then
            if customAggregator then
                return customAggregator(nil, current, value)
            end
            return current + value
        end
        do
            return current + value
        end
    until true
end
function MPropertySystem.prototype.GetAggregationInitialValue(self, strategy, defaultValue)
    repeat
        local ____switch157 = strategy
        local ____cond157 = ____switch157 == AggregationStrategy.MULTIPLY
        if ____cond157 then
            return 1
        end
        ____cond157 = ____cond157 or ____switch157 == AggregationStrategy.MAX
        if ____cond157 then
            return -math.huge
        end
        ____cond157 = ____cond157 or ____switch157 == AggregationStrategy.MIN
        if ____cond157 then
            return math.huge
        end
        ____cond157 = ____cond157 or (____switch157 == AggregationStrategy.FIRST or ____switch157 == AggregationStrategy.LAST)
        if ____cond157 then
            return defaultValue
        end
        do
            return defaultValue
        end
    until true
end
function MPropertySystem.prototype.GetDirtyKey(self, scope, key, propertyId)
    return (((tostring(scope) .. "|") .. tostring(key)) .. "|") .. propertyId
end
function MPropertySystem.prototype.MarkDirty(self, scope, key, propertyId)
    local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
    PropertyData.dirtyKeys:add(dirtyKey)
end
function MPropertySystem.prototype.GetCurrentFrame(self)
    return GameRules:GetDOTATime(false, false)
end
function MPropertySystem.prototype.GetCurrentTime(self)
    return GameRules:GetGameTime()
end
MPropertySystem = __TS__DecorateLegacy({reloadable}, MPropertySystem)
if PropertySystem == nil then
    PropertySystem = __TS__New(MPropertySystem)
end
return ____exports
