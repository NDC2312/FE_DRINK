import React from 'react';
import classNames from 'classnames/bind';
import styles from './Stock.module.scss';
import { useState } from 'react';

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

function StockPage() {
    const [keyword, setKeyword] = useState([]);

    return (
        <div className={cx('stock-page')}>
            <div className={cx('stock-header')}>
                <h2>Hàng tồn kho</h2>
                <Button to={config.routes.adminAddProducts} btnAddNew>
                    + Thêm mới
                </Button>
            </div>

            <div className={cx('stock-filters')}>
                <Search setKeyword={setKeyword} />
                <div className={cx('status-filter')}>
                    <select className={cx('select-status')}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            <div className={cx('stock-table-wrapper')}>
                <table className={cx('stock-table')}>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>Hình ảnh</th>
                            <th>Nguyên liệu</th>
                            <th>Mô tả</th>
                            <th>Nhà cung cấp</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.id}</td>
                                <td>{item.product}</td>
                                <td>{item.category}</td>
                                <td>{item.channel}</td>
                                <td>{item.instruction || '-'}</td>
                                <td>{item.items}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockPage;
