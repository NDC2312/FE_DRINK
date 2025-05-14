import React from 'react';
import classNames from 'classnames/bind';
import styles from './Stock.module.scss';
import { useState, useEffect } from 'react';

import * as SupplierService from '~/services/supplierService';
import Search from '~/layout/components/Search';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

const stockData = [
    {
        id: '#7676',
        product: 'Inverter',
        category: 'cat1',
        channel: 'Store name',
        instruction: 'Stock adjustment',
        items: '80/100',
        status: 'Completed',
    },
    {
        id: '#7676',
        product: 'Battery',
        category: 'cat2',
        channel: 'Store name',
        instruction: '',
        items: '80/100',
        status: 'Pending',
    },
    {
        id: '#7676',
        product: 'Generator',
        category: 'cat2',
        channel: 'Store name',
        instruction: 'Stock adjustment',
        items: '80/100',
        status: 'Completed',
    },
    {
        id: '#7676',
        product: 'Charger',
        category: 'cat3',
        channel: 'Store name',
        instruction: 'Stock adjustment',
        items: '80/100',
        status: 'Completed',
    },
    {
        id: '#7676',
        product: 'Power',
        category: 'cat4',
        channel: 'Store name',
        instruction: '',
        items: '80/100',
        status: 'Completed',
    },
];

function Supplier() {
    const [keyword, setKeyword] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await SupplierService.getProducts();
            setData(res);
        };
        fetch();
    }, []);

    console.log('data', data);

    return (
        <div className={cx('stock-page')}>
            <div className={cx('stock-header')}>
                <h2>Nhà cung cấp</h2>
                <Button to={config.routes.adminAddSupplier} btnAddNew>
                    + Thêm mới
                </Button>
            </div>

            <div className={cx('stock-filters')}>
                <Search setKeyword={setKeyword} />
                {/* <div className={cx('status-filter')}>
                    <select className={cx('select-status')}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div> */}
            </div>

            <div className={cx('stock-table-wrapper')}>
                <table className={cx('stock-table')}>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>Hình ảnh</th>
                            <th>Nhà cung cấp</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Tổng số đơn hàng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.totalOrders}</td>
                                <td>{item.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Supplier;
