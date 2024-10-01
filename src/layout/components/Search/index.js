import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search({ setKeyword }) {
    return (
        <form id="form-search">
            <div className={cx('input-group')}>
                <div className={cx('input-search')}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Nhập từ khóa..."
                        name="keyword"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <button className={cx('btn-input-search')} onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </form>
    );
}

export default Search;
