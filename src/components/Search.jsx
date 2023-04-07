import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

import { NotificationManager } from 'react-notifications';

const Search = (props) => {
    const [searchKey, setSearchKey] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!searchKey) {
                    NotificationManager.warning('Provide Search Key');
                } else {
                    props.handleSearch(searchKey);
                }
            }}
        >
            <div
                className="form-group"
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <input
                    className="form-control"
                    type="text"
                    id="Add"
                    placeholder="Search Task"
                    onChange={(e) => {
                        if (!e.target.value) {
                            props.handleEmptySeachKey();
                        }

                        setSearchKey(e.target.value);
                    }}
                />
                <button
                    className="btn btn-primary"
                    style={{ marginLeft: '25px', marginRight: '10px' }}
                >
                    <FaSearch />
                </button>
            </div>
        </form>
    );
};

export default Search;
