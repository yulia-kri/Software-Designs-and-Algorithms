import { Item } from './Item';

export abstract class Weapon extends Item {
    static readonly MODIFIER_CHANGE_RATE = 0.05;
    protected damageModifier: number = Weapon.MODIFIER_CHANGE_RATE;
    protected durabilityModifier: number = Weapon.MODIFIER_CHANGE_RATE;

    constructor(
        name: string,
        protected baseDamage: number,
        protected baseDurability: number,
        value: number,
        weight: number,
    ) {
        super(name, value, weight);
    }

    public abstract polish(): void;

    protected getDamage(): number {
        return this.baseDamage + this.damageModifier;
    }

    protected getDurability(): number {
        return this.baseDurability + this.durabilityModifier;
    }

    public toString(): string {
        const roundDamage = this.roundToNDecimals(this.getDamage(), 2);
        const roundDurability = this.roundToNDecimals(this.getDurability() * 100, 2);
        return `${this.getName()} − Value: ${this.getValue()}, Weight: ${this.getWeight()}, Damage: ${roundDamage}, Durability: ${roundDurability}%"`;
    }

    public use(): string {
        return this.getDurability() > 0
            ? `You use the ${this.getName()}, dealing ${this.getDamage()} points of damage.`
            : `You can't use the ${this.getName()}, it is broken.`;
    }

    private roundToNDecimals(num: number, decimalsNum: number): number {
        const n = Math.pow(10, decimalsNum);
        return Math.round(num * n) / n;
    }
}
