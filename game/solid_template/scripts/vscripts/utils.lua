local ____lualib = require("lualib_bundle")
local __TS__NumberIsFinite = ____lualib.__TS__NumberIsFinite
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 1,["6"] = 2,["7"] = 3,["8"] = 4,["9"] = 5,["10"] = 6,["13"] = 9,["16"] = 14,["17"] = 15,["18"] = 16,["19"] = 17,["20"] = 18,["22"] = 16,["26"] = 27,["27"] = 28,["28"] = 29,["29"] = 30,["30"] = 31,["31"] = 32,["33"] = 35,["35"] = 27,["39"] = 43,["40"] = 43,["41"] = 43,["43"] = 43,["44"] = 43,["46"] = 44,["47"] = 45,["49"] = 48,["50"] = 49,["53"] = 53,["54"] = 54,["57"] = 58,["58"] = 59,["59"] = 60,["60"] = 62,["61"] = 64,["62"] = 65,["63"] = 66,["65"] = 68,["66"] = 69,["67"] = 70,["70"] = 73,["71"] = 74,["74"] = 78,["75"] = 79,["77"] = 43,["81"] = 87,["82"] = 88,["85"] = 89,["86"] = 90,["87"] = 90,["88"] = 90,["89"] = 90,["91"] = 92,["93"] = 87,["99"] = 102,["100"] = 102,["101"] = 102,["103"] = 103,["104"] = 104,["105"] = 105,["107"] = 107,["108"] = 102,["113"] = 115,["114"] = 116,["115"] = 117,["116"] = 118,["117"] = 119,["120"] = 122,["121"] = 115,["127"] = 132,["128"] = 133,["129"] = 134,["130"] = 135,["131"] = 136,["132"] = 137,["135"] = 140,["137"] = 142,["138"] = 132,["143"] = 150,["144"] = 151,["145"] = 152,["146"] = 153,["147"] = 154,["148"] = 155,["150"] = 157,["151"] = 157,["152"] = 157,["153"] = 157,["154"] = 157,["155"] = 157,["156"] = 157,["158"] = 159,["160"] = 161,["161"] = 150,["166"] = 169,["168"] = 170,["169"] = 170,["170"] = 171,["171"] = 172,["172"] = 172,["173"] = 172,["174"] = 170,["177"] = 174,["178"] = 169,["183"] = 182,["184"] = 183,["185"] = 183,["186"] = 183,["187"] = 183,["188"] = 182,["194"] = 192,["195"] = 192,["196"] = 192,["198"] = 193,["199"] = 194,["201"] = 196,["202"] = 197,["204"] = 198,["205"] = 198,["206"] = 199,["207"] = 198,["210"] = 201,["211"] = 202,["212"] = 203,["215"] = 206,["216"] = 192,["221"] = 214,["222"] = 215,["223"] = 216,["224"] = 217,["225"] = 218,["226"] = 219,["228"] = 221,["231"] = 224,["234"] = 227,["235"] = 214,["241"] = 236,["242"] = 237,["243"] = 238,["244"] = 239,["245"] = 240,["246"] = 241,["247"] = 242,["249"] = 244,["252"] = 247,["256"] = 251,["257"] = 236,["263"] = 260,["264"] = 260,["265"] = 260,["267"] = 261,["268"] = 262,["269"] = 263,["270"] = 264,["271"] = 260,["276"] = 272,["277"] = 273,["278"] = 274,["279"] = 274,["280"] = 274,["281"] = 274,["282"] = 274,["283"] = 272,["287"] = 281,["288"] = 282,["289"] = 281,["291"] = 288,["292"] = 288,["293"] = 288,["295"] = 289,["296"] = 290,["298"] = 292,["299"] = 293,["300"] = 294,["301"] = 295,["302"] = 296,["303"] = 288,["307"] = 305,["308"] = 306,["309"] = 305});
if Activated == nil then
    _G.Activated = false
    _G.GameEventListenerIDs = {}
    _G.CustomUIEventListenerIDs = {}
    if IsServer() then
        _G.TimerEventListenerIDs = {}
    end
else
    _G.Activated = true
end
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
--- 判断一个handle是否有效
-- 
-- @param h handle
function IsValid(self, h)
    return h ~= nil and not h:IsNull()
end
