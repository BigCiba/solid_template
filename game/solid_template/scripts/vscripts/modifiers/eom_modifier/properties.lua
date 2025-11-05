local ____lualib = require("lualib_bundle")
local __TS__TypeOf = ____lualib.__TS__TypeOf
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__StringEndsWith = ____lualib.__TS__StringEndsWith
local __TS__StringReplace = ____lualib.__TS__StringReplace
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 3,["9"] = 4,["11"] = 6,["12"] = 7,["14"] = 9,["15"] = 10,["17"] = 27,["18"] = 28,["21"] = 29,["22"] = 30,["24"] = 31,["25"] = 32,["28"] = 34,["29"] = 35,["30"] = 36,["31"] = 36,["32"] = 36,["33"] = 36,["34"] = 36,["36"] = 36,["37"] = 37,["44"] = 43,["47"] = 45,["48"] = 46,["49"] = 47,["50"] = 47,["51"] = 47,["52"] = 47,["53"] = 47,["55"] = 47,["56"] = 48,["63"] = 54,["66"] = 56,["67"] = 57,["68"] = 58,["69"] = 58,["70"] = 58,["71"] = 58,["72"] = 58,["74"] = 58,["75"] = 59,["86"] = 68,["87"] = 68,["89"] = 69,["90"] = 69,["92"] = 70,["93"] = 70,["95"] = 72,["96"] = 73,["97"] = 74,["98"] = 75,["99"] = 77,["100"] = 78,["102"] = 80,["103"] = 83,["104"] = 84,["106"] = 85,["107"] = 86,["108"] = 87,["109"] = 88,["111"] = 91,["112"] = 92,["113"] = 93,["114"] = 94,["115"] = 94,["116"] = 94,["118"] = 94,["120"] = 96,["121"] = 97,["123"] = 99,["126"] = 102,["131"] = 106,["132"] = 106,["134"] = 107,["135"] = 27,["136"] = 110,["137"] = 111,["138"] = 112,["140"] = 113,["141"] = 114,["144"] = 116,["145"] = 117,["146"] = 118,["147"] = 118,["148"] = 118,["149"] = 118,["150"] = 118,["152"] = 118,["153"] = 119,["160"] = 125,["163"] = 127,["164"] = 128,["165"] = 129,["166"] = 129,["167"] = 129,["168"] = 129,["169"] = 129,["171"] = 129,["172"] = 130,["179"] = 136,["182"] = 138,["183"] = 139,["184"] = 140,["185"] = 140,["186"] = 140,["187"] = 140,["188"] = 140,["190"] = 140,["191"] = 141,["202"] = 150,["203"] = 150,["205"] = 151,["206"] = 151,["208"] = 152,["209"] = 152,["211"] = 154,["212"] = 155,["213"] = 156,["214"] = 157,["215"] = 158,["216"] = 160,["217"] = 161,["218"] = 162,["221"] = 166,["222"] = 166,["223"] = 166,["224"] = 167,["225"] = 168,["226"] = 169,["227"] = 166,["228"] = 166,["229"] = 171,["230"] = 110,["231"] = 174,["232"] = 175,["233"] = 176,["235"] = 177,["236"] = 178,["239"] = 180,["240"] = 181,["241"] = 182,["242"] = 182,["243"] = 182,["244"] = 182,["245"] = 182,["247"] = 182,["248"] = 183,["255"] = 189,["258"] = 191,["259"] = 192,["260"] = 193,["261"] = 193,["262"] = 193,["263"] = 193,["264"] = 193,["266"] = 193,["267"] = 194,["274"] = 200,["277"] = 202,["278"] = 203,["279"] = 204,["280"] = 204,["281"] = 204,["282"] = 204,["283"] = 204,["285"] = 204,["286"] = 205,["297"] = 214,["300"] = 215,["303"] = 216,["306"] = 218,["307"] = 220,["308"] = 221,["309"] = 223,["310"] = 224,["311"] = 225,["314"] = 174,["315"] = 230,["316"] = 231,["317"] = 231,["319"] = 232,["320"] = 233,["322"] = 234,["323"] = 235,["326"] = 237,["327"] = 238,["328"] = 239,["330"] = 241,["332"] = 243,["333"] = 244,["334"] = 244,["335"] = 244,["336"] = 244,["337"] = 244,["339"] = 244,["340"] = 245,["342"] = 247,["347"] = 251,["350"] = 253,["351"] = 254,["352"] = 255,["353"] = 256,["356"] = 259,["358"] = 261,["359"] = 262,["360"] = 262,["361"] = 262,["362"] = 262,["363"] = 262,["365"] = 262,["366"] = 263,["368"] = 265,["373"] = 269,["376"] = 271,["377"] = 272,["379"] = 274,["380"] = 275,["382"] = 277,["383"] = 278,["384"] = 279,["385"] = 279,["386"] = 279,["387"] = 279,["388"] = 279,["390"] = 279,["391"] = 280,["393"] = 282,["399"] = 287,["400"] = 288,["402"] = 290,["407"] = 294,["408"] = 294,["410"] = 295,["411"] = 295,["413"] = 296,["414"] = 296,["416"] = 298,["417"] = 299,["418"] = 300,["419"] = 302,["420"] = 303,["421"] = 304,["422"] = 304,["423"] = 304,["425"] = 304,["427"] = 307,["428"] = 308,["429"] = 309,["431"] = 311,["433"] = 314,["435"] = 315,["436"] = 317,["437"] = 318,["438"] = 319,["439"] = 320,["440"] = 321,["441"] = 322,["443"] = 324,["444"] = 325,["445"] = 325,["446"] = 325,["448"] = 325,["450"] = 327,["451"] = 328,["453"] = 330,["457"] = 334,["462"] = 338,["463"] = 230,["464"] = 340,["465"] = 341,["466"] = 342,["468"] = 343,["469"] = 344,["472"] = 346,["473"] = 347,["474"] = 348,["476"] = 350,["478"] = 352,["479"] = 353,["480"] = 353,["481"] = 353,["482"] = 353,["483"] = 353,["485"] = 353,["486"] = 354,["488"] = 356,["493"] = 360,["496"] = 362,["497"] = 363,["498"] = 364,["499"] = 365,["502"] = 368,["504"] = 370,["505"] = 371,["506"] = 371,["507"] = 371,["508"] = 371,["509"] = 371,["511"] = 371,["512"] = 372,["514"] = 374,["519"] = 378,["522"] = 380,["523"] = 381,["525"] = 383,["526"] = 384,["528"] = 386,["529"] = 387,["530"] = 388,["531"] = 388,["532"] = 388,["533"] = 388,["534"] = 388,["536"] = 388,["537"] = 389,["539"] = 391,["545"] = 396,["546"] = 397,["548"] = 399,["553"] = 403,["554"] = 403,["556"] = 404,["557"] = 404,["559"] = 405,["560"] = 405,["562"] = 407,["563"] = 408,["564"] = 410,["565"] = 411,["566"] = 412,["567"] = 412,["568"] = 412,["570"] = 412,["572"] = 415,["573"] = 416,["575"] = 419,["577"] = 420,["578"] = 422,["579"] = 423,["580"] = 424,["581"] = 425,["582"] = 426,["583"] = 427,["585"] = 429,["586"] = 430,["587"] = 430,["588"] = 430,["590"] = 430,["592"] = 433,["595"] = 437,["600"] = 441,["601"] = 340,["602"] = 444,["603"] = 445,["604"] = 446,["606"] = 449,["607"] = 450,["608"] = 451,["610"] = 454,["611"] = 455,["612"] = 456,["613"] = 457,["615"] = 459,["616"] = 454,["617"] = 461,["618"] = 462,["619"] = 461,["620"] = 465,["621"] = 466,["622"] = 465,["623"] = 469,["624"] = 472});
if _G.MODIFIER_PROPERTY_PLAYER_DATA == nil then
    _G.MODIFIER_PROPERTY_PLAYER_DATA = {}
end
if _G.MODIFIER_PROPERTY_TEAM_DATA == nil then
    _G.MODIFIER_PROPERTY_TEAM_DATA = {}
end
if _G.MODIFIER_PROPERTY_TEAMHERO_DATA == nil then
    _G.MODIFIER_PROPERTY_TEAMHERO_DATA = {}
end
function StaticModifierProperty(hModifier, iProperty, value)
    if hModifier == nil then
        return
    end
    local t = hModifier:GetParent()
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch7 = propertyType
        local ____cond7 = ____switch7 == EOMModifierPropertyType.PLAYER
        if ____cond7 then
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
        ____cond7 = ____cond7 or ____switch7 == EOMModifierPropertyType.TEAM
        if ____cond7 then
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
        ____cond7 = ____cond7 or ____switch7 == EOMModifierPropertyType.TEAM_HERO
        if ____cond7 then
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
                goto __continue21
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
        ::__continue21::
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
        local ____switch30 = propertyType
        local ____cond30 = ____switch30 == EOMModifierPropertyType.PLAYER
        if ____cond30 then
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
        ____cond30 = ____cond30 or ____switch30 == EOMModifierPropertyType.TEAM
        if ____cond30 then
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
        ____cond30 = ____cond30 or ____switch30 == EOMModifierPropertyType.TEAM_HERO
        if ____cond30 then
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
        if not IsValid(nil, modifier) or modifier._bDestroyed == true then
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
        local ____switch47 = propertyType
        local ____cond47 = ____switch47 == EOMModifierPropertyType.PLAYER
        if ____cond47 then
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
        ____cond47 = ____cond47 or ____switch47 == EOMModifierPropertyType.TEAM
        if ____cond47 then
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
        ____cond47 = ____cond47 or ____switch47 == EOMModifierPropertyType.TEAM_HERO
        if ____cond47 then
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
        local ____switch64 = propertyType
        local ____cond64 = ____switch64 == EOMModifierPropertyType.PLAYER
        if ____cond64 then
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
        ____cond64 = ____cond64 or ____switch64 == EOMModifierPropertyType.TEAM
        if ____cond64 then
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
        ____cond64 = ____cond64 or ____switch64 == EOMModifierPropertyType.TEAM_HERO
        if ____cond64 then
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
                        goto __continue89
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
        ::__continue89::
    end
    return fValue
end
function GetModifierPropertyFirst(unitOrTeamOrPlayer, iProperty, tParams)
    local t
    local propertyType = EOMModifierFunctionType[iProperty]
    repeat
        local ____switch98 = propertyType
        local ____cond98 = ____switch98 == EOMModifierPropertyType.PLAYER
        if ____cond98 then
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
        ____cond98 = ____cond98 or ____switch98 == EOMModifierPropertyType.TEAM
        if ____cond98 then
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
        ____cond98 = ____cond98 or ____switch98 == EOMModifierPropertyType.TEAM_HERO
        if ____cond98 then
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
                        goto __continue122
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
        ::__continue122::
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
