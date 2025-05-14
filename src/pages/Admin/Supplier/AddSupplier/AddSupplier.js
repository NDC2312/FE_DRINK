import styles from './AddProducts.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// import * as productCategoryService from '~/services/product-categoryService';
import * as productService from '~/services/supplierService';
import EditorComponent from '~/components/EditorComponent';
import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';
import config from '~/config';

const cx = classNames.bind(styles);

function AddSupplier() {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        image: '',
        status: 'active',
    });
    const updateProductData = (field, value) => {
        setProductData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...productData,
        };
        console.log(productData);
        if (productData.image) {
            const folderName = 'be_coffee/suppliers';
            const uploadImageUrl = await uploadImageToCloudinary(productData.thumbnail, folderName);
            data.image = uploadImageUrl;
        } else {
            data.image = '';
        }
        const res = await productService.addProduct(data);
        console.log(res);
        // navigate(config.routes.adminProducts);
    };

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
                            <label htmlFor="name">Tên nhà cung cấp</label>
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className={cx('form-control')}
                                id="email"
                                name="email"
                                onChange={(e) => updateProductData('email', e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('phone', e.target.value)}
                                id="phone"
                                name="phone"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="type"
                                className={cx('form-control')}
                                name="address"
                                id="address"
                                onChange={(e) => updateProductData('address', e.target.value)}
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

export default AddSupplier;
