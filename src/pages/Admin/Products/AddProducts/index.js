import styles from './AddProducts.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import { Fragment } from 'react';
import * as productCategoryService from '~/services/product-categoryService';
import * as productService from '~/services/productService';
import EditorComponent from '~/components/EditorComponent';
import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';

const cx = classNames.bind(styles);

function AddProducts() {
    const [productData, setProductData] = useState({
        title: '',
        productCategoryId: '',
        price: 0,
        discountPercentage: 0,
        position: '',
        featured: false,
        status: 'active',
        thumbnail: '',
        description: '',
    });
    const [productCategory, setProductCategory] = useState([]);
    const updateProductData = (field, value) => {
        setProductData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await productCategoryService.getProductsCategory();
            setProductCategory(res);
        };
        fetch();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...productData,
        };
        console.log(productData);
        if (productData.thumbnail) {
            const folderName = 'be_coffee/products';
            const uploadImageUrl = await uploadImageToCloudinary(productData.thumbnail, folderName);
            data.thumbnail = uploadImageUrl;
        } else {
            data.thumbnail = '';
        }
        const res = await productService.addProduct(data);
        console.log(res);
    };

    const render = (data, level = 1) => {
        return data.map((item) => {
            const tam = Array(level + 1).join('-- ');
            return (
                <Fragment key={item._id}>
                    <option value={item._id}>
                        {tam}
                        {item.title}
                    </option>
                    {item.children && render(item.children, level + 1)}
                </Fragment>
            );
        });
    };

    const handleImageChange = (imageUrl) => {
        updateProductData('thumbnail', imageUrl);
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
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('title', e.target.value)}
                                name="title"
                                id="title"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="product_category_id">Danh mục sản phẩm</label>
                            <select
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('productCategoryId', e.target.value)}
                                name="product_category_id"
                                id="product_category_id"
                                // required
                            >
                                <option value="" disabled>
                                    -- Chọn danh mục --
                                </option>
                                {render(productCategory)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="price">Giá</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                id="price"
                                name="price"
                                value={productData.price}
                                min="0"
                                onChange={(e) => updateProductData('price', e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="discount">% giảm giá</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('discountPercentage', e.target.value)}
                                id="discount"
                                name="discount"
                                value={productData.discountPercentage}
                                min="0"
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

                        <div className={cx('featured')}>
                            <div className={cx('form-check')}>
                                <input
                                    type="radio"
                                    className={cx('from-input-check')}
                                    name="featured"
                                    id="featured1"
                                    onChange={(e) => updateProductData('featured', true)}
                                    checked={productData.featured === true ? true : false}
                                />
                                <label htmlFor="featured1">Nổi bật</label>
                            </div>
                            <div className={cx('form-check')}>
                                <input
                                    type="radio"
                                    className={cx('from-input-check')}
                                    name="featured"
                                    id="featured0"
                                    onChange={(e) => updateProductData('featured', false)}
                                    checked={productData.featured === false ? true : false}
                                />
                                <label htmlFor="featured0">Không</label>
                            </div>
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

export default AddProducts;
