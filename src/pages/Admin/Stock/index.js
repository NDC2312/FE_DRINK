import React from 'react';
import classNames from 'classnames/bind';
import styles from './Stock.module.scss';
import { useState, useEffect } from 'react';

import Search from '~/layout/components/Search';
import * as IngredientService from '~/services/ingredientService';
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
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await IngredientService.getProducts();
            setData(res.products);
        };
        fetch();
    }, []);

    console.log('ingredient', data);

    return (
        <div className={cx('stock-page')}>
            <div className={cx('stock-header')}>
                <h2>Hàng tồn kho</h2>
                <div>
                    <Button to={config.routes.adminSupplier} small>
                        Nhà cung cấp
                    </Button>
                    <Button to={config.routes.adminAddIngredient} btnAddNew>
                        + Thêm mới
                    </Button>
                    <Button to={config.routes.adminAddOrderStock} btnAddNew>
                        + Tạo đơn hàng
                    </Button>
                </div>
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
                            {/* <th>Mô tả</th> */}
                            <th>Nhà cung cấp</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={item._id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <img src={item.image} alt={item.name} width="40px" height="40px" />
                                </td>
                                <td>{item.name}</td>
                                {/* <td
                                    style={{
                                        width: '200px',
                                    }}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                </td> */}
                                <td>{item.supplierFullName}</td>
                                <td>{item.pricePerUnit} đ</td>
                                <td>{item.quantityInStock}</td>
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
                                        // onClick={() =>
                                        //     handleChangeStatus(
                                        //         item._id,
                                        //         `${item.status === 'active' ? 'inActive' : 'active'}`,
                                        //     )
                                        // }
                                    ></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockPage;
