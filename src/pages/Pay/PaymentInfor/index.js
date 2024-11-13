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
    });

    useEffect(() => {
        const fetchAuthData = async () => {
            const myAuth = await AuthService.myAuth(tokenAuth);
            const cart = await CartService.getCart();
            setAuth(myAuth);
            setCart(cart);
            console.log(myAuth);
            if (myAuth !== null) {
                setValues((prev) => ({
                    ...prev,
                    email: myAuth.email || '',
                    fullName: myAuth.fullName || '',
                    phone: myAuth.phone || '',
                    address: myAuth.address || '',
                }));
            }
        };
        if (tokenAuth !== null) {
            fetchAuthData();
        }
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
        const order = await CartService.order(auth._id, values);
        Navigate(`/payment-success/${order._id}`, { state: { auth } });
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
                                    defaultValue={auth.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    defaultValue={auth.fullName || ''}
                                    onChange={(e) => handleChange('fullName', e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Số điện thoại </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    defaultValue={auth.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label>Địa chỉ </label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={auth.address || ''}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label>Ghi chú (nếu có)</label>
                                <textarea name="note" onChange={(e) => handleChange('note', e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className={cx('delivery-payment')}>
                            <h3 className={cx('delivery-h3')}>Vận chuyển</h3>
                            <div className={cx('payment')}>
                                <input
                                    type="radio"
                                    id="delivery"
                                    checked={values.address !== ''}
                                    name="delivery"
                                    className={cx('radio-input')}
                                    readOnly
                                />
                                <label htmlFor="delivery">Giao hàng tận nơi</label>
                                <span>40.000 ₫</span>
                            </div>
                            <h3 className={cx('payment-h3')}>Thanh toán</h3>
                            <div className={cx('payment')}>
                                <input type="radio" id="cod" name="payment" className={cx('radio-input')} />
                                <label htmlFor="cod">Thanh toán khi giao hàng (COD)</label>
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
                            <div className={cx('discount')}>
                                <input type="text" placeholder="Nhập mã giảm giá" />
                                <button>Áp dụng</button>
                            </div>
                            <div className={cx('totals')}>
                                <div>
                                    Tạm tính
                                    {cart.products && (
                                        <span className={cx('price')}>{VND.format(cart.products[0].totalPrice)}</span>
                                    )}
                                </div>
                                <div>
                                    Phí vận chuyển <span className={cx('price')}>40.000 ₫</span>
                                </div>
                                <div className={cx('total')}>
                                    <strong>Tổng cộng</strong>{' '}
                                    <span className={cx('price-total')}>
                                        {cart.products && VND.format(cart.products[0].totalPrice + 40000)}
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
