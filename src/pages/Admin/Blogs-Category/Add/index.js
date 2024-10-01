import styles from './AddBlog.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import { Fragment } from 'react';
import * as blogsCategoryService from '~/services/blogs-categoryService';
import EditorComponent from '~/components/EditorComponent';
import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';

const cx = classNames.bind(styles);

function AddBlogs() {
    const [productData, setProductData] = useState({
        title: '',
        parent_id: '',
        description: '',
        position: '',
        status: 'active',
        thumbnail: '',
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
            const res = await blogsCategoryService.getBlogsCategory();
            setProductCategory(res);
        };
        fetch();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...productData,
        };
        if (productData.thumbnail) {
            const uploadImageUrl = await uploadImageToCloudinary(productData.thumbnail);
            data.thumbnail = uploadImageUrl;
        } else {
            data.thumbnail = '';
        }
        await blogsCategoryService.addBlogsCategory(data);
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
                            <label htmlFor="product_category_id">Danh mục bài viết</label>
                            <select
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('productCategoryId', e.target.value)}
                                name="product_category_id"
                                id="product_category_id"
                                value=""
                            >
                                <option value="" disabled>
                                    -- Chọn danh mục --
                                </option>
                                {render(productCategory)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="description">Mô tả</label>
                            <input
                                className={cx('form-control')}
                                onChange={(e) => updateProductData('description', e.target.value)}
                                name="description"
                                id="description"
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

export default AddBlogs;
