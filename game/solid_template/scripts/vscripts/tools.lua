local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__NumberIsFinite = ____lualib.__TS__NumberIsFinite
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 2,["10"] = 3,["12"] = 5,["13"] = 5,["15"] = 6,["16"] = 12,["18"] = 13,["19"] = 13,["20"] = 14,["21"] = 15,["22"] = 16,["25"] = 13,["28"] = 20,["29"] = 11,["30"] = 7,["31"] = 7,["32"] = 8,["33"] = 9,["34"] = 8,["35"] = 22,["36"] = 23,["37"] = 23,["38"] = 23,["39"] = 23,["40"] = 23,["41"] = 22,["42"] = 25,["43"] = 26,["44"] = 26,["45"] = 26,["46"] = 26,["47"] = 25,["48"] = 28,["49"] = 29,["50"] = 29,["51"] = 29,["52"] = 29,["53"] = 28,["54"] = 31,["55"] = 32,["56"] = 31,["57"] = 34,["58"] = 34,["59"] = 35,["60"] = 36,["61"] = 36,["62"] = 36,["63"] = 36,["64"] = 35,["65"] = 40,["66"] = 41,["67"] = 42,["68"] = 43,["69"] = 44,["70"] = 45,["73"] = 48,["76"] = 53,["77"] = 54,["78"] = 55,["79"] = 56,["80"] = 57,["82"] = 55,["86"] = 66,["87"] = 67,["88"] = 68,["89"] = 69,["90"] = 70,["91"] = 71,["93"] = 74,["95"] = 66,["99"] = 82,["100"] = 82,["101"] = 82,["103"] = 82,["104"] = 82,["106"] = 83,["107"] = 84,["109"] = 87,["110"] = 88,["113"] = 92,["114"] = 93,["117"] = 97,["118"] = 98,["119"] = 99,["120"] = 101,["121"] = 103,["122"] = 104,["123"] = 105,["125"] = 107,["126"] = 108,["127"] = 109,["130"] = 112,["131"] = 113,["134"] = 117,["135"] = 118,["137"] = 82,["141"] = 126,["142"] = 127,["145"] = 128,["146"] = 129,["147"] = 129,["148"] = 129,["149"] = 129,["151"] = 131,["153"] = 126,["159"] = 141,["160"] = 141,["161"] = 141,["163"] = 142,["164"] = 143,["165"] = 144,["167"] = 146,["168"] = 141,["173"] = 154,["174"] = 155,["175"] = 156,["176"] = 157,["177"] = 158,["180"] = 161,["181"] = 154,["187"] = 171,["188"] = 172,["189"] = 173,["190"] = 174,["191"] = 175,["192"] = 176,["195"] = 179,["197"] = 181,["198"] = 171,["203"] = 189,["204"] = 190,["205"] = 191,["206"] = 192,["207"] = 193,["208"] = 194,["210"] = 196,["211"] = 196,["212"] = 196,["213"] = 196,["214"] = 196,["215"] = 196,["216"] = 196,["218"] = 198,["220"] = 200,["221"] = 189,["226"] = 208,["228"] = 209,["229"] = 209,["230"] = 210,["231"] = 211,["232"] = 211,["233"] = 211,["234"] = 209,["237"] = 213,["238"] = 208,["243"] = 221,["244"] = 222,["245"] = 222,["246"] = 222,["247"] = 222,["248"] = 221,["254"] = 231,["255"] = 231,["256"] = 231,["258"] = 232,["259"] = 233,["261"] = 235,["262"] = 236,["264"] = 237,["265"] = 237,["266"] = 238,["267"] = 237,["270"] = 240,["271"] = 241,["272"] = 242,["275"] = 245,["276"] = 231,["281"] = 253,["282"] = 254,["283"] = 255,["284"] = 256,["285"] = 257,["286"] = 258,["288"] = 260,["291"] = 263,["294"] = 266,["295"] = 253,["301"] = 275,["302"] = 276,["303"] = 277,["304"] = 278,["305"] = 279,["306"] = 280,["307"] = 281,["309"] = 283,["312"] = 286,["316"] = 290,["317"] = 275,["323"] = 299,["324"] = 299,["325"] = 299,["327"] = 300,["328"] = 301,["329"] = 302,["330"] = 303,["331"] = 299,["336"] = 311,["337"] = 312,["338"] = 313,["339"] = 313,["340"] = 313,["341"] = 313,["342"] = 313,["343"] = 311,["347"] = 320,["348"] = 321,["349"] = 320,["351"] = 327,["352"] = 327,["353"] = 327,["355"] = 328,["356"] = 329,["358"] = 331,["359"] = 332,["360"] = 333,["361"] = 334,["362"] = 335,["363"] = 327,["367"] = 344,["368"] = 345,["369"] = 344});
if _G.MODULES == nil then
    _G.MODULES = {}
end
CModule = __TS__Class()
CModule.name = "CModule"
function CModule.prototype.____constructor(self)
    self.isModule = true
    local index = 0
    do
        local i = #MODULES - 1
        while i >= 0 do
            index = i + 1
            local element = MODULES[i + 1]
            if element:initPriority() >= self:initPriority() then
                break
            end
            i = i - 1
        end
    end
    __TS__ArraySplice(MODULES, index, 0, self)
end
function CModule.prototype.init(self, reload)
end
function CModule.prototype.initPriority(self)
    return 0
end
function CModule.prototype.dispose(self)
    __TS__ArraySplice(
        MODULES,
        __TS__ArrayIndexOf(MODULES, self),
        1
    )
end
function CModule.initialize(self)
    __TS__ArrayForEach(
        MODULES,
        function(____, m) return m:init(false) end
    )
end
function CModule.reload(self)
    __TS__ArrayForEach(
        MODULES,
        function(____, m) return m:init(true) end
    )
end
function CModule.prototype.print(self, ...)
    print(("[" .. self.constructor.name) .. "]: ", ...)
end
function CModule.prototype.reset(self)
end
function CModule.reset(self)
    __TS__ArrayForEach(
        MODULES,
        function(____, m) return m:reset() end
    )
end
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
