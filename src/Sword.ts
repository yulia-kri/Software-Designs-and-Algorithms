import { Weapon } from './Weapon';

export class Sword extends Weapon {
    static readonly NAME = 'sword';

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(Sword.NAME, baseDamage, baseDurability, value, weight);
    }

    public polish() {
        const MAX_BASE_DAMAGE_RISE = 25;
        const maxDamageModifier = (this.baseDamage * MAX_BASE_DAMAGE_RISE) / 100;
        const increasedDamageModifier = this.damageModifier + Weapon.MODIFIER_CHANGE_RATE;
        if (increasedDamageModifier <= maxDamageModifier) {
            this.damageModifier = increasedDamageModifier;
        }
    }
}
