export interface Image {
    userID: string;
    url: string;
}

export interface User {
    userID: string;
    username: string;
    country: string;
    name: string;
}

interface Payment {
    totalSum: number;
    date: string;
}

export interface Account {
    userID: string;
    posts: number;
    payments: Payment[];
}

export type SortingOrderValues = 'asc' | 'desc';

export enum FilterValue {
    moreThan100 = 'More than 100 posts',
    withoutPosts = 'Without posts',
}

export interface Selected {
    filters?: FilterValue[];
    searchValue?: string;
    sortingOrder?: SortingOrderValues;
}

export interface SelectorProps {
    selected?: Selected;
    updateSelected?: (val) => void;
}
