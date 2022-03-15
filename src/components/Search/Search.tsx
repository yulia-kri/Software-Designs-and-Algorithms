import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';

import { SelectorProps } from '../../types';

type SearchProps = SelectorProps;

export function Search(props: SearchProps) {
    const [searchedValue, setSearchedValue] = useState<string>('');

    const { selected, updateSelected } = props;

    const onChange = value => {
        setSearchedValue(value);

        updateSelected({ ...selected, searchValue: value });
    };

    return (
        <OutlinedInput
            className={styles.input}
            placeholder="Search by country/name/username"
            value={searchedValue}
            type="search"
            onChange={e => onChange(e.target.value)}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
        />
    );
}
