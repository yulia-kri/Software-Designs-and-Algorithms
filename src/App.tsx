import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account } from './types';

import { dataConverter, filter, search, sort, unique } from './helpers';
import { Selected } from './types';

function App() {
    const [data, setData] = useState<Row[]>(undefined);
    const [displayedData, setDisplayedData] = useState<Row[]>(data);
    const [selected, setSelected] = useState<Selected>({});

    useEffect(() => {
        // fetching data from API
        Promise.all([getImages(), getUsers(), getAccounts()])
            .then(([images, users, accounts]: [Image[], User[], Account[]]) => dataConverter(users, accounts, images))
            .then(rows => {
                setData(rows);
                setDisplayedData(rows);
            });
    }, []);

    useEffect(() => {
        if (data) {
            const { filters, searchValue, sortingOrder } = selected;

            let modifiedData = [];

            if (filters?.length) {
                modifiedData = [...modifiedData, ...filter(data, filters)];
            }

            if (searchValue) {
                modifiedData = [...modifiedData, ...search(data, searchValue)];
            }

            if (filters?.length && searchValue) {
                modifiedData = unique(modifiedData);
            }

            if (!filters?.length && !searchValue) {
                modifiedData = [...data];
            }

            if (sortingOrder) {
                modifiedData = sort(modifiedData, sortingOrder);
            }

            setDisplayedData(modifiedData);
        }
    }, [selected]);

    return (
        <StyledEngineProvider injectFirst>
            <div className="App">
                <div className={styles.container}>
                    <div className={styles.sortFilterContainer}>
                        <Filters selected={selected} updateSelected={setSelected} />
                        <Sort selected={selected} updateSelected={setSelected} />
                    </div>
                    <Search selected={selected} updateSelected={setSelected} />
                </div>
                <Table rows={displayedData} />
            </div>
        </StyledEngineProvider>
    );
}

export default App;
