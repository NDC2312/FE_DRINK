import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const VND = Intl.NumberFormat('vi-vn', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('information')}>
                <img src={data.image} alt="" />
                <p className={cx('name')}>{data.name}</p>
            </div>
            <span className={cx('price')}>{VND.format(data.description)}</span>
        </div>
    );
}

export default AccountItem;
