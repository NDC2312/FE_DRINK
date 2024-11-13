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
    const auth = location.state.auth;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await CartService.orderSuccess(orderId);
            setData(res);
        };
        fetch();
    }, [orderId]);

    console.log('auth', data);
    const VND = Intl.NumberFormat('vi-vn', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <div className={cx('wrapper')}>
            {data && (
                <div className={cx('container')}>
                    <div className={cx('header')}>NTK</div>
                    <div className={cx('success-message')}>
                        <p className={cx('thank-you')}>
                            Cảm ơn bạn đã đặt hàng <FontAwesomeIcon icon={faCheckCircle} fontSize={30} />
                        </p>
                        <div>
                            Một email xác nhận đã được gửi tới tnn231223@gmail.com.Xin vui lòng kiểm tra email của bạn
                        </div>
                    </div>

                    <div className={cx('order-info')}>
                        <div className={cx('order-details')}>
                            <div className={cx('section-title')}>Thông tin mua hàng</div>
                            <p className={cx('info')}>
                                <b>Họ và tên: </b>
                                {auth.fullName}
                            </p>
                            <p className={cx('info')}>
                                <b>Email: </b>
                                {auth.email}
                            </p>
                            <p className={cx('info')}>
                                <b>Số điện thoại: </b>
                                {auth.phone}
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
                                            <span className={cx('price')}>{VND.format(item.priceNew)}</span>
                                        </div>
                                    </div>
                                ))}

                            <div className={cx('totals')}>
                                <div>
                                    Tạm tính
                                    {data && <span className={cx('price')}>{VND.format(data[0].totalPrice)}</span>}
                                </div>
                                <div>
                                    Phí vận chuyển <span className={cx('price')}>40.000 ₫</span>
                                </div>
                                <div className={cx('total')}>
                                    <strong>Tổng cộng</strong>{' '}
                                    <span className={cx('price-total')}>
                                        {data && VND.format(data[0].totalPrice + 40000)}
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
