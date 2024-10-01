import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Pagination({ currentPage, setCurrentPage, countTotalPage }) {
    const [windowStart, setWindowStart] = useState(0);
    const [windowEnd, setWindowEnd] = useState(4);

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        if (currentPage - 1 <= 3) {
            setWindowStart(0);
            setWindowEnd(4);
        } else {
            setWindowStart(currentPage - 3);
            setWindowEnd(currentPage + 1);
        }
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 >= countTotalPage - 2) {
            setWindowStart(countTotalPage - 4);
            setWindowEnd(countTotalPage);
        } else {
            setWindowStart(currentPage - 1);
            setWindowEnd(currentPage + 3);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        setWindowStart(0);
        setWindowEnd(4);
    };
    const handleLastPage = () => {
        setCurrentPage(countTotalPage);
        setWindowStart(countTotalPage - 4);
        setWindowEnd(countTotalPage);
    };

    const handleCurrentPage = (newPage) => {
        setCurrentPage(newPage);
        if (newPage <= 3) {
            setWindowStart(0);
            setWindowEnd(4);
        } else if (newPage >= countTotalPage - 2) {
            setWindowStart(countTotalPage - 4);
            setWindowEnd(countTotalPage);
        } else {
            setWindowStart(newPage - 2);
            setWindowEnd(newPage + 2);
        }
    };

    return (
        <div className={cx('pagination')}>
            {currentPage > 3 && (
                <button className={cx('btn')} onClick={handleFirstPage}>
                    Trang đầu
                </button>
            )}
            {currentPage > 1 && (
                <button className={cx('btn-prev')} onClick={handlePrev}>
                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                </button>
            )}
            {Array(countTotalPage)
                .fill(0)
                .map((_, index) => (
                    <button
                        className={`${styles.btnItem} ${cx(`${currentPage === index + 1 ? 'active' : ''}`)}`}
                        key={index}
                        onClick={() => handleCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))
                .slice(windowStart, windowEnd)}
            {currentPage !== countTotalPage && (
                <button className={cx('btn-next')} onClick={handleNext}>
                    <FontAwesomeIcon icon={faChevronCircleRight} />
                </button>
            )}
            {currentPage < countTotalPage - 2 && (
                <button className={cx('btn')} onClick={handleLastPage}>
                    Trang cuối
                </button>
            )}
        </div>
    );
}

export default Pagination;
