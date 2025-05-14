import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Chat from '~/pages/Chat';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('page')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
            <Chat />
        </div>
    );
}

export default DefaultLayout;
