import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const VND = Intl.NumberFormat('vi-vn', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <Link to={config.routes.detail.replace(':slugProduct', data.slug)}>
            <div className={cx('wrapper')}>
                <div className={cx('information')}>
                    <div className={cx('img')}>
                        <img src={data.thumbnail} alt="" />
                    </div>
                    <p className={cx('name')}>{data.title}</p>
                </div>
                <span className={cx('price')}>{VND.format(data.price)}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
