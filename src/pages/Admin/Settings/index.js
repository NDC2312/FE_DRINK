import classNames from 'classnames/bind';
import styles from './Settings.module.scss';

const cx = classNames.bind(styles);

function Settings() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('settings')}>
                <nav>
                    <ul>
                        <li>Thông tin của tôi</li>
                        <li>Quản lý nội dung</li>
                        <li>Cấu hình trang web</li>
                        <li>Security</li>
                        <li>Payment and E-commerce</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Settings;
