import classNames from 'classnames/bind';
import styles from './Seaerch.module.scss';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleOnBlur = () => {
        setShowResult(false);
    };

    const handleFocus = () => {
        setShowResult(true);
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResults(false);
        setSearchResults([]);
        inputRef.current.focus();
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([]);
            return;
        }
        if (searchValue) {
            axios
                .get(`http://localhost:3000/course?q=${searchValue}`)
                .then((response) => response.data)
                .then((data) => setSearchResults(data));
        } else {
            setSearchResults([]);
        }
    }, [searchValue]);
    return (
        <>
            <form className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Tìm kiếm"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onBlur={handleOnBlur}
                    onFocus={handleFocus}
                />
                <span className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                {searchValue && (
                    <span className={cx('search-xmark')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                )}

                {showResult && searchResults.length > 0 && (
                    <div className={cx('wrapper')}>
                        {searchResults.map((data) => (
                            <AccountItem key={data.id} data={data} />
                        ))}
                    </div>
                )}
            </form>
        </>
    );
}

export default Search;
