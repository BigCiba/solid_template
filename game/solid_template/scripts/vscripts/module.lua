local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 7,["9"] = 8,["11"] = 10,["12"] = 10,["14"] = 11,["15"] = 17,["17"] = 18,["18"] = 18,["19"] = 19,["20"] = 20,["21"] = 21,["24"] = 18,["27"] = 25,["28"] = 16,["29"] = 12,["30"] = 12,["31"] = 13,["32"] = 14,["33"] = 13,["34"] = 27,["35"] = 28,["36"] = 28,["37"] = 28,["38"] = 28,["39"] = 28,["40"] = 27,["41"] = 30,["42"] = 31,["43"] = 31,["44"] = 31,["45"] = 31,["46"] = 30,["47"] = 33,["48"] = 34,["49"] = 34,["50"] = 34,["51"] = 34,["52"] = 33,["53"] = 36,["54"] = 37,["55"] = 36,["56"] = 39,["57"] = 39,["58"] = 40,["59"] = 41,["60"] = 41,["61"] = 41,["62"] = 41,["63"] = 40});
if _G.Modules == nil then
    _G.Modules = {}
end
CModule = __TS__Class()
CModule.name = "CModule"
function CModule.prototype.____constructor(self)
    self.isModule = true
    local index = 0
    do
        local i = #Modules - 1
        while i >= 0 do
            index = i + 1
            local element = Modules[i + 1]
            if element:initPriority() >= self:initPriority() then
                break
            end
            i = i - 1
        end
    end
    __TS__ArraySplice(Modules, index, 0, self)
end
function CModule.prototype.init(self, reload)
end
function CModule.prototype.initPriority(self)
    return 0
end
function CModule.prototype.dispose(self)
    __TS__ArraySplice(
        Modules,
        __TS__ArrayIndexOf(Modules, self),
        1
    )
end
function CModule.initialize(self)
    __TS__ArrayForEach(
        Modules,
        function(____, m) return m:init(false) end
    )
end
function CModule.reload(self)
    __TS__ArrayForEach(
        Modules,
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
        Modules,
        function(____, m) return m:reset() end
    )
end
