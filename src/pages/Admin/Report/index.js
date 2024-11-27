import classNames from 'classnames/bind';
import styles from './Acount.module.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Pagination from '~/components/Pagination';
import * as OrderService from '~/services/orderService';

import Search from '~/layout/components/Search';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Report() {
    //change status va changeMulti chua hoan thien
    const [data, setData] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [keyword, setKeyword] = useState('');

    let filterStatus = [
        {
            name: 'Tất cả',
            status: '',
        },
        {
            name: 'Hoạt động',
            status: 'active',
        },
        {
            name: 'Dừng hoạt động',
            status: 'inActive',
        },
    ];

    useEffect(() => {
        const fetch = async () => {
            const res = await OrderService.getOrder();
            setData(res.order);
            setTotalOrder(res.totalOrder);
            setTotalPrice(res.totalPrice);
        };
        fetch();
    }, []);
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sort-product')}>
                    <div>Báo cáo</div>
                    <div className={cx('act-product')}>
                        <div>
                            <div>
                                Tổng số đơn hàng: <b>{totalOrder}</b>
                            </div>
                            <div>
                                Tổng giá trị: <b>{totalPrice}</b>
                            </div>
                        </div>

                        <div className={cx('act-product-status')}></div>
                        <div className={cx('form-input')}>
                            <Search setKeyword={setKeyword} />
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Đơn hàng</th>
                            <th>Ngày đặt</th>

                            <th>Tổng tiền</th>
                            <th>Hình thức thanh toán</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((data) => (
                                <tr key={data._id}>
                                    <td>{data.userInfo.fullName}</td>
                                    <td>{data.userInfo.phone}</td>
                                    <td>{data.userInfo.address}</td>
                                    <td>{data._id}</td>
                                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    <td>{VND.format(data.totalPrice)}</td>
                                    <td>Thanh toán khi giao hàng (COD)</td>
                                    <td>
                                        <Button
                                            to="#"
                                            alt=""
                                            className={`${cx(
                                                `${
                                                    data.status === 'finish'
                                                        ? 'change-status-active'
                                                        : data.status === 'cancel'
                                                        ? 'change-status-cancel'
                                                        : 'change-status-inActive'
                                                }`,
                                            )} `}
                                            small
                                        >
                                            {data.status === 'spending'
                                                ? 'Chờ xử lý'
                                                : data.status === 'cancel'
                                                ? 'Hủy'
                                                : 'Đã xử lý'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Report;
