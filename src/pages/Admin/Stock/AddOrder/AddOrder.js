import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AddProducts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Search from '~/layout/components/Search';
import * as IngredientService from '~/services/ingredientService';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function AddOrderStock() {
    const [keyword, setKeyword] = useState('');

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        unit: '',
        pricePerUnit: '',
        quantity: 1,
    });

    useEffect(() => {
        const fetch = async () => {
            const res = await IngredientService.getProducts();
            setProducts(res.products);
        };
        fetch();
    }, []);

    const handleSelect = (product) => {
        setSelectedProduct(product._id);
        setFormData({ ...product });
    };

    const handleAddToOrder = () => {
        console.log(selectedProduct);
        if (selectedProduct) {
            const product = products.find((item) => item._id === selectedProduct);
            console.log(product);
            if (product) {
                setOrderItems((prev) => [...prev, product]);
            }
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('products-form')}>
                <h2 className={cx('title')}>Tạo đơn hàng</h2>
                <div className={cx('product-form')}>
                    {/* Cột trái */}
                    <div className={cx('column', 'left')}>
                        <div className={cx('subtitle')}>Chọn sản phẩm: </div>
                        {/* <Search setKeyword={setKeyword} /> */}
                        <div className={cx('form-search')}>
                            <input type="text" placeholder="Nhập từ khóa..." className={cx('input-search')} />
                        </div>
                        {products.map((product) => (
                            <label
                                key={product._id}
                                className={cx('radio', `${selectedProduct === product._id ? 'active' : ''}`)}
                            >
                                <input
                                    type="radio"
                                    name="product"
                                    style={{
                                        display: 'none',
                                    }}
                                    checked={selectedProduct === product._id}
                                    onChange={() => handleSelect(product)}
                                />
                                {product.name}
                            </label>
                        ))}
                    </div>

                    {/* form nhập + xem trước */}
                    <div className={cx('column', 'right')}>
                        <div className={cx('subtitle')}>Thông tin sản phẩm:</div>
                        <div className={cx('product-info')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="product_category_id">Nhà cung cấp</label>
                                <select
                                    className={cx('form-control')}
                                    // onChange={(e) => updateProductData('supplier', e.target.value)}
                                    name="supplier"
                                    id="supplier"
                                    // value={productData.supplier || ''}
                                    required
                                >
                                    <option value="" disabled>
                                        -- Chọn nhà cung cấp --
                                    </option>
                                    <>
                                        {/* {supplier.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))} */}
                                    </>
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Tên nguyên liệu</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={products.find((item) => item._id === selectedProduct).name}
                                    name="name"
                                    id="name"
                                    readOnly
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Đơn vị</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={formData.unit}
                                    name="name"
                                    id="name"
                                    readOnly
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Giá mỗi đơn vị</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={formData.pricePerUnit}
                                    name="name"
                                    id="name"
                                    readOnly
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Số lượng</label>
                                <input
                                    type="number"
                                    className={cx('form-control')}
                                    value={formData.quantity}
                                    name="name"
                                    id="name"
                                    min="1"
                                    required
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <Button
                                    iconLeft={<FontAwesomeIcon icon={faPlus} />}
                                    btnConfirm
                                    onClick={handleAddToOrder}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </div>

                        <div className={cx('preview')}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên nguyên liệu</th>
                                        <th>Đơn vị</th>
                                        <th>Giá mỗi đơn vị</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.pricePerUnit}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
