import { Context } from './shippers';

export interface ShipmentItem {
    ship(): string;
}

export abstract class Shipment implements ShipmentItem {
    private static counter = 0;
    private readonly shipmentID: number;

    constructor(
        private toAddress: string,
        private fromAddress: string,
        private toZipCode: string,
        private fromZipCode: string,
        private weight: number,
        private context: Context,
    ) {
        this.shipmentID = this.getShipmentID();
    }

    public getWeight(): number {
        return this.weight;
    }

    private getShipmentID(): number {
        return ++Shipment.counter;
    }

    public ship(): string {
        return `Shipment with the ID ${this.shipmentID} will be picked up from ${this.fromAddress} ${
            this.fromZipCode
        } and shipped to ${this.toAddress} ${this.toZipCode}.\nCost = ${this.getCost()}`;
    }

    private getCost(): number {
        return this.context.getCost(this);
    }
}
