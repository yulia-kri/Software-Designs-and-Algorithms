export enum PageType {
    Text = 'with text',
    Article = 'with article',
    Image = 'with images',
}

export enum Paper {
    Simple = 'simple paper',
    Glossy = 'glossy paper',
}

export class Page {
    constructor(public pageNumber: number, public pageType: PageType | string, public pageMaterial: Paper | string) {}

    public toString(): string {
        return `here is page ${this.pageType} #${this.pageNumber} and it's material is ${this.pageMaterial}`;
    }
}
