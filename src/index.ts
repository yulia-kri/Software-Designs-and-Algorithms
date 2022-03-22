import { Client } from './client';
import { Mark } from './shipmentFactory';

const client = Client.getInstance();
client.ship(
    '1313 Mockingbird Lane, Tulsa, OK',
    '12292 4th Ave SE, Bellevue, Wa',
    '67721',
    '92021',
    14,
    Mark.Fragile,
    Mark.DoNotLeave,
);
