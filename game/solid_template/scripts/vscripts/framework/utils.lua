local ____lualib = require("lualib_bundle")
local __TS__NumberIsFinite = ____lualib.__TS__NumberIsFinite
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 4,["12"] = 5,["13"] = 6,["14"] = 7,["15"] = 8,["17"] = 6,["21"] = 17,["22"] = 18,["23"] = 19,["24"] = 20,["25"] = 21,["26"] = 22,["28"] = 25,["30"] = 17,["34"] = 33,["35"] = 33,["36"] = 33,["38"] = 33,["39"] = 33,["41"] = 34,["42"] = 35,["44"] = 38,["45"] = 39,["48"] = 43,["49"] = 44,["52"] = 48,["53"] = 49,["54"] = 50,["55"] = 52,["56"] = 54,["57"] = 55,["58"] = 56,["60"] = 58,["61"] = 59,["62"] = 60,["65"] = 63,["66"] = 64,["69"] = 68,["70"] = 69,["72"] = 33,["76"] = 77,["77"] = 78,["80"] = 79,["81"] = 80,["82"] = 80,["83"] = 80,["84"] = 80,["86"] = 82,["88"] = 77,["94"] = 92,["95"] = 92,["96"] = 92,["98"] = 93,["99"] = 94,["100"] = 95,["102"] = 97,["103"] = 92,["108"] = 105,["109"] = 106,["110"] = 107,["111"] = 108,["112"] = 109,["115"] = 112,["116"] = 105,["122"] = 122,["123"] = 123,["124"] = 124,["125"] = 125,["126"] = 126,["127"] = 127,["130"] = 130,["132"] = 132,["133"] = 122,["138"] = 140,["139"] = 141,["140"] = 142,["141"] = 143,["142"] = 144,["143"] = 145,["145"] = 147,["146"] = 147,["147"] = 147,["148"] = 147,["149"] = 147,["150"] = 147,["151"] = 147,["153"] = 149,["155"] = 151,["156"] = 140,["161"] = 159,["163"] = 160,["164"] = 160,["165"] = 161,["166"] = 162,["167"] = 162,["168"] = 162,["169"] = 160,["172"] = 164,["173"] = 159,["178"] = 172,["179"] = 173,["180"] = 173,["181"] = 173,["182"] = 173,["183"] = 172,["189"] = 182,["190"] = 182,["191"] = 182,["193"] = 183,["194"] = 184,["196"] = 186,["197"] = 187,["199"] = 188,["200"] = 188,["201"] = 189,["202"] = 188,["205"] = 191,["206"] = 192,["207"] = 193,["210"] = 196,["211"] = 182,["216"] = 204,["217"] = 205,["218"] = 206,["219"] = 207,["220"] = 208,["221"] = 209,["223"] = 211,["226"] = 214,["229"] = 217,["230"] = 204,["236"] = 226,["237"] = 227,["238"] = 228,["239"] = 229,["240"] = 230,["241"] = 231,["242"] = 232,["244"] = 234,["247"] = 237,["251"] = 241,["252"] = 226,["257"] = 249,["258"] = 250,["259"] = 251,["260"] = 252,["261"] = 253,["262"] = 254,["264"] = 256,["265"] = 249,["271"] = 264,["272"] = 264,["273"] = 264,["275"] = 265,["278"] = 266,["279"] = 266,["280"] = 266,["281"] = 266,["282"] = 267,["283"] = 264,["288"] = 275,["289"] = 276,["290"] = 277,["292"] = 279,["293"] = 275,["299"] = 289,["300"] = 290,["301"] = 291,["302"] = 292,["303"] = 293,["306"] = 289,["307"] = 298,["308"] = 299,["309"] = 300,["310"] = 301,["312"] = 303,["313"] = 298,["319"] = 312,["320"] = 312,["321"] = 312,["323"] = 313,["324"] = 314,["325"] = 315,["326"] = 316,["327"] = 312,["332"] = 324,["333"] = 325,["334"] = 326,["335"] = 326,["336"] = 326,["337"] = 326,["338"] = 326,["339"] = 324,["343"] = 333,["344"] = 334,["345"] = 333,["347"] = 340,["348"] = 340,["349"] = 340,["351"] = 341,["352"] = 342,["354"] = 344,["355"] = 345,["356"] = 346,["357"] = 347,["358"] = 348,["359"] = 340,["360"] = 351,["361"] = 352,["362"] = 351,["363"] = 355,["364"] = 356,["365"] = 355,["372"] = 366,["373"] = 367,["374"] = 368,["375"] = 369,["376"] = 370,["378"] = 372,["379"] = 366,["380"] = 375,["381"] = 376,["382"] = 375,["383"] = 379,["384"] = 380,["385"] = 379,["386"] = 383,["387"] = 384,["388"] = 383,["395"] = 394,["396"] = 395,["397"] = 395,["398"] = 395,["399"] = 395,["400"] = 395,["401"] = 394,["406"] = 403,["407"] = 404,["408"] = 403,["409"] = 407,["410"] = 408,["411"] = 409,["413"] = 412,["414"] = 407,["415"] = 415,["416"] = 416,["417"] = 417,["419"] = 420,["420"] = 421,["421"] = 422,["422"] = 415,["428"] = 431,["429"] = 432,["430"] = 433,["431"] = 434,["432"] = 435,["433"] = 436,["434"] = 437,["435"] = 438,["437"] = 440,["439"] = 442,["440"] = 431,["444"] = 451,["445"] = 452,["446"] = 451,["447"] = 456,["448"] = 457,["449"] = 456,["450"] = 459,["451"] = 460,["452"] = 459,["453"] = 463,["454"] = 463,["455"] = 464,["456"] = 465,["457"] = 466,["459"] = 468,["460"] = 463,["461"] = 472,["462"] = 473,["463"] = 472,["464"] = 475,["465"] = 476,["466"] = 475,["467"] = 478,["468"] = 478,["469"] = 479,["470"] = 480,["471"] = 481,["473"] = 483,["474"] = 478,["475"] = 487,["476"] = 488,["477"] = 489,["478"] = 490,["479"] = 491,["481"] = 487,["482"] = 495,["483"] = 496,["484"] = 495,["485"] = 498,["486"] = 498,["487"] = 499,["488"] = 500,["489"] = 501,["491"] = 503,["492"] = 498,["493"] = 507,["494"] = 508,["495"] = 507,["496"] = 510,["497"] = 510,["498"] = 511,["499"] = 512,["500"] = 513,["502"] = 515,["503"] = 510,["504"] = 519,["505"] = 520,["506"] = 521,["508"] = 523,["510"] = 519,["511"] = 526,["512"] = 526,["513"] = 527,["514"] = 528,["515"] = 529,["516"] = 530,["517"] = 531,["520"] = 534,["521"] = 526,["527"] = 543,["528"] = 543,["529"] = 543,["531"] = 544,["532"] = 545,["533"] = 546,["535"] = 548,["536"] = 543,["541"] = 556,["542"] = 557,["543"] = 558,["544"] = 556,["551"] = 567,["552"] = 567,["553"] = 567,["555"] = 568,["556"] = 567,["557"] = 571,["558"] = 572,["559"] = 573,["561"] = 575,["562"] = 576,["563"] = 577,["564"] = 578,["567"] = 581,["568"] = 571,["569"] = 584,["570"] = 585,["571"] = 586,["572"] = 587,["574"] = 589,["575"] = 584,["588"] = 606,["589"] = 606,["590"] = 606,["592"] = 607,["593"] = 607,["594"] = 607,["595"] = 607,["596"] = 607,["597"] = 607,["598"] = 607,["599"] = 607,["600"] = 607,["601"] = 607,["602"] = 607,["603"] = 608,["604"] = 609,["605"] = 610,["606"] = 611,["609"] = 614,["612"] = 618,["613"] = 620,["614"] = 621,["615"] = 622,["616"] = 623,["617"] = 624,["618"] = 625,["619"] = 625,["621"] = 626,["622"] = 628,["623"] = 629,["624"] = 629,["625"] = 629,["626"] = 629,["627"] = 630,["631"] = 634,["632"] = 635,["633"] = 636,["636"] = 640,["637"] = 606,["650"] = 656,["651"] = 656,["652"] = 656,["654"] = 657,["655"] = 657,["656"] = 657,["657"] = 657,["658"] = 657,["659"] = 657,["660"] = 657,["661"] = 657,["662"] = 657,["663"] = 657,["664"] = 657,["665"] = 658,["666"] = 659,["667"] = 660,["668"] = 661,["671"] = 664,["674"] = 668,["675"] = 670,["676"] = 671,["677"] = 672,["678"] = 673,["679"] = 673,["680"] = 673,["681"] = 673,["682"] = 674,["683"] = 675,["684"] = 676,["685"] = 678,["686"] = 676,["687"] = 681,["688"] = 682,["689"] = 684,["690"] = 686,["691"] = 687,["692"] = 688,["693"] = 689,["694"] = 690,["695"] = 691,["696"] = 692,["697"] = 693,["699"] = 695,["700"] = 695,["701"] = 695,["702"] = 695,["703"] = 696,["704"] = 696,["705"] = 696,["706"] = 696,["707"] = 696,["708"] = 697,["709"] = 701,["710"] = 701,["711"] = 701,["712"] = 702,["713"] = 703,["715"] = 701,["716"] = 701,["721"] = 711,["722"] = 712,["723"] = 713,["724"] = 714,["725"] = 715,["726"] = 717,["727"] = 718,["728"] = 718,["729"] = 718,["730"] = 718,["731"] = 719,["734"] = 722,["735"] = 723,["736"] = 724,["739"] = 728,["740"] = 729,["741"] = 730,["742"] = 731,["743"] = 731,["744"] = 731,["745"] = 731,["748"] = 736,["749"] = 737,["751"] = 740,["752"] = 656,["766"] = 757,["767"] = 757,["768"] = 757,["770"] = 758,["771"] = 758,["772"] = 758,["773"] = 758,["774"] = 758,["775"] = 758,["776"] = 758,["777"] = 758,["778"] = 758,["779"] = 758,["780"] = 758,["781"] = 759,["782"] = 760,["783"] = 761,["784"] = 762,["787"] = 765,["790"] = 769,["791"] = 771,["792"] = 772,["793"] = 773,["794"] = 774,["795"] = 775,["796"] = 776,["797"] = 777,["798"] = 787,["799"] = 777,["800"] = 789,["801"] = 790,["802"] = 791,["803"] = 793,["804"] = 794,["805"] = 795,["806"] = 796,["807"] = 797,["808"] = 798,["809"] = 799,["810"] = 800,["811"] = 800,["812"] = 800,["813"] = 800,["814"] = 800,["815"] = 801,["816"] = 802,["817"] = 802,["818"] = 802,["819"] = 802,["820"] = 802,["821"] = 802,["822"] = 802,["823"] = 809,["824"] = 809,["825"] = 809,["826"] = 809,["827"] = 809,["828"] = 809,["829"] = 809,["830"] = 809,["831"] = 809,["832"] = 809,["833"] = 809,["834"] = 809,["835"] = 809,["836"] = 809,["837"] = 809,["838"] = 810,["841"] = 813,["842"] = 814,["843"] = 815,["844"] = 815,["845"] = 815,["846"] = 815,["847"] = 815,["848"] = 816,["849"] = 817,["850"] = 817,["851"] = 817,["852"] = 817,["853"] = 817,["854"] = 817,["855"] = 817,["856"] = 824,["858"] = 827,["859"] = 828,["860"] = 829,["861"] = 830,["862"] = 831,["863"] = 833,["864"] = 834,["865"] = 834,["866"] = 834,["867"] = 834,["868"] = 834,["869"] = 834,["870"] = 834,["871"] = 834,["872"] = 835,["875"] = 838,["876"] = 839,["877"] = 840,["881"] = 845,["882"] = 846,["884"] = 849,["885"] = 757,["886"] = 853,["887"] = 853,["894"] = 870,["895"] = 871,["896"] = 872,["897"] = 872,["898"] = 872,["899"] = 873,["900"] = 874,["902"] = 876,["903"] = 872,["904"] = 872,["905"] = 878,["906"] = 879,["907"] = 870,["913"] = 898,["914"] = 899,["915"] = 900,["916"] = 900,["917"] = 900,["918"] = 901,["919"] = 902,["921"] = 904,["922"] = 900,["923"] = 900,["924"] = 906,["925"] = 907,["926"] = 898,["931"] = 915,["932"] = 916,["933"] = 917,["934"] = 918,["935"] = 919,["940"] = 924,["941"] = 925,["942"] = 926,["944"] = 915,["950"] = 936,["951"] = 937,["952"] = 938,["953"] = 939,["954"] = 940,["955"] = 941,["960"] = 946,["961"] = 947,["962"] = 948,["964"] = 936});
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
function getFileScope(self)
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
function FiniteNumber(self, i, defaultVar)
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
function ArrayRemove(self, t, v)
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
function deepcopy(self, orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for key, value in pairs(orig) do
            copy[deepcopy(nil, key)] = deepcopy(nil, value)
        end
        setmetatable(
            copy,
            deepcopy(
                nil,
                getmetatable(orig)
            )
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
function ShuffledList(self, orig_list)
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
function CopyAndShuffledList(self, orig_list)
    return ShuffledList(
        nil,
        shallowcopy(orig_list)
    )
end
--- 从数组中随机取出几个元素
-- 
-- @param arr 数组
-- @param count 取出数量
-- @param remove 是否从原数组移除取出的元素，默认不移除
function PickList(self, arr, count, remove)
    if remove == nil then
        remove = false
    end
    if count > #arr then
        return arr
    end
    local copy = remove and ShuffledList(nil, arr) or CopyAndShuffledList(nil, arr)
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
            ArrayRemove(nil, arr, element)
        end
    end
    return taken
end
--- table覆盖，会直接将主表内的值直接覆盖，没有则会新建
-- 
-- @param mainTable
-- @param table
function TableOverride(self, mainTable, ____table)
    for k in pairs(____table) do
        local v = ____table[k]
        if type(v) == "table" then
            if type(mainTable[k]) == "table" then
                mainTable[k] = TableOverride(nil, mainTable[k], v)
            else
                mainTable[k] = TableOverride(nil, {}, v)
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
function TableReplace(self, mainTable, ____table)
    for k in pairs(____table) do
        if mainTable[k] ~= nil then
            local v = ____table[k]
            if type(v) == "table" then
                if type(mainTable[k]) == "table" then
                    mainTable[k] = TableOverride(nil, mainTable[k], v)
                else
                    mainTable[k] = TableOverride(nil, {}, v)
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
function RandomValue(self, t)
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
function RandomElements(self, a, num)
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
function GetRandomElement(self, a)
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
function TableFindKey(self, t, v)
    for key in pairs(t) do
        local _v = t[key]
        if v == _v then
            return key
        end
    end
end
function TableCount(self, t)
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
function Round(self, fNumber, prec)
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
function StringToVector(self, str)
    local a = string.split(str, " ")
    return Vector(
        FiniteNumber(nil, a[1]),
        FiniteNumber(nil, a[2]),
        FiniteNumber(nil, a[3])
    )
end
--- 将vector转为为c++传出来的str形式
-- 
-- @param v 矢量
function VectorToString(self, v)
    return (((tostring(v.x) .. " ") .. tostring(v.y)) .. " ") .. tostring(v.z)
end
--- 以逆时针方向旋转
function Rotation2D(self, vVector, radian, isDegree)
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
function Deg2Rad(self, deg)
    return deg * (math.pi / 180)
end
function Rad2Deg(self, rad)
    return rad * (180 / math.pi)
end
--- 限定数值区间
-- 
-- @param n 数
-- @param a 最小值
-- @param b 最大值
-- @returns 小于最小值返回最小值，大于最大值返回最大值，否则返回自己
function Clamp(self, val, min, max)
    if val > max then
        val = max
    elseif val < min then
        val = min
    end
    return val
end
function Lerp(self, t, a, b)
    return a + t * (b - a)
end
function VectorDistanceSq(self, v1, v2)
    return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z)
end
function VectorDistance(self, v1, v2)
    return math.sqrt(VectorDistanceSq(nil, v1, v2))
end
--- 向量值在[0，1]上的线性插值。跟另一个全局函数LerpVectors功能一样
-- 
-- @param t
-- @param a
-- @param b
-- @returns
function VectorLerp(self, t, a, b)
    return Vector(
        Lerp(nil, t, a.x, b.x),
        Lerp(nil, t, a.y, b.y),
        Lerp(nil, t, a.z, b.z)
    )
end
--- 是否是零向量
-- 
-- @param v
-- @returns
function VectorIsZero(self, v)
    return v.x == 0 and v.y == 0 and v.z == 0
end
function RemapVal(self, v, a, b, c, d)
    if a == b then
        return v >= b and d or c
    end
    return c + (d - c) * (v - a) / (b - a)
end
function RemapValClamped(self, v, a, b, c, d)
    if a == b then
        return v >= b and d or c
    end
    local t = (v - a) / (b - a)
    t = Clamp(nil, t, 0, 1)
    return c + (d - c) * t
end
--- 判断点是否在不规则图形里（不规则图形里是点集，点集每个都是固定住的）
-- 
-- @param point 检测点
-- @param polygonPoints 点数组
-- @returns 点是否在其中
function IsPointInPolygon(self, point, polygonPoints)
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
function IsValid(self, h)
    return h ~= nil and not h:IsNull()
end
function CompoundIncreaseSimple(self, a, b)
    return ((1 + a * 0.01) * (1 + b * 0.01) - 1) * 100
end
function CompoundIncreaseSimple_Reverse(self, a, b)
    return ((1 + a * 0.01) / (1 + b * 0.01) - 1) * 100
end
function CompoundIncrease(self, ...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = ((1 + (V or 0) * 0.01) * (1 + args[i + 1] * 0.01) - 1) * 100
    end
    return V or 0
end
function CompoundDecreaseSimple(self, a, b)
    return (1 - (1 - a * 0.01) * (1 - b * 0.01)) * 100
end
function CompoundDecreaseSimple_Reverse(self, a, b)
    return (1 - (1 - a * 0.01) / (1 - b * 0.01)) * 100
end
function CompoundDecrease(self, ...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = (1 - (1 - (V or 0) * 0.01) * (1 - args[i + 1] * 0.01)) * 100
    end
    return V or 0
end
function GetReverseSettleFunction(self, func)
    if func == CompoundIncreaseSimple then
        return CompoundIncreaseSimple_Reverse
    elseif func == CompoundDecreaseSimple then
        return CompoundDecreaseSimple_Reverse
    end
end
function MaximumSimple(self, a, b)
    return math.max(a, b)
end
function Maximum(self, ...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = math.max(V or -math.huge, args[i + 1])
    end
    return V or 0
end
function MinimumSimple(self, a, b)
    return math.min(a, b)
end
function Minimum(self, ...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = math.min(V or math.huge, args[i + 1])
    end
    return V or 0
end
function FirstSimple(self, a, b)
    if a ~= nil then
        return a
    else
        return b
    end
end
function First(self, ...)
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
function toFiniteNumber(self, i, defaultVar)
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
function toString(self, i)
    local t = type(i)
    return (t == "number" or t == "string" or t == "boolean") and tostring(i) or nil
end
--- 转化为有效字符串，如不是则返回默认值，默认为""。
-- 仅有number、string和boolean这类变量可以算作有效的字符串，其余会返回默认值
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为""
-- @returns 返回字符串
function toFiniteString(self, i, defaultVar)
    if defaultVar == nil then
        defaultVar = ""
    end
    return toString(nil, i) or defaultVar
end
function SimplifyValues(self, t)
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
function GetArrayDefaultLastValidValue(self, t, index)
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
function GetAOEMostTargetsSpellTarget(self, vSearchPosition, fSearchRange, iTeamNumber, fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
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
                ArrayRemove(nil, aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(nil, aTargets, exclude)
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
function GetAOEMostTargetsPosition(self, vSearchPosition, fSearchRange, iTeamNumber, fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
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
                ArrayRemove(nil, aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(nil, aTargets, exclude)
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
        local function funcInsertCheckPosition(____, vPosition)
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
                        funcInsertCheckPosition(nil, vMid)
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
                                    funcInsertCheckPosition(nil, vPosition)
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
function GetLinearMostTargetsPosition(self, vSearchPosition, fSearchRange, iTeamNumber, fStartWidth, fEndWidth, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
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
                ArrayRemove(nil, aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(nil, aTargets, exclude)
        end
    end
    local vTargetPosition = vec3_invalid
    if #aTargets == 1 then
        local vDirection = aTargets[2]:GetAbsOrigin() - vSearchPosition
        vDirection.z = 0
        vTargetPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
    elseif #aTargets > 1 then
        local aPolygons = {}
        local function funcInsertCheckPolygon(____, pPolygon)
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
                    nil,
                    hFirstTarget:GetAbsOrigin(),
                    pPolygon
                ) or hFirstTarget:IsPositionInRange(
                    vEndPosition,
                    fEndWidth + hFirstTarget:GetHullRadius()
                )) and (IsPointInPolygon(
                    nil,
                    hSecondTarget:GetAbsOrigin(),
                    pPolygon
                ) or hSecondTarget:IsPositionInRange(
                    vEndPosition,
                    fEndWidth + hSecondTarget:GetHullRadius()
                )) then
                    funcInsertCheckPolygon(nil, pPolygon)
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
            funcInsertCheckPolygon(nil, pPolygon)
        end
        local iMax = 0
        for i = 0, #aPolygons - 1, 1 do
            local pPolygon = aPolygons[i + 1]
            local n = 0
            for j = 0, #aTargets - 1, 1 do
                local hTarget = aTargets[j + 1]
                if IsPointInPolygon(
                    nil,
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
function TimerEvent(self, fInterval, func, context)
    local hGameMode = GameRules:GetGameModeEntity()
    local s = hGameMode:Timer(
        fInterval,
        function()
            if context ~= nil then
                return func(nil, context)
            end
            return func(nil)
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
function GameTimerEvent(self, fInterval, func, context)
    local hGameMode = GameRules:GetGameModeEntity()
    local s = hGameMode:GameTimer(
        fInterval,
        function()
            if context ~= nil then
                return func(nil, context)
            end
            return func(nil)
        end
    )
    TimerEventListenerIDs[#TimerEventListenerIDs + 1] = s
    return s
end
--- 触发实体的Input事件
-- 
-- @param h 实体Index或实体
-- @param sInputName Input事件名
function FireInputNameOnly(self, h, sInputName)
    if type(h) == "number" then
        local a = EntIndexToHScript(h)
        if IsValid(nil, a) then
            h = a
        else
            return
        end
    end
    if IsValid(nil, h) then
        local e = h:GetEntityHandle()
        FireEntityIOInputNameOnly(e, sInputName)
    end
end
--- 触发实体的Input事件，附带字符串
-- 
-- @param h 实体Index或实体
-- @param sInputName Input事件名
-- @param sString 字符串
function FireInputString(self, h, sInputName, sString)
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
