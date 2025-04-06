import classNames from 'classnames/bind';
import styles from './PermissionGroup.module.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '~/actions/roleAction';
import * as PermissionGroupService from '~/services/permission-groupService';

import Search from '~/layout/components/Search';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function PermissionGroup() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.roleReducer);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    const handleBtnDelete = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa quyền này chứ')) {
            console.log(id);
            const res = await PermissionGroupService.deletePermissionGroup(id);
            console.log(res);

            dispatch(fetchData());
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sort-product')}>
                    <div>Nhóm quyền</div>
                    <div className={cx('act-product')}>
                        <div className={cx('act-product-status')}></div>
                        <div className={cx('form-input')}>
                            <Search setKeyword={setKeyword} />
                            <Button to={config.routes.adminAddPermissionGroup} btnAddNew>
                                + Thêm mới
                            </Button>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Nhóm quyền</th>
                            <th>Mô tả ngắn</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, index) => (
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{data.title}</td>
                                <td>{data.description}</td>
                                <td>
                                    <Button
                                        to={config.routes.adminDetailPermissionGroup.replace(':id', data._id)}
                                        btnDetail
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button
                                        to={config.routes.adminEditPermissionGroup.replace(':id', data._id)}
                                        state={{ product: data }}
                                        btnEdit
                                    >
                                        Sửa
                                    </Button>
                                    <Button onClick={() => handleBtnDelete(data._id)} btnDelete>
                                        Xóa
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

export default PermissionGroup;
