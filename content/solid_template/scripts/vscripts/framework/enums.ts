const vec3_zero = Vector(0, 0, 0);
const vec3_left = Vector(-1, 0, 0);
const vec3_right = Vector(1, 0, 0);
const vec3_top = Vector(0, 1, 0);
const vec3_bottom = Vector(0, -1, 0);

enum AddModifierFlag {
	IGNORE_DEATH = 1 << 0, // 无视死亡
}