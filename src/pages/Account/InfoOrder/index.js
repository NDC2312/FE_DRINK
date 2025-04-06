import classNames from 'classnames/bind';
import styles from '../Store.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import { useParams } from 'react-router-dom';
import Review from '../Review';

import * as AuthService from '~/services/authService';
import * as OrderService from '~/services/orderService';

const cx = classNames.bind(styles);

function InfoOrder() {
    const { orderId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [itemData, setItemData] = useState({});
    const [data, setData] = useState([]);
    const [auth, setAuth] = useState([]);
    const [comment, setComment] = useState('');

    const [totalOrder, setTotalOrder] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const tokenAuth = cookies.load('tokenAuth');
    const toggleOpen = (item) => {
        const product_id = item.product_id;
        const user_id = auth._id;
        const order_id = orderId;
        const thumbnail = item.productInfo.thumbnail;
        const title = item.productInfo.title;
        const fullName = auth.fullName;
        const totalPrice = item.totalPrice;
        const ob = { order_id, product_id, user_id, thumbnail, title, fullName, totalPrice };
        // console.log(ob);
        setIsOpen(true);
        setItemData(ob);
    };
    useEffect(() => {
        const fetch = async () => {
            const myAuth = await AuthService.myAuth(tokenAuth);
            const order = await OrderService.orderSuccess(orderId);
            setAuth(myAuth.auth);
            setData(order);
            setTotalOrder(myAuth.totalOrder);
            setTotalPrice(myAuth.totalPrice);
        };
        fetch();
    }, [tokenAuth, orderId]);
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log('data ', data);
    return (
        <div className={cx('wrapper')}>
            {data && (
                <div className={cx('container')}>
                    <h1>Thông tin tài khoản</h1>
                    <p>
                        Xin chào, <strong>{auth.fullName}</strong>
                    </p>

                    <div className={cx('content')}>
                        <div className={cx('order-section')}>
                            <h2>Đơn hàng gần nhất</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <img
                                                    src={item.productInfo.thumbnail}
                                                    alt=""
                                                    width="60px"
                                                    height="60px"
                                                />
                                            </td>
                                            <td>{item.productInfo.title}</td>
                                            <td>{VND.format(item.productInfo.price)}</td>
                                            <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                            <td>{VND.format(item.totalPrice)}</td>
                                            <td>
                                                <button onClick={() => toggleOpen(item)}>Đánh giá</button>
                                                {isOpen && <Review isOpen={setIsOpen} data={itemData} />}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={cx('customer-info')}>
                            <h2>Thông tin khách hàng</h2>
                            <p>
                                <span>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <b>{auth.fullName}</b>
                            </p>
                            <p>
                                Đơn hàng: <b>{totalOrder}</b>
                            </p>
                            <p>
                                Chi tiêu: <b>{VND.format(totalPrice)}</b>
                            </p>

                            <p>
                                <span>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                SĐT: {auth.phone}
                            </p>
                            <button>Sổ địa chỉ (4)</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfoOrder;
