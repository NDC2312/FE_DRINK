import styles from './AddAccount.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '~/actions/roleAction';
import * as AccountService from '~/services/accountService';

import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';

const cx = classNames.bind(styles);

function Add() {
    const [formAccount, setFormAccount] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: 0,
        status: 'active',
        avatar: '',
        role_id: '',
    });

    const updateFormAccount = (field, value) => {
        setFormAccount((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.roleReducer);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    console.log(data);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...formAccount,
        };
        if (data.avatar) {
            const uploadImageUrl = await uploadImageToCloudinary(data.avatar);
            data.avatar = uploadImageUrl;
        } else {
            data.avatar = '';
        }
        const res = await AccountService.AddAccount(data);
        console.log(res);
    };

    const handleImageChange = (imageUrl) => {
        updateFormAccount('avatar', imageUrl);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('container')}>
                    <div className={cx('form-input-right')}>
                        <div className={cx('upload-image')}>
                            <div className={cx('form-control')}>
                                <UploadToCloudinary handleImageChange={handleImageChange} />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="fullName">Họ và tên *</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                onChange={(e) => updateFormAccount('fullName', e.target.value)}
                                name="fullName"
                                id="fullName"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                className={cx('form-control')}
                                onChange={(e) => updateFormAccount('email', e.target.value)}
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="password">Mật khẩu *</label>
                            <input
                                type="password"
                                className={cx('form-control')}
                                onChange={(e) => updateFormAccount('password', e.target.value)}
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="phone">Số điện thoại *</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                onChange={(e) => updateFormAccount('phone', e.target.value)}
                                id="phone"
                                name="phone"
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="act">Phân quyền</label>
                            <select
                                className={cx('form-control')}
                                name="act"
                                onChange={(e) => updateFormAccount('role_id', e.target.value)}
                                value={formAccount.role_id}
                            >
                                <option value="" disabled>
                                    --- Phân quyền ---
                                </option>
                                {data.length > 0 &&
                                    data.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.title}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={cx('featured')}>
                            <div className={cx('form-check')}>
                                <input
                                    type="radio"
                                    className={cx('from-input-check')}
                                    name="status"
                                    id="statusActive"
                                    value="active"
                                    onChange={(e) => updateFormAccount('status', e.target.value)}
                                    checked={formAccount.status === 'active' ? true : false}
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
                                    onChange={(e) => updateFormAccount('status', e.target.value)}
                                    checked={formAccount.status === 'inActive' ? true : false}
                                />
                                <label htmlFor="statusInActive">Dừng hoạt động</label>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <Button type="submit" className={cx('btn-add-new')}>
                                Tạo mới
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Add;
