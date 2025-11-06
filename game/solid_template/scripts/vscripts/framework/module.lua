local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 7,["9"] = 7,["11"] = 8,["12"] = 8,["14"] = 9,["15"] = 15,["17"] = 16,["18"] = 16,["19"] = 17,["20"] = 18,["21"] = 19,["24"] = 16,["27"] = 23,["28"] = 14,["29"] = 10,["30"] = 10,["31"] = 11,["32"] = 12,["33"] = 11,["34"] = 25,["35"] = 26,["36"] = 26,["37"] = 26,["38"] = 26,["39"] = 26,["40"] = 25,["41"] = 28,["42"] = 29,["43"] = 29,["44"] = 29,["45"] = 29,["46"] = 28,["47"] = 31,["48"] = 32,["49"] = 32,["50"] = 32,["51"] = 33,["52"] = 34,["53"] = 32,["54"] = 32,["55"] = 31,["56"] = 37,["57"] = 38,["58"] = 37,["59"] = 40,["60"] = 40,["61"] = 41,["62"] = 42,["63"] = 42,["64"] = 42,["65"] = 42,["66"] = 41});
if Modules == nil then
    Modules = {}
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
        function(____, m)
            m:init(true)
            print(("[" .. m.constructor.name) .. "]: reload completed")
        end
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
