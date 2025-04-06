import classNames from 'classnames/bind';
import styles from './Review.module.scss';

import { useState, useEffect, useRef } from 'react';
import Search from '~/layout/components/Search';
import { Link } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import * as productService from '~/services/p-clientService';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ReviewInAdmin() {
    const positionRef = useRef({});
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const res = await productService.getReview();
            setData(res);
            // setTotalPages(Math.ceil(res.countTotalPage / 4));
        };
        fetch();
    }, [status, sortKey, sortValue, currentPage, keyword]);

    const handleBtnDelete = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này chứ.')) {
            await productService.removeReview(id);
            const update = data.filter((item) => item._id !== id);
            setData(update);
        }
    };
    console.log('data', data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('act-product')}>
                    <div className={cx('act-select-form')}>
                        <select className={cx('form-control')} name="act">
                            <option value="" disabled>
                                --- Chọn hành động ---
                            </option>
                            <option value="delete">Xóa tất cả</option>
                        </select>
                        <button
                            className={`${cx('btn-apply')} ${styles.btn}`}
                            // onClick={handleChangMulti}
                        >
                            Áp dụng
                        </button>
                    </div>
                    {/* <div className={cx('act-product-status')}>
                        <span>Trạng thái: </span>
                        {filterStatus.map((item) => (
                        <button
                            key={item.status}
                            className={`${styles.btnStatus} ${cx(`${item.status === status ? 'active' : ''}`)}`}
                            onClick={() => setStatus(item.status)}
                        >
                            {item.name}
                        </button>
                    ))}
                    </div> */}

                    <div className={cx('act-product-status')}></div>
                    <div className={cx('form-input')}>
                        <Search setKeyword={setKeyword} />
                        {/* <Button to={config.routes.adminAddProducts} btnAddNew>
                            + Thêm mới
                        </Button> */}
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="checkAll" />
                            </th>
                            <th>Mã đơn hàng</th>
                            <th>Tên sản phẩm</th>
                            <th>Khách hàng</th>
                            <th>Sao đánh giá</th>
                            <th>Nội dung</th>
                            <th>Ngày đánh giá</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                <tr key={item._id}>
                                    <td>
                                        <input type="checkbox" value={item._id} name="id" />
                                    </td>
                                    <td>{item.order_id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.rating}</td>
                                    <td>{item.comment}</td>
                                    <td>
                                        <span> {new Date(item.createdAt).toLocaleDateString()} </span>
                                    </td>

                                    <td style={{ textAlign: 'center' }}>
                                        <Button
                                            to={config.routes.adminDetailProducts.replace(':id', item._id)}
                                            btnDetail
                                        >
                                            Xem
                                        </Button>
                                        {/* <Button
                                            to={config.routes.adminEditProducts.replace(':id', item._id)}
                                            state={{ product: item }}
                                            btnEdit
                                        >
                                            Sửa
                                        </Button> */}
                                        <Button onClick={() => handleBtnDelete(item._id)} btnDelete>
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {/* {totalPages && (
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} countTotalPage={totalPages} />
                )} */}
            </div>
        </div>
    );
}

export default ReviewInAdmin;
