import styles from './Auth2.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Button from '~/components/Button';
import * as AuthService from '~/services/authService';
import config from '~/config';

const cx = classNames.bind(styles);

function OtpPassword() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const email = location.state?.email;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, otp };
        console.log(data);
        const res = await AuthService.otpPassword(data);
        if (res.code === 200) {
            navigate(config.routes.resetPassword, {
                state: { tokenAuth: res.tokenAuth },
            });
        }
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <h2>Quên mật khẩu</h2>
                    <div>Xác thực mã OTP của bạn</div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('input-group')}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Nhập email của bạn"
                                readOnly
                            />
                        </div>
                        <div className={cx('input-group')}>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Nhập mã otp của bạn"
                                onChange={(e) => setOtp(e.target.value)}
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpPassword;
