local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Set = ____lualib.Set
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["22"] = 24,["23"] = 24,["24"] = 24,["25"] = 24,["26"] = 24,["28"] = 32,["29"] = 32,["30"] = 32,["31"] = 32,["32"] = 32,["33"] = 32,["34"] = 32,["35"] = 32,["36"] = 32,["38"] = 44,["39"] = 44,["40"] = 44,["41"] = 44,["42"] = 44,["43"] = 44,["44"] = 44,["45"] = 44,["46"] = 44,["47"] = 44,["48"] = 44,["49"] = 44,["50"] = 44,["51"] = 44,["52"] = 44,["53"] = 135,["54"] = 135,["55"] = 135,["57"] = 135,["58"] = 137,["59"] = 138,["60"] = 139,["61"] = 142,["62"] = 135,["63"] = 144,["64"] = 145,["65"] = 146,["66"] = 148,["67"] = 149,["68"] = 150,["69"] = 151,["71"] = 154,["73"] = 156,["75"] = 144,["76"] = 160,["77"] = 161,["78"] = 160,["79"] = 164,["80"] = 165,["81"] = 164,["82"] = 170,["83"] = 171,["84"] = 172,["85"] = 172,["86"] = 172,["87"] = 172,["88"] = 172,["89"] = 172,["90"] = 172,["91"] = 172,["93"] = 170,["94"] = 191,["95"] = 193,["96"] = 194,["97"] = 195,["98"] = 195,["99"] = 195,["101"] = 196,["102"] = 197,["103"] = 197,["104"] = 197,["106"] = 192,["107"] = 192,["108"] = 192,["109"] = 192,["110"] = 192,["111"] = 192,["112"] = 192,["113"] = 201,["114"] = 202,["115"] = 191,["116"] = 206,["117"] = 207,["118"] = 208,["120"] = 206,["121"] = 215,["122"] = 221,["123"] = 221,["125"] = 222,["126"] = 222,["128"] = 224,["129"] = 225,["130"] = 226,["131"] = 226,["133"] = 228,["134"] = 229,["135"] = 231,["136"] = 232,["137"] = 233,["139"] = 236,["140"] = 236,["141"] = 236,["142"] = 236,["143"] = 236,["144"] = 242,["145"] = 244,["146"] = 245,["148"] = 248,["149"] = 248,["150"] = 249,["151"] = 215,["152"] = 253,["153"] = 254,["156"] = 256,["157"] = 257,["159"] = 259,["160"] = 259,["161"] = 260,["164"] = 253,["165"] = 265,["166"] = 266,["169"] = 268,["170"] = 269,["171"] = 270,["174"] = 272,["175"] = 273,["176"] = 275,["179"] = 277,["180"] = 277,["181"] = 277,["182"] = 277,["183"] = 278,["184"] = 279,["185"] = 281,["186"] = 282,["187"] = 283,["189"] = 285,["191"] = 288,["192"] = 289,["195"] = 265,["196"] = 295,["197"] = 301,["198"] = 301,["200"] = 302,["201"] = 302,["203"] = 304,["204"] = 305,["205"] = 306,["206"] = 306,["208"] = 308,["209"] = 309,["210"] = 311,["211"] = 311,["213"] = 313,["214"] = 313,["215"] = 313,["216"] = 313,["217"] = 314,["218"] = 315,["219"] = 316,["220"] = 318,["221"] = 319,["223"] = 322,["225"] = 325,["226"] = 295,["227"] = 329,["228"] = 330,["229"] = 331,["230"] = 331,["232"] = 333,["233"] = 334,["234"] = 336,["235"] = 336,["236"] = 337,["237"] = 338,["238"] = 338,["240"] = 341,["241"] = 329,["242"] = 344,["243"] = 345,["244"] = 346,["247"] = 348,["248"] = 349,["249"] = 351,["250"] = 352,["254"] = 357,["255"] = 357,["256"] = 358,["257"] = 359,["259"] = 357,["262"] = 363,["263"] = 364,["264"] = 365,["267"] = 370,["268"] = 372,["269"] = 373,["271"] = 376,["272"] = 344,["273"] = 382,["274"] = 386,["275"] = 386,["277"] = 389,["278"] = 389,["280"] = 390,["281"] = 390,["283"] = 392,["284"] = 393,["285"] = 394,["286"] = 394,["288"] = 396,["289"] = 397,["290"] = 399,["291"] = 400,["292"] = 401,["294"] = 404,["295"] = 404,["296"] = 404,["297"] = 404,["298"] = 405,["299"] = 406,["300"] = 407,["302"] = 409,["303"] = 409,["304"] = 409,["305"] = 409,["306"] = 409,["307"] = 409,["309"] = 417,["310"] = 417,["311"] = 417,["312"] = 417,["313"] = 418,["314"] = 420,["315"] = 421,["317"] = 424,["318"] = 424,["319"] = 425,["320"] = 382,["321"] = 429,["322"] = 430,["325"] = 432,["326"] = 433,["328"] = 435,["329"] = 435,["330"] = 436,["333"] = 429,["334"] = 441,["335"] = 442,["338"] = 444,["339"] = 445,["340"] = 446,["343"] = 448,["344"] = 449,["345"] = 451,["348"] = 453,["349"] = 453,["350"] = 453,["351"] = 453,["352"] = 454,["353"] = 455,["354"] = 457,["355"] = 458,["357"] = 461,["358"] = 463,["359"] = 464,["362"] = 441,["363"] = 470,["364"] = 471,["365"] = 472,["366"] = 472,["368"] = 474,["369"] = 477,["370"] = 478,["371"] = 479,["372"] = 481,["373"] = 482,["374"] = 483,["375"] = 484,["376"] = 484,["377"] = 485,["378"] = 485,["379"] = 486,["383"] = 492,["384"] = 495,["385"] = 496,["386"] = 496,["387"] = 496,["388"] = 496,["389"] = 496,["390"] = 496,["391"] = 496,["392"] = 496,["394"] = 503,["395"] = 503,["396"] = 504,["397"] = 470,["398"] = 507,["399"] = 508,["400"] = 509,["401"] = 509,["403"] = 511,["404"] = 512,["405"] = 514,["406"] = 515,["409"] = 519,["410"] = 519,["411"] = 520,["412"] = 521,["414"] = 519,["417"] = 525,["418"] = 526,["419"] = 527,["421"] = 531,["422"] = 533,["425"] = 540,["428"] = 535,["429"] = 536,["430"] = 537,["438"] = 544,["439"] = 507,["440"] = 548,["441"] = 549,["442"] = 551,["443"] = 552,["445"] = 554,["447"] = 548,["448"] = 561,["449"] = 562,["450"] = 563,["451"] = 567,["452"] = 561,["453"] = 572,["454"] = 573,["455"] = 573,["456"] = 573,["457"] = 573,["458"] = 573,["459"] = 573,["460"] = 573,["461"] = 573,["462"] = 578,["463"] = 578,["464"] = 578,["465"] = 579,["466"] = 580,["467"] = 578,["468"] = 578,["469"] = 583,["470"] = 572,["471"] = 586,["472"] = 587,["475"] = 589,["476"] = 592,["477"] = 592,["478"] = 592,["479"] = 593,["480"] = 593,["481"] = 593,["482"] = 593,["483"] = 593,["484"] = 594,["485"] = 594,["486"] = 594,["487"] = 594,["488"] = 594,["489"] = 596,["490"] = 597,["491"] = 599,["492"] = 600,["493"] = 602,["494"] = 592,["495"] = 592,["496"] = 606,["498"] = 608,["499"] = 608,["500"] = 609,["501"] = 610,["502"] = 608,["505"] = 613,["506"] = 614,["507"] = 615,["508"] = 615,["509"] = 586,["510"] = 618,["511"] = 619,["512"] = 621,["513"] = 622,["514"] = 622,["515"] = 622,["516"] = 622,["517"] = 622,["518"] = 623,["519"] = 624,["520"] = 626,["521"] = 627,["523"] = 630,["524"] = 618,["525"] = 634,["526"] = 635,["529"] = 637,["530"] = 638,["533"] = 640,["534"] = 641,["535"] = 643,["536"] = 644,["537"] = 646,["538"] = 634,["539"] = 650,["540"] = 651,["541"] = 651,["543"] = 653,["544"] = 654,["545"] = 656,["546"] = 657,["548"] = 660,["549"] = 650,["550"] = 664,["551"] = 670,["552"] = 671,["555"] = 675,["556"] = 677,["557"] = 677,["558"] = 677,["559"] = 678,["560"] = 679,["561"] = 680,["562"] = 681,["564"] = 683,["565"] = 677,["566"] = 677,["567"] = 664,["568"] = 690,["569"] = 691,["572"] = 693,["573"] = 694,["574"] = 690,["575"] = 698,["576"] = 699,["579"] = 701,["580"] = 702,["581"] = 704,["582"] = 705,["583"] = 706,["585"] = 698,["586"] = 711,["587"] = 712,["590"] = 713,["591"] = 711,["592"] = 716,["593"] = 717,["594"] = 721,["595"] = 722,["596"] = 723,["597"] = 724,["598"] = 725,["599"] = 726,["600"] = 727,["602"] = 716,["603"] = 732,["604"] = 733,["605"] = 735,["606"] = 735,["607"] = 736,["609"] = 739,["610"] = 739,["611"] = 740,["613"] = 743,["614"] = 744,["616"] = 747,["617"] = 732,["618"] = 750,["619"] = 751,["620"] = 754,["621"] = 754,["622"] = 754,["624"] = 755,["625"] = 755,["626"] = 756,["627"] = 757,["628"] = 758,["630"] = 755,["633"] = 762,["634"] = 763,["635"] = 764,["638"] = 769,["639"] = 769,["640"] = 769,["642"] = 770,["643"] = 770,["644"] = 771,["645"] = 772,["646"] = 773,["648"] = 770,["651"] = 777,["652"] = 778,["655"] = 782,["656"] = 750,["657"] = 786,["658"] = 787,["659"] = 789,["660"] = 789,["661"] = 789,["662"] = 790,["663"] = 791,["664"] = 792,["667"] = 796,["668"] = 796,["669"] = 796,["670"] = 797,["671"] = 798,["672"] = 799,["675"] = 803,["676"] = 786,["677"] = 806,["678"] = 807,["679"] = 806,["680"] = 814,["681"] = 815,["682"] = 815,["683"] = 815,["684"] = 816,["685"] = 817,["686"] = 818,["687"] = 815,["688"] = 815,["689"] = 821,["690"] = 814,["691"] = 825,["692"] = 826,["693"] = 827,["694"] = 828,["695"] = 829,["696"] = 825,["697"] = 839,["698"] = 841,["699"] = 841,["700"] = 841,["701"] = 842,["702"] = 841,["703"] = 841,["704"] = 841,["705"] = 841,["706"] = 846,["707"] = 846,["708"] = 846,["709"] = 847,["710"] = 846,["711"] = 846,["712"] = 846,["713"] = 846,["714"] = 851,["715"] = 851,["716"] = 851,["717"] = 852,["718"] = 858,["719"] = 851,["720"] = 851,["721"] = 851,["722"] = 851,["723"] = 862,["724"] = 862,["725"] = 862,["726"] = 863,["727"] = 864,["728"] = 864,["729"] = 864,["730"] = 865,["732"] = 862,["733"] = 862,["734"] = 862,["735"] = 862,["736"] = 870,["737"] = 870,["738"] = 870,["739"] = 871,["740"] = 872,["741"] = 873,["742"] = 870,["743"] = 870,["744"] = 870,["745"] = 870,["746"] = 876,["747"] = 839,["748"] = 879,["749"] = 880,["750"] = 881,["751"] = 882,["752"] = 883,["753"] = 884,["754"] = 885,["755"] = 879,["756"] = 888,["757"] = 889,["758"] = 890,["759"] = 894,["760"] = 895,["761"] = 896,["762"] = 897,["763"] = 898,["764"] = 888,["765"] = 903,["766"] = 904,["767"] = 908,["768"] = 909,["769"] = 910,["770"] = 910,["771"] = 910,["772"] = 910,["773"] = 910,["774"] = 910,["775"] = 916,["777"] = 919,["778"] = 903,["779"] = 922,["780"] = 923,["781"] = 922,["782"] = 926,["783"] = 927,["784"] = 928,["785"] = 929,["787"] = 931,["788"] = 926,["789"] = 934,["790"] = 935,["791"] = 935,["793"] = 936,["794"] = 936,["796"] = 937,["797"] = 937,["799"] = 938,["800"] = 934,["801"] = 941,["802"] = 942,["803"] = 942,["805"] = 944,["806"] = 945,["807"] = 946,["808"] = 947,["809"] = 948,["810"] = 949,["812"] = 951,["814"] = 953,["816"] = 941,["817"] = 957,["819"] = 958,["820"] = 959,["822"] = 960,["824"] = 961,["826"] = 962,["828"] = 963,["830"] = 964,["832"] = 965,["834"] = 966,["836"] = 967,["838"] = 968,["840"] = 969,["842"] = 970,["844"] = 971,["846"] = 972,["847"] = 973,["849"] = 975,["852"] = 977,["855"] = 957,["856"] = 981,["858"] = 982,["859"] = 983,["861"] = 984,["863"] = 985,["865"] = 986,["867"] = 987,["869"] = 988,["871"] = 989,["873"] = 991,["876"] = 993,["879"] = 981,["880"] = 997,["881"] = 998,["882"] = 997,["883"] = 1001,["884"] = 1002,["885"] = 1003,["886"] = 1001,["887"] = 1006,["888"] = 1007,["889"] = 1006,["890"] = 1010,["891"] = 1011,["892"] = 1010,["893"] = 1033,["894"] = 1033,["896"] = 1035});
local ____exports = {}
--- 属性作用域类型
local PropertyScope = PropertyScope or ({})
PropertyScope.UNIT = 0
PropertyScope[PropertyScope.UNIT] = "UNIT"
PropertyScope.PLAYER = 1
PropertyScope[PropertyScope.PLAYER] = "PLAYER"
--- 属性值类型
local PropertyValueType = PropertyValueType or ({})
PropertyValueType.NUMBER = 0
PropertyValueType[PropertyValueType.NUMBER] = "NUMBER"
PropertyValueType.PERCENTAGE = 1
PropertyValueType[PropertyValueType.PERCENTAGE] = "PERCENTAGE"
PropertyValueType.BOOLEAN = 2
PropertyValueType[PropertyValueType.BOOLEAN] = "BOOLEAN"
PropertyValueType.CUSTOM = 3
PropertyValueType[PropertyValueType.CUSTOM] = "CUSTOM"
--- 聚合策略
local AggregationStrategy = AggregationStrategy or ({})
AggregationStrategy.SUM = 0
AggregationStrategy[AggregationStrategy.SUM] = "SUM"
AggregationStrategy.MULTIPLY = 1
AggregationStrategy[AggregationStrategy.MULTIPLY] = "MULTIPLY"
AggregationStrategy.MAX = 2
AggregationStrategy[AggregationStrategy.MAX] = "MAX"
AggregationStrategy.MIN = 3
AggregationStrategy[AggregationStrategy.MIN] = "MIN"
AggregationStrategy.FIRST = 4
AggregationStrategy[AggregationStrategy.FIRST] = "FIRST"
AggregationStrategy.LAST = 5
AggregationStrategy[AggregationStrategy.LAST] = "LAST"
AggregationStrategy.CUSTOM = 6
AggregationStrategy[AggregationStrategy.CUSTOM] = "CUSTOM"
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
function MPropertySystem.prototype.AddStaticProperty(self, modifier, propertyId, value, key)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    if not self:IsModifierValid(modifier) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local targetKey = self:ResolveKey(modifier, config.scope, key)
    if targetKey == nil then
        return false
    end
    local storage = self:GetStorage(config.scope, targetKey)
    local propertyList = storage.static:get(propertyId)
    if not propertyList then
        propertyList = {}
        storage.static:set(propertyId, propertyList)
    end
    propertyList[#propertyList + 1] = {
        modifier = modifier,
        value = value,
        addedTime = self:GetCurrentTime()
    }
    self:RecalculateStaticProperty(config.scope, targetKey, propertyId)
    if config.syncToClient then
        self:MarkDirty(config.scope, targetKey, propertyId)
    end
    local ____PropertyData_stats_5, ____totalWrites_6 = PropertyData.stats, "totalWrites"
    ____PropertyData_stats_5[____totalWrites_6] = ____PropertyData_stats_5[____totalWrites_6] + 1
    return true
end
function MPropertySystem.prototype.RemoveStaticProperty(self, modifier, propertyId, key)
    if not modifier then
        return
    end
    if propertyId then
        self:RemoveSingleStaticProperty(modifier, propertyId, key)
    else
        for ____, ____value in __TS__Iterator(PropertyData.configs) do
            local pid = ____value[1]
            self:RemoveSingleStaticProperty(modifier, pid, key)
        end
    end
end
function MPropertySystem.prototype.RemoveSingleStaticProperty(self, modifier, propertyId, key)
    if not self:ValidateProperty(propertyId) then
        return
    end
    local config = self:GetConfig(propertyId)
    local targetKey = self:ResolveKey(modifier, config.scope, key)
    if targetKey == nil then
        return
    end
    local storage = self:GetStorage(config.scope, targetKey)
    local propertyList = storage.static:get(propertyId)
    if not propertyList then
        return
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.modifier == modifier end
    )
    if index ~= -1 then
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            storage.static:delete(propertyId)
            storage.staticCache:delete(propertyId)
        else
            self:RecalculateStaticProperty(config.scope, targetKey, propertyId)
        end
        if config.syncToClient then
            self:MarkDirty(config.scope, targetKey, propertyId)
        end
    end
end
function MPropertySystem.prototype.UpdateStaticPropertyValue(self, modifier, propertyId, newValue, key)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    if not self:IsModifierValid(modifier) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local targetKey = self:ResolveKey(modifier, config.scope, key)
    if targetKey == nil then
        return false
    end
    local storage = self:GetStorage(config.scope, targetKey)
    local propertyList = storage.static:get(propertyId)
    if not propertyList then
        return false
    end
    local data = __TS__ArrayFind(
        propertyList,
        function(____, d) return d.modifier == modifier end
    )
    if data then
        data.value = newValue
        self:RecalculateStaticProperty(config.scope, targetKey, propertyId)
        if config.syncToClient then
            self:MarkDirty(config.scope, targetKey, propertyId)
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
    do
        local i = #propertyList - 1
        while i >= 0 do
            if not self:IsModifierValid(propertyList[i + 1].modifier) then
                __TS__ArraySplice(propertyList, i, 1)
            end
            i = i - 1
        end
    end
    if #propertyList == 0 then
        storage.static:delete(propertyId)
        storage.staticCache:delete(propertyId)
        return
    end
    local result = self:GetAggregationInitialValue(config.aggregation, config.defaultValue or 0)
    for ____, data in ipairs(propertyList) do
        result = self:AggregateValues(config.aggregation, result, data.value, config.customAggregator)
    end
    storage.staticCache:set(propertyId, result)
end
function MPropertySystem.prototype.RegisterDynamicProperty(self, modifier, propertyId, callback, priority, key)
    if priority == nil then
        priority = 0
    end
    if not self:ValidateProperty(propertyId) then
        return false
    end
    if not self:IsModifierValid(modifier) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local targetKey = self:ResolveKey(modifier, config.scope, key)
    if targetKey == nil then
        return false
    end
    local storage = self:GetStorage(config.scope, targetKey)
    local propertyList = storage.dynamic:get(propertyId)
    if not propertyList then
        propertyList = {}
        storage.dynamic:set(propertyId, propertyList)
    end
    local existingIndex = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.modifier == modifier end
    )
    if existingIndex ~= -1 then
        propertyList[existingIndex + 1].callback = callback
        propertyList[existingIndex + 1].priority = priority
    else
        propertyList[#propertyList + 1] = {
            modifier = modifier,
            callback = callback,
            priority = priority,
            addedTime = self:GetCurrentTime()
        }
    end
    __TS__ArraySort(
        propertyList,
        function(____, a, b) return a.priority - b.priority end
    )
    storage.runtimeCache:delete(propertyId)
    if config.syncToClient then
        self:MarkDirty(config.scope, targetKey, propertyId)
    end
    local ____PropertyData_stats_11, ____totalWrites_12 = PropertyData.stats, "totalWrites"
    ____PropertyData_stats_11[____totalWrites_12] = ____PropertyData_stats_11[____totalWrites_12] + 1
    return true
end
function MPropertySystem.prototype.UnregisterDynamicProperty(self, modifier, propertyId, key)
    if not modifier then
        return
    end
    if propertyId then
        self:UnregisterSingleDynamicProperty(modifier, propertyId, key)
    else
        for ____, ____value in __TS__Iterator(PropertyData.configs) do
            local pid = ____value[1]
            self:UnregisterSingleDynamicProperty(modifier, pid, key)
        end
    end
end
function MPropertySystem.prototype.UnregisterSingleDynamicProperty(self, modifier, propertyId, key)
    if not self:ValidateProperty(propertyId) then
        return
    end
    local config = self:GetConfig(propertyId)
    local targetKey = self:ResolveKey(modifier, config.scope, key)
    if targetKey == nil then
        return
    end
    local storage = self:GetStorage(config.scope, targetKey)
    local propertyList = storage.dynamic:get(propertyId)
    if not propertyList then
        return
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.modifier == modifier end
    )
    if index ~= -1 then
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            storage.dynamic:delete(propertyId)
        end
        storage.runtimeCache:delete(propertyId)
        if config.syncToClient then
            self:MarkDirty(config.scope, targetKey, propertyId)
        end
    end
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
    do
        local i = #propertyList - 1
        while i >= 0 do
            if not self:IsModifierValid(propertyList[i + 1].modifier) then
                __TS__ArraySplice(propertyList, i, 1)
            end
            i = i - 1
        end
    end
    if #propertyList == 0 then
        storage.dynamic:delete(propertyId)
        return config.defaultValue or 0
    end
    local result = self:GetAggregationInitialValue(config.aggregation, config.defaultValue or 0)
    for ____, data in ipairs(propertyList) do
        do
            local function ____catch(____error)
                self:print((("Error in callback for " .. propertyId) .. ": ") .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                local value = data.callback(params)
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
function MPropertySystem.prototype.CleanupModifierProperties(self, modifier, key)
    if not modifier then
        return
    end
    self:RemoveStaticProperty(modifier, nil, key)
    self:UnregisterDynamicProperty(modifier, nil, key)
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
    local cleanedCount = 0
    for ____, ____value in __TS__Iterator(storage.static) do
        local propertyId = ____value[1]
        local propertyList = ____value[2]
        do
            local i = #propertyList - 1
            while i >= 0 do
                if not self:IsModifierValid(propertyList[i + 1].modifier) then
                    __TS__ArraySplice(propertyList, i, 1)
                    cleanedCount = cleanedCount + 1
                end
                i = i - 1
            end
        end
        if #propertyList == 0 then
            storage.static:delete(propertyId)
            storage.staticCache:delete(propertyId)
        end
    end
    for ____, ____value in __TS__Iterator(storage.dynamic) do
        local propertyId = ____value[1]
        local propertyList = ____value[2]
        do
            local i = #propertyList - 1
            while i >= 0 do
                if not self:IsModifierValid(propertyList[i + 1].modifier) then
                    __TS__ArraySplice(propertyList, i, 1)
                    cleanedCount = cleanedCount + 1
                end
                i = i - 1
            end
        end
        if #propertyList == 0 then
            storage.dynamic:delete(propertyId)
        end
    end
    return cleanedCount
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
function MPropertySystem.prototype.IsModifierValid(self, modifier)
    if not modifier then
        return false
    end
    if not IsValid(modifier) then
        return false
    end
    if modifier._bDestroyed == true then
        return false
    end
    return true
end
function MPropertySystem.prototype.ResolveKey(self, modifier, scope, key)
    if key ~= nil then
        return key
    end
    local parent = modifier:GetParent()
    if scope == PropertyScope.PLAYER then
        local playerID = parent:GetPlayerOwnerID()
        if playerID == -1 then
            self:print("Error: Unit has no player owner")
            return nil
        end
        return playerID
    else
        return parent:GetEntityIndex()
    end
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
                return customAggregator(current, value)
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
if PropertySystem == nil then
    PropertySystem = __TS__New(MPropertySystem)
end
____exports.default = PropertySystem
return ____exports
