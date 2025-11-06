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
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["23"] = 3,["24"] = 3,["25"] = 19,["26"] = 22,["27"] = 22,["28"] = 23,["30"] = 23,["31"] = 25,["32"] = 26,["33"] = 27,["34"] = 30,["35"] = 22,["36"] = 32,["37"] = 33,["38"] = 34,["39"] = 36,["40"] = 37,["41"] = 38,["42"] = 39,["44"] = 42,["46"] = 44,["48"] = 32,["49"] = 48,["50"] = 49,["51"] = 48,["52"] = 52,["53"] = 53,["54"] = 52,["55"] = 58,["56"] = 59,["57"] = 60,["58"] = 60,["59"] = 60,["60"] = 60,["61"] = 60,["62"] = 60,["63"] = 60,["64"] = 60,["66"] = 58,["67"] = 79,["68"] = 81,["69"] = 82,["70"] = 83,["71"] = 83,["72"] = 83,["74"] = 84,["75"] = 85,["76"] = 85,["77"] = 85,["79"] = 80,["80"] = 80,["81"] = 80,["82"] = 80,["83"] = 80,["84"] = 80,["85"] = 80,["86"] = 89,["87"] = 90,["88"] = 79,["89"] = 94,["90"] = 95,["91"] = 96,["93"] = 94,["94"] = 111,["95"] = 119,["96"] = 119,["98"] = 121,["99"] = 122,["100"] = 123,["101"] = 125,["102"] = 126,["103"] = 127,["105"] = 131,["106"] = 131,["107"] = 131,["108"] = 131,["109"] = 132,["110"] = 134,["111"] = 135,["113"] = 138,["114"] = 138,["115"] = 138,["116"] = 138,["117"] = 138,["118"] = 138,["120"] = 146,["121"] = 148,["122"] = 149,["123"] = 150,["125"] = 153,["126"] = 153,["127"] = 154,["128"] = 111,["129"] = 164,["130"] = 170,["131"] = 171,["133"] = 174,["134"] = 175,["135"] = 175,["136"] = 176,["137"] = 177,["140"] = 180,["142"] = 164,["143"] = 184,["144"] = 190,["145"] = 190,["147"] = 192,["148"] = 193,["149"] = 194,["150"] = 196,["151"] = 196,["153"] = 198,["154"] = 198,["155"] = 198,["156"] = 198,["157"] = 199,["158"] = 200,["159"] = 202,["160"] = 203,["161"] = 204,["163"] = 206,["165"] = 209,["166"] = 210,["168"] = 213,["170"] = 216,["171"] = 184,["172"] = 222,["173"] = 229,["174"] = 229,["176"] = 231,["177"] = 232,["178"] = 233,["179"] = 235,["180"] = 235,["182"] = 237,["183"] = 237,["184"] = 237,["185"] = 237,["186"] = 238,["187"] = 239,["188"] = 240,["189"] = 242,["190"] = 243,["192"] = 246,["194"] = 249,["195"] = 222,["196"] = 253,["197"] = 254,["198"] = 255,["199"] = 255,["201"] = 257,["202"] = 258,["203"] = 260,["204"] = 260,["205"] = 261,["206"] = 262,["207"] = 262,["209"] = 265,["210"] = 253,["211"] = 268,["212"] = 269,["213"] = 270,["216"] = 272,["217"] = 273,["218"] = 275,["219"] = 276,["222"] = 281,["223"] = 283,["224"] = 284,["226"] = 287,["227"] = 268,["228"] = 302,["229"] = 308,["230"] = 308,["232"] = 311,["233"] = 311,["235"] = 313,["236"] = 314,["237"] = 315,["238"] = 317,["239"] = 318,["240"] = 319,["242"] = 322,["243"] = 322,["244"] = 322,["245"] = 322,["246"] = 323,["247"] = 325,["248"] = 326,["249"] = 327,["251"] = 330,["252"] = 330,["253"] = 330,["254"] = 330,["255"] = 330,["256"] = 330,["257"] = 330,["259"] = 339,["260"] = 339,["261"] = 339,["262"] = 339,["263"] = 340,["264"] = 342,["265"] = 343,["267"] = 346,["268"] = 346,["269"] = 347,["270"] = 302,["271"] = 357,["272"] = 363,["273"] = 364,["275"] = 367,["276"] = 368,["277"] = 368,["278"] = 369,["279"] = 370,["282"] = 373,["284"] = 357,["285"] = 377,["286"] = 383,["287"] = 383,["289"] = 385,["290"] = 386,["291"] = 387,["292"] = 389,["293"] = 389,["295"] = 391,["296"] = 391,["297"] = 391,["298"] = 391,["299"] = 392,["300"] = 393,["301"] = 395,["302"] = 396,["304"] = 399,["305"] = 401,["306"] = 402,["308"] = 405,["310"] = 408,["311"] = 377,["312"] = 412,["313"] = 413,["314"] = 414,["315"] = 414,["317"] = 416,["318"] = 419,["319"] = 420,["320"] = 421,["321"] = 423,["322"] = 424,["323"] = 425,["324"] = 426,["325"] = 426,["326"] = 427,["327"] = 427,["328"] = 428,["332"] = 434,["333"] = 437,["334"] = 438,["335"] = 438,["336"] = 438,["337"] = 438,["338"] = 438,["339"] = 438,["340"] = 438,["341"] = 438,["343"] = 445,["344"] = 445,["345"] = 446,["346"] = 412,["347"] = 449,["348"] = 450,["349"] = 451,["350"] = 451,["352"] = 453,["353"] = 454,["354"] = 456,["355"] = 457,["357"] = 461,["358"] = 463,["361"] = 470,["364"] = 465,["365"] = 466,["366"] = 467,["374"] = 474,["375"] = 449,["376"] = 478,["377"] = 479,["378"] = 481,["379"] = 482,["381"] = 484,["383"] = 478,["384"] = 491,["385"] = 492,["386"] = 493,["387"] = 497,["388"] = 491,["389"] = 502,["390"] = 503,["391"] = 503,["392"] = 503,["393"] = 503,["394"] = 503,["395"] = 503,["396"] = 503,["397"] = 503,["398"] = 508,["399"] = 508,["400"] = 508,["401"] = 509,["402"] = 510,["403"] = 508,["404"] = 508,["405"] = 513,["406"] = 502,["407"] = 516,["408"] = 517,["411"] = 519,["412"] = 521,["413"] = 524,["414"] = 524,["415"] = 524,["416"] = 526,["417"] = 526,["418"] = 526,["419"] = 526,["420"] = 526,["421"] = 527,["422"] = 527,["423"] = 527,["424"] = 527,["425"] = 527,["426"] = 529,["427"] = 530,["428"] = 532,["429"] = 533,["430"] = 535,["431"] = 524,["432"] = 524,["433"] = 539,["435"] = 541,["436"] = 541,["437"] = 542,["438"] = 543,["439"] = 541,["442"] = 546,["443"] = 547,["444"] = 548,["445"] = 548,["446"] = 516,["447"] = 551,["448"] = 553,["449"] = 554,["450"] = 556,["451"] = 556,["452"] = 556,["454"] = 556,["456"] = 556,["457"] = 558,["458"] = 560,["459"] = 560,["460"] = 560,["461"] = 560,["462"] = 560,["463"] = 561,["464"] = 562,["465"] = 564,["466"] = 565,["467"] = 566,["469"] = 569,["470"] = 570,["471"] = 573,["472"] = 574,["473"] = 575,["474"] = 576,["476"] = 551,["477"] = 581,["478"] = 582,["481"] = 584,["482"] = 585,["485"] = 587,["486"] = 588,["487"] = 591,["488"] = 592,["489"] = 594,["490"] = 594,["491"] = 594,["493"] = 594,["495"] = 594,["496"] = 595,["497"] = 597,["498"] = 598,["499"] = 601,["500"] = 602,["501"] = 581,["502"] = 606,["503"] = 607,["504"] = 607,["506"] = 609,["507"] = 610,["508"] = 612,["509"] = 613,["511"] = 616,["512"] = 606,["513"] = 620,["514"] = 626,["515"] = 627,["518"] = 631,["519"] = 633,["520"] = 633,["521"] = 633,["522"] = 634,["523"] = 635,["524"] = 636,["525"] = 637,["527"] = 639,["528"] = 633,["529"] = 633,["530"] = 620,["531"] = 651,["532"] = 653,["533"] = 656,["534"] = 651,["535"] = 660,["536"] = 661,["539"] = 663,["540"] = 664,["541"] = 666,["542"] = 667,["543"] = 668,["545"] = 660,["546"] = 673,["547"] = 674,["550"] = 675,["551"] = 673,["552"] = 678,["553"] = 679,["554"] = 683,["555"] = 684,["556"] = 685,["557"] = 686,["558"] = 687,["559"] = 688,["560"] = 689,["562"] = 678,["563"] = 694,["564"] = 695,["565"] = 697,["566"] = 697,["567"] = 698,["569"] = 701,["570"] = 701,["571"] = 702,["573"] = 705,["574"] = 706,["576"] = 709,["577"] = 694,["578"] = 712,["579"] = 716,["580"] = 712,["581"] = 720,["582"] = 721,["583"] = 723,["584"] = 723,["585"] = 723,["586"] = 724,["587"] = 725,["588"] = 726,["591"] = 730,["592"] = 730,["593"] = 730,["594"] = 731,["595"] = 732,["596"] = 733,["599"] = 737,["600"] = 720,["601"] = 740,["602"] = 741,["603"] = 740,["604"] = 748,["605"] = 749,["606"] = 749,["607"] = 749,["608"] = 750,["609"] = 751,["610"] = 752,["611"] = 749,["612"] = 749,["613"] = 755,["614"] = 748,["615"] = 759,["616"] = 760,["617"] = 761,["618"] = 762,["619"] = 763,["620"] = 759,["621"] = 773,["622"] = 775,["623"] = 775,["624"] = 775,["625"] = 776,["626"] = 775,["627"] = 775,["628"] = 775,["629"] = 775,["630"] = 780,["631"] = 780,["632"] = 780,["633"] = 781,["634"] = 780,["635"] = 780,["636"] = 780,["637"] = 780,["638"] = 785,["639"] = 785,["640"] = 785,["641"] = 786,["642"] = 792,["643"] = 785,["644"] = 785,["645"] = 785,["646"] = 785,["647"] = 796,["648"] = 796,["649"] = 796,["650"] = 797,["651"] = 798,["652"] = 798,["653"] = 798,["654"] = 799,["656"] = 796,["657"] = 796,["658"] = 796,["659"] = 796,["660"] = 804,["661"] = 804,["662"] = 804,["663"] = 805,["664"] = 806,["665"] = 807,["666"] = 804,["667"] = 804,["668"] = 804,["669"] = 804,["670"] = 810,["671"] = 773,["672"] = 813,["673"] = 814,["674"] = 815,["675"] = 816,["676"] = 817,["677"] = 818,["678"] = 819,["679"] = 813,["680"] = 822,["681"] = 823,["682"] = 824,["683"] = 828,["684"] = 829,["685"] = 830,["686"] = 831,["687"] = 832,["688"] = 822,["689"] = 837,["690"] = 838,["691"] = 842,["692"] = 843,["693"] = 844,["694"] = 844,["695"] = 844,["696"] = 844,["697"] = 844,["698"] = 844,["699"] = 850,["701"] = 853,["702"] = 837,["703"] = 856,["704"] = 857,["705"] = 856,["706"] = 860,["707"] = 861,["708"] = 862,["709"] = 863,["711"] = 865,["712"] = 860,["713"] = 874,["714"] = 875,["715"] = 875,["717"] = 878,["718"] = 879,["719"] = 880,["721"] = 884,["722"] = 885,["723"] = 885,["724"] = 885,["725"] = 885,["727"] = 888,["728"] = 874,["729"] = 891,["731"] = 892,["732"] = 893,["734"] = 894,["736"] = 895,["738"] = 896,["740"] = 897,["742"] = 898,["744"] = 899,["746"] = 900,["748"] = 901,["750"] = 902,["752"] = 903,["754"] = 904,["756"] = 905,["758"] = 906,["759"] = 907,["761"] = 909,["764"] = 911,["767"] = 891,["768"] = 915,["770"] = 916,["771"] = 917,["773"] = 918,["775"] = 919,["777"] = 920,["779"] = 921,["781"] = 922,["783"] = 923,["785"] = 925,["788"] = 927,["791"] = 915,["792"] = 931,["793"] = 933,["794"] = 931,["795"] = 936,["796"] = 937,["797"] = 938,["798"] = 936,["799"] = 941,["800"] = 942,["801"] = 941,["802"] = 945,["803"] = 946,["804"] = 945,["805"] = 22,["806"] = 968,["807"] = 968});
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
        self:print((("[AddStaticProperty] Marked dirty: " .. propertyId) .. ", dirtyKeys size: ") .. tostring(PropertyData.dirtyKeys.size))
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
    self:print(("[SyncDirtyProperties] Syncing " .. tostring(PropertyData.dirtyKeys.size)) .. " dirty properties")
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
    self:print((("[SyncPropertyBatch] Existing data type: " .. type(existingData)) .. ", value: ") .. tostring(existingData))
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
        self:print((("[SyncPropertyBatch] " .. dirtyKey) .. " = ") .. tostring(value))
    end
    self:print("[SyncPropertyBatch] About to sync updates:", updates)
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, "properties", updates)
    local verification = CustomNetTables:GetTableValue(self.NETTABLE_NAME, "properties")
    self:print("[SyncPropertyBatch] Verification read: " .. type(verification))
    if verification then
        self:print(("[SyncPropertyBatch] Verified " .. tostring(#__TS__ObjectKeys(verification))) .. " keys")
    end
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
    self:print("[ForceSyncProperty] Existing data type: " .. type(existingData))
    local ____existingData_26
    if existingData then
        ____existingData_26 = __TS__ObjectAssign({}, existingData)
    else
        ____existingData_26 = {}
    end
    local update = ____existingData_26
    update[dirtyKey] = value
    self:print("[ForceSyncProperty] About to sync:", update)
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, "properties", update)
    local verification = CustomNetTables:GetTableValue(self.NETTABLE_NAME, "properties")
    self:print((("[ForceSyncProperty] Verification: " .. type(verification)) .. ", keys: ") .. tostring(verification and #__TS__ObjectKeys(verification) or 0))
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
        local ____switch155 = strategy
        local ____cond155 = ____switch155 == AggregationStrategy.SUM
        if ____cond155 then
            return current + value
        end
        ____cond155 = ____cond155 or ____switch155 == AggregationStrategy.MULTIPLY
        if ____cond155 then
            return current * value
        end
        ____cond155 = ____cond155 or ____switch155 == AggregationStrategy.MAX
        if ____cond155 then
            return math.max(current, value)
        end
        ____cond155 = ____cond155 or ____switch155 == AggregationStrategy.MIN
        if ____cond155 then
            return math.min(current, value)
        end
        ____cond155 = ____cond155 or ____switch155 == AggregationStrategy.FIRST
        if ____cond155 then
            return current ~= 0 and current or value
        end
        ____cond155 = ____cond155 or ____switch155 == AggregationStrategy.LAST
        if ____cond155 then
            return value
        end
        ____cond155 = ____cond155 or ____switch155 == AggregationStrategy.CUSTOM
        if ____cond155 then
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
        local ____switch158 = strategy
        local ____cond158 = ____switch158 == AggregationStrategy.MULTIPLY
        if ____cond158 then
            return 1
        end
        ____cond158 = ____cond158 or ____switch158 == AggregationStrategy.MAX
        if ____cond158 then
            return -math.huge
        end
        ____cond158 = ____cond158 or ____switch158 == AggregationStrategy.MIN
        if ____cond158 then
            return math.huge
        end
        ____cond158 = ____cond158 or (____switch158 == AggregationStrategy.FIRST or ____switch158 == AggregationStrategy.LAST)
        if ____cond158 then
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
