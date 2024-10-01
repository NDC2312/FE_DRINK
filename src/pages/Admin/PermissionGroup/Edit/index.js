import styles from '../PermissionGroup.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as PermissionGroupService from '~/services/permission-groupService';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Edit() {
    const { id } = useParams();
    const location = useLocation();
    console.log(location.state);

    const product = location.state.product;
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            title: title,
            description: description,
        };
        const res = await PermissionGroupService.editPermissionGroup(id, data);
        console.log(res);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('container')}>
                    <div className={cx('form-input-right')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                                id="title"
                                value={title}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="description">Mô tả ngắn</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                id="description"
                                name="description"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <Button type="submit" className={cx('btn-add-new')}>
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Edit;
