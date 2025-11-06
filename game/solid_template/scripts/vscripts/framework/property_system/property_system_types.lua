local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 2,["6"] = 2,["7"] = 2,["8"] = 2,["9"] = 2,["11"] = 10,["12"] = 10,["13"] = 10,["14"] = 10,["15"] = 10,["16"] = 10,["17"] = 10,["18"] = 10,["19"] = 10,["21"] = 22,["22"] = 22,["23"] = 22,["24"] = 22,["25"] = 22,["26"] = 22,["27"] = 22,["28"] = 22,["29"] = 22,["30"] = 22,["31"] = 22,["32"] = 22,["33"] = 22,["34"] = 22,["35"] = 22});
--- 属性作用域类型
PropertyScope = PropertyScope or ({})
PropertyScope.UNIT = 0
PropertyScope[PropertyScope.UNIT] = "UNIT"
PropertyScope.PLAYER = 1
PropertyScope[PropertyScope.PLAYER] = "PLAYER"
--- 属性值类型
PropertyValueType = PropertyValueType or ({})
PropertyValueType.NUMBER = 0
PropertyValueType[PropertyValueType.NUMBER] = "NUMBER"
PropertyValueType.PERCENTAGE = 1
PropertyValueType[PropertyValueType.PERCENTAGE] = "PERCENTAGE"
PropertyValueType.BOOLEAN = 2
PropertyValueType[PropertyValueType.BOOLEAN] = "BOOLEAN"
PropertyValueType.CUSTOM = 3
PropertyValueType[PropertyValueType.CUSTOM] = "CUSTOM"
--- 聚合策略
AggregationStrategy = AggregationStrategy or ({})
AggregationStrategy.SUM = 0
AggregationStrategy[AggregationStrategy.SUM] = "SUM"
AggregationStrategy.MULTIPLY = 1
AggregationStrategy[AggregationStrategy.MULTIPLY] = "MULTIPLY"
AggregationStrategy.MAX = 2
AggregationStrategy[AggregationStrategy.MAX] = "MAX"
AggregationStrategy.MIN = 3
AggregationStrategy[AggregationStrategy.MIN] = "MIN"
AggregationStrategy.FIRST = 4
AggregationStrategy[AggregationStrategy.FIRST] = "FIRST"
AggregationStrategy.LAST = 5
AggregationStrategy[AggregationStrategy.LAST] = "LAST"
AggregationStrategy.CUSTOM = 6
AggregationStrategy[AggregationStrategy.CUSTOM] = "CUSTOM"
