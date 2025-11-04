local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["14"] = 1,["15"] = 1,["16"] = 1,["17"] = 19,["18"] = 23,["19"] = 23,["21"] = 24,["22"] = 24,["24"] = 2,["25"] = 10,["26"] = 26,["28"] = 27,["32"] = 29,["34"] = 30,["38"] = 33,["39"] = 34,["40"] = 35,["41"] = 36,["42"] = 37,["44"] = 39,["45"] = 40,["47"] = 42,["48"] = 43,["50"] = 45,["51"] = 18,["52"] = 48,["53"] = 49,["54"] = 50,["55"] = 51,["56"] = 52,["58"] = 54,["60"] = 56,["61"] = 57,["62"] = 58,["64"] = 60,["65"] = 48,["66"] = 63,["67"] = 64,["69"] = 65,["70"] = 65,["71"] = 66,["72"] = 67,["75"] = 65,["79"] = 73,["80"] = 74,["81"] = 75,["83"] = 77,["84"] = 78,["85"] = 78,["87"] = 80,["88"] = 81,["89"] = 82,["92"] = 63,["93"] = 87,["94"] = 88,["95"] = 89,["97"] = 90,["98"] = 90,["99"] = 91,["100"] = 90,["104"] = 94,["105"] = 95,["106"] = 87,["111"] = 12,["119"] = 15});
local ____exports = {}
____exports.ObjectPool = __TS__Class()
local ObjectPool = ____exports.ObjectPool
ObjectPool.name = "ObjectPool"
function ObjectPool.prototype.____constructor(self, createFunc, actionOnGet, actionOnRelease, actionOnDestroy, collectionCheck, maxSize)
    if collectionCheck == nil then
        collectionCheck = true
    end
    if maxSize == nil then
        maxSize = 10000
    end
    self._list = {}
    self.CountAll = 0
    if createFunc == nil then
        error(
            __TS__New(Error, "createFunc is undefined"),
            0
        )
    end
    if maxSize <= 0 then
        error(
            __TS__New(Error, "Max Size must be greater than 0"),
            0
        )
    end
    self._list = {}
    self._createFunc = createFunc
    self._maxSize = maxSize
    if actionOnGet ~= nil then
        self._actionOnGet = actionOnGet
    end
    if actionOnRelease ~= nil then
        self._actionOnRelease = actionOnRelease
    end
    if actionOnDestroy ~= nil then
        self._actionOnDestroy = actionOnDestroy
    end
    self._collectionCheck = collectionCheck
end
function ObjectPool.prototype.Get(self)
    local obj
    if #self._list == 0 then
        obj = self:_createFunc()
        self.CountAll = self.CountAll + 1
    else
        obj = table.remove(self._list)
    end
    local actionOnGet = self._actionOnGet
    if actionOnGet ~= nil then
        actionOnGet(nil, obj)
    end
    return obj
end
function ObjectPool.prototype.Release(self, element)
    if self._collectionCheck and #self._list > 0 then
        do
            local index = 0
            while index < #self._list do
                if element == self._list[index + 1] then
                    print("Trying to release an object that has already been released to the pool.")
                    return
                end
                index = index + 1
            end
        end
    end
    local actionOnRelease = self._actionOnRelease
    if actionOnRelease ~= nil then
        actionOnRelease(nil, element)
    end
    if self.CountInactive < self._maxSize then
        local ____self__list_0 = self._list
        ____self__list_0[#____self__list_0 + 1] = element
    else
        local actionOnDestroy = self._actionOnDestroy
        if actionOnDestroy ~= nil then
            actionOnDestroy(nil, element)
        end
    end
end
function ObjectPool.prototype.Clear(self)
    local actionOnDestroy = self._actionOnDestroy
    if actionOnDestroy ~= nil then
        do
            local index = 0
            while index < #self._list do
                actionOnDestroy(nil, self._list[index + 1])
                index = index + 1
            end
        end
    end
    self._list = {}
    self.CountAll = 0
end
__TS__SetDescriptor(
    ObjectPool.prototype,
    "CountActive",
    {get = function(self)
        return self.CountAll - #self._list
    end},
    true
)
__TS__SetDescriptor(
    ObjectPool.prototype,
    "CountInactive",
    {get = function(self)
        return #self._list
    end},
    true
)
return ____exports
