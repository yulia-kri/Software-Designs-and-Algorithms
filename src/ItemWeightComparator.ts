import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class ItemWeightComparator implements ItemComparator {
    public compare(first: Item, second: Item) {
        if (first.getWeight() === second.getWeight()) {
            return first.compareTo(second);
        }
        return first.getWeight() > second.getWeight() ? 1 : -1;
    }
}
