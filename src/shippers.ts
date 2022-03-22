import { Shipment } from './shipment';
import { Oversized, Package } from './shipments';

export interface Shipper {
    getCost(shipment: Shipment): number;
}

abstract class AbstractShipper implements Shipper {
    protected abstract readonly letterShippingRate: number;
    protected abstract readonly packageShippingRate: number;
    protected abstract readonly oversizedShippingRate: number;

    protected isPackage(shipment: Shipment): boolean {
        return shipment instanceof Package;
    }

    protected isOversized(shipment: Shipment): boolean {
        return shipment instanceof Oversized;
    }

    public getCost(shipment: Shipment): number {
        const weight = shipment.getWeight();

        let rate = this.letterShippingRate;

        if (this.isPackage(shipment)) {
            rate = this.packageShippingRate;
        } else if (this.isOversized(shipment)) {
            rate = this.oversizedShippingRate;
        }

        return (weight * rate) / 100;
    }
}

export class AirEastShipper extends AbstractShipper {
    protected readonly letterShippingRate = 39;
    protected readonly packageShippingRate = 25;
    protected readonly oversizedShippingRate = this.letterShippingRate;
    private readonly additionalCharge = 10;

    constructor() {
        super();
    }

    getCost(shipment: Shipment) {
        const cost = super.getCost(shipment);
        return shipment instanceof Oversized ? cost + this.additionalCharge : cost;
    }
}

export class ChicagoSprintShipper extends AbstractShipper {
    protected readonly letterShippingRate = 42;
    protected readonly packageShippingRate = 20;
    protected readonly oversizedShippingRate = 0;

    constructor() {
        super();
    }
}

export class PacificParcelShipper extends AbstractShipper {
    protected readonly letterShippingRate = 51;
    protected readonly packageShippingRate = 19;
    protected readonly oversizedShippingRate = this.letterShippingRate + 2;

    constructor() {
        super();
    }
}

export class Context {
    private shipper!: Shipper;

    public setShipper(s: Shipper) {
        this.shipper = s;
    }

    public getCost(shipment: Shipment): number {
        return this.shipper.getCost(shipment);
    }
}
