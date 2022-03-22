import { ShipmentItem } from './shipment';

class ShipmentDecorator implements ShipmentItem {
    protected wrappee: ShipmentItem;

    constructor(shipment: ShipmentItem) {
        this.wrappee = shipment;
    }

    public ship(): string {
        return this.wrappee.ship();
    }
}

export class FragileShipmentDecorator extends ShipmentDecorator {
    public ship(): string {
        return this.wrappee.ship() + '\n**MARK FRAGILE**';
    }
}

export class DoNotLeaveShipmentDecorator extends ShipmentDecorator {
    public ship(): string {
        return this.wrappee.ship() + '\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**';
    }
}

export class ReturnReceiptShipmentDecorator extends ShipmentDecorator {
    public ship(): string {
        return this.wrappee.ship() + '\n**MARK RETURN RECEIPT REQUESTED**';
    }
}
