import classNames from 'classnames/bind';
import styles from './Review.module.scss';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Review({ isOpen, data }) {
    const [comment, setComment] = useState('');

    return (
        <div className={cx('wrapper')} onClick={() => isOpen(false)}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => isOpen(false)}>
                    <FontAwesomeIcon className={cx('btn-close')} icon={faClose} />
                </button>
                <div className={cx('content')}>
                    <Grid container spacing={0}>
                        <h3>Phản hồi tới chúng tôi</h3>
                        <div className={cx('item-product')}>
                            <textarea onChange={(e) => setComment(e.target.value)} />
                            <button type="submit">Gửi</button>
                        </div>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Review;
