import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import * as AccountService from '~/services/accountService';
import config from '~/config';
import { setPermission } from '~/actions/permissionsAction';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [remember, setRemember] = useState(false);
    useEffect(() => {
        const email = cookie.load('email');
        const password = cookie.load('password');
        if (email && password) {
            setEmail(email);
            setPassword(password);
            setRemember(true);
        }
    }, [email, password]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
        console.log(data);
        const res = await AccountService.login(data);
        console.log(res);
        if (res.code === 200) {
            setToken(res.token);
            dispatch(setPermission(res.permissions));
            if (remember) {
                const thirty = 30 * 24 * 60 * 60 * 1000;
                cookie.save('email', email, { expires: new Date(Date.now() + thirty) });
                cookie.save('password', password, { expires: new Date(Date.now() + thirty) });
            } else {
                cookie.remove('email');
                cookie.remove('password');
            }
        }
    };

    if (token !== '') {
        const oneDay = 24 * 60 * 60 * 1000;
        cookie.save('token', token, {
            path: setTimeout(() => {
                navigate(config.routes.adminDashBoard);
            }, 500),
            expires: new Date(Date.now() + oneDay),
        });
    }
    console.log(remember);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3>Đăng nhập</h3>
                <form onSubmit={handleSubmit}>
                    <div className={cx('input-group')}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email ? email : ''}
                            placeholder="Nhập email của bạn"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password ? password : ''}
                            placeholder="Nhập password của bạn"
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                </form>
            </div>
        </div>
    );
}

export default Login;
