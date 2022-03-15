import { Account, FilterValue, Image, SortingOrderValues, User } from '../types';
import { Row } from '../components';

export const dataConverter = (users: User[], accounts: Account[], images: Image[]): Row[] =>
    users.reduce<Row[]>((rows, user) => {
        const { userID, username, country, name } = user;
        const avatar = images.find(image => image.userID === userID)?.url;
        const { posts, payments } = accounts.find(account => account.userID === userID) ?? {};
        const [lastPayments] =
            payments && payments?.length
                ? payments.sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
                : [{ totalSum: 0 }];

        rows.push({
            avatar,
            username,
            country,
            name,
            lastPayments: lastPayments.totalSum,
            posts,
        });

        return rows;
    }, []);

const filterNoPosts = (data: Row[]) => data.filter(({ posts }) => !posts);

const filterMoreThan100Posts = (data: Row[]) => data.filter(({ posts }) => posts > 100);

export const filter = (data: Row[], selectedFilters: FilterValue[]): Row[] => {
    const filtered = [];

    if (selectedFilters.includes(FilterValue.withoutPosts)) {
        filtered.push(...filterNoPosts(data));
    }

    if (selectedFilters.includes(FilterValue.moreThan100)) {
        filtered.push(...filterMoreThan100Posts(data));
    }

    return filtered;
};

const sortPostsAsc = (data: Row[]): Row[] => data.sort((left, right) => right.posts - left.posts);

const sortPostsDesc = (data: Row[]): Row[] => data.sort((left, right) => left.posts - right.posts);

export const sort = (data: Row[], value: SortingOrderValues): Row[] => {
    if (value === 'asc') {
        return sortPostsAsc(data);
    } else {
        return sortPostsDesc(data);
    }
};

export const search = (data: Row[], searchInput: string): Row[] => {
    const str = searchInput.toLowerCase();
    return data.filter(
        ({ username, country, name }) =>
            username.toLowerCase().includes(str) ||
            country.toLowerCase().includes(str) ||
            name.toLowerCase().includes(str),
    );
};

export const unique = (data: Row[]): Row[] =>
    data.filter(
        (row, index, rows) =>
            index === rows.findIndex(({ name, username }) => name === row.name && username === row.username),
    );
