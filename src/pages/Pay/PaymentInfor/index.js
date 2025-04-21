import classNames from 'classnames/bind';
import styles from './PaymentInfor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUser, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as AuthService from '~/services/authService';
import * as CartService from '~/services/cartService';
import * as checkoutZalo from '~/services/orderService';
import config from '~/config';

const cx = classNames.bind(styles);

function PaymentInfor() {
    const Navigate = useNavigate();
    const tokenAuth = cookie.load('tokenAuth');
    const [auth, setAuth] = useState({});
    const [cart, setCart] = useState([]);
    const [values, setValues] = useState({
        email: '',
        fullName: '',
        phone: '',
        address: '',
        note: '',
        payment: '',
    });

    useEffect(() => {
        const fetchAuthData = async () => {
            const myAuth = await AuthService.myAuth(tokenAuth);
            const cart = await CartService.getCart();
            setAuth(myAuth.auth);
            setCart(cart);
            console.log(myAuth);
            setValues({
                email: myAuth.auth?.email || '',
                fullName: myAuth.auth?.fullName || '',
                phone: myAuth.auth?.phone || '',
                address: myAuth.auth?.address || '',
                note: '',
            });
        };
        fetchAuthData();
    }, [tokenAuth]);

    const handleChange = (field, value) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Họ tên không được để trống';
        }
        if (!values.phone) {
            errors.phone = 'Số điện thoại không được để trống';
        } else if (values.phone.length < 10) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!values.address) {
            errors.address = 'Địa chỉ không được để trống';
        }
        return errors;
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { cart, auth };

        if (values.payment === 'zalopay') {
            try {
                const res = await checkoutZalo.checkoutZalo(data);
                console.log('thanh toan', res);
                if (res?.order_url) {
                    window.location.href = res.order_url;
                }
            } catch (err) {
                console.error('Lỗi gọi ZaloPay:', err);
            }
        } else if (values.payment === 'momo') {
            try {
                const res = await checkoutZalo.momo();
                console.log('thanh toan', res);
                if (res?.payUrl) {
                    window.location.href = res.payUrl;
                }
            } catch (err) {
                console.error('Lỗi gọi ZaloPay:', err);
            }
        } else {
            const order = await CartService.order(auth._id, values);
            Navigate(`/payment-success/${order._id}`, { state: { values, auth } });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <h2>Coffee NTK</h2>
                    <div className={cx('checkout')}>
                        <div className={cx('shipping-info')}>
                            <div className={cx('shipping-header')}>
                                <h3>Thông tin nhận hàng</h3>
                                {!tokenAuth && (
                                    <Link to={config.routes.signIn}>
                                        <FontAwesomeIcon icon={faUser} /> Đăng nhập
                                    </Link>
                                )}
                            </div>

                            <div className={cx('form-group')}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={(e) => handleChange('fullName', e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Số điện thoại </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={values.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Địa chỉ </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={values.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label>Ghi chú (nếu có)</label>
                                <textarea name="note" onChange={(e) => handleChange('note', e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className={cx('delivery-payment')}>
                            <h3 className={cx('payment-h3')}>Thanh toán</h3>
                            <div className={cx('payment')}>
                                <input
                                    type="radio"
                                    id="cod"
                                    name="payment"
                                    value="cod"
                                    checked={values.payment === 'cod'}
                                    onChange={(e) => handleChange('payment', e.target.value)}
                                    className={cx('radio-input')}
                                />
                                <label htmlFor="cod">Thanh toán khi giao hàng (COD)</label>
                                <FontAwesomeIcon icon={faMoneyBill} />
                            </div>
                            <div className={cx('payment')}>
                                <input
                                    type="radio"
                                    id="zalopay"
                                    name="payment"
                                    value="zalopay"
                                    checked={values.payment === 'zalopay'}
                                    onChange={(e) => handleChange('payment', e.target.value)}
                                    className={cx('radio-input')}
                                />
                                <label htmlFor="zalopay">Thanh toán qua ZaloPay</label>
                                <FontAwesomeIcon icon={faMoneyBill} />
                            </div>
                            <div className={cx('payment')}>
                                <input
                                    type="radio"
                                    id="momo"
                                    name="payment"
                                    value="momo"
                                    checked={values.payment === 'momo'}
                                    onChange={(e) => handleChange('payment', e.target.value)}
                                    className={cx('radio-input')}
                                />
                                <label htmlFor="momo">Thanh toán qua Momo</label>
                                <FontAwesomeIcon icon={faMoneyBill} />
                            </div>
                        </div>

                        <div className={cx('order-summary')}>
                            <h3>Đơn hàng </h3>
                            {cart.products &&
                                cart.products.map((item) => (
                                    <div key={item._id}>
                                        <div className={cx('order-item')}>
                                            <img src={item.productInfo.thumbnail} alt={item.productInfo.title} />
                                            <p className={cx('name-product')}>{item.productInfo.title}</p>
                                            <span className={cx('price')}>{VND.format(item.priceNew)}</span>
                                        </div>
                                    </div>
                                ))}
                            {/* <div className={cx('discount')}>
                                <input type="text" placeholder="Nhập mã giảm giá" />
                                <button>Áp dụng</button>
                            </div> */}
                            <div className={cx('totals')}>
                                <div>
                                    Tạm tính
                                    {cart.products && (
                                        <span className={cx('price')}>{VND.format(cart.products[0].totalPrice)}</span>
                                    )}
                                </div>
                                {/* <div>
                                    Phí vận chuyển <span className={cx('price')}>40.000 ₫</span>
                                </div> */}
                                <div className={cx('total')}>
                                    <strong>Tổng cộng</strong>{' '}
                                    <span className={cx('price-total')}>
                                        {cart.products && VND.format(cart.products[0].totalPrice)}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('order')}>
                                <Link to={config.routes.cart}>
                                    <FontAwesomeIcon icon={faChevronLeft} /> Quay về giỏ hàng
                                </Link>
                                <button type="submit" className={cx('order-button')}>
                                    ĐẶT HÀNG
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentInfor;
