import styles from './Auth.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import * as AuthService from '~/services/authService';
import config from '~/config';

const cx = classNames.bind(styles);

function SignIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const [remember, setRemember] = useState(false);
    // useEffect(() => {
    //     const email = cookie.load('email');
    //     const password = cookie.load('password');
    //     if (email && password) {
    //         setEmail(email);
    //         setPassword(password);
    //         setRemember(true);
    //     }
    // }, [email, password]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await AuthService.login(formData);
        if (res.code === 200) {
            const tenDay = 10 * 24 * 60 * 60 * 1000;
            cookie.save('tokenAuth', res.tokenAuth, {
                path: '/',
                expires: new Date(Date.now() + tenDay),
            });
            navigate(config.routes.home);
        } else {
            alert('not found');
        }
    };

    const handleSuccess = async (credentialResponse) => {
        console.log(credentialResponse.credential);
        try {
            const res = await AuthService.googleAuth(credentialResponse.credential);
            const tenDay = 10 * 24 * 60 * 60 * 1000;
            cookie.save('tokenAuth', res.tokenAuth, {
                path: setTimeout(() => {
                    navigate(config.routes.home);
                }, 800),
                expires: new Date(Date.now() + tenDay),
            });
        } catch (error) {}
    };
    const handleError = () => {
        alert('Đăng nhập thất bại');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Đăng nhập tài khoản</h2>
                <div>Bạn đã có tài khoản vui lòng đăng nhập ở đây</div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('input-group')}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email của bạn"
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
                    <div className={cx('remember')}>
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        <label htmlFor="remember">Ghi nhớ</label>
                    </div>
                    <Button type="submit" full>
                        Đăng nhập
                    </Button>
                    <div className={cx('register')}>
                        <div>
                            Nếu bạn chưa có tài khoản, vui lòng đăng ký
                            <Link to={config.routes.signUp}>đăng kí</Link>
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

export default SignIn;
