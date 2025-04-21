import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayoutAdmin({ children }) {
    const [headerText, setHeaderText] = useState('Tổng quan');
    const [menu, setMenu] = useState(false);
    const handleChangeSidebar = () => {
        setMenu(!menu);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('w-left')}>
                <div className={cx('sidebar', { 'menu-open': menu })}>
                    <Sidebar setHeaderText={setHeaderText} menu={menu} />
                </div>
            </div>
            <div className={cx('container', { 'menu-open-container': menu })}>
                {/* <span className={cx('bars')} onClick={handleChangeSidebar}>
                    <FontAwesomeIcon icon={faBars} fontSize={23} />
                </span> */}
                <Header headerText={headerText} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayoutAdmin;
