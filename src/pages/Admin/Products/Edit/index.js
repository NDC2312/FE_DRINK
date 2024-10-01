import styles from '../AddProducts/AddProducts.module.scss';
import classNames from 'classnames/bind';

import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import * as productCategoryService from '~/services/product-categoryService';
import * as productService from '~/services/productService';
import EditorComponent from '~/components/EditorComponent';
import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';
import config from '~/config';

const cx = classNames.bind(styles);

function Edit() {
    const { id } = useParams();
    const location = useLocation();

    const product = location.state.product;

    const [productData, setProductData] = useState({
        title: product.title,
        productCategoryId: product.product_category_id,
        price: product.price,
        discountPercentage: product.discountPercentage,
        position: product.position,
        featured: product.featured,
        status: product.status,
        thumbnail: product.thumbnail,
        demo_url: product.demo_url,
        description: product.description,
    });
    const [productCategory, setProductCategory] = useState([]);

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
        if (productData.thumbnail !== product.thumbnail) {
            const uploadImageUrl = await uploadImageToCloudinary(productData.thumbnail);
            data.thumbnail = uploadImageUrl;
        } else {
            data.thumbnail = productData.thumbnail;
        }
        const res = await productService.editProduct(id, data);
        console.log(res);
        return res;
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await productCategoryService.getProductsCategory();
            setProductCategory(res);
        };
        fetch();
    }, [id]);

    const handleImageChange = (imageUrl) => {
        updateProductData('thumbnail', imageUrl);
    };

    const render = (productCategory, level = 1) => {
        return productCategory.map((item) => {
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

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.adminProducts}>Back</Link>
            <form onSubmit={handleSubmit}>
                <div className={cx('container')}>
                    <div className={cx('upload-image')}>
                        <div className={cx('form-control')}>
                            <UploadToCloudinary
                                handleImageChange={handleImageChange}
                                currentImage={productData.thumbnail}
                            />
                        </div>
                    </div>
                    <div className={cx('form-input-right')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                value={productData.title}
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
                                value={productData.productCategoryId}
                            >
                                <option disabled>-- Chọn danh mục --</option>
                                {productCategory.length > 0 && render(productCategory)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="price">Giá</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                id="price"
                                onChange={(e) => updateProductData('price', e.target.value)}
                                name="price"
                                value={productData.price}
                                min="0"
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
                                name="position"
                                id="position"
                                value={productData.position}
                                onChange={(e) => updateProductData('position', e.target.value)}
                                min="1"
                                placeholder="Vị trí tự động tăng"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="demo_url">Demo URL</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                name="demo_url"
                                id="demo_url"
                                value={productData.demo_url}
                                onChange={(e) => updateProductData('demo_url', e.target.value)}
                            />
                        </div>
                        <div className={cx('featured')}>
                            <div className={cx('form-check')}>
                                <input
                                    type="radio"
                                    className={cx('from-input-check')}
                                    name="featured"
                                    id="featured1"
                                    checked={productData.featured === true ? true : false}
                                    onChange={(e) => updateProductData('featured', true)}
                                />
                                <label htmlFor="featured1">Nổi bật</label>
                            </div>
                            <div className={cx('form-check')}>
                                <input
                                    type="radio"
                                    className={cx('from-input-check')}
                                    name="featured"
                                    id="featured0"
                                    checked={productData.featured === false ? true : false}
                                    onChange={(e) => updateProductData('featured', false)}
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
                            onChange={(e) => updateProductData('status', true)}
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
                            onChange={(e) => updateProductData('status', false)}
                            checked={productData.status === 'inActive' ? true : false}
                        />
                        <label htmlFor="statusInActive">Dừng hoạt động</label>
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <Button type="submit" className={cx('btn-add-new')}>
                        Cập nhật
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
