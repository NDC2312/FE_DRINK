import styles from './Auth2.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Header from '~/layout/components/Header';
import Footer from '~/layout/components/Footer';
import { useDispatch } from 'react-redux';
import { login } from '~/actions/authAction';

import Button from '~/components/Button';
import * as AuthService from '~/services/authService';
import config from '~/config';

const cx = classNames.bind(styles);

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    let id = '';
    let fullName = '';

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
    useEffect(() => {
        const email = cookie.load('emailAuth');
        const password = cookie.load('passwordAuth');
        if (email && password) {
            handleUpdateForm('email', email);
            handleUpdateForm('password', password);
            setRemember(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await AuthService.login(formData);
        if (res.code === 200) {
            // console.log(res.user);
            id = res.user;
            fullName = res.userInfo;
            console.log(res);
            if (remember) {
                const thirty = 30 * 24 * 60 * 60 * 1000;
                cookie.save('emailAuth', formData.email, { expires: new Date(Date.now() + thirty) });
                cookie.save('passwordAuth', formData.password, { expires: new Date(Date.now() + thirty) });
                cookie.save('tokenAuth', res.tokenAuth, {
                    path: '/',
                    expires: new Date(Date.now() + thirty),
                });
                navigate(config.routes.home);
            } else {
                cookie.remove('emailAuth');
                cookie.remove('passwordAuth');
                const tenDay = 10 * 24 * 60 * 60 * 1000;
                cookie.save('tokenAuth', res.tokenAuth, {
                    path: '/',
                    expires: new Date(Date.now() + tenDay),
                });
                navigate(config.routes.home);
            }

            const aa = { id, fullName, role: 'customer' };
            dispatch(login(aa));
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
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <h2>Đăng nhập tài khoản</h2>
                    <div className={cx('sub-title')}>Bạn đã có tài khoản vui lòng đăng nhập ở đây</div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('input-group')}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={formData.email ? formData.email : ''}
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
                                defaultValue={formData.password ? formData.password : ''}
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
                            <div className={cx('label-remember')}>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                                <label htmlFor="remember">Ghi nhớ</label>
                            </div>
                            <div className={cx('forgot-password')}>
                                <Link to={config.routes.forgotPassword}>Quên mật khẩu</Link>
                            </div>
                        </div>
                        <Button type="submit" large>
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
        </div>
    );
}

export default SignIn;
