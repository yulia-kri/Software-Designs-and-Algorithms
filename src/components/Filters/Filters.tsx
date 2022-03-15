import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';

import { SelectorProps } from '../../types';

type FiltersProps = SelectorProps;

const OPTIONS = [
    {
        title: 'Without posts',
    },
    {
        title: 'More than 100 posts',
    },
];

export function Filters(props: FiltersProps) {
    const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

    const { selected, updateSelected } = props;

    const onChange = ({ title }) => {
        let updatedFilters;
        if (selectedFilter.find(filter => filter === title)) {
            updatedFilters = selectedFilter.filter(filter => filter !== title);
        } else {
            updatedFilters = [...selectedFilter, title];
        }

        setSelectedFilter(updatedFilters);

        updateSelected({ ...selected, filters: updatedFilters });
    };

    return (
        <div className={styles.group}>
            <div className={styles.title}>Filter by posts</div>
            <ul className={styles.list}>
                {OPTIONS.map(option => (
                    <li value={option.title} onClick={() => onChange(option)} key={option.title}>
                        <Checkbox
                            checked={!!selectedFilter.find(filter => filter === option.title)}
                            value={option.title}
                            onChange={() => onChange(option)}
                            size="small"
                            color="primary"
                        />{' '}
                        {option.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
