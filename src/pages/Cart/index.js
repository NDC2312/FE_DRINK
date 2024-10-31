import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Grid, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { cartempty } from '~/utils/imageHome';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    let discount = 0;

    const handleRemove = (item) => {};

    const handleDecrease = (item) => {};

    const handleIncreaseQty = (item) => {};

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Grid container justify="space-around" spacing={1}>
                    <Grid item xs={12} md={9}>
                        <div className={cx('delete-all')}>
                            <div className={cx('form-group')}>
                                <input type="checkbox" />
                                <label htmlFor="deleteAll">Chọn tất cả</label>
                            </div>
                            <p>Dự kiến</p>
                        </div>
                        <div className={cx('table')}>
                            <table>
                                <tbody>
                                    <tr className={cx('header')}>
                                        <td className={cx('h-product')}>Sản phẩm</td>
                                        <td className={cx('h-price')}>Giá tiền</td>
                                        <td className={cx('h-qty')}>Số lượng</td>
                                        <td className={cx('h-total')}>Chi phí</td>
                                    </tr>

                                    {/* {data.map((item, index) => ( */}
                                    <tr className={cx('item-info')}>
                                        <td className={cx('item-product')}>
                                            <div className={cx('item-name')}>
                                                <div className={cx('form-group')}>
                                                    <input type="checkbox" />
                                                </div>
                                                <div className={cx('item-image')}>
                                                    <img src={cartempty} alt="" />
                                                </div>
                                                <p className={cx('name')}>Hoc lap trinh</p>
                                                <span className={cx('product-category')}>loai</span>
                                            </div>
                                            <span
                                                className={cx('btn-remove')}
                                                // onClick={() => handleRemove(item)}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </span>
                                        </td>
                                        <td className={cx('item-price')}>
                                            <span>{VND.format(100000)}</span>
                                            <span className={cx('discountPercent')}></span>
                                        </td>
                                        <td className={cx('item-qty')}>
                                            <span
                                                // onClick={() => handleDecrease(item)}
                                                className={cx('item-decrease')}
                                            >
                                                -
                                            </span>
                                            {/* <span className={cx('qty')}>{item.cartQuantity}</span> */}
                                            <span
                                                // onClick={() => handleIncreaseQty(item)}
                                                className={cx('item-increase')}
                                            >
                                                +
                                            </span>
                                        </td>
                                        <td className={cx('total')}>
                                            {/* <span>{VND.format(item.price * item.cartQuantity)}</span> */}
                                            <span>Tong</span>
                                        </td>
                                    </tr>
                                    {/* ))} */}
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
                                {/* <span className={cx('total')}>{VND.format(total)}</span> */}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className={cx('pay')}>
                            <h4>Thông tin đơn hàng</h4>
                            <div className={cx('my-bill')}>
                                <div className={cx('bill')}>
                                    <span className={cx('t-bill')}>
                                        <span className={cx('title')}>Phí tam:</span>{' '}
                                        <span className={cx('discount')}>150000</span>
                                    </span>
                                    <span className={cx('t-bill')}>
                                        {/* <span className={cx('title')}>Phiếu giảm giá:</span>
                                        <span className={cx('discount')}>{discount}</span> */}
                                        <input type="text" placeholder="Phiếu giảm giá" />
                                        <button>Áp dụng</button>
                                    </span>
                                </div>
                                <div className={cx('total-amount')}>
                                    <span className={cx('title')}>Tổng tiền:</span>
                                    {/* <span className={cx('amount')}> {VND.format(total - discount)}</span> */}
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
                                        Xác nhận giỏ hàng
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                {/* ) : (
                    <img src={cartempty} alt="" />
                )} */}
            </div>
        </div>
    );
}

export default Cart;
