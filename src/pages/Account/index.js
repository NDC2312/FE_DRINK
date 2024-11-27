import classNames from 'classnames/bind';
import styles from './Store.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMap } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import cookies from 'react-cookies';

import * as AuthService from '~/services/authService';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Account() {
    const [data, setData] = useState([]);
    const [auth, setAuth] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const tokenAuth = cookies.load('tokenAuth');
    useEffect(() => {
        const fetch = async () => {
            const myAuth = await AuthService.myAuth(tokenAuth);
            setAuth(myAuth.auth);
            setData(myAuth.order);
            setTotalOrder(myAuth.totalOrder);
            setTotalPrice(myAuth.totalPrice);
        };
        fetch();
    }, [tokenAuth]);
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(data);
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
                                        <th>Đơn hàng</th>
                                        <th>Ngày</th>
                                        <th>Địa chỉ</th>
                                        <th>Giá trị đơn hàng</th>
                                        <th>TT thanh toán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td>{item.userInfo.address}</td>
                                            <td>{VND.format(totalPrice)}</td>
                                            <td>
                                                {item.status === 'spending'
                                                    ? 'Chờ xử lý'
                                                    : item.status === 'cancel'
                                                    ? 'Hủy'
                                                    : 'Đã thanh toán'}
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

export default Account;
