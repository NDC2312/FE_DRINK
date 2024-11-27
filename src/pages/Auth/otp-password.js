import styles from './Auth2.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Footer from '~/layout/components/Footer';

import Button from '~/components/Button';
import * as AuthService from '~/services/authService';
import config from '~/config';

const cx = classNames.bind(styles);

function OtpPassword() {
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
                    <h2>Quên mật khẩu</h2>
                    <div>Nhập email của bạn để lấy lại mật khẩu</div>
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
                        <Button type="submit" full>
                            Đăng nhập
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
            <Footer />
        </div>
    );
}

export default OtpPassword;
