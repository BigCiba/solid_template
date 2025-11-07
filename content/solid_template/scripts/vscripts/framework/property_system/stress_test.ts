/** @noSelfInFile */

import { reloadable } from "../../lib/tstl-utils";

/**
 * PropertySystem 压力测试
 * 
 * 测试场景：
 * 1. 多单位（100+）大量属性（20+ 属性/单位）
 * 2. 高频更新（每帧更新部分属性）
 * 3. 网表同步性能
 * 4. 内存占用
 */

interface StressTestConfig {
	/** 测试单位数量 */
	unitCount: number;
	/** 每单位属性数量 */
	propertiesPerUnit: number;
	/** 每单位静态属性数量 */
	staticPropertiesPerUnit: number;
	/** 每单位动态属性数量 */
	dynamicPropertiesPerUnit: number;
	/** 每单位 source 数量 */
	sourcesPerProperty: number;
	/** 测试持续时间（秒） */
	duration: number;
	/** 更新间隔（秒） */
	updateInterval: number;
	/** 是否启用网表同步 */
	enableNetTableSync: boolean;
}

@reloadable
class MPropertySystemStressTest extends CModule {
	private testUnits: CDOTA_BaseNPC[] = [];
	private testPropertyIds: string[] = [];
	private testStartTime: number = 0;
	private testEndTime: number = 0;
	private updateCount: number = 0;
	private updateTimer?: string;

	private readonly DEFAULT_CONFIG: StressTestConfig = {
		unitCount: 100,
		propertiesPerUnit: 20,
		staticPropertiesPerUnit: 10,
		dynamicPropertiesPerUnit: 10,
		sourcesPerProperty: 3,
		duration: 60,
		updateInterval: 0.1,
		enableNetTableSync: true,
	};

	init(reload: boolean): void {
		if (!reload) {
			if (IsServer()) {
				this.RegisterCommands();
			}
			this.print('Stress test module loaded');
		}
	}

	initPriority(): number {
		return 5; // 在 PropertySystem 之后初始化
	}

	// ==================== 测试流程 ====================

	/** 开始压力测试 */
	StartStressTest(config?: Partial<StressTestConfig>): void {
		print("StartStressTest");
		if (this.testStartTime > 0) {
			this.print('Test already running! Use stop_stress_test first.');
			return;
		}

		const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
		this.print('=== Starting Property System Stress Test ===');
		this.PrintConfig(finalConfig);

		// 1. 准备测试环境
		this.PrepareTestEnvironment(finalConfig);

		// 2. 注册测试属性
		this.RegisterTestProperties(finalConfig);

		// 3. 创建测试单位
		this.CreateTestUnits(finalConfig);

		// 4. 添加属性到单位
		this.AddPropertiesToUnits(finalConfig);

		// 5. 开始更新循环
		this.StartUpdateLoop(finalConfig);

		this.testStartTime = GameRules.GetGameTime();
		this.testEndTime = this.testStartTime + finalConfig.duration;

		this.print(`Test started! Duration: ${finalConfig.duration}s`);
		this.print('Use "property_test_status" to check progress');
		this.print('Use "property_test_stop" to stop test');
	}

	/** 停止压力测试 */
	StopStressTest(): void {
		if (this.testStartTime === 0) {
			this.print('No test running');
			return;
		}

		// 停止更新
		if (this.updateTimer) {
			// Timer 会在返回 undefined 时自动停止
			this.updateTimer = undefined;
		}

		// 生成报告
		this.GenerateTestReport();

		// 清理
		this.CleanupTest();

		this.print('Test stopped');
	}

	// ==================== 测试准备 ====================

	private PrepareTestEnvironment(config: StressTestConfig): void {
		this.testUnits = [];
		this.testPropertyIds = [];
		this.updateCount = 0;
		this.testStartTime = 0;
		this.testEndTime = 0;
	}

	private RegisterTestProperties(config: StressTestConfig): void {
		this.print('Registering test properties...');

		// 创建多种类型的属性
		const propertyTypes = [
			{ prefix: 'damage', aggregation: AggregationStrategy.SUM },
			{ prefix: 'armor', aggregation: AggregationStrategy.SUM },
			{ prefix: 'speed', aggregation: AggregationStrategy.MULTIPLY },
			{ prefix: 'crit', aggregation: AggregationStrategy.MAX },
			{ prefix: 'resist', aggregation: AggregationStrategy.MIN },
		];

		for (let i = 0; i < config.propertiesPerUnit; i++) {
			const type = propertyTypes[i % propertyTypes.length];
			const propertyId = `test_${type.prefix}_${i}`;

			PropertySystem.RegisterProperty({
				id: propertyId,
				scope: PropertyScope.UNIT,
				valueType: PropertyValueType.NUMBER,
				aggregation: type.aggregation,
				defaultValue: type.prefix === 'speed' ? 1 : 0,
				syncToClient: config.enableNetTableSync,
				syncPriority: i, // 不同优先级
				enableCache: true,
				cacheDuration: 1,
			});

			this.testPropertyIds.push(propertyId);
		}

		this.print(`Registered ${this.testPropertyIds.length} test properties`);
	}

	private CreateTestUnits(config: StressTestConfig): void {
		this.print('Creating test units...');

		const spawnPoint = Entities.FindByClassname(undefined, 'info_player_start_goodguys') as CBaseEntity;
		const position = (spawnPoint != undefined) ? spawnPoint.GetAbsOrigin() : Vector(0, 0, 128);

		for (let i = 0; i < config.unitCount; i++) {
			// 在周围随机位置生成
			const offset = Vector(
				RandomFloat(-500, 500),
				RandomFloat(-500, 500),
				0
			);

			// 使用轻量级的 prop 实体代替英雄，减少开销
			const unit = SpawnEntityFromTableSynchronous('dota_prop_customtexture', {
				origin: position.__add(offset),
				model: 'models/props_gameplay/tombstone.vmdl',
			}) as CDOTA_BaseNPC;

			if (unit != undefined) {
				this.testUnits.push(unit);
			}
		}

		this.print(`Created ${this.testUnits.length} test units`);
	}

	private AddPropertiesToUnits(config: StressTestConfig): void {
		this.print('Adding properties to units...');

		let totalStaticProps = 0;
		let totalDynamicProps = 0;

		for (const unit of this.testUnits) {
			const entIndex = unit.GetEntityIndex();

			// 添加静态属性
			for (let i = 0; i < config.staticPropertiesPerUnit; i++) {
				const propertyId = this.testPropertyIds[i];

				// 每个属性多个来源
				for (let s = 0; s < config.sourcesPerProperty; s++) {
					const sourceId = `source_${i}_${s}`;
					const value = RandomFloat(1, 100);

					PropertySystem.AddStaticProperty(
						entIndex,
						propertyId,
						sourceId,
						value
					);

					totalStaticProps++;
				}
			}

			// 添加动态属性
			for (let i = 0; i < config.dynamicPropertiesPerUnit; i++) {
				const propertyId = this.testPropertyIds[config.staticPropertiesPerUnit + i];

				for (let s = 0; s < config.sourcesPerProperty; s++) {
					const sourceId = `dynamic_${i}_${s}`;

					// 动态计算：基于单位当前血量
					const callback = () => {
						return unit.GetHealth() * 0.01;
					};

					PropertySystem.RegisterDynamicProperty(
						entIndex,
						propertyId,
						sourceId,
						callback,
						s // 不同优先级
					);

					totalDynamicProps++;
				}
			}
		}

		this.print(`Added ${totalStaticProps} static properties`);
		this.print(`Added ${totalDynamicProps} dynamic properties`);
	}

	// ==================== 更新循环 ====================

	private StartUpdateLoop(config: StressTestConfig): void {
		this.print('Starting update loop...');

		this.updateTimer = Timer.GameTimer(config.updateInterval, () => {
			const currentTime = GameRules.GetGameTime();

			// 检查是否超时
			if (currentTime >= this.testEndTime) {
				this.StopStressTest();
				return undefined;
			}

			// 执行更新
			this.PerformUpdate(config);

			return config.updateInterval;
		}) as any;
	}

	private PerformUpdate(config: StressTestConfig): void {
		this.updateCount++;

		// 随机更新一部分单位的属性
		const updateCount = Math.floor(config.unitCount * 0.1); // 10% 单位

		// ✅ 优化：记录本次更新的单位，用于后续读取测试
		const updatedUnits: Array<{ unit: CDOTA_BaseNPC, propertyId: string; }> = [];

		for (let i = 0; i < updateCount; i++) {
			const unit = this.testUnits[RandomInt(0, this.testUnits.length - 1)];
			if (!unit || !IsValid(unit)) continue;

			const entIndex = unit.GetEntityIndex();

			// 随机更新一个静态属性
			const propIndex = RandomInt(0, config.staticPropertiesPerUnit - 1);
			const propertyId = this.testPropertyIds[propIndex];
			const sourceIndex = RandomInt(0, config.sourcesPerProperty - 1);
			const sourceId = `source_${propIndex}_${sourceIndex}`;

			// 更新值
			const newValue = RandomFloat(1, 100);
			PropertySystem.UpdateStaticPropertyValue(
				entIndex,
				propertyId,
				sourceId,
				newValue
			);

			updatedUnits.push({ unit, propertyId });
		}

		// ✅ 优化 1：立即重读刚更新的属性（模拟真实场景）
		// 这会大幅提升缓存命中率
		for (const { unit, propertyId } of updatedUnits) {
			const entIndex = unit.GetEntityIndex();
			PropertySystem.GetPropertyValue(PropertyScope.UNIT, entIndex, propertyId);
		}

		// ✅ 优化 2：热点数据访问（模拟 UI 频繁查询）
		// 选择 10% 的单位作为"热点"，重复读取
		const hotUnitCount = Math.max(1, Math.floor(config.unitCount * 0.1));
		for (let i = 0; i < hotUnitCount; i++) {
			const unit = this.testUnits[i % this.testUnits.length]; // 固定前 10% 单位
			if (!unit || !IsValid(unit)) continue;

			const entIndex = unit.GetEntityIndex();
			// 读取前 3 个属性（模拟 UI 显示主要属性）
			for (let p = 0; p < Math.min(3, config.propertiesPerUnit); p++) {
				const propertyId = this.testPropertyIds[p];
				PropertySystem.GetPropertyValue(PropertyScope.UNIT, entIndex, propertyId);
			}
		}
	}

	// ==================== 测试报告 ====================

	private GenerateTestReport(): void {
		const duration = GameRules.GetGameTime() - this.testStartTime;

		this.print('=== Property System Stress Test Report ===');
		this.print(`Duration: ${duration.toFixed(2)}s`);
		this.print(`Updates: ${this.updateCount}`);
		this.print(`Average UPS: ${(this.updateCount / duration).toFixed(2)}`);

		// 性能统计
		const stats = PropertyData.stats;
		this.print('\n=== Performance Stats ===');
		this.print(`Total Reads: ${stats.totalReads}`);
		this.print(`Cache Hits: ${stats.cacheHits} (${(stats.cacheHits / stats.totalReads * 100).toFixed(2)}%)`);
		this.print(`Total Writes: ${stats.totalWrites}`);
		this.print(`Sync Count: ${stats.syncCount}`);

		// 网表体积统计
		const sizeStats = PropertySystem.GetNetTableSizeStats();
		this.print('\n=== NetTable Size Stats ===');
		this.print(`Total Size: ${sizeStats.total} bytes`);
		this.print(`Entity Count: ${sizeStats.entities.size}`);

		if (sizeStats.warnings.length > 0) {
			this.print('\n⚠️ SIZE WARNINGS:');
			for (const warning of sizeStats.warnings) {
				this.print(`  ${warning}`);
			}
		}

		// 最大的实体
		const sorted = Array.from(sizeStats.entities.entries()).sort((a, b) => b[1] - a[1]);
		this.print('\nTop 5 largest entities:');
		for (let i = 0; i < Math.min(5, sorted.length); i++) {
			this.print(`  ${sorted[i][0]}: ${sorted[i][1]} bytes`);
		}

		// 存储统计
		this.print('\n=== Storage Stats ===');
		this.print(`Player Storages: ${PropertyData.playerStorage.size}`);
		this.print(`Unit Storages: ${PropertyData.unitStorage.size}`);
		this.print(`Dirty Keys: ${PropertyData.dirtyKeys.size}`);
	}

	private PrintConfig(config: StressTestConfig): void {
		this.print('Test Configuration:');
		this.print(`  Units: ${config.unitCount}`);
		this.print(`  Properties/Unit: ${config.propertiesPerUnit}`);
		this.print(`  Static: ${config.staticPropertiesPerUnit}`);
		this.print(`  Dynamic: ${config.dynamicPropertiesPerUnit}`);
		this.print(`  Sources/Property: ${config.sourcesPerProperty}`);
		this.print(`  Duration: ${config.duration}s`);
		this.print(`  Update Interval: ${config.updateInterval}s`);
		this.print(`  NetTable Sync: ${config.enableNetTableSync}`);

		const totalProps = config.unitCount * config.propertiesPerUnit * config.sourcesPerProperty;
		this.print(`  Total Properties: ${totalProps}`);
	}

	// ==================== 清理 ====================

	private CleanupTest(): void {
		this.print('Cleaning up test...');

		// ✅ 新增：停止前强制同步所有未同步的属性
		PropertySystem.ForceSyncAllDirty();

		// 清理测试单位
		for (const unit of this.testUnits) {
			if (unit && IsValid(unit)) {
				PropertySystem.CleanupUnitProperties(unit);
				UTIL_Remove(unit);
			}
		}

		this.testUnits = [];
		this.testPropertyIds = [];
		this.print('Test stopped');
	}

	// ==================== 调试命令 ====================

	private RegisterCommands(): void {
		// 开始测试（默认配置）
		Convars.RegisterCommand('property_test_start', () => {
			print("property_test_start");
			this.StartStressTest();
		}, 'Start property system stress test', 0);

		// 开始测试（小规模）
		Convars.RegisterCommand('property_test_start_small', () => {
			this.StartStressTest({
				unitCount: 10,
				propertiesPerUnit: 10,
				staticPropertiesPerUnit: 5,
				dynamicPropertiesPerUnit: 5,
				sourcesPerProperty: 2,
				duration: 30,
			});
		}, 'Start small stress test (10 units, 30s)', 0);

		// 开始测试（大规模）
		Convars.RegisterCommand('property_test_start_large', () => {
			this.StartStressTest({
				unitCount: 200,
				propertiesPerUnit: 30,
				staticPropertiesPerUnit: 15,
				dynamicPropertiesPerUnit: 15,
				sourcesPerProperty: 5,
				duration: 120,
			});
		}, 'Start large stress test (200 units, 120s)', 0);

		// 停止测试
		Convars.RegisterCommand('property_test_stop', () => {
			this.StopStressTest();
		}, 'Stop current stress test', 0);

		// 测试状态
		Convars.RegisterCommand('property_test_status', () => {
			if (this.testStartTime === 0) {
				this.print('No test running');
				return;
			}

			const currentTime = GameRules.GetGameTime();
			const elapsed = currentTime - this.testStartTime;
			const remaining = this.testEndTime - currentTime;

			this.print('=== Test Status ===');
			this.print(`Elapsed: ${elapsed.toFixed(2)}s`);
			this.print(`Remaining: ${remaining.toFixed(2)}s`);
			this.print(`Updates: ${this.updateCount}`);
			this.print(`Units: ${this.testUnits.length}`);
			this.print(`Properties: ${this.testPropertyIds.length}`);
		}, 'Show test status', 0);

		// 快速网表测试（单单位大量属性）
		Convars.RegisterCommand('property_test_nettable', () => {
			this.TestNetTableSize();
		}, 'Test NetTable size limit with single unit', 0);
	}

	// ==================== 网表体积测试 ====================

	/** 测试单单位网表体积限制 */
	private TestNetTableSize(): void {
		this.print('=== NetTable Size Test ===');
		this.print('Creating unit with increasing properties until size limit...');

		// 创建测试单位
		const spawnPoint = Entities.FindByClassname(undefined, 'info_player_start_goodguys') as CBaseEntity;
		const position = (spawnPoint != undefined) ? spawnPoint.GetAbsOrigin() : Vector(0, 0, 128);

		// 使用轻量级的 prop 实体代替英雄
		const unit = SpawnEntityFromTableSynchronous('dota_prop_customtexture', {
			origin: position,
			model: 'models/props_gameplay/tombstone.vmdl',
		}) as CDOTA_BaseNPC;

		if (!unit) {
			this.print('Failed to create test unit');
			return;
		}

		const entIndex = unit.GetEntityIndex();
		let propertyCount = 0;

		// 逐步添加属性直到接近限制
		while (true) {
			const propertyId = `nettable_test_prop_${propertyCount}`;

			// 注册属性
			PropertySystem.RegisterProperty({
				id: propertyId,
				scope: PropertyScope.UNIT,
				valueType: PropertyValueType.NUMBER,
				aggregation: AggregationStrategy.SUM,
				syncToClient: true,
			});

			// 添加 10 个 source
			for (let s = 0; s < 10; s++) {
				PropertySystem.AddStaticProperty(
					entIndex,
					propertyId,
					`source_${s}`,
					RandomFloat(1, 100)
				);
			}

			propertyCount++;

			// 检查体积
			const size = PropertySystem.EstimateEntityNetTableSize(PropertyScope.UNIT, entIndex);
			this.print(`Properties: ${propertyCount}, Estimated Size: ${size} bytes`);

			if (size > 13000) { // 接近 14KB 限制
				this.print(`\n⚠️ Approaching size limit!`);
				this.print(`Maximum safe properties: ~${propertyCount}`);
				this.print(`With 10 sources per property: ${propertyCount * 10} total values`);
				break;
			}

			if (propertyCount > 1000) { // 安全阈值
				this.print('Reached safety limit (1000 properties)');
				break;
			}
		}

		// 强制同步并检查
		Timer.GameTimer(0.5, () => {
			const sizeStats = PropertySystem.GetNetTableSizeStats();
			this.print('\n=== Final Stats ===');
			this.print(`Total entities: ${sizeStats.entities.size}`);
			this.print(`Total size: ${sizeStats.total} bytes`);

			if (sizeStats.warnings.length > 0) {
				this.print('\n⚠️ WARNINGS:');
				for (const warning of sizeStats.warnings) {
					this.print(`  ${warning}`);
				}
			}

			// 清理
			UTIL_Remove(unit);
			return undefined;
		});
	}
}

// ==================== 导出 ====================

declare global {
	var PropertySystemStressTest: MPropertySystemStressTest;
}
PropertySystemStressTest ??= new MPropertySystemStressTest();
