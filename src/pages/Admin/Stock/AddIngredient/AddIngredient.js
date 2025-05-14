import styles from './AddProducts.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// import * as productCategoryService from '~/services/product-categoryService';
import * as productService from '~/services/ingredientService';
import EditorComponent from '~/components/EditorComponent';
import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';
import config from '~/config';

const cx = classNames.bind(styles);

function AddIngredient() {
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        unit: '',
        pricePerUnit: 0,
        quantityInStock: 0,
        supplier: '',
        position: '',
        image: '',
        status: 'active',
    });
    const updateProductData = (field, value) => {
        setProductData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await productService.getSupplier();
            setSupplier(res);
        };
        fetch();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...productData,
        };
        console.log(productData);
        if (productData.image) {
            const folderName = 'be_coffee/ingredients';
            const uploadImageUrl = await uploadImageToCloudinary(productData.image, folderName);
            data.image = uploadImageUrl;
        } else {
            data.image = '';
        }
        const res = await productService.addProduct(data);
        console.log(res);
        // navigate(config.routes.adminProducts);
    };

    console.log(productData.supplier);
    //console.log(productData.product_category_id);
    const handleImageChange = (imageUrl) => {
        updateProductData('image', imageUrl);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('container')}>
                    <div className={cx('upload-image')}>
                        <div className={cx('form-control')}>
                            <span>Chọn hình ảnh</span>
                            <UploadToCloudinary handleImageChange={handleImageChange} />
                        </div>
                    </div>
                    <div className={cx('form-input-right')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name">Tên nguyên liệu</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('name', e.target.value)}
                                name="name"
                                id="name"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="product_category_id">Nhà cung cấp</label>
                            <select
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('supplier', e.target.value)}
                                name="supplier"
                                id="supplier"
                                value={productData.supplier || ''}
                                required
                            >
                                <option value="" disabled>
                                    -- Chọn nhà cung cấp --
                                </option>
                                <>
                                    {supplier.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </>
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="unit">Đơn vị</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                id="unit"
                                name="unit"
                                value={productData.unit}
                                min="0"
                                onChange={(e) => updateProductData('unit', e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="pricePerUnit">giá mỗi đơn vị</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('pricePerUnit', e.target.value)}
                                id="pricePerUnit"
                                name="pricePerUnit"
                                value={productData.pricePerUnit}
                                min="0"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="quantityInStock">Số lượng</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                id="quantityInStock"
                                value={productData.quantityInStock}
                                onChange={(e) => updateProductData('quantityInStock', e.target.value)}
                                name="quantityInStock"
                                min="1"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="position">Vị trí</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                id="position"
                                onChange={(e) => updateProductData('position', e.target.value)}
                                name="position"
                                min="1"
                                placeholder="Vị trí tự động tăng"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('form-group-description')}>
                    <label htmlFor="description">Mô tả</label>
                    <EditorComponent
                        value={productData.description}
                        onChange={(description) => updateProductData('description', description)}
                        apiKey="co561hel5ob9nlckqm7pmmpv8dqwb7mait3oz2i9q68v6igt"
                    />
                </div>
                <div className={cx('featured')}>
                    <div className={cx('form-check')}>
                        <input
                            type="radio"
                            className={cx('from-input-check')}
                            name="status"
                            id="statusActive"
                            value="active"
                            onChange={(e) => updateProductData('status', e.target.value)}
                            checked={productData.status === 'active' ? true : false}
                        />
                        <label htmlFor="statusActive">Hoạt động</label>
                    </div>
                    <div className={cx('form-check')}>
                        <input
                            type="radio"
                            className={cx('from-input-check')}
                            name="status"
                            id="statusInActive"
                            value="inActive"
                            onChange={(e) => updateProductData('status', e.target.value)}
                            checked={productData.status === 'inActive' ? true : false}
                        />
                        <label htmlFor="statusInActive">Dừng hoạt động</label>
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <Button type="submit" className={cx('btn-add-new')}>
                        Tạo mới
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddIngredient;
