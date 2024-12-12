import classNames from 'classnames/bind';
import styles from './PaymentSuccess.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Button from '~/components/Button';

import * as CartService from '~/services/cartService';
import config from '~/config';
import success from '~/assets/Payment/success.jpg';

const cx = classNames.bind(styles);

function PaymentSuccess() {
    const { orderId } = useParams();
    const location = useLocation();
    const auth = location.state.values;
    const auth2 = location.state.auth;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await CartService.orderSuccess(orderId);
            setData(res);
        };
        fetch();
    }, [orderId]);

    // console.log('auth', data);
    const VND = Intl.NumberFormat('vi-vn', {
        style: 'currency',
        currency: 'VND',
    });
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            {data && (
                <div className={cx('container')}>
                    <div className={cx('header')}>NTK</div>
                    <div className={cx('success-message')}>
                        <p className={cx('thank-you')}>
                            Cảm ơn bạn đã đặt hàng <FontAwesomeIcon icon={faCheckCircle} fontSize={30} />
                        </p>
                        <div>Một email xác nhận đã được gửi tới {auth2.email} Xin vui lòng kiểm tra email của bạn</div>
                    </div>

                    <div className={cx('order-info')}>
                        <div className={cx('order-details')}>
                            <div className={cx('section-title')}>Thông tin mua hàng</div>
                            <p className={cx('info')}>
                                <b>Họ và tên: </b>
                                {auth2.fullName}
                            </p>
                            <p className={cx('info')}>
                                <b>Email: </b>
                                {auth2.email}
                            </p>
                            <p className={cx('info')}>
                                <b>Số điện thoại: </b>
                                {auth2.phone}
                            </p>
                        </div>
                        <div className={cx('shipping-info')}>
                            <div className={cx('section-title')}>Địa chỉ nhận hàng</div>
                            <p className={cx('info')}>
                                <b>Địa chỉ: </b>
                                {auth.address}
                            </p>
                        </div>
                    </div>

                    <div className={cx('order-info')}>
                        <div className={cx('payment-info')}>
                            <div className={cx('section-title')}>Phương thức thanh toán</div>
                            <p>Thanh toán khi giao hàng (COD)</p>
                        </div>
                        <div className={cx('shipping-method')}>
                            <div className={cx('section-title')}>Phương thức vận chuyển</div>
                            <p>Giao hàng tận nơi</p>
                        </div>
                    </div>

                    <div className={cx('order')}>
                        <div className={cx('order-summary')}>
                            <h3>Đơn hàng </h3>
                            {data &&
                                data.map((item) => (
                                    <div key={item._id}>
                                        <div className={cx('order-item')}>
                                            <img src={item.productInfo.thumbnail} alt={item.productInfo.title} />
                                            <p className={cx('name-product')}>{item.productInfo.title}</p>
                                            <p className={cx('price')}>{VND.format(item.price)}</p>
                                        </div>
                                    </div>
                                ))}

                            <div className={cx('totals')}>
                                <div className={cx('total')}>
                                    <strong>Tổng cộng</strong>{' '}
                                    <span className={cx('price-total')}>
                                        {data.length > 0 && (
                                            <span className={cx('price')}>{VND.format(data[0].totalPrice)}</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('actions')}>
                        <Button to={config.routes.home} large>
                            Tiếp tục mua hàng
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentSuccess;
