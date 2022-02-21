import { Consumable } from './Consumable';

export class Pizza extends Consumable {
    static readonly NAME = 'pizza';
    static readonly VALUE = 1;
    static readonly WEIGHT = 0.01;
    private slicesEaten = 0;

    constructor(private numberOfSlices: number, spoiled: boolean) {
        super(Pizza.NAME, Pizza.VALUE, Pizza.WEIGHT, spoiled);
    }

    public eat(): string {
        if (this.slicesEaten < this.numberOfSlices) {
            this.slicesEaten++;

            if (this.slicesEaten >= this.numberOfSlices) {
                this.setConsumed(true);
            }

            return 'You eat a slice of the pizza.';
        } else {
            return '';
        }
    }
}
