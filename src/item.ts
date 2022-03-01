import { PagesIterableMixin } from './pagesIterable';

export abstract class Item extends PagesIterableMixin() {
    public abstract toString(): string;
}
