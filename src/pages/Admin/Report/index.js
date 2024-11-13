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
    const [status, setStatus] = useState('');

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

    const handleChangeStatus = async (productID, newStatus) => {
        await OrderService.changeStatusOrder(productID, newStatus);
        setData((prev) => prev.map((item) => (item._id === productID ? { ...item, status: newStatus } : item)));
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await OrderService.getOrder();
            setData(res.cart);
            setTotalOrder(res.cart.totalOrder);
        };
        fetch();
    }, []);
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sort-product')}>
                    <div>Báo cáo</div>
                    <div className={cx('act-product')}>
                        <div>
                            <div> Tổng số đơn hàng: 12</div>
                            <div>Tổng giá trị: 12</div>
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
                            <th>Tên sản phẩm</th>
                            <th>Đơn hàng</th>
                            <th>Ngày đặt</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Hình thức thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((data) => (
                                <tr key={data._id}>
                                    <td>{data.products.title}</td>
                                    <td>{data._id}</td>
                                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    <td>{data.userInfo.fullName}</td>
                                    <td>
                                        {data.products && data.products[0]
                                            ? VND.format(data.products[0].totalPrice)
                                            : 'Không có dữ liệu'}
                                    </td>
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
                                    <td>
                                        {data.status === 'spending' && (
                                            <div>
                                                <Button
                                                    btnConfirm
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            data._id,
                                                            `${data.status === 'finish' ? 'spending' : 'finish'}`,
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleChangeStatus(data._id, `${(data.status = 'cancel')}`)
                                                    }
                                                    btnDelete
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </Button>
                                            </div>
                                        )}
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
