import { Item } from './item';
import { Pages } from './pages';

export class Book extends Item {
    constructor(private _title: string, private _author: string, private pages: Pages) {
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

    public toString(): string {
        return `Book: ${this._title} by ${this._author} with number of pages: ${this.pages}`;
    }
}
