import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";

@registerAbility()
export class arcane_bolt_ss extends BaseAbility {
	OnSpellStart(): void {
		const caster = this.GetCaster();
		caster.GetAttachmentPosition("attach_attack1");
	}
}