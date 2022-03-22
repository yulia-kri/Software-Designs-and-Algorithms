import { Shipment } from './shipment';
import { Context } from './shippers';

export class Letter extends Shipment {
    constructor(
        toAddress: string,
        fromAddress: string,
        toZipCode: string,
        fromZipCode: string,
        weight: number,
        context: Context,
    ) {
        super(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
    }
}

export class Package extends Shipment {
    constructor(
        toAddress: string,
        fromAddress: string,
        toZipCode: string,
        fromZipCode: string,
        weight: number,
        context: Context,
    ) {
        super(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
    }
}

export class Oversized extends Shipment {
    constructor(
        toAddress: string,
        fromAddress: string,
        toZipCode: string,
        fromZipCode: string,
        weight: number,
        context: Context,
    ) {
        super(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
    }
}
