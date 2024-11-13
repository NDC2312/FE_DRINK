import styles from './Auth.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import * as AuthService from '~/services/authService';
import config from '~/config';

const cx = classNames.bind(styles);

function SignUp() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: 0,
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdateForm = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(formData);
        console.log(formData);
        const res = await AuthService.register(formData);
        console.log(res);
        if (res.code === 200) {
            navigate(config.routes.signIn);
        }
    };
    const handleSuccess = async (credentialResponse) => {
        console.log(credentialResponse.credential);
        try {
            const res = await AuthService.googleAuth(credentialResponse.credential);
            console.log(res);
            alert('Success');
        } catch (error) {}
    };
    const handleError = () => {
        alert('Đăng nhập thất bại');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Đăng ký tài khoản</h2>
                <div>Đăng ký ngay tài khoản để nhận được những ưu đãi hấp dẫn khi mua hàng</div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('input-group')}>
                        <input
                            id="fullName"
                            name="fullName"
                            placeholder="Họ và tên"
                            onChange={(e) => handleUpdateForm('fullName', e.target.value)}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Số điện thoại"
                            onChange={(e) => handleUpdateForm('phone', e.target.value)}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => handleUpdateForm('email', e.target.value)}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Mật khẩu"
                            onChange={(e) => handleUpdateForm('password', e.target.value)}
                        />
                        {formData.password.length > 0 && (
                            <span
                                onClick={handleShowPassword}
                                className={cx({ 'active-password': showPassword === true })}
                            >
                                <FontAwesomeIcon icon={faEye} fontSize={15} />
                            </span>
                        )}
                    </div>
                    <Button type="submit" full>
                        Đăng ký tài khoản
                    </Button>
                    <div className={cx('register')}>
                        <div>
                            Nếu bạn đã có tài khoản, vui lòng
                            <Link to={config.routes.signIn}>đăng nhập</Link>
                            tại đây.
                        </div>
                        <div>Hoặc đăng nhập bằng</div>
                        <div className={cx('auth_goggle')}>
                            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
