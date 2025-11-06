local ____lualib = require("lualib_bundle")
local __TS__NumberIsFinite = ____lualib.__TS__NumberIsFinite
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 5,["12"] = 6,["13"] = 7,["14"] = 8,["15"] = 9,["17"] = 7,["21"] = 18,["22"] = 19,["23"] = 20,["24"] = 21,["25"] = 22,["26"] = 23,["28"] = 26,["30"] = 18,["34"] = 34,["35"] = 34,["36"] = 34,["38"] = 34,["39"] = 34,["41"] = 35,["42"] = 36,["44"] = 39,["45"] = 40,["48"] = 44,["49"] = 45,["52"] = 49,["53"] = 50,["54"] = 51,["55"] = 53,["56"] = 55,["57"] = 56,["58"] = 57,["60"] = 59,["61"] = 60,["62"] = 61,["65"] = 64,["66"] = 65,["69"] = 69,["70"] = 70,["72"] = 34,["76"] = 78,["77"] = 79,["80"] = 80,["81"] = 81,["82"] = 81,["83"] = 81,["84"] = 81,["86"] = 83,["88"] = 78,["94"] = 93,["95"] = 93,["96"] = 93,["98"] = 94,["99"] = 95,["100"] = 96,["102"] = 98,["103"] = 93,["108"] = 106,["109"] = 107,["110"] = 108,["111"] = 109,["112"] = 110,["115"] = 113,["116"] = 106,["122"] = 123,["123"] = 124,["124"] = 125,["125"] = 126,["126"] = 127,["127"] = 128,["130"] = 131,["132"] = 133,["133"] = 123,["138"] = 141,["139"] = 142,["140"] = 143,["141"] = 144,["142"] = 145,["143"] = 146,["145"] = 148,["146"] = 148,["147"] = 148,["148"] = 148,["150"] = 150,["152"] = 152,["153"] = 141,["158"] = 160,["160"] = 161,["161"] = 161,["162"] = 162,["163"] = 163,["164"] = 163,["165"] = 163,["166"] = 161,["169"] = 165,["170"] = 160,["175"] = 173,["176"] = 174,["177"] = 173,["183"] = 183,["184"] = 183,["185"] = 183,["187"] = 184,["188"] = 185,["190"] = 187,["191"] = 188,["193"] = 189,["194"] = 189,["195"] = 190,["196"] = 189,["199"] = 192,["200"] = 193,["201"] = 194,["204"] = 197,["205"] = 183,["210"] = 205,["211"] = 206,["212"] = 207,["213"] = 208,["214"] = 209,["215"] = 210,["217"] = 212,["220"] = 215,["223"] = 218,["224"] = 205,["230"] = 227,["231"] = 228,["232"] = 229,["233"] = 230,["234"] = 231,["235"] = 232,["236"] = 233,["238"] = 235,["241"] = 238,["245"] = 242,["246"] = 227,["251"] = 250,["252"] = 251,["253"] = 252,["254"] = 253,["255"] = 254,["256"] = 255,["258"] = 257,["259"] = 250,["265"] = 265,["266"] = 265,["267"] = 265,["269"] = 266,["272"] = 267,["273"] = 267,["274"] = 267,["275"] = 267,["276"] = 268,["277"] = 265,["282"] = 276,["283"] = 277,["284"] = 278,["286"] = 280,["287"] = 276,["293"] = 290,["294"] = 291,["295"] = 292,["296"] = 293,["297"] = 294,["300"] = 290,["301"] = 299,["302"] = 300,["303"] = 301,["304"] = 302,["306"] = 304,["307"] = 299,["313"] = 313,["314"] = 313,["315"] = 313,["317"] = 314,["318"] = 315,["319"] = 316,["320"] = 317,["321"] = 313,["326"] = 325,["327"] = 326,["328"] = 327,["329"] = 327,["330"] = 327,["331"] = 327,["332"] = 327,["333"] = 325,["337"] = 334,["338"] = 335,["339"] = 334,["341"] = 341,["342"] = 341,["343"] = 341,["345"] = 342,["346"] = 343,["348"] = 345,["349"] = 346,["350"] = 347,["351"] = 348,["352"] = 349,["353"] = 341,["354"] = 352,["355"] = 353,["356"] = 352,["357"] = 356,["358"] = 357,["359"] = 356,["366"] = 367,["367"] = 368,["368"] = 369,["369"] = 370,["370"] = 371,["372"] = 373,["373"] = 367,["374"] = 376,["375"] = 377,["376"] = 376,["377"] = 380,["378"] = 381,["379"] = 380,["380"] = 384,["381"] = 385,["382"] = 384,["389"] = 395,["390"] = 396,["391"] = 396,["392"] = 396,["393"] = 396,["394"] = 396,["395"] = 395,["400"] = 404,["401"] = 405,["402"] = 404,["403"] = 408,["404"] = 409,["405"] = 410,["407"] = 413,["408"] = 408,["409"] = 416,["410"] = 417,["411"] = 418,["413"] = 421,["414"] = 422,["415"] = 423,["416"] = 416,["422"] = 432,["423"] = 433,["424"] = 434,["425"] = 435,["426"] = 436,["427"] = 437,["428"] = 438,["429"] = 439,["431"] = 441,["433"] = 443,["434"] = 432,["438"] = 452,["439"] = 453,["440"] = 452,["441"] = 457,["442"] = 458,["443"] = 457,["444"] = 460,["445"] = 461,["446"] = 460,["447"] = 464,["448"] = 464,["449"] = 465,["450"] = 466,["451"] = 467,["453"] = 469,["454"] = 464,["455"] = 473,["456"] = 474,["457"] = 473,["458"] = 476,["459"] = 477,["460"] = 476,["461"] = 479,["462"] = 479,["463"] = 480,["464"] = 481,["465"] = 482,["467"] = 484,["468"] = 479,["469"] = 488,["470"] = 489,["471"] = 490,["472"] = 491,["473"] = 492,["475"] = 488,["476"] = 496,["477"] = 497,["478"] = 496,["479"] = 499,["480"] = 499,["481"] = 500,["482"] = 501,["483"] = 502,["485"] = 504,["486"] = 499,["487"] = 508,["488"] = 509,["489"] = 508,["490"] = 511,["491"] = 511,["492"] = 512,["493"] = 513,["494"] = 514,["496"] = 516,["497"] = 511,["498"] = 520,["499"] = 521,["500"] = 522,["502"] = 524,["504"] = 520,["505"] = 527,["506"] = 527,["507"] = 528,["508"] = 529,["509"] = 530,["510"] = 531,["511"] = 532,["514"] = 535,["515"] = 527,["521"] = 544,["522"] = 544,["523"] = 544,["525"] = 545,["526"] = 546,["527"] = 547,["529"] = 549,["530"] = 544,["535"] = 557,["536"] = 558,["537"] = 559,["538"] = 557,["545"] = 568,["546"] = 568,["547"] = 568,["549"] = 569,["550"] = 568,["551"] = 572,["552"] = 573,["553"] = 574,["555"] = 576,["556"] = 577,["557"] = 578,["558"] = 579,["561"] = 582,["562"] = 572,["563"] = 585,["564"] = 586,["565"] = 587,["566"] = 588,["568"] = 590,["569"] = 585,["582"] = 607,["583"] = 607,["584"] = 607,["586"] = 608,["587"] = 608,["588"] = 608,["589"] = 608,["590"] = 608,["591"] = 608,["592"] = 608,["593"] = 608,["594"] = 608,["595"] = 608,["596"] = 608,["597"] = 609,["598"] = 610,["599"] = 611,["600"] = 612,["603"] = 615,["606"] = 619,["607"] = 621,["608"] = 622,["609"] = 623,["610"] = 624,["611"] = 625,["612"] = 626,["613"] = 626,["615"] = 627,["616"] = 629,["617"] = 630,["618"] = 630,["619"] = 630,["620"] = 630,["621"] = 631,["625"] = 635,["626"] = 636,["627"] = 637,["630"] = 641,["631"] = 607,["644"] = 657,["645"] = 657,["646"] = 657,["648"] = 658,["649"] = 658,["650"] = 658,["651"] = 658,["652"] = 658,["653"] = 658,["654"] = 658,["655"] = 658,["656"] = 658,["657"] = 658,["658"] = 658,["659"] = 659,["660"] = 660,["661"] = 661,["662"] = 662,["665"] = 665,["668"] = 669,["669"] = 671,["670"] = 672,["671"] = 673,["672"] = 674,["673"] = 674,["674"] = 674,["675"] = 674,["676"] = 675,["677"] = 676,["678"] = 677,["679"] = 679,["680"] = 677,["681"] = 682,["682"] = 683,["683"] = 685,["684"] = 687,["685"] = 688,["686"] = 689,["687"] = 690,["688"] = 691,["689"] = 692,["690"] = 693,["691"] = 694,["693"] = 696,["694"] = 696,["695"] = 696,["696"] = 696,["697"] = 697,["698"] = 697,["699"] = 697,["700"] = 697,["701"] = 697,["702"] = 698,["703"] = 702,["704"] = 702,["705"] = 702,["706"] = 703,["707"] = 704,["709"] = 702,["710"] = 702,["715"] = 712,["716"] = 713,["717"] = 714,["718"] = 715,["719"] = 716,["720"] = 718,["721"] = 719,["722"] = 719,["723"] = 719,["724"] = 719,["725"] = 720,["728"] = 723,["729"] = 724,["730"] = 725,["733"] = 729,["734"] = 730,["735"] = 731,["736"] = 732,["737"] = 732,["738"] = 732,["739"] = 732,["742"] = 737,["743"] = 738,["745"] = 741,["746"] = 657,["760"] = 758,["761"] = 758,["762"] = 758,["764"] = 759,["765"] = 759,["766"] = 759,["767"] = 759,["768"] = 759,["769"] = 759,["770"] = 759,["771"] = 759,["772"] = 759,["773"] = 759,["774"] = 759,["775"] = 760,["776"] = 761,["777"] = 762,["778"] = 763,["781"] = 766,["784"] = 770,["785"] = 772,["786"] = 773,["787"] = 774,["788"] = 775,["789"] = 776,["790"] = 777,["791"] = 778,["792"] = 788,["793"] = 778,["794"] = 790,["795"] = 791,["796"] = 792,["797"] = 794,["798"] = 795,["799"] = 796,["800"] = 797,["801"] = 798,["802"] = 799,["803"] = 800,["804"] = 801,["805"] = 801,["806"] = 801,["807"] = 801,["808"] = 801,["809"] = 802,["810"] = 803,["811"] = 803,["812"] = 803,["813"] = 803,["814"] = 803,["815"] = 803,["816"] = 803,["817"] = 810,["818"] = 810,["819"] = 810,["820"] = 810,["821"] = 810,["822"] = 810,["823"] = 810,["824"] = 810,["825"] = 810,["826"] = 810,["827"] = 810,["828"] = 810,["829"] = 810,["830"] = 811,["833"] = 814,["834"] = 815,["835"] = 816,["836"] = 816,["837"] = 816,["838"] = 816,["839"] = 816,["840"] = 817,["841"] = 818,["842"] = 818,["843"] = 818,["844"] = 818,["845"] = 818,["846"] = 818,["847"] = 818,["848"] = 825,["850"] = 828,["851"] = 829,["852"] = 830,["853"] = 831,["854"] = 832,["855"] = 834,["856"] = 835,["857"] = 835,["858"] = 835,["859"] = 835,["860"] = 835,["861"] = 835,["862"] = 835,["863"] = 836,["866"] = 839,["867"] = 840,["868"] = 841,["872"] = 846,["873"] = 847,["875"] = 850,["876"] = 758,["877"] = 854,["878"] = 854,["885"] = 871,["886"] = 872,["887"] = 873,["888"] = 873,["889"] = 873,["890"] = 874,["891"] = 875,["893"] = 877,["894"] = 873,["895"] = 873,["896"] = 879,["897"] = 880,["898"] = 871,["904"] = 899,["905"] = 900,["906"] = 901,["907"] = 901,["908"] = 901,["909"] = 902,["910"] = 903,["912"] = 905,["913"] = 901,["914"] = 901,["915"] = 907,["916"] = 908,["917"] = 899,["922"] = 916,["923"] = 917,["924"] = 918,["925"] = 919,["926"] = 920,["931"] = 925,["932"] = 926,["933"] = 927,["935"] = 916,["941"] = 937,["942"] = 938,["943"] = 939,["944"] = 940,["945"] = 941,["946"] = 942,["951"] = 947,["952"] = 948,["953"] = 949,["955"] = 937});
do
    if not _G.print_Engine then
        _G.print_Engine = print
        _G.print = function(...)
            if not IsDedicatedServer() then
                print_Engine(...)
            end
        end
    end
end
--- 获取当前文件路径
function getFileScope()
    local level = 1
    while true do
        local info = debug.getinfo(level, "S")
        if info and info.what == "main" then
            return getfenv(level), info.source
        end
        level = level + 1
    end
end
--- 递归打印表格内容（不遍历 metatable）
-- 
-- @noSelf
function PrintTable(____table, depth, maxDepth)
    if depth == nil then
        depth = 0
    end
    if maxDepth == nil then
        maxDepth = 5
    end
    if depth == 0 then
        print("----------------------------------------PrintTable----------------------------------------")
    end
    if depth > maxDepth then
        print(string.rep("  ", depth) .. "[Max depth reached]")
        return
    end
    if type(____table) ~= "table" then
        print(string.rep("  ", depth) .. tostring(____table))
        return
    end
    for k, v in pairs(____table) do
        local indent = string.rep("  ", depth)
        local keyStr = type(k) == "string" and k or ("[" .. tostring(k)) .. "]"
        if type(v) == "table" then
            local mt = getmetatable(v)
            if mt ~= nil then
                print((indent .. keyStr) .. " = <table with metatable>")
            else
                print((indent .. keyStr) .. " = {")
                PrintTable(v, depth + 1, maxDepth)
                print(indent .. "}")
            end
        else
            local valueStr = type(v) == "string" and ("\"" .. tostring(v)) .. "\"" or tostring(v)
            print(((indent .. keyStr) .. " = ") .. valueStr)
        end
    end
    if depth == 0 then
        print("-------------------------------------------End--------------------------------------------")
    end
end
--- 打印长字符串，超过1000字符时使用链接控制台消息
-- 
-- @noSelf
function PrintLongStr(str, key)
    if IsDedicatedServer() then
        return
    end
    if string.len(str) > 1000 then
        PrintLinkedConsoleMessage(
            type(key) == "string" and tostring(key) .. "\n" or "文字过长，鼠标悬浮以查看详情，若想复制请点击最左侧的方块箭头图标\n",
            str
        )
    else
        print(str, key)
    end
end
--- 转化为有效数字，如不是则返回默认值，默认为0
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为0
-- @returns 返回数字
function FiniteNumber(i, defaultVar)
    if defaultVar == nil then
        defaultVar = 0
    end
    local n = tonumber(i)
    if n ~= nil and __TS__NumberIsFinite(n) then
        return n
    end
    return defaultVar
end
--- 从数组里移除值
-- 
-- @param t 数组
-- @param v 值
function ArrayRemove(t, v)
    for i = #t - 1, 0, -1 do
        if t[i + 1] == v then
            table.remove(t, i + 1)
            return v, i
        end
    end
    return nil, nil
end
--- 浅拷贝
-- 
-- @param orig 任意值
-- @returns 新值
-- @noSelf
function shallowcopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for key, value in pairs(orig) do
            copy[key] = value
        end
    else
        copy = orig
    end
    return copy
end
--- 深拷贝，会把表深度复制
-- 
-- @param orig 任意值
-- @returns 新值
function deepcopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for key, value in pairs(orig) do
            copy[deepcopy(key)] = deepcopy(value)
        end
        setmetatable(
            copy,
            deepcopy(getmetatable(orig))
        )
    else
        copy = orig
    end
    return copy
end
--- 乱序
-- 
-- @param orig_list 数组
-- @returns 数组
function ShuffledList(orig_list)
    do
        local i = #orig_list - 1
        while i > 0 do
            local j = math.random(0, i)
            local ____temp_0 = {orig_list[i + 1], orig_list[j + 1]}
            orig_list[j + 1] = ____temp_0[1]
            orig_list[i + 1] = ____temp_0[2]
            i = i - 1
        end
    end
    return orig_list
end
--- 乱序
-- 
-- @param orig_list 数组
-- @returns 数组
function CopyAndShuffledList(orig_list)
    return ShuffledList(shallowcopy(orig_list))
end
--- 从数组中随机取出几个元素
-- 
-- @param arr 数组
-- @param count 取出数量
-- @param remove 是否从原数组移除取出的元素，默认不移除
function PickList(arr, count, remove)
    if remove == nil then
        remove = false
    end
    if count > #arr then
        return arr
    end
    local copy = remove and ShuffledList(arr) or CopyAndShuffledList(arr)
    local taken = {}
    do
        local i = 0
        while i < count do
            taken[#taken + 1] = copy[i + 1]
            i = i + 1
        end
    end
    if remove then
        for ____, element in ipairs(taken) do
            ArrayRemove(arr, element)
        end
    end
    return taken
end
--- table覆盖，会直接将主表内的值直接覆盖，没有则会新建
-- 
-- @param mainTable
-- @param table
function TableOverride(mainTable, ____table)
    for k in pairs(____table) do
        local v = ____table[k]
        if type(v) == "table" then
            if type(mainTable[k]) == "table" then
                mainTable[k] = TableOverride(mainTable[k], v)
            else
                mainTable[k] = TableOverride({}, v)
            end
        else
            mainTable[k] = v
        end
    end
    return mainTable
end
--- table替换，会检测主表的值是否存在，存在才会进行override
-- 
-- @param mainTable
-- @param table
-- @returns 新表
function TableReplace(mainTable, ____table)
    for k in pairs(____table) do
        if mainTable[k] ~= nil then
            local v = ____table[k]
            if type(v) == "table" then
                if type(mainTable[k]) == "table" then
                    mainTable[k] = TableOverride(mainTable[k], v)
                else
                    mainTable[k] = TableOverride({}, v)
                end
            else
                mainTable[k] = v
            end
        end
    end
    return mainTable
end
--- 获取表里随机一个值
-- 
-- @param t 表
-- @returns 随机值
function RandomValue(t)
    local keys = __TS__ObjectKeys(t)
    if #keys > 0 then
        local i = math.random(0, #keys - 1)
        local k = keys[i + 1]
        return t[k]
    end
    return nil
end
--- 获取表里随机
-- 
-- @param t 表
-- @param num 数量
-- @returns 随机值
function RandomElements(a, num)
    if num == nil then
        num = 1
    end
    if num < 1 then
        return
    end
    __TS__ArraySort(
        a,
        function() return math.random() - 0.5 end
    )
    return __TS__ArraySlice(a, 0, num)
end
--- 获取数组里随机一个值
-- 
-- @param a 数组
-- @returns 值
function GetRandomElement(a)
    if #a > 0 then
        return a[math.random(0, #a - 1) + 1]
    end
    return nil
end
--- 从表里寻找值的键
-- 
-- @param t
-- @param v
-- @returns 找得到的键
function TableFindKey(t, v)
    for key in pairs(t) do
        local _v = t[key]
        if v == _v then
            return key
        end
    end
end
function TableCount(t)
    local n = 0
    for _ in pairs(t) do
        n = n + 1
    end
    return n
end
--- 四舍五入，s为小数点几位
-- 
-- @param fNumber 数
-- @param prec 进度
-- @returns 数
function Round(fNumber, prec)
    if prec == nil then
        prec = 0
    end
    local iSign = fNumber > 0 and 1 or -1
    fNumber = math.abs(fNumber)
    local i = 10 ^ prec
    return iSign * math.floor(fNumber * i + 0.5) / i
end
--- 将c++里传出来的str形式的vector转换为vector
-- 
-- @param str
-- @returns Vector
function StringToVector(str)
    local a = string.split(str, " ")
    return Vector(
        FiniteNumber(a[1]),
        FiniteNumber(a[2]),
        FiniteNumber(a[3])
    )
end
--- 将vector转为为c++传出来的str形式
-- 
-- @param v 矢量
function VectorToString(v)
    return (((tostring(v.x) .. " ") .. tostring(v.y)) .. " ") .. tostring(v.z)
end
--- 以逆时针方向旋转
function Rotation2D(vVector, radian, isDegree)
    if isDegree == nil then
        isDegree = false
    end
    if isDegree then
        radian = math.rad(radian)
    end
    local fLength2D = vVector:Length2D()
    local vUnitVector2D = vVector / fLength2D
    local fCos = math.cos(radian)
    local fSin = math.sin(radian)
    return Vector(vUnitVector2D.x * fCos - vUnitVector2D.y * fSin, vUnitVector2D.x * fSin + vUnitVector2D.y * fCos, vUnitVector2D.z) * fLength2D
end
function Deg2Rad(deg)
    return deg * (math.pi / 180)
end
function Rad2Deg(rad)
    return rad * (180 / math.pi)
end
--- 限定数值区间
-- 
-- @param n 数
-- @param a 最小值
-- @param b 最大值
-- @returns 小于最小值返回最小值，大于最大值返回最大值，否则返回自己
function Clamp(val, min, max)
    if val > max then
        val = max
    elseif val < min then
        val = min
    end
    return val
end
function Lerp(t, a, b)
    return a + t * (b - a)
end
function VectorDistanceSq(v1, v2)
    return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z)
end
function VectorDistance(v1, v2)
    return math.sqrt(VectorDistanceSq(v1, v2))
end
--- 向量值在[0，1]上的线性插值。跟另一个全局函数LerpVectors功能一样
-- 
-- @param t
-- @param a
-- @param b
-- @returns
function VectorLerp(t, a, b)
    return Vector(
        Lerp(t, a.x, b.x),
        Lerp(t, a.y, b.y),
        Lerp(t, a.z, b.z)
    )
end
--- 是否是零向量
-- 
-- @param v
-- @returns
function VectorIsZero(v)
    return v.x == 0 and v.y == 0 and v.z == 0
end
function RemapVal(v, a, b, c, d)
    if a == b then
        return v >= b and d or c
    end
    return c + (d - c) * (v - a) / (b - a)
end
function RemapValClamped(v, a, b, c, d)
    if a == b then
        return v >= b and d or c
    end
    local t = (v - a) / (b - a)
    t = Clamp(t, 0, 1)
    return c + (d - c) * t
end
--- 判断点是否在不规则图形里（不规则图形里是点集，点集每个都是固定住的）
-- 
-- @param point 检测点
-- @param polygonPoints 点数组
-- @returns 点是否在其中
function IsPointInPolygon(point, polygonPoints)
    local j = #polygonPoints - 1
    local bool = 0
    for i = 0, #polygonPoints - 1, 1 do
        local polygonPoint1 = polygonPoints[j + 1]
        local polygonPoint2 = polygonPoints[i + 1]
        if (polygonPoint2.y < point.y and polygonPoint1.y >= point.y or polygonPoint1.y < point.y and polygonPoint2.y >= point.y) and (polygonPoint2.x <= point.x or polygonPoint1.x <= point.x) then
            bool = bit.bxor(bool, polygonPoint2.x + (point.y - polygonPoint2.y) / (polygonPoint1.y - polygonPoint2.y) * (polygonPoint1.x - polygonPoint2.x) < point.x and 1 or 0)
        end
        j = i
    end
    return bool == 1
end
--- 判断一个handle是否有效
-- 
-- @param h handle
function IsValid(h)
    return h ~= nil and not h:IsNull()
end
function CompoundIncreaseSimple(a, b)
    return ((1 + a * 0.01) * (1 + b * 0.01) - 1) * 100
end
function CompoundIncreaseSimple_Reverse(a, b)
    return ((1 + a * 0.01) / (1 + b * 0.01) - 1) * 100
end
function CompoundIncrease(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = ((1 + (V or 0) * 0.01) * (1 + args[i + 1] * 0.01) - 1) * 100
    end
    return V or 0
end
function CompoundDecreaseSimple(a, b)
    return (1 - (1 - a * 0.01) * (1 - b * 0.01)) * 100
end
function CompoundDecreaseSimple_Reverse(a, b)
    return (1 - (1 - a * 0.01) / (1 - b * 0.01)) * 100
end
function CompoundDecrease(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = (1 - (1 - (V or 0) * 0.01) * (1 - args[i + 1] * 0.01)) * 100
    end
    return V or 0
end
function GetReverseSettleFunction(func)
    if func == CompoundIncreaseSimple then
        return CompoundIncreaseSimple_Reverse
    elseif func == CompoundDecreaseSimple then
        return CompoundDecreaseSimple_Reverse
    end
end
function MaximumSimple(a, b)
    return math.max(a, b)
end
function Maximum(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = math.max(V or -math.huge, args[i + 1])
    end
    return V or 0
end
function MinimumSimple(a, b)
    return math.min(a, b)
end
function Minimum(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = math.min(V or math.huge, args[i + 1])
    end
    return V or 0
end
function FirstSimple(a, b)
    if a ~= nil then
        return a
    else
        return b
    end
end
function First(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        local v = args[i + 1]
        if v ~= nil then
            V = v
        end
    end
    return V
end
--- 转化为有效数字，如不是则返回默认值，默认为0
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为0
-- @returns 返回数字
function toFiniteNumber(i, defaultVar)
    if defaultVar == nil then
        defaultVar = 0
    end
    local n = tonumber(i)
    if n ~= nil and __TS__NumberIsFinite(n) then
        return n
    end
    return defaultVar
end
--- 转化为字符串，仅有number、string和boolean这类变量可以转化为字符串，其余会返回undefined
-- 
-- @param i 任意值
-- @returns 返回字符串
function toString(i)
    local t = type(i)
    return (t == "number" or t == "string" or t == "boolean") and tostring(i) or nil
end
--- 转化为有效字符串，如不是则返回默认值，默认为""。
-- 仅有number、string和boolean这类变量可以算作有效的字符串，其余会返回默认值
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为""
-- @returns 返回字符串
function toFiniteString(i, defaultVar)
    if defaultVar == nil then
        defaultVar = ""
    end
    return toString(i) or defaultVar
end
function SimplifyValues(t)
    if #t <= 1 then
        return t
    end
    local first = t[1]
    for ____, v in ipairs(t) do
        if v ~= first then
            return t
        end
    end
    return {first}
end
function GetArrayDefaultLastValidValue(t, index)
    local lastValue = t[#t]
    if index >= #t then
        return lastValue
    end
    return t[index + 1]
end
--- 获取某单位范围内单位最多的单位
-- 
-- @param vSearchPosition 搜索点
-- @param fSearchRange 搜索范围
-- @param iTeamNumber 队伍
-- @param fRadius 范围
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 特殊过滤
-- @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
-- @param exclude 排除单位，可缺省，可以填单位表或者单位
-- @returns 如果没有则会返回undefined
function GetAOEMostTargetsSpellTarget(vSearchPosition, fSearchRange, iTeamNumber, fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
    if iOrder == nil then
        iOrder = FIND_ANY_ORDER
    end
    local aTargets = FindUnitsInRadius(
        iTeamNumber,
        vSearchPosition,
        nil,
        fSearchRange + fRadius,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    if exclude ~= nil then
        if __TS__ArrayIsArray(exclude) then
            for i = 0, #exclude - 1, 1 do
                ArrayRemove(aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(aTargets, exclude)
        end
    end
    local hTarget
    local iMax = 0
    for i = 0, #aTargets - 1, 1 do
        local hFirstTarget = aTargets[i + 1]
        local n = 0
        if hFirstTarget:IsPositionInRange(vSearchPosition, fSearchRange) then
            if hTarget == nil then
                hTarget = hFirstTarget
            end
            for j = 0, #aTargets - 1, 1 do
                local hSecondTarget = aTargets[j + 1]
                if hSecondTarget:IsPositionInRange(
                    hFirstTarget:GetAbsOrigin(),
                    fRadius + hSecondTarget:GetHullRadius()
                ) then
                    n = n + 1
                end
            end
        end
        if n > iMax then
            hTarget = hFirstTarget
            iMax = n
        end
    end
    return hTarget
end
--- 获取一定范围内单位最多的点
-- 
-- @param vSearchPosition 搜索点
-- @param fSearchRange 搜索范围
-- @param iTeamNumber 队伍
-- @param fRadius 范围
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 特殊过滤
-- @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
-- @param exclude 排除单位，可缺省，可以填单位表或者单位
-- @returns 如果没有该点则会返回vec3_invalid
function GetAOEMostTargetsPosition(vSearchPosition, fSearchRange, iTeamNumber, fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
    if iOrder == nil then
        iOrder = FIND_ANY_ORDER
    end
    local aTargets = FindUnitsInRadius(
        iTeamNumber,
        vSearchPosition,
        nil,
        fSearchRange + fRadius,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    if exclude ~= nil then
        if __TS__ArrayIsArray(exclude) then
            for i = 0, #exclude - 1, 1 do
                ArrayRemove(aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(aTargets, exclude)
        end
    end
    local vTargetPosition = vec3_invalid
    if #aTargets == 1 then
        local vDirection = aTargets[1]:GetAbsOrigin() - vSearchPosition
        vDirection.z = 0
        vTargetPosition = vSearchPosition + vDirection:Normalized() * math.min(
            fSearchRange - 1,
            vDirection:Length2D()
        )
    elseif #aTargets > 1 then
        local aPositions = {}
        local function funcInsertCheckPosition(vPosition)
            aPositions[#aPositions + 1] = vPosition
        end
        for i = 0, #aTargets - 1, 1 do
            local hFirstTarget = aTargets[i + 1]
            for j = i + 1, #aTargets - 1, 1 do
                local hSecondTarget = aTargets[j + 1]
                local vDirection = hSecondTarget:GetAbsOrigin() - hFirstTarget:GetAbsOrigin()
                vDirection.z = 0
                local fDistance = vDirection:Length2D()
                if fDistance <= fRadius * 2 and fDistance > 0 then
                    local vMid = (hSecondTarget:GetAbsOrigin() + hFirstTarget:GetAbsOrigin()) / 2
                    if (vMid - vSearchPosition):Length2D() <= fSearchRange then
                        funcInsertCheckPosition(vMid)
                    else
                        local fHalfLength = math.sqrt(bit.bxor(
                            bit.bxor(fRadius, 2 - fDistance / 2),
                            2
                        ))
                        local v = RotatePosition(
                            vec3_zero,
                            QAngle(0, 90, 0),
                            vDirection:Normalized()
                        ) * fHalfLength
                        local p = {vMid - v, vMid + v}
                        __TS__ArrayForEach(
                            p,
                            function(____, vPosition)
                                if (vPosition - vSearchPosition):Length2D() <= fSearchRange then
                                    funcInsertCheckPosition(vPosition)
                                end
                            end
                        )
                    end
                end
            end
        end
        local iMax = 0
        for i = 0, #aPositions - 1, 1 do
            local vPosition = aPositions[i + 1]
            local n = 0
            for j = 0, #aTargets - 1, 1 do
                local hTarget = aTargets[j + 1]
                if hTarget:IsPositionInRange(
                    vPosition,
                    fRadius + hTarget:GetHullRadius()
                ) then
                    n = n + 1
                end
            end
            if n > iMax then
                vTargetPosition = vPosition
                iMax = n
            end
        end
        if vTargetPosition == vec3_invalid then
            local vDirection = aTargets[2]:GetAbsOrigin() - vSearchPosition
            vDirection.z = 0
            vTargetPosition = vSearchPosition + vDirection:Normalized() * math.min(
                fSearchRange - 1,
                vDirection:Length2D()
            )
        end
    end
    if vTargetPosition ~= vec3_invalid then
        vTargetPosition = GetGroundPosition(vTargetPosition, nil)
    end
    return vTargetPosition
end
--- 获取一条线上单位最多的施法点
-- 
-- @param vSearchPosition 搜索点
-- @param fSearchRange 搜索范围
-- @param iTeamNumber 队伍
-- @param fStartWidth 开始宽度
-- @param fEndWidth 结束宽度
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 特殊过滤
-- @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
-- @param exclude 排除单位，可缺省，可以填单位表或者单位
-- @returns 如果没有该点则会返回vec3_invalid
function GetLinearMostTargetsPosition(vSearchPosition, fSearchRange, iTeamNumber, fStartWidth, fEndWidth, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
    if iOrder == nil then
        iOrder = FIND_ANY_ORDER
    end
    local aTargets = FindUnitsInRadius(
        iTeamNumber,
        vSearchPosition,
        nil,
        fSearchRange + fEndWidth,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    if exclude ~= nil then
        if __TS__ArrayIsArray(exclude) then
            for i = 0, #exclude - 1, 1 do
                ArrayRemove(aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(aTargets, exclude)
        end
    end
    local vTargetPosition = vec3_invalid
    if #aTargets == 1 then
        local vDirection = aTargets[2]:GetAbsOrigin() - vSearchPosition
        vDirection.z = 0
        vTargetPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
    elseif #aTargets > 1 then
        local aPolygons = {}
        local function funcInsertCheckPolygon(pPolygon)
            aPolygons[#aPolygons + 1] = pPolygon
        end
        for i = 0, #aTargets - 1, 1 do
            local hFirstTarget = aTargets[i + 1]
            for j = i + 1, #aTargets - 1, 1 do
                local hSecondTarget = aTargets[j + 1]
                local vDirection1 = hFirstTarget:GetAbsOrigin() - vSearchPosition
                vDirection1.z = 0
                local vDirection2 = hSecondTarget:GetAbsOrigin() - vSearchPosition
                vDirection2.z = 0
                local vDirection = (vDirection1 + vDirection2) / 2
                vDirection.z = 0
                local v = RotatePosition(
                    vec3_zero,
                    QAngle(0, 90, 0),
                    vDirection:Normalized()
                )
                local vEndPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
                local pPolygon = {
                    vSearchPosition + v * fStartWidth,
                    vEndPosition + v * fEndWidth,
                    vEndPosition,
                    vEndPosition - v * fEndWidth,
                    vSearchPosition - v * fStartWidth
                }
                if (IsPointInPolygon(
                    hFirstTarget:GetAbsOrigin(),
                    pPolygon
                ) or hFirstTarget:IsPositionInRange(
                    vEndPosition,
                    fEndWidth + hFirstTarget:GetHullRadius()
                )) and (IsPointInPolygon(
                    hSecondTarget:GetAbsOrigin(),
                    pPolygon
                ) or hSecondTarget:IsPositionInRange(
                    vEndPosition,
                    fEndWidth + hSecondTarget:GetHullRadius()
                )) then
                    funcInsertCheckPolygon(pPolygon)
                end
            end
            local vDirection = hFirstTarget:GetAbsOrigin() - vSearchPosition
            vDirection.z = 0
            local v = RotatePosition(
                vec3_zero,
                QAngle(0, 90, 0),
                vDirection:Normalized()
            )
            local vEndPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
            local pPolygon = {
                vSearchPosition + v * fStartWidth,
                vEndPosition + v * fEndWidth,
                vEndPosition,
                vEndPosition - v * fEndWidth,
                vSearchPosition - v * fStartWidth
            }
            funcInsertCheckPolygon(pPolygon)
        end
        local iMax = 0
        for i = 0, #aPolygons - 1, 1 do
            local pPolygon = aPolygons[i + 1]
            local n = 0
            for j = 0, #aTargets - 1, 1 do
                local hTarget = aTargets[j + 1]
                if IsPointInPolygon(
                    hTarget:GetAbsOrigin(),
                    pPolygon
                ) or hTarget:IsPositionInRange(
                    pPolygon[4],
                    fEndWidth + hTarget:GetHullRadius()
                ) then
                    n = n + 1
                end
            end
            if n > iMax then
                vTargetPosition = pPolygon[4]
                iMax = n
            end
        end
    end
    if vTargetPosition ~= vec3_invalid then
        vTargetPosition = GetGroundPosition(vTargetPosition, nil)
    end
    return vTargetPosition
end
if TimerEventListenerIDs == nil then
    TimerEventListenerIDs = {}
end
--- 计时器事件
-- 
-- @param fInterval
-- @param func
-- @param context
function TimerEvent(fInterval, func, context)
    local hGameMode = GameRules:GetGameModeEntity()
    local s = hGameMode:Timer(
        fInterval,
        function()
            if context ~= nil then
                return func(context)
            end
            return func()
        end
    )
    TimerEventListenerIDs[#TimerEventListenerIDs + 1] = s
    return s
end
--- 计时器事件，暂停不会计时
-- 
-- @param fInterval
-- @param func
-- @param context
function GameTimerEvent(fInterval, func, context)
    local hGameMode = GameRules:GetGameModeEntity()
    local s = hGameMode:GameTimer(
        fInterval,
        function()
            if context ~= nil then
                return func(context)
            end
            return func()
        end
    )
    TimerEventListenerIDs[#TimerEventListenerIDs + 1] = s
    return s
end
--- 触发实体的Input事件
-- 
-- @param h 实体Index或实体
-- @param sInputName Input事件名
function FireInputNameOnly(h, sInputName)
    if type(h) == "number" then
        local a = EntIndexToHScript(h)
        if IsValid(a) then
            h = a
        else
            return
        end
    end
    if IsValid(h) then
        local e = h:GetEntityHandle()
        FireEntityIOInputNameOnly(e, sInputName)
    end
end
--- 触发实体的Input事件，附带字符串
-- 
-- @param h 实体Index或实体
-- @param sInputName Input事件名
-- @param sString 字符串
function FireInputString(h, sInputName, sString)
    print((((("FireInputString: " .. tostring(h)) .. " ") .. sInputName) .. " ") .. sString)
    if type(h) == "number" then
        local a = EntIndexToHScript(h)
        if a ~= nil then
            h = a
        else
            return
        end
    end
    if h ~= nil then
        local e = h:GetEntityHandle()
        FireEntityIOInputString(e, sInputName, sString)
    end
end
