import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Grid, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { cartempty } from '~/utils/imageHome';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    let discount = 0;

    // if (total >= 200000) {
    //     discount = 10000;
    // }
    // if (total >= 300000) {
    //     discount = 15000;
    // }
    // if (total >= 400000) {
    //     discount = 20000;
    // }
    // if (total >= 450000) {
    //     discount = 25000;
    // }
    // if (total >= 500000) {
    //     discount = 30000;
    // }
    // if (total >= 550000) {
    //     discount = 35000;
    // }
    // if (total >= 600000) {
    //     discount = 40000;
    // }
    // if (total >= 650000) {
    //     discount = 45000;
    // }
    // if (total >= 700000) {
    //     discount = 50000;
    // }
    // if (total >= 750000) {
    //     discount = 55000;
    // }
    // if (total >= 800000) {
    //     discount = 60000;
    // }
    // if (total >= 900000) {
    //     discount = 70000;
    // }
    // if (total >= 1000000) {
    //     discount = 100000;
    // }

    const handleRemove = (item) => {};

    const handleDecrease = (item) => {};

    const handleIncreaseQty = (item) => {};

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* {.length !== 0 ? (
                    <Grid container justify="space-around" spacing={1}>
                        <Grid item xs={12} md={9}>
                            <div className={cx('table')}>
                                <table>
                                    <tbody>
                                        <tr className={cx('header')}>
                                            <td className={cx('h-product')}>Sản phẩm</td>
                                            <td className={cx('h-price')}>Giá tiền</td>
                                            <td className={cx('h-qty')}>Số lượng</td>
                                            <td className={cx('h-total')}>Chi phí</td>
                                        </tr>

                                        {data.map((item, index) => (
                                            <tr className={cx('item-info')} key={index}>
                                                <td className={cx('item-product')}>
                                                    <div className={cx('item-name')}>
                                                        <div className={cx('item-image')}>
                                                            <img src={item.img} alt="" />
                                                        </div>
                                                        <span className={cx('name')}>{item.name}</span>
                                                    </div>
                                                    <span
                                                        className={cx('btn-remove')}
                                                        onClick={() => handleRemove(item)}
                                                    >
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </span>
                                                </td>
                                                <td className={cx('item-price')}>
                                                    <span>{VND.format(item.price)}</span>
                                                </td>
                                                <td className={cx('item-qty')}>
                                                    <span
                                                        onClick={() => handleDecrease(item)}
                                                        className={cx('item-decrease')}
                                                    >
                                                        -
                                                    </span>
                                                    <span className={cx('qty')}>{item.cartQuantity}</span>
                                                    <span
                                                        onClick={() => handleIncreaseQty(item)}
                                                        className={cx('item-increase')}
                                                    >
                                                        +
                                                    </span>
                                                </td>
                                                <td className={cx('total')}>
                                                    <span>{VND.format(item.price * item.cartQuantity)}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('last')}>
                                <Link to={config.routes.categoryProducts}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    <p className={cx('text')}> Tiếp tục mua hàng</p>
                                </Link>

                                <div className={cx('sum-price')}>
                                    <span>Phí tạm : </span>
                                    <span className={cx('total')}>{VND.format(total)}</span>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={cx('pay')}>
                                <h4>Hóa đơn của bạn</h4>
                                <div className={cx('my-bill')}>
                                    <div className={cx('bill')}>
                                        <span className={cx('t-bill')}>
                                            <span className={cx('title')}>Phí tam:</span>{' '}
                                            <span className={cx('discount')}>{VND.format(total)}</span>
                                        </span>
                                        <span className={cx('t-bill')}>
                                            <span className={cx('title')}>Phiếu giảm giá:</span>
                                            <span className={cx('discount')}>{discount}</span>
                                        </span>
                                    </div>
                                    <div className={cx('total-amount')}>
                                        <span className={cx('title')}>Tổng tiền:</span>
                                        <span className={cx('amount')}> {VND.format(total - discount)}</span>
                                    </div>
                                    <Link to={config.routes.paymentInfor}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                width: '100%',
                                                margin: '25px 0 0 0',
                                                color: 'white',
                                                backgroundColor: 'var(--primary-text)',
                                                borderColor: 'var(--primary-text)',
                                                fontSize: '1.4rem',

                                                '&:hover': {
                                                    backgroundColor: 'var(--primary-text)',
                                                    borderColor: 'var(--primary-text)',
                                                },
                                            }}
                                        >
                                            Thanh toán
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                ) : (
                    <img src={cartempty} alt="" />
                )} */}
            </div>
        </div>
    );
}

export default Cart;
