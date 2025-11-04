local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__Symbol = ____lualib.__TS__Symbol
local Symbol = ____lualib.Symbol
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 1,["14"] = 17,["15"] = 11,["16"] = 12,["17"] = 18,["18"] = 19,["19"] = 20,["21"] = 21,["22"] = 21,["23"] = 22,["24"] = 23,["25"] = 24,["26"] = 21,["29"] = 26,["30"] = 27,["32"] = 29,["33"] = 30,["35"] = 33,["36"] = 34,["38"] = 17,["39"] = 38,["40"] = 39,["41"] = 40,["42"] = 42,["43"] = 44,["44"] = 45,["46"] = 47,["48"] = 38,["49"] = 51,["50"] = 52,["51"] = 53,["53"] = 55,["54"] = 51,["55"] = 58,["56"] = 59,["57"] = 60,["59"] = 62,["60"] = 58,["61"] = 65,["62"] = 66,["63"] = 67,["65"] = 69,["66"] = 65,["67"] = 72,["68"] = 73,["69"] = 74,["71"] = 76,["72"] = 77,["73"] = 78,["74"] = 72,["75"] = 81,["76"] = 82,["79"] = 86,["80"] = 87,["81"] = 89,["82"] = 90,["83"] = 91,["85"] = 93,["86"] = 94,["89"] = 97,["90"] = 98,["92"] = 100,["93"] = 101,["96"] = 105,["97"] = 106,["98"] = 81,["99"] = 109,["100"] = 110,["101"] = 111,["102"] = 112,["103"] = 113,["104"] = 114,["105"] = 115,["106"] = 116,["107"] = 117,["110"] = 120,["111"] = 121,["112"] = 122,["113"] = 123,["117"] = 128,["118"] = 109,["119"] = 131,["120"] = 132,["121"] = 134,["122"] = 135,["124"] = 138,["125"] = 139,["126"] = 140,["127"] = 140,["128"] = 140,["129"] = 140,["130"] = 142,["131"] = 143,["132"] = 144,["134"] = 146,["137"] = 150,["138"] = 151,["139"] = 152,["140"] = 153,["141"] = 131,["142"] = 156,["143"] = 157,["144"] = 158,["145"] = 159,["146"] = 160,["147"] = 156,["148"] = 163,["149"] = 164,["150"] = 164,["151"] = 164,["152"] = 164,["153"] = 165,["154"] = 167,["155"] = 168,["156"] = 169,["157"] = 170,["158"] = 171,["160"] = 174,["163"] = 178,["164"] = 179,["165"] = 163,["166"] = 182,["167"] = 183,["168"] = 183,["169"] = 183,["170"] = 184,["174"] = 182,["175"] = 190,["176"] = 209,["177"] = 191,["178"] = 192,["179"] = 193,["180"] = 194,["181"] = 195,["182"] = 196,["183"] = 198,["184"] = 199,["185"] = 200,["186"] = 201,["187"] = 202,["188"] = 203,["190"] = 206,["191"] = 198,["192"] = 209,["193"] = 210,["194"] = 211,["196"] = 214,["197"] = 215,["198"] = 216,["199"] = 217,["200"] = 209,["201"] = 220,["202"] = 222,["203"] = 223,["205"] = 228,["207"] = 220,["208"] = 190,["209"] = 237,["210"] = 238,["211"] = 237,["212"] = 241,["213"] = 242,["214"] = 241,["215"] = 245,["216"] = 246,["217"] = 245,["218"] = 249,["219"] = 250,["220"] = 251,["221"] = 252,["222"] = 253,["224"] = 255,["226"] = 249,["227"] = 259,["228"] = 260,["229"] = 259,["230"] = 263,["231"] = 264,["232"] = 265,["233"] = 266,["234"] = 268,["236"] = 269,["237"] = 269,["238"] = 270,["239"] = 269,["244"] = 273,["245"] = 273,["246"] = 274,["247"] = 273,["251"] = 263,["252"] = 279,["253"] = 280,["254"] = 281,["256"] = 282,["257"] = 282,["258"] = 283,["259"] = 284,["261"] = 282,["266"] = 288,["267"] = 288,["268"] = 289,["269"] = 290,["271"] = 288,["275"] = 295,["276"] = 279,["277"] = 298,["278"] = 299,["281"] = 303,["284"] = 307,["285"] = 308,["286"] = 310,["287"] = 311,["288"] = 312,["289"] = 313,["290"] = 315,["291"] = 316,["292"] = 317,["293"] = 318,["298"] = 324,["299"] = 325,["300"] = 298,["301"] = 328,["302"] = 329,["305"] = 333,["308"] = 337,["309"] = 338,["310"] = 340,["311"] = 341,["312"] = 342,["313"] = 343,["314"] = 345,["315"] = 346,["316"] = 347,["317"] = 348,["322"] = 354,["323"] = 355,["324"] = 328,["325"] = 358,["326"] = 359,["329"] = 363,["332"] = 367,["333"] = 368,["334"] = 369,["335"] = 371,["337"] = 373,["338"] = 373,["341"] = 374,["342"] = 375,["343"] = 376,["344"] = 378,["346"] = 380,["347"] = 380,["350"] = 381,["351"] = 382,["352"] = 384,["353"] = 385,["354"] = 386,["355"] = 387,["358"] = 391,["361"] = 395,["362"] = 396,["363"] = 397,["365"] = 400,["366"] = 401,["367"] = 358,["368"] = 404,["369"] = 405,["372"] = 409,["375"] = 413,["376"] = 414,["377"] = 415,["378"] = 416,["379"] = 418,["381"] = 420,["382"] = 420,["385"] = 421,["386"] = 422,["387"] = 423,["388"] = 424,["390"] = 426,["391"] = 426,["394"] = 427,["395"] = 428,["396"] = 430,["397"] = 431,["398"] = 432,["399"] = 433,["402"] = 437,["405"] = 441,["406"] = 442,["407"] = 443,["409"] = 446,["410"] = 447,["411"] = 404,["412"] = 2,["413"] = 3,["414"] = 5,["415"] = 7});
local ____exports = {}
____exports.PriorityQueue = __TS__Class()
local PriorityQueue = ____exports.PriorityQueue
PriorityQueue.name = "PriorityQueue"
function PriorityQueue.prototype.____constructor(self, a, comparer)
    self._version = 0
    self._size = 0
    self._elements = {}
    self._priorities = {}
    if __TS__ArrayIsArray(a) then
        do
            local index = 0
            while index < #a do
                local t = a[index + 1]
                self._elements[index + 1] = t[0]
                self._priorities[index + 1] = t[1]
                index = index + 1
            end
        end
        self._size = #a
        self._comparer = comparer
    else
        self._size = 0
        self._comparer = a
    end
    if self._size > 1 then
        self:Heapify()
    end
end
function PriorityQueue.prototype.Enqueue(self, element, priority)
    local currentSize = self._size
    self._version = self._version + 1
    self._size = currentSize + 1
    if self._comparer == nil then
        self:MoveUpDefaultComparer(element, priority, currentSize)
    else
        self:MoveUpCustomComparer(element, priority, currentSize)
    end
end
function PriorityQueue.prototype.Peek(self)
    if self._size == 0 then
        return nil
    end
    return self._elements[1]
end
function PriorityQueue.prototype.PeekPriority(self)
    if self._size == 0 then
        return nil
    end
    return self._priorities[1]
end
function PriorityQueue.prototype.PeekNode(self)
    if self._size == 0 then
        return nil, nil
    end
    return self._elements[1], self._priorities[1]
end
function PriorityQueue.prototype.Dequeue(self)
    if self._size <= 0 then
        return nil
    end
    local element = self._elements[1]
    self:RemoveRootNode()
    return element
end
function PriorityQueue.prototype.DequeueEnqueue(self, element, priority)
    if self._size == 0 then
        return
    end
    local rootElement = self._elements[1]
    local rootPriority = self._priorities[1]
    if self._comparer == nil then
        if ____exports.PriorityQueue:Compare(priority, rootPriority) > 0 then
            self:MoveDownDefaultComparer(element, priority, 0)
        else
            self._elements[1] = element
            self._priorities[1] = priority
        end
    else
        if self:_comparer(priority, rootPriority) > 0 then
            self:MoveDownCustomComparer(element, priority, 0)
        else
            self._elements[1] = element
            self._priorities[1] = priority
        end
    end
    self._version = self._version + 1
    return rootElement
end
function PriorityQueue.prototype.EnqueueDequeue(self, element, priority)
    if self._size ~= 0 then
        local rootElement = self._elements[1]
        local rootPriority = self._priorities[1]
        if self._comparer == nil then
            if ____exports.PriorityQueue:Compare(priority, rootPriority) > 0 then
                self:MoveDownDefaultComparer(element, priority, 0)
                self._version = self._version + 1
                return rootElement
            end
        else
            if self:_comparer(priority, rootPriority) > 0 then
                self:MoveDownCustomComparer(element, priority, 0)
                self._version = self._version + 1
                return rootElement
            end
        end
    end
    return element
end
function PriorityQueue.prototype.Remove(self, element, equalityComparer)
    local index = self:FindIndex(element, equalityComparer)
    if index < 0 then
        return false
    end
    local elements = self._elements
    local priorities = self._priorities
    local ____self_0, ____size_1 = self, "_size"
    local ____self__size_2 = ____self_0[____size_1] - 1
    ____self_0[____size_1] = ____self__size_2
    local newSize = ____self__size_2
    if index < newSize then
        if self._comparer == nil then
            self:MoveUpDefaultComparer(elements[newSize + 1], priorities[newSize + 1], index)
        else
            self:MoveUpCustomComparer(elements[newSize + 1], priorities[newSize + 1], index)
        end
    end
    elements[newSize + 1] = ____exports.PriorityQueue.DefaultElement
    priorities[newSize + 1] = ____exports.PriorityQueue.DefaultPriority
    self._version = self._version + 1
    return true
end
function PriorityQueue.prototype.Clear(self)
    self._elements = {}
    self._priorities = {}
    self._size = 0
    self._version = self._version + 1
end
function PriorityQueue.prototype.RemoveRootNode(self)
    local ____self_3, ____size_4 = self, "_size"
    local ____self__size_5 = ____self_3[____size_4] - 1
    ____self_3[____size_4] = ____self__size_5
    local lastNodeIndex = ____self__size_5
    self._version = self._version + 1
    if lastNodeIndex > 0 then
        local lastNodeElement = self._elements[lastNodeIndex + 1]
        local lastNodePriority = self._priorities[lastNodeIndex + 1]
        if self._comparer == nil then
            self:MoveDownDefaultComparer(lastNodeElement, lastNodePriority, 0)
        else
            self:MoveDownCustomComparer(lastNodeElement, lastNodePriority, 0)
        end
    end
    self._elements[lastNodeIndex + 1] = ____exports.PriorityQueue.DefaultElement
    self._priorities[lastNodeIndex + 1] = ____exports.PriorityQueue.DefaultPriority
end
function PriorityQueue.prototype.Each(self, callback)
    for ____, ____value in __TS__Iterator(self) do
        local element = ____value[1]
        local priority = ____value[2]
        if callback(nil, element, priority) == true then
            return
        end
    end
end
PriorityQueue.prototype[Symbol.iterator] = function(self)
    local moveNextRare
    local elements = self._elements
    local priorities = self._priorities
    local version = self._version
    local index = 0
    local currentElement = ____exports.PriorityQueue.DefaultElement
    local currentPriority = ____exports.PriorityQueue.DefaultPriority
    local function moveNext()
        if version == self._version and index < self._size then
            currentElement = elements[index + 1]
            currentPriority = priorities[index + 1]
            index = index + 1
            return true
        end
        return moveNextRare(nil)
    end
    moveNextRare = function()
        if version ~= self._version then
            error("PriorityQueue was modified when enumerating.", 0)
        end
        index = self._size + 1
        currentElement = ____exports.PriorityQueue.DefaultElement
        currentPriority = ____exports.PriorityQueue.DefaultPriority
        return false
    end
    return {next = function()
        if moveNext(nil) and currentElement ~= ____exports.PriorityQueue.DefaultElement then
            return {value = {currentElement, currentPriority}, done = false}
        else
            return {value = nil, done = true}
        end
    end}
end
function PriorityQueue.prototype.ToElementArray(self)
    return self._elements
end
function PriorityQueue.GetParentIndex(self, index)
    return bit.arshift(index - 1, ____exports.PriorityQueue.Log2Arity)
end
function PriorityQueue.GetFirstChildIndex(self, index)
    return bit.lshift(index, ____exports.PriorityQueue.Log2Arity) + 1
end
function PriorityQueue.Compare(self, a, b)
    if a < b then
        return -1
    elseif a > b then
        return 1
    else
        return 0
    end
end
function PriorityQueue.Equals(self, a, b)
    return a == b
end
function PriorityQueue.prototype.Heapify(self)
    local elements = self._elements
    local priorities = self._priorities
    local lastParentWithChildren = ____exports.PriorityQueue:GetParentIndex(self._size - 1)
    if self._comparer == nil then
        do
            local index = lastParentWithChildren
            while index >= 0 do
                self:MoveDownDefaultComparer(elements[index + 1], priorities[index + 1], index)
                index = index - 1
            end
        end
    else
        do
            local index = lastParentWithChildren
            while index >= 0 do
                self:MoveDownCustomComparer(elements[index + 1], priorities[index + 1], index)
                index = index - 1
            end
        end
    end
end
function PriorityQueue.prototype.FindIndex(self, element, equalityComparer)
    local elements = __TS__ArraySlice(self._elements)
    if equalityComparer == nil then
        do
            local i = 0
            while i < #elements do
                if ____exports.PriorityQueue:Equals(element, elements[i + 1]) then
                    return i
                end
                i = i + 1
            end
        end
    else
        do
            local i = 0
            while i < #elements do
                if equalityComparer(nil, element, elements[i + 1]) then
                    return i
                end
                i = i + 1
            end
        end
    end
    return -1
end
function PriorityQueue.prototype.MoveUpDefaultComparer(self, element, priority, nodeIndex)
    if self._comparer ~= nil then
        return
    end
    if not (0 <= nodeIndex and nodeIndex < self._size) then
        return
    end
    local elements = self._elements
    local priorities = self._priorities
    while nodeIndex > 0 do
        local parentIndex = ____exports.PriorityQueue:GetParentIndex(nodeIndex)
        local parentElement = elements[parentIndex + 1]
        local parentPriority = priorities[parentIndex + 1]
        if ____exports.PriorityQueue:Compare(priority, parentPriority) < 0 then
            elements[nodeIndex + 1] = parentElement
            priorities[nodeIndex + 1] = parentPriority
            nodeIndex = parentIndex
        else
            break
        end
    end
    elements[nodeIndex + 1] = element
    priorities[nodeIndex + 1] = priority
end
function PriorityQueue.prototype.MoveUpCustomComparer(self, element, priority, nodeIndex)
    if self._comparer == nil then
        return
    end
    if not (0 <= nodeIndex and nodeIndex < self._size) then
        return
    end
    local elements = self._elements
    local priorities = self._priorities
    while nodeIndex > 0 do
        local parentIndex = ____exports.PriorityQueue:GetParentIndex(nodeIndex)
        local parentElement = elements[parentIndex + 1]
        local parentPriority = priorities[parentIndex + 1]
        if self:_comparer(priority, parentPriority) < 0 then
            elements[nodeIndex + 1] = parentElement
            priorities[nodeIndex + 1] = parentPriority
            nodeIndex = parentIndex
        else
            break
        end
    end
    elements[nodeIndex + 1] = element
    priorities[nodeIndex + 1] = priority
end
function PriorityQueue.prototype.MoveDownDefaultComparer(self, element, priority, nodeIndex)
    if self._comparer ~= nil then
        return
    end
    if not (0 <= nodeIndex and nodeIndex < self._size) then
        return
    end
    local elements = self._elements
    local priorities = self._priorities
    local size = self._size
    local i
    while true do
        i = ____exports.PriorityQueue:GetFirstChildIndex(nodeIndex)
        if not (i < size) then
            break
        end
        local minChildElement = elements[i + 1]
        local minChildPriority = priorities[i + 1]
        local minChildIndex = i
        local childIndexUpperBound = math.min(i + ____exports.PriorityQueue.Arity, size)
        while true do
            i = i + 1
            if not (i < childIndexUpperBound) then
                break
            end
            local nextChildElement = elements[i + 1]
            local nextChildPriority = priorities[i + 1]
            if ____exports.PriorityQueue:Compare(nextChildPriority, minChildPriority) < 0 then
                minChildElement = nextChildElement
                minChildPriority = nextChildPriority
                minChildIndex = i
            end
        end
        if ____exports.PriorityQueue:Compare(priority, minChildPriority) <= 0 then
            break
        end
        elements[nodeIndex + 1] = minChildElement
        priorities[nodeIndex + 1] = minChildPriority
        nodeIndex = minChildIndex
    end
    elements[nodeIndex + 1] = element
    priorities[nodeIndex + 1] = priority
end
function PriorityQueue.prototype.MoveDownCustomComparer(self, element, priority, nodeIndex)
    if self._comparer == nil then
        return
    end
    if not (0 <= nodeIndex and nodeIndex < self._size) then
        return
    end
    local comparer = self._comparer
    local elements = self._elements
    local priorities = self._priorities
    local size = self._size
    local i
    while true do
        i = ____exports.PriorityQueue:GetFirstChildIndex(nodeIndex)
        if not (i < size) then
            break
        end
        local minChildElement = elements[i + 1]
        local minChildPriority = priorities[i + 1]
        local minChildIndex = i
        local childIndexUpperBound = math.min(i + ____exports.PriorityQueue.Arity, size)
        while true do
            i = i + 1
            if not (i < childIndexUpperBound) then
                break
            end
            local nextChildElement = elements[i + 1]
            local nextChildPriority = priorities[i + 1]
            if comparer(nil, nextChildPriority, minChildPriority) < 0 then
                minChildElement = nextChildElement
                minChildPriority = nextChildPriority
                minChildIndex = i
            end
        end
        if comparer(nil, priority, minChildPriority) <= 0 then
            break
        end
        elements[nodeIndex + 1] = minChildElement
        priorities[nodeIndex + 1] = minChildPriority
        nodeIndex = minChildIndex
    end
    elements[nodeIndex + 1] = element
    priorities[nodeIndex + 1] = priority
end
PriorityQueue.Log2Arity = 2
PriorityQueue.Arity = 4
PriorityQueue.DefaultElement = __TS__Symbol("PriorityQueue.DefaultElement")
PriorityQueue.DefaultPriority = __TS__Symbol("PriorityQueue.DefaultPriority")
return ____exports
