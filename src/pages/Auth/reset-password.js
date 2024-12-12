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

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const tokenAuth = location.state?.tokenAuth;
    const [password, setPassWord] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { tokenAuth, password };
        console.log(data);
        const res = await AuthService.resetPassword(data);
        if (res.code === 200) {
            navigate(config.routes.signIn);
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
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu mới của bạn"
                                onChange={(e) => setPassWord(e.target.value)}
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

export default ResetPassword;
