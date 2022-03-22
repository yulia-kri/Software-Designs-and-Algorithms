import { Context } from './shippers';
import { ShipmentItem } from './shipment';
import { Letter, Oversized, Package } from './shipments';
import { DoNotLeaveShipmentDecorator, FragileShipmentDecorator, ReturnReceiptShipmentDecorator } from './decorators';

export enum Mark {
    Fragile = 1,
    DoNotLeave,
    ReturnReceipt,
}

export class ShipmentFactory {
    private readonly maxLetterWeight = 15;
    private readonly maxPackageWeight = 160;

    public createShipment(
        toAddress: string,
        fromAddress: string,
        toZipCode: string,
        fromZipCode: string,
        weight: number,
        context: Context,
        ...marks: Mark[]
    ): ShipmentItem {
        const shipment = this.categorizeShipment(
            toAddress,
            fromAddress,
            toZipCode,
            fromZipCode,
            weight,
            context,
        ) as ShipmentItem;

        return marks?.length ? this.markShipment(shipment, marks) : shipment;
    }

    private categorizeShipment(
        toAddress: string,
        fromAddress: string,
        toZipCode: string,
        fromZipCode: string,
        weight: number,
        context: Context,
    ): ShipmentItem {
        if (weight < this.maxLetterWeight) {
            return new Letter(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
        } else if (weight < this.maxPackageWeight) {
            return new Package(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
        } else {
            return new Oversized(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
        }
    }

    private markShipment(shipment: ShipmentItem, marks: Mark[]): ShipmentItem {
        return marks.reduce((acc, mark) => {
            switch (mark) {
                case Mark.Fragile:
                    return new FragileShipmentDecorator(acc);
                case Mark.DoNotLeave:
                    return new DoNotLeaveShipmentDecorator(acc);
                case Mark.ReturnReceipt:
                    return new ReturnReceiptShipmentDecorator(acc);
                default:
                    return acc;
            }
        }, shipment);
    }
}
