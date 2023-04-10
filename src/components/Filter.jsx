import { useState } from 'react';

const Filter = (props) => {
    const [filterOption, setFilterOption] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleFilterAndSort = () => {
        let requestOption = '?';
        if (sortOption) requestOption += 'sort=-' + sortOption;
        if (filterOption === 'completed') requestOption += '&completed=true';
        else if (filterOption === 'active') requestOption += '&completed=false';
        else if (filterOption === 'no_reminder') requestOption += '&reminder=';
        else if (filterOption === 'with_reminder')
            requestOption += '&reminder[ne]=';
        props.handleFilterAndSort(requestOption);
    };
    return (
        <div class="form-group d-flex justify-content-around">
            <label for="filter">Filter</label>
            <select
                class="form-control w-25"
                id="filter"
                onChange={(e) => {
                    setFilterOption(e.target.value);
                }}
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="no_reminder">No Reminder</option>
                <option value="with_reminder">Has Reminder</option>
            </select>
            <label for="sortBy">Sort By</label>
            <select
                class="form-control w-25"
                id="sortBy"
                onChange={(e) => {
                    setSortOption(e.target.value);
                }}
            >
                <option value="createdAt">Created At</option>
                <option value="reminder">Reminder</option>
            </select>

            <button
                className="btn btn-warning"
                onClick={(e) => {
                    e.preventDefault();
                    handleFilterAndSort();
                }}
            >
                Apply
            </button>
        </div>
    );
};

export default Filter;
