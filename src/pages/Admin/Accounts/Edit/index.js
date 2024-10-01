import classNames from 'classnames/bind';
import styles from '../Add/AddAccount.module.scss';
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AccountService from '~/services/accountService';

import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';
import config from '~/config';
import { fetchData } from '~/actions/roleAction';

const cx = classNames.bind(styles);

function Edit() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.roleReducer);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const { id } = useParams();
    const location = useLocation();
    const account = location.state.account;

    const [formAccount, setFormAccount] = useState({
        fullName: account.fullName,
        email: account.email,
        password: account.password || '',
        phone: account.phone,
        status: account.status,
        avatar: account.avatar,
        role_id: account.role_id,
    });

    const updateFormAccount = (field, value) => {
        setFormAccount((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...formAccount,
        };

        if (data.avatar !== account.avatar) {
            const uploadImageUrl = await uploadImageToCloudinary(data.avatar);
            data.avatar = uploadImageUrl;
        } else {
            data.avatar = '';
        }

        const res = await AccountService.editAccount(id, data);
        console.log(res);
    };

    const handleImageChange = (imageUrl) => {
        updateFormAccount('avatar', imageUrl);
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
                                currentImage={formAccount.thumbnail}
                            />
                        </div>
                        <div className={cx('form-input-right')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="fullName">Họ và tên *</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={formAccount.fullName}
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
                                    value={formAccount.email}
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
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="phone">Số điện thoại *</label>
                                <input
                                    type="number"
                                    className={cx('form-control')}
                                    value={formAccount.phone}
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
                                    {data &&
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
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Edit;
