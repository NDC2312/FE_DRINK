import styles from './Auth2.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '~/layout/components/Footer';

import Button from '~/components/Button';
import * as AuthService from '~/services/authService';
import config from '~/config';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
    });
    const handleUpdateForm = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.email);
        const res = await AuthService.forgetPassword(formData.email);
        console.log(res);
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <h2>Quên mật khẩu</h2>
                    <div>Nhập email của bạn để lấy lại mật khẩu</div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('input-group')} style={{ marginTop: 50 }}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Nhập email của bạn"
                                onChange={(e) => handleUpdateForm('email', e.target.value)}
                            />
                        </div>
                        <Button type="submit" full style={{ marginTop: 15 }}>
                            Xác nhận
                        </Button>
                        <div className={cx('register')}>
                            <div>
                                Nếu bạn đã có tài khoản, vui lòng
                                <Link to={config.routes.signIn}>đăng nhập</Link>
                                tại đây.
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ForgotPassword;
