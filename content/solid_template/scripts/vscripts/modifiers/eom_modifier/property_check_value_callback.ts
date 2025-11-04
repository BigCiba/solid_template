/** @noSelfInFile */

// 伤害修改通用函数
function PCVC_DamageAdjust(value: any, tParams?: any) {
	if (typeof value == "number" && typeof tParams == "object" && typeof tParams.damage == "number") {
		tParams.damage = tParams.damage + value;
	}
};
// 伤害护盾通用函数，会先将数值取绝对值，然后处理为降低伤害
function PCVC_DamageBarrier(value: any, tParams?: any) {
	if (typeof value == "number" && typeof tParams == "object" && typeof tParams.damage == "number") {
		tParams.damage = tParams.damage - Math.abs(value);
		return -Math.abs(value);
	}
};
// 免死处理
function PCVC_NonLethal(value: any, tParams?: any) {
	if (typeof value == "number" && value > 0 && typeof tParams == "object" && typeof tParams.damage_flags == "number") {
		tParams.damage_flags |= DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NON_LETHAL;
	}
};
// 静态掉落物品，最后把结果都改成0
function PCVC_StaticLoot(value: any, tParams?: any) {
	if (typeof value == "string" && value != "" && typeof tParams == "object" && typeof tParams.loots == "object") {
		table.insert(tParams.loots, value);
	}
	if (typeof value == "object" && typeof tParams == "object" && typeof tParams.loots == "object") {
		for (const [_, v] of ipairs(value)) {
			if (typeof v == "string" && v != "") {
				table.insert(tParams.loots, v);
			}
		}
	}
	return 0;
};