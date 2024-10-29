import classNames from 'classnames/bind';
import styles from './Acount.module.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as AccountService from '~/services/accountService';

import Search from '~/layout/components/Search';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Accounts() {
    //change status va changeMulti chua hoan thien
    const [data, setData] = useState([]);
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
        await axios
            .patch(
                `https://ndev-backend.vercel.app/api/v1/products/change-status/${productID}`,
                { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                const index = data.findIndex((item) => item._id === productID);
                if (index !== -1) {
                    data[index].status = newStatus;
                    setData([...data]);
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
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

    const handleBtnDelete = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này chứ.')) {
            const res = await AccountService.deleteAccount(id);
            console.log(res);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await AccountService.getAccount();
            setData(res);
        };
        fetch();
    }, []);

    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sort-product')}>
                    <div>Danh sách tài khoản</div>
                    <div className={cx('act-product')}>
                        <div className={cx('act-select-form')}>
                            <select className={cx('form-control')} name="act">
                                <option disabled="disable" value="">
                                    --- Chọn hành động ---
                                </option>
                                <option value="status-active">Hoạt động</option>
                                <option value="status-inActive">Dừng hoạt động</option>
                                <option value="delete">Xóa tất cả</option>
                            </select>
                            <button className={`${cx('btn-apply')} ${styles.btn}`} onClick={handleChangMulti}>
                                Áp dụng
                            </button>
                        </div>
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
                            <Link to={config.routes.adminAddAccount} className={`${cx('btn')} ${styles.add}`}>
                                + Thêm mới
                            </Link>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="checkAll" onClick={handleCheckAll} />
                            </th>
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>Họ và tên</th>
                            <th>Nhóm quyền</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((data, index) => (
                                <tr key={data._id}>
                                    <td>
                                        <input type="checkbox" value={data._id} name="id" />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={data.avatar} alt={data.title} width="100px" height="100px" />
                                    </td>
                                    <td>{data.fullName}</td>
                                    <td>{data.roleTitle}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <Button
                                            to="#"
                                            alt=""
                                            className={`${cx(
                                                `${
                                                    data.status === 'active'
                                                        ? 'change-status-active'
                                                        : 'change-status-inActive'
                                                }`,
                                            )} `}
                                            onClick={() =>
                                                handleChangeStatus(
                                                    data._id,
                                                    `${data.status === 'active' ? 'inActive' : 'active'}`,
                                                )
                                            }
                                            circle
                                        ></Button>
                                    </td>
                                    <td>
                                        <Link
                                            to={config.routes.adminDetailAccount.replace(':id', data._id)}
                                            className={`${cx('btn-detail')} ${styles.btn}`}
                                        >
                                            Chi tiết
                                        </Link>
                                        <Link
                                            to={config.routes.adminEditAccount.replace(':id', data._id)}
                                            state={{ account: data }}
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
            </div>
        </div>
    );
}

export default Accounts;
