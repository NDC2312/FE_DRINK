import classNames from 'classnames/bind';
import styles from './Role.module.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchDataUpdate } from '~/actions/roleAction';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Role() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.roleReducer);

    // default checked
    useEffect(() => {
        dispatch(fetchData());
        if (data.length > 0) {
            data.forEach((item, index) => {
                const permission = item.permissions;
                permission.forEach((item) => {
                    const rows = document.querySelectorAll(`[data-name=${item}]`);
                    rows.forEach((row) => {
                        const input = row.querySelectorAll('input')[index];
                        input.defaultChecked = true;
                    });
                });
            });
        }
    }, [data, dispatch]);

    const handleUpdate = () => {
        const rows = document.querySelectorAll('[data-name]');
        let permissions = [];
        rows.forEach((row) => {
            const name = row.getAttribute('data-name');
            const inputs = row.querySelectorAll('input');
            if (name === 'id') {
                inputs.forEach((input) => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: [],
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    if (input.checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });
        if (permissions.length > 0) {
            const data = permissions;
            dispatch(fetchDataUpdate(data));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('update')}>
                    <Button onClick={handleUpdate} className={cx('btn-add-new')}>
                        Cập nhật
                    </Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Tính năng</th>
                            {data.map((item) => (
                                <th key={item._id}>{item.title}</th>
                            ))}
                        </tr>
                    </thead>
                    {data.length > 0 && (
                        <tbody>
                            {/* ID nhom quyen */}
                            <tr data-name="id" style={{ display: 'none' }}>
                                <td></td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="text" defaultValue={item._id} />
                                    </td>
                                ))}
                            </tr>

                            {/* Danh mục bài viết */}
                            <tr>
                                <td>
                                    <b>Danh mục bài viết</b>
                                </td>
                            </tr>
                            <tr data-name="blogs-category-view">
                                <td>Xem</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="blogs-category-create">
                                <td>Thêm mới</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="blogs-category-edit">
                                <td>Chỉnh sửa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="blogs-category-delete">
                                <td>Xóa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>

                            {/* Danh sách bài viết */}
                            <tr>
                                <td>
                                    <b>Danh sách bài viết</b>
                                </td>
                            </tr>
                            <tr data-name="blogs-view">
                                <td>Xem</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="blogs-create">
                                <td>Thêm mới</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="blogs-edit">
                                <td>Chỉnh sửa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="blogs-delete">
                                <td>Xóa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>

                            {/* Danh mục sản phẩm */}
                            <tr>
                                <td>
                                    <b>Danh mục sản phẩm</b>
                                </td>
                            </tr>
                            <tr data-name="products-category-view">
                                <td>Xem</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="products-category-create">
                                <td>Thêm mới</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="products-category-edit">
                                <td>Chỉnh sửa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="products-category-delete">
                                <td>Xóa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>

                            {/* Danh sách sản phẩm */}
                            <tr>
                                <td>
                                    <b>Danh sách sản phẩm</b>
                                </td>
                            </tr>
                            <tr data-name="products-view">
                                <td>Xem</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="products-create">
                                <td>Thêm mới</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="products-edit">
                                <td>Chỉnh sửa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="products-delete">
                                <td>Xóa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>

                            {/* Nhóm quyền */}
                            <tr>
                                <td>
                                    <b>Nhóm quyền</b>
                                </td>
                            </tr>
                            <tr data-name="role-view">
                                <td>Xem</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="role-create">
                                <td>Thêm mới</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="role-edit">
                                <td>Chỉnh sửa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="role-delete">
                                <td>Xóa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>

                            {/* Danh sách tài khoản */}
                            <tr>
                                <td>
                                    <b>Danh sách tài khoản</b>
                                </td>
                            </tr>
                            <tr data-name="accounts-view">
                                <td>Xem</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="accounts-create">
                                <td>Thêm mới</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="accounts-edit">
                                <td>Chỉnh sửa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                            <tr data-name="accounts-delete">
                                <td>Xóa</td>
                                {data.map((item) => (
                                    <td key={item._id}>
                                        <input type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Role;
