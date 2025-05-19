import classNames from 'classnames/bind';
import styles from './Acount.module.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Pagination from '~/components/Pagination';
import * as OrderService from '~/services/orderService';

import Search from '~/layout/components/Search';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Order() {
    //change status va changeMulti chua hoan thien
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    let filterStatus = [
        {
            name: 'Tất cả',
            status: '',
        },
        {
            name: 'Đã xử lý',
            status: 'finish',
        },
        {
            name: 'Bị hủy',
            status: 'cancel',
        },
    ];

    const handleChangeStatus = async (productID, newStatus) => {
        await OrderService.changeStatusOrder(productID, newStatus);
        setData((prev) => prev.map((item) => (item._id === productID ? { ...item, status: newStatus } : item)));
    };

    const handleCheckAll = () => {
        const inputCheckAll = document.querySelector('input[name="checkAll"]');
        const inputId = document.querySelectorAll('input[name="id"]');

        if (inputCheckAll.checked) {
            inputId.forEach((input) => (input.checked = true));
        } else {
            inputId.forEach((input) => (input.checked = false));
        }

        inputId.forEach((input) => {
            input.addEventListener('click', () => {
                const countChecked = document.querySelectorAll('input[name="id"]:checked').length;
                if (countChecked === inputId.length) {
                    inputCheckAll.checked = true;
                } else {
                    inputCheckAll.checked = false;
                }
            });
        });
    };

    const handleChangMulti = async () => {
        const act = document.querySelector('select[name="act"]').value;
        const idChecked = document.querySelectorAll('input[name="id"]:checked');
        let [type, value] = act.split('-');
        let ids = [];
        if (idChecked.length > 0) {
            idChecked.forEach((id) => {
                const checked = id.value;
                ids.push(checked);
            });
            await axios
                .patch(
                    'https://ndev-backend.vercel.app/api/v1/products/change-multi',
                    {
                        ids: ids,
                        type: type,
                        value: value,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((response) => {
                    let update;
                    if (type === 'delete') {
                        update = data.filter((item) => !ids.includes(item._id));
                    } else if (type === 'change-position') {
                        update = data.map((item) => {
                            const index = ids.findIndex((id) => id.split('-')[0] === item._id);
                            if (index !== -1) {
                                item.position = ids[index].split('-')[1];
                            }
                            return item;
                        });
                    } else {
                        update = data.map((item) => {
                            const exitID = ids.includes(item._id);
                            if (exitID) {
                                item.status = value;
                            }
                            return item;
                        });
                    }
                    setData(update);
                    console.log(response.data);
                })
                .catch((error) => console.log(error));
        } else {
            alert('Vui lòng tích vào ít nhất 1 trường');
        }
    };

    useEffect(() => {
        let params = {};
        if (currentPage) params.page = currentPage;
        if (status) params.status = status;
        if (keyword) params.keyword = keyword;
        const fetch = async () => {
            const res = await OrderService.getOrder(params);
            setData(res.order);
            setTotalPages(Math.ceil(res.totalOrder / 4));
        };
        fetch();
    }, [currentPage, keyword, status]);
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(totalPages);
    console.log('data', data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sort-product')}>
                    <div>Danh sách đơn hàng</div>
                    <div className={cx('act-product')}>
                        {/* <div className={cx('act-select-form')}>
                            <select className={cx('form-control')} name="act">
                                <option disabled="disable" value="">
                                    --- Chọn hành động ---
                                </option>

                                <option value="delete">Xóa tất cả</option>
                            </select>
                            <button className={`${cx('btn-apply')} ${styles.btn}`} onClick={handleChangMulti}>
                                Áp dụng
                            </button>
                        </div> */}
                        <div className={cx('act-product-status')}>
                            <span>Trạng thái: </span>
                            {filterStatus.map((item, index) => (
                                <button
                                    key={index}
                                    className={`${styles.btnStatus} ${cx(`${item.status === status ? 'active' : ''}`)}`}
                                    onClick={() => setStatus(item.status)}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        <div className={cx('act-product-status')}></div>
                        <div className={cx('form-input')}>
                            <Search setKeyword={setKeyword} />
                            {/* <Link to={config.routes.adminAddAccount} className={`${cx('btn')} ${styles.add}`}>
                                + Thêm mới
                            </Link> */}
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="checkAll" onClick={handleCheckAll} />
                            </th>
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
                                    <td>
                                        <input type="checkbox" value={data._id} name="id" />
                                    </td>
                                    <td>{data._id}</td>
                                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    <td>{data.userInfo?.fullName}</td>
                                    <td
                                        style={{
                                            color: 'var(--red)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {VND.format(data.totalPrice)}
                                    </td>
                                    <td>{data.payment ? data.payment : 'Thanh toán khi giao hàng (COD)'}</td>
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
                {totalPages && (
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} countTotalPage={totalPages} />
                )}
            </div>
        </div>
    );
}

export default Order;
