import styles from './AddProductsCategory.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';

import EditorComponent from '~/components/EditorComponent';
import * as productCategoryService from '~/services/product-categoryService';
import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';

const cx = classNames.bind(styles);

function AddProductsCategory() {
    const location = useLocation();
    const data = location.state.data;

    const [productCategory, setProductCategory] = useState([]);
    const [dataProductCategory, setDateProductCategory] = useState({
        title: '',
        parent_id: '',
        position: '',
        status: 'active',
        thumbnail: '',
        description: '',
    });

    useEffect(() => {
        const fetch = async () => {
            const res = await productCategoryService.getProductsCategory();
            setProductCategory(res);
        };
        fetch();
    }, []);

    const updateData = (field, value) => {
        setDateProductCategory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const tree = (data, level = 1) => {
        return data.map((item) => {
            const tam = Array(level + 1).join('-- ');
            return (
                <Fragment key={item._id}>
                    <option value={item._id}>
                        {tam}
                        {item.title}
                    </option>
                    {item.children && tree(item.children, level + 1)}
                </Fragment>
            );
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...dataProductCategory,
        };
        if (data.thumbnail) {
            const uploadImageUrl = await uploadImageToCloudinary(data.thumbnail);
            data.thumbnail = uploadImageUrl;
        } else {
            data.thumbnail = '';
        }

        console.log(data.parent_id);
        const res = await productCategoryService.AddProductsCategory(data);
        console.log(res);
    };

    const handleImageChange = (imageUrl) => {
        updateData('thumbnail', imageUrl);
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
                                onChange={(e) => updateData('title', e.target.value)}
                                name="title"
                                id="title"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="product_category_id">Danh mục sản phẩm</label>
                            <select
                                className={cx('form-control')}
                                onChange={(e) => updateData('parent_id', e.target.value)}
                                name="product_category_id"
                                id="product_category_id"
                                value={dataProductCategory.parent_id || ''}
                            >
                                <option value="" disabled>
                                    -- Chọn danh mục sản phẩm --
                                </option>
                                {tree(productCategory)}
                            </select>
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="position">Vị trí</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                id="position"
                                onChange={(e) => updateData('position', e.target.value)}
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
                        value={dataProductCategory.description}
                        onChange={(content) => updateData('description', content)}
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
                            onChange={(e) => updateData('status', e.target.value)}
                            checked={dataProductCategory.status === 'active' ? true : false}
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
                            onChange={(e) => updateData('status', e.target.value)}
                            checked={dataProductCategory.status === 'inActive' ? true : false}
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

export default AddProductsCategory;
