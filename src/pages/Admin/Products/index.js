import classNames from 'classnames/bind';
import styles from './Products.module.scss';

import { useState, useEffect, useRef } from 'react';
import Search from '~/layout/components/Search';
import { Link } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import * as productService from '~/services/productService';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ProductInAdmin() {
    const positionRef = useRef({});
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        let params = {};
        if (status) params.status = status;
        if (sortKey) params.sortKey = sortKey;
        if (sortValue) params.sortValue = sortValue;
        if (currentPage) params.page = currentPage;
        if (keyword) params.keyword = keyword;
        const fetch = async () => {
            const res = await productService.getProducts(params);
            setData(res.products);
            setTotalPages(Math.ceil(res.countTotalPage / 4));
        };
        fetch();
    }, [status, sortKey, sortValue, currentPage, keyword]);

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

    const handleSort = (e) => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split('-');
        setSortKey(sortKey);
        setSortValue(sortValue);
    };

    const handleChangeStatus = async (productID, newStatus) => {
        const status = { newStatus };
        await productService.changeStatusProduct(productID, status);
        const index = data.findIndex((item) => item._id === productID);
        if (index !== -1) {
            data[index].status = newStatus;
            setData([...data]);
        }
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
                if (act === 'change-position') {
                    type = 'change-position';
                    ids.push(checked + `-${positionRef.current[checked].value}`);
                } else {
                    ids.push(checked);
                }
            });
            let oke = {
                ids: ids,
                type: type,
                value: value,
            };
            const res = await productService.changeMultiProduct(oke);
            console.log(res);
            let updateData = [...data];
            if (type === 'status') {
                updateData = updateData.map((item) => {
                    const newData = ids.includes(item._id);
                    if (newData) {
                        item.status = value;
                    }
                    return item;
                });
            } else if (type === 'change-position') {
                updateData = updateData.map((item) => {
                    const newData = ids.findIndex((id) => id.split('-')[0].includes(item._id));
                    if (newData !== -1) {
                        item.position = ids[newData].split('-')[1];
                    }
                    return item;
                });
            } else {
                updateData = updateData.filter((item) => !ids.includes(item._id));
            }
            setData([...updateData]);
        } else {
            alert('Vui lòng tích vào ít nhất 1 trường');
        }
    };

    const handleBtnDelete = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này chứ.')) {
            const res = await productService.deleteProduct(id);
            const update = data.filter((item) => item._id !== id);
            setData(update);
            console.log(res.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sort-product')}>
                    <div>Sắp xếp vị trí</div>
                    <div className={cx('select-form')}>
                        <select
                            className={cx('form-control')}
                            name="sort"
                            onChange={handleSort}
                            value={`${sortKey}-${sortValue}`}
                        >
                            <option value="position-desc">Vị trí giảm dần</option>
                            <option value="position-asc">Vị trí tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="title-desc">Tiêu đề từ A-Z</option>
                            <option value="title-asc">Tiêu đề từ Z-A</option>
                        </select>
                        <button
                            className={`${cx('btn-clear')} ${styles.btn}`}
                            onClick={() => {
                                setSortKey('position');
                                setSortValue('desc');
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className={cx('act-product')}>
                    <div className={cx('act-select-form')}>
                        <select className={cx('form-control')} name="act">
                            <option value="" disabled>
                                --- Chọn hành động ---
                            </option>
                            <option value="status-active">Hoạt động</option>
                            <option value="status-inActive">Dừng hoạt động</option>
                            <option value="delete">Xóa tất cả</option>
                            <option value="change-position">Thay đổi vị trí</option>
                        </select>
                        <button className={`${cx('btn-apply')} ${styles.btn}`} onClick={handleChangMulti}>
                            Áp dụng
                        </button>
                    </div>
                    <div className={cx('act-product-status')}>
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
                    </div>

                    <div className={cx('act-product-status')}></div>
                    <div className={cx('form-input')}>
                        <Search setKeyword={setKeyword} />
                        <Button to={config.routes.adminAddProducts} btnAddNew>
                            + Thêm mới
                        </Button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="checkAll" onClick={handleCheckAll} />
                            </th>
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Giá</th>
                            <th>Vị trí sản phẩm</th>
                            <th>Trạng thái</th>
                            <th>Người tạo</th>
                            <th>Người cập nhập</th>
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
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={item.thumbnail} alt={item.title} width="60px" height="60px" />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.price}$</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="position"
                                            min="1"
                                            value={item.position}
                                            ref={(ref) => (positionRef.current[item._id] = ref)}
                                            onChange={(e) => {
                                                positionRef.current[item._id].value = e.target.value;
                                                const newData = [...data];
                                                const index = newData.findIndex((data) => data._id === item._id);
                                                if (index !== -1) {
                                                    newData[index].position = e.target.value;
                                                    setData(newData);
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            to="#"
                                            alt=""
                                            className={`${cx(
                                                `${
                                                    item.status === 'active'
                                                        ? 'change-status-active'
                                                        : 'change-status-inActive'
                                                }`,
                                            )} ${styles.changeStatus}`}
                                            onClick={() =>
                                                handleChangeStatus(
                                                    item._id,
                                                    `${item.status === 'active' ? 'inActive' : 'active'}`,
                                                )
                                            }
                                        >
                                            {item.status === 'active' ? 'Hoạt động' : 'Dừng hoạt động'}
                                        </Button>
                                    </td>
                                    <td>{item.accountFullName}</td>
                                    <td>{item.updateFullName}</td>
                                    <td>
                                        <Link
                                            to={config.routes.adminDetailProducts.replace(':id', item._id)}
                                            className={`${cx('btn-detail')} ${styles.btn}`}
                                        >
                                            Chi tiết
                                        </Link>
                                        <Link
                                            to={config.routes.adminEditProducts.replace(':id', item._id)}
                                            state={{ product: item }}
                                            className={`${cx('btn-edit')} ${styles.btn}`}
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleBtnDelete(data._id)}
                                            className={`${cx('btn-delete')} ${styles.btn}`}
                                        >
                                            Xóa
                                        </button>
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

export default ProductInAdmin;
