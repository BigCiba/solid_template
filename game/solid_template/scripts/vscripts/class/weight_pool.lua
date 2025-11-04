local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__New = ____lualib.__TS__New
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 6,["26"] = 21,["27"] = 21,["28"] = 21,["29"] = 27,["30"] = 22,["31"] = 23,["32"] = 24,["33"] = 25,["34"] = 28,["35"] = 29,["36"] = 30,["37"] = 31,["38"] = 32,["39"] = 33,["40"] = 34,["44"] = 27,["45"] = 40,["46"] = 40,["47"] = 40,["49"] = 41,["51"] = 42,["52"] = 43,["54"] = 46,["60"] = 40,["61"] = 52,["62"] = 53,["63"] = 52,["64"] = 56,["65"] = 57,["66"] = 56,["67"] = 60,["68"] = 61,["69"] = 62,["71"] = 64,["72"] = 65,["73"] = 66,["74"] = 67,["75"] = 68,["76"] = 69,["77"] = 70,["79"] = 60,["80"] = 74,["81"] = 75,["82"] = 75,["83"] = 75,["84"] = 75,["85"] = 74,["86"] = 78,["87"] = 79,["88"] = 80,["89"] = 81,["90"] = 82,["91"] = 83,["92"] = 84,["94"] = 78,["95"] = 105,["96"] = 106,["97"] = 107,["99"] = 110,["100"] = 112,["101"] = 114,["103"] = 115,["104"] = 116,["106"] = 119,["107"] = 121,["108"] = 122,["113"] = 105,["114"] = 133,["115"] = 134,["116"] = 136,["117"] = 137,["119"] = 140,["121"] = 141,["122"] = 141,["123"] = 142,["124"] = 141,["127"] = 144,["128"] = 146,["129"] = 148,["131"] = 149,["132"] = 150,["134"] = 153,["136"] = 155,["137"] = 155,["139"] = 156,["140"] = 157,["142"] = 160,["143"] = 161,["144"] = 163,["145"] = 164,["149"] = 155,["155"] = 169,["156"] = 133,["157"] = 179,["158"] = 180,["159"] = 181,["160"] = 182,["161"] = 183,["163"] = 186,["164"] = 188,["165"] = 190,["166"] = 191,["167"] = 192,["168"] = 193,["169"] = 195,["171"] = 196,["172"] = 197,["174"] = 200,["175"] = 201,["176"] = 202,["177"] = 203,["178"] = 205,["179"] = 206,["181"] = 209,["182"] = 210,["183"] = 211,["184"] = 212,["186"] = 215,["187"] = 217,["188"] = 218,["189"] = 220,["190"] = 221,["192"] = 224,["193"] = 226,["194"] = 227,["195"] = 228,["196"] = 229,["197"] = 231,["201"] = 234,["202"] = 179,["203"] = 237,["204"] = 238,["205"] = 237,["210"] = 89,["218"] = 93,["226"] = 97});
local ____exports = {}
local ____priority_queue = require("class.priority_queue")
local PriorityQueue = ____priority_queue.PriorityQueue
local math_pow = math.pow
local math_log = math.log
local math_floor = math.floor
local math_random = math.random
--- 权重池
-- 用于处理各种权重随机计算
-- 
-- 权重池仅提供2个相关参数：
-- item: string | number | symbol
-- weight: number
-- 
-- constructor的参数tList是以item为key，weight为value的表
-- 
-- 例子：const pool = new CWeightPool({})
____exports.CWeightPool = __TS__Class()
local CWeightPool = ____exports.CWeightPool
CWeightPool.name = "CWeightPool"
function CWeightPool.prototype.____constructor(self, tList)
    self._weightData = {}
    self._totalWeight = 0
    self._count = 0
    self._validCount = 0
    if tList ~= nil then
        for item, weight in pairs(tList) do
            self._weightData[item] = weight
            self._totalWeight = self._totalWeight + weight
            self._count = self._count + 1
            if weight > 0 then
                self._validCount = self._validCount + 1
            end
        end
    end
end
function CWeightPool.prototype.Each(self, func, ignoreZero)
    if ignoreZero == nil then
        ignoreZero = false
    end
    for item, weight in pairs(self._weightData) do
        do
            if ignoreZero == true and weight <= 0 then
                goto __continue7
            end
            if func(nil, item, weight) == true then
                return
            end
        end
        ::__continue7::
    end
end
function CWeightPool.prototype.Has(self, item)
    return self._weightData[item] ~= nil
end
function CWeightPool.prototype.Get(self, item)
    return self._weightData[item] or 0
end
function CWeightPool.prototype.Set(self, item, weight)
    if not self:Has(item) then
        self._count = self._count + 1
    end
    local old = self:Get(item)
    self._weightData[item] = weight
    self._totalWeight = self._totalWeight + (weight - old)
    if old > 0 and weight <= 0 then
        self._validCount = self._validCount - 1
    elseif old <= 0 and weight > 0 then
        self._validCount = self._validCount + 1
    end
end
function CWeightPool.prototype.Add(self, item, iWeight)
    self:Set(
        item,
        self:Get(item) + iWeight
    )
end
function CWeightPool.prototype.Remove(self, item)
    local old = self:Get(item)
    __TS__Delete(self._weightData, item)
    self._totalWeight = self._totalWeight - old
    self._count = self._count - 1
    if old > 0 then
        self._validCount = self._validCount - 1
    end
end
function CWeightPool.prototype.Random(self, excluded)
    if self._validCount <= 0 then
        return nil
    end
    local randomNumber = math_random(1, self._totalWeight)
    local cumulativeWeight = 0
    for item, weight in pairs(self._weightData) do
        do
            if weight <= 0 or excluded ~= nil and __TS__ArrayIndexOf(excluded, item) ~= -1 then
                goto __continue21
            end
            cumulativeWeight = cumulativeWeight + weight
            if randomNumber <= cumulativeWeight then
                return item
            end
        end
        ::__continue21::
    end
end
function CWeightPool.prototype.MultipleRandom(self, count, excluded)
    local result = {}
    if self._validCount <= 0 then
        return result
    end
    local randomNumbers = {}
    do
        local i = 0
        while i < count do
            randomNumbers[i + 1] = math_random(1, self._totalWeight)
            i = i + 1
        end
    end
    count = #randomNumbers
    local cumulativeWeight = 0
    for item, weight in pairs(self._weightData) do
        do
            if weight <= 0 or excluded ~= nil and __TS__ArrayIndexOf(excluded, item) ~= -1 then
                goto __continue28
            end
            cumulativeWeight = cumulativeWeight + weight
            do
                local i = #randomNumbers
                while i >= 1 do
                    do
                        if randomNumbers[i] > cumulativeWeight then
                            goto __continue31
                        end
                        result[count - #randomNumbers + 1] = item
                        table.remove(randomNumbers, i)
                        if #randomNumbers <= 0 then
                            return result
                        end
                    end
                    ::__continue31::
                    i = i - 1
                end
            end
        end
        ::__continue28::
    end
    return result
end
function CWeightPool.prototype.MultipleRandomWithoutReplacement(self, count, excluded)
    if self._validCount <= 0 then
        return {}
    elseif count > self._validCount then
        count = self._validCount
    end
    count = math_floor(count)
    local queue = __TS__New(PriorityQueue)
    local Xw = 0 / 0
    local Tw = 0
    local w_acc = 0
    local i = 0
    for item, weight in pairs(self._weightData) do
        do
            if weight <= 0 or excluded ~= nil and __TS__ArrayIndexOf(excluded, item) ~= -1 then
                goto __continue37
            end
            if i < count then
                local u = math_random()
                local k = math_pow(u, 1 / weight)
                queue:Enqueue(item, k)
                i = i + 1
                goto __continue37
            end
            if w_acc == 0 then
                Tw = queue:PeekPriority() or 0
                local r = math_random()
                Xw = math_log(r) / math_log(Tw)
            end
            local w = weight
            if w_acc + w < Xw then
                w_acc = w_acc + w
                i = i + 1
                goto __continue37
            end
            w_acc = 0
            local tw = math_pow(Tw, w)
            local r2 = tw + (1 - tw) * math_random()
            local ki = math_pow(r2, 1 / w)
            queue:DequeueEnqueue(item, ki)
            i = i + 1
        end
        ::__continue37::
    end
    return queue:ToElementArray()
end
function CWeightPool.prototype.Copy(self)
    return __TS__New(____exports.CWeightPool, self._weightData)
end
__TS__SetDescriptor(
    CWeightPool.prototype,
    "Count",
    {get = function(self)
        return self._validCount
    end},
    true
)
__TS__SetDescriptor(
    CWeightPool.prototype,
    "ValidCount",
    {get = function(self)
        return self._validCount
    end},
    true
)
__TS__SetDescriptor(
    CWeightPool.prototype,
    "TotalWeight",
    {get = function(self)
        return self._totalWeight
    end},
    true
)
return ____exports
