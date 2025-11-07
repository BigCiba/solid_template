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
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["22"] = 3,["23"] = 3,["24"] = 19,["25"] = 22,["26"] = 22,["27"] = 23,["29"] = 23,["30"] = 25,["31"] = 26,["32"] = 27,["33"] = 30,["34"] = 22,["35"] = 32,["36"] = 33,["37"] = 34,["38"] = 36,["39"] = 37,["40"] = 38,["41"] = 39,["43"] = 42,["45"] = 44,["47"] = 32,["48"] = 48,["49"] = 49,["50"] = 48,["51"] = 52,["52"] = 53,["53"] = 52,["54"] = 58,["55"] = 59,["56"] = 60,["57"] = 60,["58"] = 60,["59"] = 60,["60"] = 60,["61"] = 60,["62"] = 60,["63"] = 60,["65"] = 58,["66"] = 79,["67"] = 81,["68"] = 82,["69"] = 83,["70"] = 83,["71"] = 83,["73"] = 84,["74"] = 85,["75"] = 85,["76"] = 85,["78"] = 80,["79"] = 80,["80"] = 80,["81"] = 80,["82"] = 80,["83"] = 80,["84"] = 80,["85"] = 89,["86"] = 90,["87"] = 79,["88"] = 94,["89"] = 95,["90"] = 96,["92"] = 94,["93"] = 110,["94"] = 117,["95"] = 117,["97"] = 119,["98"] = 120,["99"] = 121,["100"] = 123,["101"] = 124,["102"] = 125,["104"] = 129,["105"] = 129,["106"] = 129,["107"] = 129,["108"] = 130,["109"] = 132,["110"] = 133,["112"] = 136,["113"] = 136,["114"] = 136,["115"] = 136,["116"] = 136,["117"] = 136,["119"] = 144,["120"] = 146,["121"] = 147,["123"] = 150,["124"] = 150,["125"] = 151,["126"] = 110,["127"] = 160,["128"] = 165,["129"] = 166,["131"] = 169,["132"] = 170,["133"] = 170,["134"] = 171,["135"] = 172,["138"] = 175,["140"] = 160,["141"] = 179,["142"] = 184,["143"] = 184,["145"] = 186,["146"] = 187,["147"] = 188,["148"] = 190,["149"] = 190,["151"] = 192,["152"] = 192,["153"] = 192,["154"] = 192,["155"] = 193,["156"] = 194,["157"] = 196,["158"] = 197,["159"] = 198,["161"] = 200,["163"] = 203,["164"] = 204,["166"] = 207,["168"] = 210,["169"] = 179,["170"] = 220,["171"] = 226,["172"] = 226,["174"] = 228,["175"] = 229,["176"] = 230,["177"] = 232,["178"] = 232,["180"] = 234,["181"] = 234,["182"] = 234,["183"] = 234,["184"] = 235,["185"] = 236,["186"] = 237,["187"] = 239,["188"] = 240,["190"] = 243,["192"] = 246,["193"] = 220,["194"] = 250,["195"] = 251,["196"] = 252,["197"] = 252,["199"] = 254,["200"] = 255,["201"] = 257,["202"] = 257,["203"] = 258,["204"] = 259,["205"] = 259,["207"] = 262,["208"] = 250,["209"] = 265,["210"] = 266,["211"] = 267,["214"] = 269,["215"] = 270,["216"] = 272,["217"] = 273,["220"] = 278,["221"] = 280,["222"] = 281,["224"] = 284,["225"] = 265,["226"] = 298,["227"] = 303,["228"] = 303,["230"] = 306,["231"] = 306,["233"] = 308,["234"] = 309,["235"] = 310,["236"] = 312,["237"] = 313,["238"] = 314,["240"] = 317,["241"] = 317,["242"] = 317,["243"] = 317,["244"] = 318,["245"] = 320,["246"] = 321,["247"] = 322,["249"] = 325,["250"] = 325,["251"] = 325,["252"] = 325,["253"] = 325,["254"] = 325,["255"] = 325,["257"] = 334,["258"] = 334,["259"] = 334,["260"] = 334,["261"] = 335,["262"] = 337,["263"] = 338,["265"] = 341,["266"] = 341,["267"] = 342,["268"] = 298,["269"] = 351,["270"] = 356,["271"] = 357,["273"] = 360,["274"] = 361,["275"] = 361,["276"] = 362,["277"] = 363,["280"] = 366,["282"] = 351,["283"] = 370,["284"] = 375,["285"] = 375,["287"] = 377,["288"] = 378,["289"] = 379,["290"] = 381,["291"] = 381,["293"] = 383,["294"] = 383,["295"] = 383,["296"] = 383,["297"] = 384,["298"] = 385,["299"] = 387,["300"] = 388,["302"] = 391,["303"] = 393,["304"] = 394,["306"] = 397,["308"] = 400,["309"] = 370,["310"] = 404,["311"] = 405,["312"] = 406,["313"] = 406,["315"] = 408,["316"] = 411,["317"] = 412,["318"] = 413,["319"] = 415,["320"] = 416,["321"] = 417,["322"] = 418,["323"] = 418,["324"] = 419,["325"] = 419,["326"] = 420,["330"] = 426,["331"] = 429,["332"] = 430,["333"] = 430,["334"] = 430,["335"] = 430,["336"] = 430,["337"] = 430,["338"] = 430,["339"] = 430,["341"] = 437,["342"] = 437,["343"] = 438,["344"] = 404,["345"] = 441,["346"] = 442,["347"] = 443,["348"] = 443,["350"] = 445,["351"] = 446,["352"] = 448,["353"] = 449,["355"] = 453,["356"] = 455,["359"] = 462,["362"] = 457,["363"] = 458,["364"] = 459,["372"] = 466,["373"] = 441,["374"] = 470,["375"] = 471,["376"] = 473,["377"] = 474,["379"] = 476,["381"] = 470,["382"] = 483,["383"] = 484,["384"] = 485,["385"] = 489,["386"] = 483,["387"] = 494,["388"] = 495,["389"] = 495,["390"] = 495,["391"] = 495,["392"] = 495,["393"] = 495,["394"] = 495,["395"] = 495,["396"] = 500,["397"] = 500,["398"] = 500,["399"] = 501,["400"] = 502,["401"] = 500,["402"] = 500,["403"] = 505,["404"] = 494,["405"] = 508,["406"] = 509,["409"] = 511,["410"] = 514,["411"] = 516,["412"] = 517,["413"] = 517,["414"] = 517,["415"] = 517,["416"] = 517,["417"] = 518,["418"] = 520,["419"] = 521,["421"] = 523,["422"] = 523,["424"] = 527,["425"] = 527,["426"] = 527,["427"] = 528,["428"] = 528,["429"] = 528,["430"] = 529,["431"] = 529,["432"] = 529,["433"] = 529,["434"] = 529,["435"] = 530,["436"] = 530,["437"] = 530,["438"] = 530,["439"] = 530,["440"] = 532,["441"] = 533,["442"] = 535,["443"] = 536,["444"] = 538,["445"] = 528,["446"] = 528,["447"] = 542,["449"] = 545,["450"] = 546,["451"] = 547,["452"] = 547,["453"] = 508,["454"] = 554,["455"] = 555,["456"] = 556,["457"] = 558,["458"] = 559,["459"] = 559,["460"] = 559,["461"] = 559,["462"] = 559,["463"] = 560,["464"] = 561,["465"] = 563,["466"] = 564,["467"] = 567,["469"] = 571,["470"] = 572,["472"] = 576,["473"] = 554,["474"] = 580,["475"] = 581,["478"] = 583,["479"] = 584,["482"] = 586,["483"] = 587,["484"] = 590,["485"] = 591,["486"] = 591,["487"] = 591,["489"] = 591,["491"] = 591,["492"] = 592,["493"] = 594,["494"] = 597,["495"] = 598,["496"] = 580,["497"] = 602,["498"] = 603,["501"] = 605,["502"] = 606,["503"] = 607,["504"] = 610,["505"] = 610,["506"] = 611,["507"] = 612,["508"] = 613,["509"] = 614,["510"] = 617,["511"] = 618,["514"] = 622,["515"] = 622,["516"] = 623,["517"] = 624,["518"] = 625,["519"] = 626,["520"] = 629,["521"] = 630,["524"] = 634,["525"] = 635,["527"] = 602,["528"] = 640,["529"] = 641,["530"] = 642,["531"] = 644,["532"] = 645,["534"] = 648,["535"] = 640,["536"] = 652,["537"] = 658,["538"] = 659,["541"] = 663,["542"] = 665,["543"] = 665,["544"] = 665,["545"] = 666,["546"] = 667,["547"] = 668,["548"] = 669,["550"] = 671,["551"] = 665,["552"] = 665,["553"] = 652,["554"] = 682,["555"] = 684,["556"] = 687,["557"] = 682,["558"] = 691,["559"] = 692,["562"] = 694,["563"] = 695,["564"] = 697,["565"] = 698,["566"] = 699,["568"] = 691,["569"] = 704,["570"] = 705,["573"] = 706,["574"] = 704,["575"] = 709,["576"] = 710,["577"] = 714,["578"] = 715,["579"] = 716,["580"] = 717,["581"] = 718,["582"] = 719,["583"] = 720,["585"] = 709,["586"] = 725,["587"] = 726,["588"] = 728,["589"] = 728,["590"] = 729,["592"] = 732,["593"] = 732,["594"] = 733,["596"] = 736,["597"] = 737,["599"] = 740,["600"] = 725,["601"] = 743,["602"] = 747,["603"] = 743,["604"] = 751,["605"] = 752,["606"] = 754,["607"] = 754,["608"] = 754,["609"] = 755,["610"] = 756,["611"] = 757,["614"] = 761,["615"] = 761,["616"] = 761,["617"] = 762,["618"] = 763,["619"] = 764,["622"] = 768,["623"] = 751,["624"] = 771,["625"] = 772,["626"] = 771,["627"] = 779,["628"] = 780,["629"] = 780,["630"] = 780,["631"] = 781,["632"] = 782,["633"] = 783,["634"] = 780,["635"] = 780,["636"] = 786,["637"] = 779,["638"] = 790,["639"] = 791,["640"] = 792,["641"] = 793,["642"] = 794,["643"] = 790,["644"] = 805,["645"] = 806,["646"] = 807,["647"] = 810,["648"] = 810,["649"] = 811,["651"] = 815,["652"] = 815,["653"] = 816,["655"] = 819,["656"] = 805,["657"] = 823,["658"] = 824,["659"] = 825,["660"] = 826,["661"] = 829,["662"] = 829,["663"] = 830,["664"] = 831,["665"] = 832,["666"] = 833,["667"] = 835,["668"] = 836,["671"] = 841,["672"] = 841,["673"] = 842,["674"] = 843,["675"] = 844,["676"] = 845,["677"] = 847,["678"] = 848,["681"] = 852,["682"] = 823,["683"] = 857,["684"] = 859,["685"] = 859,["686"] = 859,["687"] = 860,["688"] = 859,["689"] = 859,["690"] = 859,["691"] = 859,["692"] = 864,["693"] = 864,["694"] = 864,["695"] = 865,["696"] = 864,["697"] = 864,["698"] = 864,["699"] = 864,["700"] = 869,["701"] = 869,["702"] = 869,["703"] = 870,["704"] = 876,["705"] = 869,["706"] = 869,["707"] = 869,["708"] = 869,["709"] = 880,["710"] = 880,["711"] = 880,["712"] = 881,["713"] = 882,["714"] = 882,["715"] = 882,["716"] = 883,["718"] = 880,["719"] = 880,["720"] = 880,["721"] = 880,["722"] = 888,["723"] = 888,["724"] = 888,["725"] = 889,["726"] = 890,["727"] = 891,["728"] = 888,["729"] = 888,["730"] = 888,["731"] = 888,["732"] = 895,["733"] = 895,["734"] = 895,["735"] = 896,["736"] = 897,["737"] = 898,["738"] = 899,["739"] = 901,["740"] = 902,["741"] = 903,["742"] = 904,["745"] = 909,["746"] = 909,["747"] = 909,["748"] = 909,["749"] = 910,["751"] = 911,["752"] = 911,["753"] = 912,["754"] = 911,["757"] = 895,["758"] = 895,["759"] = 895,["760"] = 895,["761"] = 916,["762"] = 857,["763"] = 919,["764"] = 920,["765"] = 921,["766"] = 922,["767"] = 923,["768"] = 924,["769"] = 925,["770"] = 919,["771"] = 928,["772"] = 929,["773"] = 930,["774"] = 934,["775"] = 935,["776"] = 936,["777"] = 937,["778"] = 938,["779"] = 928,["780"] = 943,["781"] = 944,["782"] = 948,["783"] = 949,["784"] = 950,["785"] = 950,["786"] = 950,["787"] = 950,["788"] = 950,["789"] = 950,["790"] = 956,["792"] = 959,["793"] = 943,["794"] = 962,["795"] = 963,["796"] = 962,["797"] = 966,["798"] = 967,["799"] = 968,["800"] = 969,["802"] = 971,["803"] = 966,["804"] = 980,["805"] = 981,["806"] = 981,["808"] = 984,["809"] = 985,["810"] = 986,["812"] = 990,["813"] = 991,["814"] = 991,["815"] = 991,["816"] = 991,["818"] = 994,["819"] = 980,["820"] = 997,["822"] = 998,["823"] = 999,["825"] = 1000,["827"] = 1001,["829"] = 1002,["831"] = 1003,["833"] = 1004,["835"] = 1005,["837"] = 1006,["839"] = 1007,["841"] = 1008,["843"] = 1009,["845"] = 1010,["847"] = 1011,["849"] = 1012,["850"] = 1013,["852"] = 1015,["855"] = 1017,["858"] = 997,["859"] = 1021,["861"] = 1022,["862"] = 1023,["864"] = 1024,["866"] = 1025,["868"] = 1026,["870"] = 1027,["872"] = 1028,["874"] = 1029,["876"] = 1031,["879"] = 1033,["882"] = 1021,["883"] = 1037,["884"] = 1039,["885"] = 1037,["886"] = 1042,["887"] = 1043,["888"] = 1044,["889"] = 1042,["890"] = 1047,["891"] = 1048,["892"] = 1047,["893"] = 1051,["894"] = 1052,["895"] = 1051,["896"] = 1058,["897"] = 1059,["900"] = 1061,["901"] = 1062,["904"] = 1064,["905"] = 1065,["906"] = 1066,["907"] = 1058,["908"] = 22,["909"] = 1088,["910"] = 1088});
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
    self.SYNC_INTERVAL = 0.2
    self.MAX_NETTABLE_SIZE = 14000
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
    local groupedByEntity = __TS__New(Map)
    for ____, dirtyKey in ipairs(dirtyArray) do
        local scopeStr, keyStr = unpack(
            __TS__StringSplit(dirtyKey, "|"),
            1,
            2
        )
        local entityKey = (scopeStr .. "_") .. keyStr
        if not groupedByEntity:has(entityKey) then
            groupedByEntity:set(entityKey, {})
        end
        local ____temp_19 = groupedByEntity:get(entityKey)
        ____temp_19[#____temp_19 + 1] = dirtyKey
    end
    for ____, ____value in __TS__Iterator(groupedByEntity) do
        local entityKey = ____value[1]
        local keys = ____value[2]
        __TS__ArraySort(
            keys,
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
        self:SyncEntityBatch(entityKey, keys)
    end
    PropertyData.dirtyKeys:clear()
    PropertyData.lastSyncTime = self:GetCurrentTime()
    local ____PropertyData_stats_24, ____syncCount_25 = PropertyData.stats, "syncCount"
    ____PropertyData_stats_24[____syncCount_25] = ____PropertyData_stats_24[____syncCount_25] + 1
end
function MPropertySystem.prototype.SyncEntityBatch(self, entityKey, dirtyKeys)
    local updates = {}
    local estimatedSize = 50
    for ____, dirtyKey in ipairs(dirtyKeys) do
        local scopeStr, keyStr, propertyId = unpack(
            __TS__StringSplit(dirtyKey, "|"),
            1,
            3
        )
        local scope = __TS__ParseInt(scopeStr)
        local key = __TS__ParseInt(keyStr)
        local value = self:GetPropertyValue(scope, key, propertyId)
        updates[propertyId] = value
        estimatedSize = estimatedSize + (#propertyId + 10)
    end
    if estimatedSize > self.MAX_NETTABLE_SIZE then
        self:print(((("Warning: NetTable update for " .. entityKey) .. " may exceed size limit (") .. tostring(estimatedSize)) .. " bytes)")
    end
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, updates)
end
function MPropertySystem.prototype.ForceSyncProperty(self, scope, key, propertyId)
    if not IsServer() then
        return
    end
    local config = self:GetConfig(propertyId)
    if not config or not config.syncToClient then
        return
    end
    local entityKey = (tostring(scope) .. "_") .. tostring(key)
    local value = self:GetPropertyValue(scope, key, propertyId)
    local existingData = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    local ____existingData_26
    if existingData then
        ____existingData_26 = __TS__ObjectAssign({}, existingData)
    else
        ____existingData_26 = {}
    end
    local update = ____existingData_26
    update[propertyId] = value
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, update)
    local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
    PropertyData.dirtyKeys:delete(dirtyKey)
end
function MPropertySystem.prototype.ForceSyncEntity(self, scope, key)
    if not IsServer() then
        return
    end
    local storage = self:GetStorage(scope, key)
    local entityKey = (tostring(scope) .. "_") .. tostring(key)
    local updates = {}
    for ____, ____value in __TS__Iterator(storage.static) do
        local propertyId = ____value[1]
        local config = self:GetConfig(propertyId)
        if config and config.syncToClient then
            local value = self:GetPropertyValue(scope, key, propertyId)
            updates[propertyId] = value
            local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
            PropertyData.dirtyKeys:delete(dirtyKey)
        end
    end
    for ____, ____value in __TS__Iterator(storage.dynamic) do
        local propertyId = ____value[1]
        local config = self:GetConfig(propertyId)
        if config and config.syncToClient then
            local value = self:GetPropertyValue(scope, key, propertyId)
            updates[propertyId] = value
            local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
            PropertyData.dirtyKeys:delete(dirtyKey)
        end
    end
    if #__TS__ObjectKeys(updates) > 0 then
        CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, updates)
    end
end
function MPropertySystem.prototype.GetPropertyValueFromNetTable(self, scope, key, propertyId)
    local entityKey = (tostring(scope) .. "_") .. tostring(key)
    local data = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    if data and data[propertyId] ~= nil then
        return data[propertyId]
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
function MPropertySystem.prototype.EstimateEntityNetTableSize(self, scope, key)
    local storage = self:GetStorage(scope, key)
    local size = 50
    for ____, ____value in __TS__Iterator(storage.static) do
        local propertyId = ____value[1]
        size = size + (#propertyId + 10)
    end
    for ____, ____value in __TS__Iterator(storage.dynamic) do
        local propertyId = ____value[1]
        size = size + (#propertyId + 10)
    end
    return size
end
function MPropertySystem.prototype.GetNetTableSizeStats(self)
    local entities = __TS__New(Map)
    local warnings = {}
    local total = 0
    for ____, ____value in __TS__Iterator(PropertyData.playerStorage) do
        local playerID = ____value[1]
        local size = self:EstimateEntityNetTableSize(PropertyScope.PLAYER, playerID)
        local key = "PLAYER_" .. tostring(playerID)
        entities:set(key, size)
        total = total + size
        if size > self.MAX_NETTABLE_SIZE then
            warnings[#warnings + 1] = ((key .. " exceeds size limit: ") .. tostring(size)) .. " bytes"
        end
    end
    for ____, ____value in __TS__Iterator(PropertyData.unitStorage) do
        local entIndex = ____value[1]
        local size = self:EstimateEntityNetTableSize(PropertyScope.UNIT, entIndex)
        local key = "UNIT_" .. tostring(entIndex)
        entities:set(key, size)
        total = total + size
        if size > self.MAX_NETTABLE_SIZE then
            warnings[#warnings + 1] = ((key .. " exceeds size limit: ") .. tostring(size)) .. " bytes"
        end
    end
    return {total = total, entities = entities, warnings = warnings}
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
    Convars:RegisterCommand(
        "property_nettable_size",
        function()
            local stats = self:GetNetTableSizeStats()
            self:print("=== NetTable Size Stats ===")
            self:print(("Total: " .. tostring(stats.total)) .. " bytes")
            self:print("Entities: " .. tostring(stats.entities.size))
            if #stats.warnings > 0 then
                self:print("⚠️ WARNINGS:")
                for ____, warning in ipairs(stats.warnings) do
                    self:print("  " .. warning)
                end
            end
            local sorted = __TS__ArraySort(
                __TS__ArrayFrom(stats.entities:entries()),
                function(____, a, b) return b[2] - a[2] end
            )
            self:print("\nTop 10 largest entities:")
            do
                local i = 0
                while i < math.min(10, #sorted) do
                    self:print(((("  " .. sorted[i + 1][1]) .. ": ") .. tostring(sorted[i + 1][2])) .. " bytes")
                    i = i + 1
                end
            end
        end,
        "Show NetTable size statistics",
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
        local ____switch185 = strategy
        local ____cond185 = ____switch185 == AggregationStrategy.SUM
        if ____cond185 then
            return current + value
        end
        ____cond185 = ____cond185 or ____switch185 == AggregationStrategy.MULTIPLY
        if ____cond185 then
            return current * value
        end
        ____cond185 = ____cond185 or ____switch185 == AggregationStrategy.MAX
        if ____cond185 then
            return math.max(current, value)
        end
        ____cond185 = ____cond185 or ____switch185 == AggregationStrategy.MIN
        if ____cond185 then
            return math.min(current, value)
        end
        ____cond185 = ____cond185 or ____switch185 == AggregationStrategy.FIRST
        if ____cond185 then
            return current ~= 0 and current or value
        end
        ____cond185 = ____cond185 or ____switch185 == AggregationStrategy.LAST
        if ____cond185 then
            return value
        end
        ____cond185 = ____cond185 or ____switch185 == AggregationStrategy.CUSTOM
        if ____cond185 then
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
        local ____switch188 = strategy
        local ____cond188 = ____switch188 == AggregationStrategy.MULTIPLY
        if ____cond188 then
            return 1
        end
        ____cond188 = ____cond188 or ____switch188 == AggregationStrategy.MAX
        if ____cond188 then
            return -math.huge
        end
        ____cond188 = ____cond188 or ____switch188 == AggregationStrategy.MIN
        if ____cond188 then
            return math.huge
        end
        ____cond188 = ____cond188 or (____switch188 == AggregationStrategy.FIRST or ____switch188 == AggregationStrategy.LAST)
        if ____cond188 then
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
function MPropertySystem.prototype.ForceSyncAllDirty(self)
    if not IsServer() then
        return
    end
    local dirtyCount = PropertyData.dirtyKeys.size
    if dirtyCount == 0 then
        return
    end
    self:print(("[ForceSyncAllDirty] Syncing " .. tostring(dirtyCount)) .. " dirty properties...")
    self:SyncDirtyProperties()
    self:print("[ForceSyncAllDirty] Sync completed, remaining: " .. tostring(PropertyData.dirtyKeys.size))
end
MPropertySystem = __TS__DecorateLegacy({reloadable}, MPropertySystem)
if PropertySystem == nil then
    PropertySystem = __TS__New(MPropertySystem)
end
return ____exports
