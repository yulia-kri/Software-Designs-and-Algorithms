import { AirEastShipper, ChicagoSprintShipper, Context, PacificParcelShipper, Shipper } from './shippers';
import { Mark, ShipmentFactory } from './shipmentFactory';

const CHICAGO_SPRINT_SHIPPER_ZIP_CODES = ['4', '5', '6'];
const PACIFIC_PARCEL_SHIPPER_ZIP_CODES = ['7', '8', '9'];

export class Client {
    private static client: Client;
    private shippingCtx = new Context();
    private shipmentFactory = new ShipmentFactory();

    private constructor() {}

    public static getInstance(): Client {
        if (!Client.client) {
            Client.client = new Client();
        }

        return Client.client;
    }

    public ship(
        toAddress: string,
        fromAddress: string,
        toZipCode: string,
        fromZipCode: string,
        weight: number,
        ...marks: Mark[]
    ): void {
        this.shippingCtx.setShipper(this.getShipper(toZipCode));

        const shipment = this.shipmentFactory.createShipment(
            toAddress,
            fromAddress,
            toZipCode,
            fromZipCode,
            weight,
            this.shippingCtx,
            ...marks,
        );

        console.log(shipment.ship());
    }

    private getShipper(toZipCode: string): Shipper {
        const firstZipCodeDigit = toZipCode.charAt(0);

        if (CHICAGO_SPRINT_SHIPPER_ZIP_CODES.includes(firstZipCodeDigit)) {
            return new ChicagoSprintShipper();
        } else if (PACIFIC_PARCEL_SHIPPER_ZIP_CODES.includes(firstZipCodeDigit)) {
            return new PacificParcelShipper();
        } else {
            return new AirEastShipper();
        }
    }
}
