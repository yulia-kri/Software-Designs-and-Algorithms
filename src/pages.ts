import { Page } from './page';

export class Pages {
    constructor(private pages: Page[]) {}

    public get number(): number {
        return this.pages.length;
    }
}
