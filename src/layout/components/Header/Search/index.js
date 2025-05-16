import classNames from 'classnames/bind';
import styles from './Seaerch.module.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

import * as SearchService from '~/services/searchService';

import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
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
        setShowResult(false);
        setSearchResults([]);
        inputRef.current.focus();
    };

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            if (!value.trim()) {
                setSearchResults([]);
                setNoResults(false);
                return;
            }
            try {
                const res = await SearchService.search(value);
                setSearchResults(res.data);
                if (res?.data?.length > 0) {
                    setSearchResults(res.data);
                    setNoResults(false);
                } else {
                    setSearchResults([]);
                    setNoResults(true);
                }
            } catch (err) {
                console.error('Search error:', err);
                setSearchResults([]);
                setNoResults(true);
            }
        }, 500),
        [],
    );

    useEffect(() => {
        debouncedSearch(searchValue);
        return debouncedSearch.cancel;
    }, [searchValue, debouncedSearch]);

    const handleResultClick = (event) => {
        event.preventDefault();
    };

    console.log(searchResults);
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

                {showResult && searchValue.trim() && (
                    <div className={cx('wrapper')} onMouseDown={(event) => handleResultClick(event)}>
                        {searchResults.length > 0 ? (
                            searchResults.map((data) => <AccountItem key={data.id} data={data} />)
                        ) : noResults ? (
                            <div className={cx('no-result')}>Không có sản phẩm phù hợp</div>
                        ) : null}
                    </div>
                )}
            </form>
        </>
    );
}

export default Search;
