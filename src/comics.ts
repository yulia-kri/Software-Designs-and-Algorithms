import { Item } from './item';
import { Pages } from './pages';

export class Comics extends Item {
    constructor(private _title: string, private _author: string, private _artist: string, private pages: Pages) {
        super();
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get author(): string {
        return this._author;
    }

    public set author(name: string) {
        this._author = name;
    }

    public get artist(): string {
        return this._artist;
    }

    public set artist(name: string) {
        this._artist = name;
    }

    public toString(): string {
        return `Comics: ${this._title} by ${this._author}, the artist is ${this._artist}, number of pages: ${this.pages}`;
    }
}
