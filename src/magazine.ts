import { Item } from './item';
import { Pages } from './pages';

export class Magazine extends Item {
    constructor(private _title: string, private pages: Pages) {
        super();
    }

    public get title(): string {
        console.log('getter');
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public toString(): string {
        return `Magazine: ${this._title} with number of pages: ${this.pages.number}`;
    }
}
