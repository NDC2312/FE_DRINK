import styles from '../Add/AddBlog.module.scss';
import classNames from 'classnames/bind';

import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import * as blogsCategoryService from '~/services/blogs-categoryService';
import * as blogsService from '~/services/blogsService';
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
        productCategoryId: product.blog_parent_id,
        description: product.description,
        content: product.content,
        position: product.position,
        status: product.status,
        thumbnail: product.thumbnail,
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
        const res = await blogsService.editBlogs(id, data);
        console.log(res);
        return res;
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await blogsCategoryService.getBlogsCategory();
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
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                className={cx('form-control')}
                                name="description"
                                id="description"
                                value={productData.description}
                                onChange={(e) => updateProductData('description', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('form-group-description')}>
                    <label htmlFor="content">Nội dung</label>
                    <EditorComponent
                        value={productData.content}
                        onChange={(content) => updateProductData('content', content)}
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
