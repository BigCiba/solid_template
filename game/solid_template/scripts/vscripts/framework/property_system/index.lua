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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["22"] = 3,["23"] = 3,["24"] = 19,["25"] = 22,["26"] = 22,["27"] = 23,["29"] = 23,["30"] = 25,["31"] = 26,["32"] = 27,["33"] = 30,["34"] = 22,["35"] = 32,["36"] = 33,["37"] = 34,["38"] = 36,["39"] = 37,["40"] = 38,["41"] = 39,["43"] = 42,["45"] = 44,["47"] = 32,["48"] = 48,["49"] = 49,["50"] = 48,["51"] = 52,["52"] = 53,["53"] = 52,["54"] = 58,["55"] = 59,["56"] = 60,["57"] = 60,["58"] = 60,["59"] = 60,["60"] = 60,["61"] = 60,["62"] = 60,["63"] = 60,["65"] = 58,["66"] = 79,["67"] = 81,["68"] = 82,["69"] = 83,["70"] = 83,["71"] = 83,["73"] = 84,["74"] = 85,["75"] = 85,["76"] = 85,["78"] = 80,["79"] = 80,["80"] = 80,["81"] = 80,["82"] = 80,["83"] = 80,["84"] = 80,["85"] = 89,["86"] = 90,["87"] = 79,["88"] = 94,["89"] = 95,["90"] = 96,["92"] = 94,["93"] = 111,["94"] = 119,["95"] = 119,["97"] = 121,["98"] = 122,["99"] = 123,["100"] = 125,["101"] = 126,["102"] = 127,["104"] = 131,["105"] = 131,["106"] = 131,["107"] = 131,["108"] = 132,["109"] = 134,["110"] = 135,["112"] = 138,["113"] = 138,["114"] = 138,["115"] = 138,["116"] = 138,["117"] = 138,["119"] = 146,["120"] = 148,["121"] = 149,["123"] = 152,["124"] = 152,["125"] = 153,["126"] = 111,["127"] = 163,["128"] = 169,["129"] = 170,["131"] = 173,["132"] = 174,["133"] = 174,["134"] = 175,["135"] = 176,["138"] = 179,["140"] = 163,["141"] = 183,["142"] = 189,["143"] = 189,["145"] = 191,["146"] = 192,["147"] = 193,["148"] = 195,["149"] = 195,["151"] = 197,["152"] = 197,["153"] = 197,["154"] = 197,["155"] = 198,["156"] = 199,["157"] = 201,["158"] = 202,["159"] = 203,["161"] = 205,["163"] = 208,["164"] = 209,["166"] = 212,["168"] = 215,["169"] = 183,["170"] = 221,["171"] = 228,["172"] = 228,["174"] = 230,["175"] = 231,["176"] = 232,["177"] = 234,["178"] = 234,["180"] = 236,["181"] = 236,["182"] = 236,["183"] = 236,["184"] = 237,["185"] = 238,["186"] = 239,["187"] = 241,["188"] = 242,["190"] = 245,["192"] = 248,["193"] = 221,["194"] = 252,["195"] = 253,["196"] = 254,["197"] = 254,["199"] = 256,["200"] = 257,["201"] = 259,["202"] = 259,["203"] = 260,["204"] = 261,["205"] = 261,["207"] = 264,["208"] = 252,["209"] = 267,["210"] = 268,["211"] = 269,["214"] = 271,["215"] = 272,["216"] = 274,["217"] = 275,["220"] = 280,["221"] = 282,["222"] = 283,["224"] = 286,["225"] = 267,["226"] = 301,["227"] = 307,["228"] = 307,["230"] = 310,["231"] = 310,["233"] = 312,["234"] = 313,["235"] = 314,["236"] = 316,["237"] = 317,["238"] = 318,["240"] = 321,["241"] = 321,["242"] = 321,["243"] = 321,["244"] = 322,["245"] = 324,["246"] = 325,["247"] = 326,["249"] = 329,["250"] = 329,["251"] = 329,["252"] = 329,["253"] = 329,["254"] = 329,["255"] = 329,["257"] = 338,["258"] = 338,["259"] = 338,["260"] = 338,["261"] = 339,["262"] = 341,["263"] = 342,["265"] = 345,["266"] = 345,["267"] = 346,["268"] = 301,["269"] = 356,["270"] = 362,["271"] = 363,["273"] = 366,["274"] = 367,["275"] = 367,["276"] = 368,["277"] = 369,["280"] = 372,["282"] = 356,["283"] = 376,["284"] = 382,["285"] = 382,["287"] = 384,["288"] = 385,["289"] = 386,["290"] = 388,["291"] = 388,["293"] = 390,["294"] = 390,["295"] = 390,["296"] = 390,["297"] = 391,["298"] = 392,["299"] = 394,["300"] = 395,["302"] = 398,["303"] = 400,["304"] = 401,["306"] = 404,["308"] = 407,["309"] = 376,["310"] = 411,["311"] = 412,["312"] = 413,["313"] = 413,["315"] = 415,["316"] = 418,["317"] = 419,["318"] = 420,["319"] = 422,["320"] = 423,["321"] = 424,["322"] = 425,["323"] = 425,["324"] = 426,["325"] = 426,["326"] = 427,["330"] = 433,["331"] = 436,["332"] = 437,["333"] = 437,["334"] = 437,["335"] = 437,["336"] = 437,["337"] = 437,["338"] = 437,["339"] = 437,["341"] = 444,["342"] = 444,["343"] = 445,["344"] = 411,["345"] = 448,["346"] = 449,["347"] = 450,["348"] = 450,["350"] = 452,["351"] = 453,["352"] = 455,["353"] = 456,["355"] = 460,["356"] = 462,["359"] = 469,["362"] = 464,["363"] = 465,["364"] = 466,["372"] = 473,["373"] = 448,["374"] = 477,["375"] = 478,["376"] = 480,["377"] = 481,["379"] = 483,["381"] = 477,["382"] = 490,["383"] = 491,["384"] = 492,["385"] = 496,["386"] = 490,["387"] = 501,["388"] = 502,["389"] = 502,["390"] = 502,["391"] = 502,["392"] = 502,["393"] = 502,["394"] = 502,["395"] = 502,["396"] = 507,["397"] = 507,["398"] = 507,["399"] = 508,["400"] = 509,["401"] = 507,["402"] = 507,["403"] = 512,["404"] = 501,["405"] = 515,["406"] = 516,["409"] = 518,["410"] = 521,["411"] = 521,["412"] = 521,["413"] = 522,["414"] = 522,["415"] = 522,["416"] = 522,["417"] = 522,["418"] = 523,["419"] = 523,["420"] = 523,["421"] = 523,["422"] = 523,["423"] = 525,["424"] = 526,["425"] = 528,["426"] = 529,["427"] = 531,["428"] = 521,["429"] = 521,["430"] = 535,["432"] = 537,["433"] = 537,["434"] = 538,["435"] = 539,["436"] = 537,["439"] = 542,["440"] = 543,["441"] = 544,["442"] = 544,["443"] = 515,["444"] = 547,["445"] = 548,["446"] = 550,["447"] = 551,["448"] = 551,["449"] = 551,["450"] = 551,["451"] = 551,["452"] = 552,["453"] = 553,["454"] = 555,["455"] = 556,["457"] = 559,["458"] = 547,["459"] = 563,["460"] = 564,["463"] = 566,["464"] = 567,["467"] = 569,["468"] = 570,["469"] = 572,["470"] = 573,["471"] = 575,["472"] = 563,["473"] = 579,["474"] = 580,["475"] = 580,["477"] = 582,["478"] = 583,["479"] = 585,["480"] = 586,["482"] = 589,["483"] = 579,["484"] = 593,["485"] = 599,["486"] = 600,["489"] = 604,["490"] = 606,["491"] = 606,["492"] = 606,["493"] = 607,["494"] = 608,["495"] = 609,["496"] = 610,["498"] = 612,["499"] = 606,["500"] = 606,["501"] = 593,["502"] = 624,["503"] = 626,["504"] = 629,["505"] = 624,["506"] = 633,["507"] = 634,["510"] = 636,["511"] = 637,["512"] = 639,["513"] = 640,["514"] = 641,["516"] = 633,["517"] = 646,["518"] = 647,["521"] = 648,["522"] = 646,["523"] = 651,["524"] = 652,["525"] = 656,["526"] = 657,["527"] = 658,["528"] = 659,["529"] = 660,["530"] = 661,["531"] = 662,["533"] = 651,["534"] = 667,["535"] = 668,["536"] = 670,["537"] = 670,["538"] = 671,["540"] = 674,["541"] = 674,["542"] = 675,["544"] = 678,["545"] = 679,["547"] = 682,["548"] = 667,["549"] = 685,["550"] = 689,["551"] = 685,["552"] = 693,["553"] = 694,["554"] = 696,["555"] = 696,["556"] = 696,["557"] = 697,["558"] = 698,["559"] = 699,["562"] = 703,["563"] = 703,["564"] = 703,["565"] = 704,["566"] = 705,["567"] = 706,["570"] = 710,["571"] = 693,["572"] = 713,["573"] = 714,["574"] = 713,["575"] = 721,["576"] = 722,["577"] = 722,["578"] = 722,["579"] = 723,["580"] = 724,["581"] = 725,["582"] = 722,["583"] = 722,["584"] = 728,["585"] = 721,["586"] = 732,["587"] = 733,["588"] = 734,["589"] = 735,["590"] = 736,["591"] = 732,["592"] = 746,["593"] = 748,["594"] = 748,["595"] = 748,["596"] = 749,["597"] = 748,["598"] = 748,["599"] = 748,["600"] = 748,["601"] = 753,["602"] = 753,["603"] = 753,["604"] = 754,["605"] = 753,["606"] = 753,["607"] = 753,["608"] = 753,["609"] = 758,["610"] = 758,["611"] = 758,["612"] = 759,["613"] = 765,["614"] = 758,["615"] = 758,["616"] = 758,["617"] = 758,["618"] = 769,["619"] = 769,["620"] = 769,["621"] = 770,["622"] = 771,["623"] = 771,["624"] = 771,["625"] = 772,["627"] = 769,["628"] = 769,["629"] = 769,["630"] = 769,["631"] = 777,["632"] = 777,["633"] = 777,["634"] = 778,["635"] = 779,["636"] = 780,["637"] = 777,["638"] = 777,["639"] = 777,["640"] = 777,["641"] = 783,["642"] = 746,["643"] = 786,["644"] = 787,["645"] = 788,["646"] = 789,["647"] = 790,["648"] = 791,["649"] = 792,["650"] = 786,["651"] = 795,["652"] = 796,["653"] = 797,["654"] = 801,["655"] = 802,["656"] = 803,["657"] = 804,["658"] = 805,["659"] = 795,["660"] = 810,["661"] = 811,["662"] = 815,["663"] = 816,["664"] = 817,["665"] = 817,["666"] = 817,["667"] = 817,["668"] = 817,["669"] = 817,["670"] = 823,["672"] = 826,["673"] = 810,["674"] = 829,["675"] = 830,["676"] = 829,["677"] = 833,["678"] = 834,["679"] = 835,["680"] = 836,["682"] = 838,["683"] = 833,["684"] = 847,["685"] = 848,["686"] = 848,["688"] = 851,["689"] = 852,["690"] = 853,["692"] = 857,["693"] = 858,["694"] = 858,["695"] = 858,["696"] = 858,["698"] = 861,["699"] = 847,["700"] = 864,["702"] = 865,["703"] = 866,["705"] = 867,["707"] = 868,["709"] = 869,["711"] = 870,["713"] = 871,["715"] = 872,["717"] = 873,["719"] = 874,["721"] = 875,["723"] = 876,["725"] = 877,["727"] = 878,["729"] = 879,["730"] = 880,["732"] = 882,["735"] = 884,["738"] = 864,["739"] = 888,["741"] = 889,["742"] = 890,["744"] = 891,["746"] = 892,["748"] = 893,["750"] = 894,["752"] = 895,["754"] = 896,["756"] = 898,["759"] = 900,["762"] = 888,["763"] = 904,["764"] = 905,["765"] = 904,["766"] = 908,["767"] = 909,["768"] = 910,["769"] = 908,["770"] = 913,["771"] = 914,["772"] = 913,["773"] = 917,["774"] = 918,["775"] = 917,["776"] = 22,["777"] = 940,["778"] = 940});
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
function MPropertySystem.prototype.AddStaticProperty(self, scope, key, propertyId, sourceId, value, metadata)
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
function MPropertySystem.prototype.RemoveStaticProperty(self, scope, key, sourceId, propertyId)
    if propertyId then
        return self:RemoveSingleStaticProperty(scope, key, sourceId, propertyId)
    else
        local removed = false
        for ____, ____value in __TS__Iterator(PropertyData.configs) do
            local pid = ____value[1]
            if self:RemoveSingleStaticProperty(scope, key, sourceId, pid) then
                removed = true
            end
        end
        return removed
    end
end
function MPropertySystem.prototype.RemoveSingleStaticProperty(self, scope, key, sourceId, propertyId)
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
function MPropertySystem.prototype.UpdateStaticPropertyValue(self, scope, key, propertyId, sourceId, newValue)
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
function MPropertySystem.prototype.RegisterDynamicProperty(self, scope, key, propertyId, sourceId, callback, priority, metadata)
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
function MPropertySystem.prototype.UnregisterDynamicProperty(self, scope, key, sourceId, propertyId)
    if propertyId then
        return self:UnregisterSingleDynamicProperty(scope, key, sourceId, propertyId)
    else
        local removed = false
        for ____, ____value in __TS__Iterator(PropertyData.configs) do
            local pid = ____value[1]
            if self:UnregisterSingleDynamicProperty(scope, key, sourceId, pid) then
                removed = true
            end
        end
        return removed
    end
end
function MPropertySystem.prototype.UnregisterSingleDynamicProperty(self, scope, key, sourceId, propertyId)
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
                __TS__StringSplit(a, "_"),
                1,
                3
            )
            local ____, ____, propIdB = unpack(
                __TS__StringSplit(b, "_"),
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
    local updates = {}
    for ____, dirtyKey in ipairs(dirtyKeys) do
        local scopeStr, keyStr, propertyId = unpack(
            __TS__StringSplit(dirtyKey, "_"),
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
    local update = {}
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
function MPropertySystem.prototype.CleanupSourceProperties(self, scope, key, sourceId)
    self:RemoveStaticProperty(scope, key, sourceId)
    self:UnregisterDynamicProperty(scope, key, sourceId)
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
    return (((tostring(scope) .. "_") .. tostring(key)) .. "_") .. propertyId
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
