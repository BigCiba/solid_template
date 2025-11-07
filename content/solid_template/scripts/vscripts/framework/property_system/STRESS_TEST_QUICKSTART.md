# PropertySystem 压力测试 - 快速开始

## 🚀 快速运行测试

### 1. 启动游戏

```bash
npm run dev:vscripts  # 启动 VScripts 编译监视
```

进入游戏后，打开控制台。

### 2. 运行测试

```bash
# 小规模测试（推荐首次）
property_test_start_small

# 标准测试（100单位，60秒）
property_test_start

# 大规模测试（200单位，120秒）
property_test_start_large

# 网表体积限制测试
property_test_nettable
```

### 3. 查看进度

```bash
property_test_status
```

输出：
```
=== Test Status ===
Elapsed: 15.32s
Remaining: 44.68s
Updates: 153
Units: 100
Properties: 20
```

### 4. 停止测试

```bash
property_test_stop
```

自动生成详细报告。

## 📊 监控命令

### 实时监控

```bash
# 系统状态
property_status

# 性能统计
property_stats

# 网表体积
property_nettable_size
```

### 示例输出

```bash
property_stats
```

```
=== Performance Stats ===
Total Reads: 12,450
Cache Hits: 11,823 (94.96%)
Total Writes: 6,000
Sync Count: 600
```

## 🎯 测试场景对比

| 命令 | 单位数 | 属性/单位 | 总属性 | 持续时间 | 适用场景 |
|------|--------|-----------|--------|----------|----------|
| `property_test_start_small` | 10 | 10 | 200 | 30s | 快速验证 |
| `property_test_start` | 100 | 20 | 6,000 | 60s | 标准压力 |
| `property_test_start_large` | 200 | 30 | 30,000 | 120s | 极限压力 |
| `property_test_nettable` | 1 | ~200 | ~2,000 | 瞬时 | 体积限制 |

## 🔍 关键指标

### 缓存命中率
- **目标：> 90%**
- 低于 85% 需要调整缓存配置

### 实体体积
- **安全：< 10KB**
- **警告：10-14KB**
- **危险：> 14KB**（接近 16KB 硬限制）

### 同步延迟
- **优秀：< 0.1s**
- **可接受：< 0.2s**
- **需优化：> 0.3s**

## ⚠️ 常见问题

### 测试卡住不动
```bash
property_test_stop  # 强制停止
property_cleanup    # 清理存储
```

### 体积超限警告
```
Warning: UNIT_42 may exceed size limit (15234 bytes)
```

**解决：**
- 减少属性数量
- 减少来源数量
- 禁用部分属性的同步（`syncToClient: false`）

### 缓存命中率低
```
Cache Hits: 2345 (45.23%)
```

**解决：**
- 增加 `cacheDuration`
- 降低更新频率
- 检查是否频繁清理缓存

## 📈 性能基准

基于测试结果的性能基准：

### 标准场景（100单位）
- 总属性：6,000
- 平均体积：~450 字节/单位
- 缓存命中率：~95%
- 同步延迟：< 0.1s
- 内存占用：~2MB

### 大规模场景（200单位）
- 总属性：30,000
- 平均体积：~750 字节/单位
- 缓存命中率：~93%
- 同步延迟：< 0.15s
- 内存占用：~8MB

### 网表限制
- 单实体最大属性：~200 个（10来源）
- 最大安全体积：14KB
- 硬限制：16KB（超过会崩溃）

## 🛠️ 高级测试

### 自定义配置

在控制台中修改配置：

```typescript
// 示例：10单位，50属性，测试体积限制
PropertySystemStressTest.StartStressTest({
  unitCount: 10,
  propertiesPerUnit: 50,
  staticPropertiesPerUnit: 30,
  dynamicPropertiesPerUnit: 20,
  sourcesPerProperty: 8,
  duration: 60,
  updateInterval: 0.05,
  enableNetTableSync: true
});
```

### 测试特定场景

```typescript
// 高频更新测试
PropertySystemStressTest.StartStressTest({
  unitCount: 50,
  propertiesPerUnit: 10,
  sourcesPerProperty: 2,
  duration: 30,
  updateInterval: 0.01  // 每 10ms 更新
});

// 大对象测试
PropertySystemStressTest.StartStressTest({
  unitCount: 5,
  propertiesPerUnit: 100,
  sourcesPerProperty: 10,
  duration: 60,
  updateInterval: 0.5
});
```

## 📝 报告解读

测试结束后的完整报告示例：

```
=== Property System Stress Test Report ===
Duration: 60.05s                    # 实际运行时间
Updates: 600                        # 总更新次数
Average UPS: 9.99                   # 每秒更新次数

=== Performance Stats ===
Total Reads: 12,450                 # 总读取次数
Cache Hits: 11,823 (94.96%)        # 缓存命中率 ✅
Total Writes: 6,000                 # 总写入次数
Sync Count: 600                     # 网表同步次数

=== NetTable Size Stats ===
Total Size: 45,230 bytes            # 总网表体积
Entity Count: 100                   # 实体数量

Top 5 largest entities:             # 最大的5个实体
  UNIT_42: 523 bytes ✅
  UNIT_15: 498 bytes ✅
  UNIT_78: 487 bytes ✅
  UNIT_3: 476 bytes ✅
  UNIT_91: 465 bytes ✅

=== Storage Stats ===
Player Storages: 0
Unit Storages: 100
Dirty Keys: 0                       # 待同步的键（应为0）
```

### 健康指标
- ✅ 缓存命中率 > 90%
- ✅ 实体体积 < 1KB
- ✅ 脏键数量 = 0（测试结束时）
- ✅ 无体积警告

## 🎓 延伸阅读

- [网表优化详细说明](./NETTABLE_OPTIMIZATION.md)
- [属性系统重构总结](./PROPERTY_SYSTEM_REFACTORING_SUMMARY.md)
- [Dota 2 网表使用文档](../../../docs/NETTABLE_GUIDE.md)
