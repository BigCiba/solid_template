local ____lualib = require("lualib_bundle")
local __TS__TypeOf = ____lualib.__TS__TypeOf
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__StringEndsWith = ____lualib.__TS__StringEndsWith
local __TS__StringReplace = ____lualib.__TS__StringReplace
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 3,["9"] = 3,["11"] = 4,["12"] = 4,["14"] = 5,["15"] = 5,["17"] = 21,["18"] = 22,["21"] = 23,["22"] = 24,["24"] = 25,["25"] = 26,["28"] = 28,["29"] = 29,["30"] = 30,["31"] = 30,["32"] = 30,["33"] = 30,["34"] = 30,["36"] = 30,["37"] = 31,["44"] = 37,["47"] = 39,["48"] = 40,["49"] = 41,["50"] = 41,["51"] = 41,["52"] = 41,["53"] = 41,["55"] = 41,["56"] = 42,["63"] = 48,["66"] = 50,["67"] = 51,["68"] = 52,["69"] = 52,["70"] = 52,["71"] = 52,["72"] = 52,["74"] = 52,["75"] = 53,["86"] = 62,["87"] = 62,["89"] = 63,["90"] = 63,["92"] = 64,["93"] = 64,["95"] = 66,["96"] = 67,["97"] = 68,["98"] = 69,["99"] = 71,["100"] = 72,["102"] = 74,["103"] = 77,["104"] = 78,["106"] = 79,["107"] = 80,["108"] = 81,["109"] = 82,["111"] = 85,["112"] = 86,["113"] = 87,["114"] = 88,["115"] = 88,["116"] = 88,["118"] = 88,["120"] = 90,["121"] = 91,["123"] = 93,["126"] = 96,["131"] = 100,["132"] = 100,["134"] = 101,["135"] = 21,["136"] = 104,["137"] = 105,["138"] = 106,["140"] = 107,["141"] = 108,["144"] = 110,["145"] = 111,["146"] = 112,["147"] = 112,["148"] = 112,["149"] = 112,["150"] = 112,["152"] = 112,["153"] = 113,["160"] = 119,["163"] = 121,["164"] = 122,["165"] = 123,["166"] = 123,["167"] = 123,["168"] = 123,["169"] = 123,["171"] = 123,["172"] = 124,["179"] = 130,["182"] = 132,["183"] = 133,["184"] = 134,["185"] = 134,["186"] = 134,["187"] = 134,["188"] = 134,["190"] = 134,["191"] = 135,["202"] = 144,["203"] = 144,["205"] = 145,["206"] = 145,["208"] = 146,["209"] = 146,["211"] = 148,["212"] = 149,["213"] = 150,["214"] = 151,["215"] = 152,["216"] = 154,["217"] = 155,["218"] = 156,["221"] = 160,["222"] = 160,["223"] = 160,["224"] = 161,["225"] = 162,["226"] = 163,["227"] = 160,["228"] = 160,["229"] = 165,["230"] = 104,["231"] = 168,["232"] = 169,["233"] = 170,["235"] = 171,["236"] = 172,["239"] = 174,["240"] = 175,["241"] = 176,["242"] = 176,["243"] = 176,["244"] = 176,["245"] = 176,["247"] = 176,["248"] = 177,["255"] = 183,["258"] = 185,["259"] = 186,["260"] = 187,["261"] = 187,["262"] = 187,["263"] = 187,["264"] = 187,["266"] = 187,["267"] = 188,["274"] = 194,["277"] = 196,["278"] = 197,["279"] = 198,["280"] = 198,["281"] = 198,["282"] = 198,["283"] = 198,["285"] = 198,["286"] = 199,["297"] = 208,["300"] = 209,["303"] = 210,["306"] = 212,["307"] = 214,["308"] = 215,["309"] = 217,["310"] = 218,["311"] = 219,["314"] = 168,["315"] = 224,["316"] = 225,["317"] = 225,["319"] = 226,["320"] = 227,["322"] = 228,["323"] = 229,["326"] = 231,["327"] = 232,["328"] = 233,["330"] = 235,["332"] = 237,["333"] = 238,["334"] = 238,["335"] = 238,["336"] = 238,["337"] = 238,["339"] = 238,["340"] = 239,["342"] = 241,["347"] = 245,["350"] = 247,["351"] = 248,["352"] = 249,["353"] = 250,["356"] = 253,["358"] = 255,["359"] = 256,["360"] = 256,["361"] = 256,["362"] = 256,["363"] = 256,["365"] = 256,["366"] = 257,["368"] = 259,["373"] = 263,["376"] = 265,["377"] = 266,["379"] = 268,["380"] = 269,["382"] = 271,["383"] = 272,["384"] = 273,["385"] = 273,["386"] = 273,["387"] = 273,["388"] = 273,["390"] = 273,["391"] = 274,["393"] = 276,["399"] = 281,["400"] = 282,["402"] = 284,["407"] = 288,["408"] = 288,["410"] = 289,["411"] = 289,["413"] = 290,["414"] = 290,["416"] = 292,["417"] = 293,["418"] = 294,["419"] = 296,["420"] = 297,["421"] = 298,["422"] = 298,["423"] = 298,["425"] = 298,["427"] = 301,["428"] = 302,["429"] = 303,["431"] = 305,["433"] = 308,["435"] = 309,["436"] = 311,["437"] = 312,["438"] = 313,["439"] = 314,["440"] = 315,["441"] = 316,["443"] = 318,["444"] = 319,["445"] = 319,["446"] = 319,["448"] = 319,["450"] = 321,["451"] = 322,["453"] = 324,["457"] = 328,["462"] = 332,["463"] = 224,["464"] = 334,["465"] = 335,["466"] = 336,["468"] = 337,["469"] = 338,["472"] = 340,["473"] = 341,["474"] = 342,["476"] = 344,["478"] = 346,["479"] = 347,["480"] = 347,["481"] = 347,["482"] = 347,["483"] = 347,["485"] = 347,["486"] = 348,["488"] = 350,["493"] = 354,["496"] = 356,["497"] = 357,["498"] = 358,["499"] = 359,["502"] = 362,["504"] = 364,["505"] = 365,["506"] = 365,["507"] = 365,["508"] = 365,["509"] = 365,["511"] = 365,["512"] = 366,["514"] = 368,["519"] = 372,["522"] = 374,["523"] = 375,["525"] = 377,["526"] = 378,["528"] = 380,["529"] = 381,["530"] = 382,["531"] = 382,["532"] = 382,["533"] = 382,["534"] = 382,["536"] = 382,["537"] = 383,["539"] = 385,["545"] = 390,["546"] = 391,["548"] = 393,["553"] = 397,["554"] = 397,["556"] = 398,["557"] = 398,["559"] = 399,["560"] = 399,["562"] = 401,["563"] = 402,["564"] = 404,["565"] = 405,["566"] = 406,["567"] = 406,["568"] = 406,["570"] = 406,["572"] = 409,["573"] = 410,["575"] = 413,["577"] = 414,["578"] = 416,["579"] = 417,["580"] = 418,["581"] = 419,["582"] = 420,["583"] = 421,["585"] = 423,["586"] = 424,["587"] = 424,["588"] = 424,["590"] = 424,["592"] = 427,["595"] = 431,["600"] = 435,["601"] = 334,["602"] = 438,["603"] = 439,["604"] = 440,["606"] = 443,["607"] = 444,["608"] = 445,["610"] = 448,["611"] = 449,["612"] = 450,["613"] = 451,["615"] = 453,["616"] = 448,["617"] = 455,["618"] = 456,["619"] = 455,["620"] = 459,["621"] = 460,["622"] = 459,["623"] = 463,["624"] = 466});
if MODIFIER_PROPERTY_PLAYER_DATA == nil then
    MODIFIER_PROPERTY_PLAYER_DATA = {}
end
if MODIFIER_PROPERTY_TEAM_DATA == nil then
    MODIFIER_PROPERTY_TEAM_DATA = {}
end
if MODIFIER_PROPERTY_TEAMHERO_DATA == nil then
    MODIFIER_PROPERTY_TEAMHERO_DATA = {}
end
function StaticModifierProperty(hModifier, iProperty, value)
    if hModifier == nil then
        return
    end
    local t = hModifier:GetParent()
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch4 = propertyType
        local ____cond4 = ____switch4 == EOMModifierPropertyType.PLAYER
        if ____cond4 then
            do
                local iPlayerID = t:GetPlayerOwnerID()
                if iPlayerID ~= -1 then
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_1 = MODIFIER_PROPERTY_PLAYER_DATA
                    local ____iPlayerID_2 = iPlayerID
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_0 = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                    if ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_0 == nil then
                        ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_0 = {}
                    end
                    ____MODIFIER_PROPERTY_PLAYER_DATA_1[____iPlayerID_2] = ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_0
                    t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                else
                    return
                end
            end
            break
        end
        ____cond4 = ____cond4 or ____switch4 == EOMModifierPropertyType.TEAM
        if ____cond4 then
            do
                local iTeamNumber = t:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAM_DATA_4 = MODIFIER_PROPERTY_TEAM_DATA
                    local ____iTeamNumber_5 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_3 = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_3 == nil then
                        ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_3 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAM_DATA_4[____iTeamNumber_5] = ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_3
                    t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                else
                    return
                end
            end
            break
        end
        ____cond4 = ____cond4 or ____switch4 == EOMModifierPropertyType.TEAM_HERO
        if ____cond4 then
            do
                local iTeamNumber = t:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_7 = MODIFIER_PROPERTY_TEAMHERO_DATA
                    local ____iTeamNumber_8 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_6 = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_6 == nil then
                        ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_6 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAMHERO_DATA_7[____iTeamNumber_8] = ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_6
                    t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                else
                    return
                end
            end
            break
        end
        do
            break
        end
    until true
    if hModifier._staticPropertyValues == nil then
        hModifier._staticPropertyValues = {}
    end
    if t.tStaticPropertyModifers == nil then
        t.tStaticPropertyModifers = {}
    end
    if t.tStaticPropertyModifers[iProperty] == nil then
        t.tStaticPropertyModifers[iProperty] = {}
    end
    local tValues = hModifier._staticPropertyValues
    local aModifers = t.tStaticPropertyModifers[iProperty]
    local funcSettleCallback = EOMModifierFunctionSettleCallback[iProperty]
    local funcCheckValueCallback = EOMModifierFunctionCheckValueCallback[iProperty]
    if value ~= nil and tValues[iProperty] == nil then
        aModifers[#aModifers + 1] = hModifier
    end
    tValues[iProperty] = value
    local fValue = funcSettleCallback ~= FirstSimple and 0 or nil
    for i = #aModifers, 1, -1 do
        do
            local modifier = aModifers[i]
            if modifier == hModifier and value == nil then
                table.remove(aModifers, i)
                goto __continue18
            end
            if modifier._bDestroyed ~= true and modifier._staticPropertyValues ~= nil and modifier._staticPropertyValues[iProperty] ~= nil then
                local value = modifier._staticPropertyValues[iProperty]
                if funcCheckValueCallback ~= nil then
                    local ____funcCheckValueCallback_result_9 = funcCheckValueCallback(value)
                    if ____funcCheckValueCallback_result_9 == nil then
                        ____funcCheckValueCallback_result_9 = value
                    end
                    value = ____funcCheckValueCallback_result_9
                end
                if funcSettleCallback ~= nil then
                    fValue = funcSettleCallback(fValue, value)
                else
                    fValue = fValue + value
                end
            else
                table.remove(aModifers, i)
            end
        end
        ::__continue18::
    end
    if t.__staticPropertyValue == nil then
        t.__staticPropertyValue = {}
    end
    t.__staticPropertyValue[iProperty] = fValue
end
function RegisterModifierProperty(hModifier, iProperty, funcCallback)
    local t = hModifier:GetParent()
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch27 = propertyType
        local ____cond27 = ____switch27 == EOMModifierPropertyType.PLAYER
        if ____cond27 then
            do
                local iPlayerID = t:GetPlayerOwnerID()
                if iPlayerID ~= -1 then
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_11 = MODIFIER_PROPERTY_PLAYER_DATA
                    local ____iPlayerID_12 = iPlayerID
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_10 = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                    if ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_10 == nil then
                        ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_10 = {}
                    end
                    ____MODIFIER_PROPERTY_PLAYER_DATA_11[____iPlayerID_12] = ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_10
                    t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                else
                    return
                end
            end
            break
        end
        ____cond27 = ____cond27 or ____switch27 == EOMModifierPropertyType.TEAM
        if ____cond27 then
            do
                local iTeamNumber = t:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAM_DATA_14 = MODIFIER_PROPERTY_TEAM_DATA
                    local ____iTeamNumber_15 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_13 = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_13 == nil then
                        ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_13 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAM_DATA_14[____iTeamNumber_15] = ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_13
                    t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                else
                    return
                end
            end
            break
        end
        ____cond27 = ____cond27 or ____switch27 == EOMModifierPropertyType.TEAM_HERO
        if ____cond27 then
            do
                local iTeamNumber = t:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_17 = MODIFIER_PROPERTY_TEAMHERO_DATA
                    local ____iTeamNumber_18 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_16 = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_16 == nil then
                        ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_16 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAMHERO_DATA_17[____iTeamNumber_18] = ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_16
                    t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                else
                    return
                end
            end
            break
        end
        do
            break
        end
    until true
    if hModifier._propertyCallbacks == nil then
        hModifier._propertyCallbacks = {}
    end
    if t.tPropertyModifers == nil then
        t.tPropertyModifers = {}
    end
    if t.tPropertyModifers[iProperty] == nil then
        t.tPropertyModifers[iProperty] = {}
    end
    local tCallbacks = hModifier._propertyCallbacks
    local tPropertyModifers = t.tPropertyModifers[iProperty]
    tPropertyModifers[#tPropertyModifers + 1] = hModifier
    for i = #tPropertyModifers, 1, -1 do
        local modifier = tPropertyModifers[i]
        if not IsValid(modifier) or modifier._bDestroyed == true then
            table.remove(tPropertyModifers, i)
            modifier._propertyCallbacks[iProperty] = nil
        end
    end
    __TS__ArraySort(
        tPropertyModifers,
        function(____, a, b)
            local ap = __TS__TypeOf(a.GetPriority) == nil and MODIFIER_PRIORITY_NORMAL or a:GetPriority()
            local bp = __TS__TypeOf(b.GetPriority) == nil and MODIFIER_PRIORITY_NORMAL or b:GetPriority()
            return ap - bp
        end
    )
    tCallbacks[iProperty] = funcCallback
end
function UnregisterModifierProperty(hModifier, iProperty)
    local t = hModifier:GetParent()
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch44 = propertyType
        local ____cond44 = ____switch44 == EOMModifierPropertyType.PLAYER
        if ____cond44 then
            do
                local iPlayerID = t:GetPlayerOwnerID()
                if iPlayerID ~= -1 then
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_20 = MODIFIER_PROPERTY_PLAYER_DATA
                    local ____iPlayerID_21 = iPlayerID
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_19 = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                    if ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_19 == nil then
                        ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_19 = {}
                    end
                    ____MODIFIER_PROPERTY_PLAYER_DATA_20[____iPlayerID_21] = ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_19
                    t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                else
                    return
                end
            end
            break
        end
        ____cond44 = ____cond44 or ____switch44 == EOMModifierPropertyType.TEAM
        if ____cond44 then
            do
                local iTeamNumber = t:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAM_DATA_23 = MODIFIER_PROPERTY_TEAM_DATA
                    local ____iTeamNumber_24 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_22 = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_22 == nil then
                        ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_22 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAM_DATA_23[____iTeamNumber_24] = ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_22
                    t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                else
                    return
                end
            end
            break
        end
        ____cond44 = ____cond44 or ____switch44 == EOMModifierPropertyType.TEAM_HERO
        if ____cond44 then
            do
                local iTeamNumber = t:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_26 = MODIFIER_PROPERTY_TEAMHERO_DATA
                    local ____iTeamNumber_27 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_25 = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_25 == nil then
                        ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_25 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAMHERO_DATA_26[____iTeamNumber_27] = ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_25
                    t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                else
                    return
                end
            end
            break
        end
        do
            break
        end
    until true
    if hModifier._propertyCallbacks == nil then
        return
    end
    if t.tPropertyModifers == nil then
        return
    end
    if t.tPropertyModifers[iProperty] == nil then
        return
    end
    local tPropertyModifers = t.tPropertyModifers[iProperty]
    for i = #tPropertyModifers, 1, -1 do
        local modifier = tPropertyModifers[i]
        if modifier._bDestroyed == true or modifier == hModifier then
            table.remove(tPropertyModifers, i)
            modifier._propertyCallbacks[iProperty] = nil
        end
    end
end
function GetModifierProperty(unitOrTeamOrPlayer, iProperty, tParams)
    if unitOrTeamOrPlayer == nil then
        return 0
    end
    local t
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch61 = propertyType
        local ____cond61 = ____switch61 == EOMModifierPropertyType.PLAYER
        if ____cond61 then
            do
                local iPlayerID = -1
                if type(unitOrTeamOrPlayer) == "number" then
                    iPlayerID = unitOrTeamOrPlayer
                else
                    iPlayerID = unitOrTeamOrPlayer:GetPlayerOwnerID()
                end
                if iPlayerID ~= -1 then
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_29 = MODIFIER_PROPERTY_PLAYER_DATA
                    local ____iPlayerID_30 = iPlayerID
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_28 = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                    if ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_28 == nil then
                        ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_28 = {}
                    end
                    ____MODIFIER_PROPERTY_PLAYER_DATA_29[____iPlayerID_30] = ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_28
                    t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                else
                    return 0
                end
            end
            break
        end
        ____cond61 = ____cond61 or ____switch61 == EOMModifierPropertyType.TEAM
        if ____cond61 then
            do
                local iTeamNumber = DOTA_TEAM_NOTEAM
                if type(unitOrTeamOrPlayer) == "number" then
                    if unitOrTeamOrPlayer >= DOTA_TEAM_FIRST and unitOrTeamOrPlayer < DOTA_TEAM_COUNT then
                        iTeamNumber = unitOrTeamOrPlayer
                    end
                else
                    iTeamNumber = unitOrTeamOrPlayer:GetTeamNumber()
                end
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAM_DATA_32 = MODIFIER_PROPERTY_TEAM_DATA
                    local ____iTeamNumber_33 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_31 = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_31 == nil then
                        ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_31 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAM_DATA_32[____iTeamNumber_33] = ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_31
                    t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                else
                    return 0
                end
            end
            break
        end
        ____cond61 = ____cond61 or ____switch61 == EOMModifierPropertyType.TEAM_HERO
        if ____cond61 then
            do
                if type(unitOrTeamOrPlayer) == "number" then
                    return 0
                end
                if not unitOrTeamOrPlayer:IsRealHero() then
                    return 0
                end
                local iTeamNumber = unitOrTeamOrPlayer:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_35 = MODIFIER_PROPERTY_TEAMHERO_DATA
                    local ____iTeamNumber_36 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_34 = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_34 == nil then
                        ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_34 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAMHERO_DATA_35[____iTeamNumber_36] = ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_34
                    t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                else
                    return 0
                end
            end
            break
        end
        do
            if type(unitOrTeamOrPlayer) == "table" then
                t = unitOrTeamOrPlayer
            else
                return 0
            end
            break
        end
    until true
    if t.tPropertyModifers == nil then
        t.tPropertyModifers = {}
    end
    if t.tPropertyModifers[iProperty] == nil then
        t.tPropertyModifers[iProperty] = {}
    end
    if t.__staticPropertyValue == nil then
        t.__staticPropertyValue = {}
    end
    local tPropertyModifers = t.tPropertyModifers[iProperty]
    local funcSettleCallback = EOMModifierFunctionSettleCallback[iProperty]
    local funcCheckValueCallback = EOMModifierFunctionCheckValueCallback[iProperty]
    local fPropertyValue = t.__staticPropertyValue[iProperty]
    if fPropertyValue ~= nil and funcCheckValueCallback ~= nil then
        local ____funcCheckValueCallback_result_37 = funcCheckValueCallback(fPropertyValue, tParams)
        if ____funcCheckValueCallback_result_37 == nil then
            ____funcCheckValueCallback_result_37 = fPropertyValue
        end
        fPropertyValue = ____funcCheckValueCallback_result_37
    end
    local fValue
    if funcSettleCallback ~= FirstSimple and fPropertyValue == nil then
        fValue = 0
    else
        fValue = fPropertyValue
    end
    for i = #tPropertyModifers, 1, -1 do
        do
            local modifier = tPropertyModifers[i]
            if modifier._bDestroyed ~= true then
                local callbacks = modifier._propertyCallbacks
                if callbacks ~= nil and callbacks[iProperty] ~= nil then
                    local value = callbacks[iProperty](tParams)
                    if value == nil then
                        goto __continue86
                    end
                    if funcCheckValueCallback ~= nil then
                        local ____funcCheckValueCallback_result_38 = funcCheckValueCallback(value, tParams)
                        if ____funcCheckValueCallback_result_38 == nil then
                            ____funcCheckValueCallback_result_38 = value
                        end
                        value = ____funcCheckValueCallback_result_38
                    end
                    if funcSettleCallback ~= nil then
                        fValue = funcSettleCallback(fValue, value)
                    else
                        fValue = fValue + value
                    end
                end
            else
                table.remove(tPropertyModifers, i)
            end
        end
        ::__continue86::
    end
    return fValue
end
function GetModifierPropertyFirst(unitOrTeamOrPlayer, iProperty, tParams)
    local t
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch95 = propertyType
        local ____cond95 = ____switch95 == EOMModifierPropertyType.PLAYER
        if ____cond95 then
            do
                local iPlayerID = -1
                if type(unitOrTeamOrPlayer) == "number" then
                    iPlayerID = unitOrTeamOrPlayer
                else
                    iPlayerID = unitOrTeamOrPlayer:GetPlayerOwnerID()
                end
                if iPlayerID ~= -1 then
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_40 = MODIFIER_PROPERTY_PLAYER_DATA
                    local ____iPlayerID_41 = iPlayerID
                    local ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_39 = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                    if ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_39 == nil then
                        ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_39 = {}
                    end
                    ____MODIFIER_PROPERTY_PLAYER_DATA_40[____iPlayerID_41] = ____MODIFIER_PROPERTY_PLAYER_DATA_iPlayerID_39
                    t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID]
                else
                    return 0
                end
            end
            break
        end
        ____cond95 = ____cond95 or ____switch95 == EOMModifierPropertyType.TEAM
        if ____cond95 then
            do
                local iTeamNumber = DOTA_TEAM_NOTEAM
                if type(unitOrTeamOrPlayer) == "number" then
                    if unitOrTeamOrPlayer >= DOTA_TEAM_FIRST and unitOrTeamOrPlayer < DOTA_TEAM_COUNT then
                        iTeamNumber = unitOrTeamOrPlayer
                    end
                else
                    iTeamNumber = unitOrTeamOrPlayer:GetTeamNumber()
                end
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAM_DATA_43 = MODIFIER_PROPERTY_TEAM_DATA
                    local ____iTeamNumber_44 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_42 = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_42 == nil then
                        ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_42 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAM_DATA_43[____iTeamNumber_44] = ____MODIFIER_PROPERTY_TEAM_DATA_iTeamNumber_42
                    t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber]
                else
                    return 0
                end
            end
            break
        end
        ____cond95 = ____cond95 or ____switch95 == EOMModifierPropertyType.TEAM_HERO
        if ____cond95 then
            do
                if type(unitOrTeamOrPlayer) == "number" then
                    return 0
                end
                if not unitOrTeamOrPlayer:IsRealHero() then
                    return 0
                end
                local iTeamNumber = unitOrTeamOrPlayer:GetTeamNumber()
                if iTeamNumber ~= DOTA_TEAM_NOTEAM then
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_46 = MODIFIER_PROPERTY_TEAMHERO_DATA
                    local ____iTeamNumber_47 = iTeamNumber
                    local ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_45 = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                    if ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_45 == nil then
                        ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_45 = {}
                    end
                    ____MODIFIER_PROPERTY_TEAMHERO_DATA_46[____iTeamNumber_47] = ____MODIFIER_PROPERTY_TEAMHERO_DATA_iTeamNumber_45
                    t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber]
                else
                    return 0
                end
            end
            break
        end
        do
            if type(unitOrTeamOrPlayer) == "table" then
                t = unitOrTeamOrPlayer
            else
                return 0
            end
            break
        end
    until true
    if t.tPropertyModifers == nil then
        t.tPropertyModifers = {}
    end
    if t.tPropertyModifers[iProperty] == nil then
        t.tPropertyModifers[iProperty] = {}
    end
    if t.__staticPropertyValue == nil then
        t.__staticPropertyValue = {}
    end
    local tPropertyModifers = t.tPropertyModifers[iProperty]
    local funcCheckValueCallback = EOMModifierFunctionCheckValueCallback[iProperty]
    local fPropertyValue = t.__staticPropertyValue[iProperty]
    if fPropertyValue ~= nil and funcCheckValueCallback ~= nil then
        local ____funcCheckValueCallback_result_48 = funcCheckValueCallback(fPropertyValue, tParams)
        if ____funcCheckValueCallback_result_48 == nil then
            ____funcCheckValueCallback_result_48 = fPropertyValue
        end
        fPropertyValue = ____funcCheckValueCallback_result_48
    end
    if fPropertyValue ~= nil then
        return fPropertyValue
    end
    for i = #tPropertyModifers, 1, -1 do
        do
            local modifier = tPropertyModifers[i]
            if modifier._bDestroyed ~= true then
                local callbacks = modifier._propertyCallbacks
                if callbacks ~= nil and callbacks[iProperty] ~= nil then
                    local value = callbacks[iProperty](tParams)
                    if value == nil then
                        goto __continue119
                    end
                    if funcCheckValueCallback ~= nil then
                        local ____funcCheckValueCallback_result_49 = funcCheckValueCallback(value, tParams)
                        if ____funcCheckValueCallback_result_49 == nil then
                            ____funcCheckValueCallback_result_49 = value
                        end
                        value = ____funcCheckValueCallback_result_49
                    end
                    return value
                end
            else
                table.remove(tPropertyModifers, i)
            end
        end
        ::__continue119::
    end
    return 0
end
MULTIPLE_ATTRIBUTE_PROPERTY = {}
for _, property in pairs(ATTRIBUTE_MULTIPLE_MAP) do
    MULTIPLE_ATTRIBUTE_PROPERTY[property] = true
end
PROPERTY_TO_ATTRIBUTE = {}
for k, v in pairs(ATTRIBUTE_MAP) do
    PROPERTY_TO_ATTRIBUTE[v] = k
end
function GetAttributeValue(property, value)
    local attributeName = PROPERTY_TO_ATTRIBUTE[property]
    if attributeName == nil then
        return nil
    end
    return {attributeName, value, MULTIPLE_ATTRIBUTE_PROPERTY[property] and 1 or 0}
end
function IsMultipleAttribute(attribute)
    return ATTRIBUTE_MULTIPLE_MAP[attribute] ~= nil
end
function GetAttributeMap(attribute)
    return __TS__StringEndsWith(attribute, "*") and ATTRIBUTE_MULTIPLE_MAP[__TS__StringReplace(attribute, "*", "")] or ATTRIBUTE_MAP[attribute]
end
EOM_UPDATE_HEALTH_PROPERTY = {[EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH] = true}
EOM_UPDATE_MANA_PROPERTY = {}
