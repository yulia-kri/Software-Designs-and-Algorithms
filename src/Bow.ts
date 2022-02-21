import { Weapon } from './Weapon';

export class Bow extends Weapon {
    static readonly NAME = 'bow';

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(Bow.NAME, baseDamage, baseDurability, value, weight);
    }

    public polish() {
        const maxDurability = 1;
        const increasedDurability = this.getDurability() + Weapon.MODIFIER_CHANGE_RATE;
        if (increasedDurability <= maxDurability) {
            this.durabilityModifier += Weapon.MODIFIER_CHANGE_RATE;
        }
    }
}
