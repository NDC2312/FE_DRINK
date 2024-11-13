import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AccountService from '~/services/accountService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartPie,
    faFileSignature,
    faFileInvoice,
    faBoxOpen,
    faUsers,
    faComments,
    faCartShopping,
    faGears,
    faChevronDown,
    faCircle,
} from '@fortawesome/free-solid-svg-icons';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar({ setHeaderText, menu }) {
    const dispatch = useDispatch();
    const { permissions } = useSelector((state) => state.permissionReducer);
    const [isActive, setIsActive] = useState(() => {
        const storedIsActive = localStorage.getItem('isActive');
        return storedIsActive ? parseInt(storedIsActive) : 0;
    });
    const [user, setUser] = useState({});
    const [show, setShow] = useState(null);

    const handleShow = (active) => {
        setShow((prev) => (prev === active ? null : active));
    };

    useEffect(() => {
        const fetchMyAccount = async () => {
            const res = await AccountService.myAccount();
            setUser(res);
        };
        fetchMyAccount();
    }, [isActive, setHeaderText, dispatch]);
    const handleActive = (index) => {
        setIsActive(index);
    };

    return (
        <div className={cx('container', { 'menu-oke': menu })}>
            <div className={cx('sidebar-header')}>
                {user && (
                    <div className={cx('info')}>
                        <img src={user.avatar} alt={user.fullName} />
                        <div>
                            <p>{user.fullName}</p>
                            <span>{user.roleTitle}</span>
                        </div>
                    </div>
                )}
            </div>
            <ul className={cx('list')}>
                {/* dashboard  */}
                <li className={cx('list-block')}>
                    <Link
                        className={isActive === 0 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(0);
                        }}
                        to={config.routes.adminDashBoard}
                    >
                        <span>
                            <FontAwesomeIcon icon={faChartPie} />
                        </span>
                        <p>Tổng quan</p>
                    </Link>
                </li>
                {/* end dashboard  */}

                {/* blog  */}
                <li className={cx('list-block')}>
                    <p>Bài viết</p>
                    <button className={cx('btn-open', { 'btn-active': show === 0 })} onClick={() => handleShow(0)}>
                        <span>
                            <FontAwesomeIcon icon={faFileInvoice} />
                        </span>
                        <p> Bài viết</p>
                        <span className={cx('chevron-down')}>
                            <FontAwesomeIcon icon={faChevronDown} fontSize={10} />
                        </span>
                    </button>
                    <div className={cx('block', { 'menu-open': show === 0 })}>
                        {permissions.includes('blogs-create') && (
                            <Link
                                className={isActive === 2 ? cx('active') : ''}
                                onClick={() => {
                                    handleActive(2);
                                }}
                                to={config.routes.adminAddBlogs}
                            >
                                <span className={cx('chevron-down')}>
                                    <FontAwesomeIcon icon={faCircle} fontSize={6} />
                                </span>
                                <p> Thêm mới</p>
                            </Link>
                        )}
                        {permissions.includes('blogs-view') && (
                            <Link
                                className={isActive === 3 ? cx('active') : ''}
                                onClick={() => {
                                    handleActive(3);
                                }}
                                to={config.routes.adminBlogs}
                            >
                                <span className={cx('chevron-down')}>
                                    <FontAwesomeIcon icon={faCircle} fontSize={6} />
                                </span>
                                <p>Danh sách</p>
                            </Link>
                        )}
                        {permissions.includes('blogs-category-view') && (
                            <Link
                                className={isActive === 4 ? cx('active') : ''}
                                onClick={() => {
                                    handleActive(4);
                                }}
                                to={config.routes.adminBlogsCategory}
                            >
                                <span className={cx('chevron-down')}>
                                    <FontAwesomeIcon icon={faCircle} fontSize={6} />
                                </span>
                                <p>Danh mục</p>
                            </Link>
                        )}
                    </div>
                </li>
                {/* end blog  */}

                {/* products  */}
                <li className={cx('list-block')}>
                    <p>Sản phẩm</p>
                    <button className={cx('btn-open', { 'btn-active': show === 1 })} onClick={() => handleShow(1)}>
                        <span>
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </span>
                        <p>Sản phẩm</p>
                        <span className={cx('chevron-down')}>
                            <FontAwesomeIcon icon={faChevronDown} fontSize={10} />
                        </span>
                    </button>
                    <div className={cx('block', { 'menu-open': show === 1 })}>
                        {permissions.includes('products-create') && (
                            <Link
                                className={isActive === 5 ? cx('active') : ''}
                                onClick={() => {
                                    handleActive(5);
                                }}
                                to={config.routes.adminAddProducts}
                            >
                                <span className={cx('chevron-down')}>
                                    <FontAwesomeIcon icon={faCircle} fontSize={6} />
                                </span>
                                <p> Thêm mới</p>
                            </Link>
                        )}
                        {permissions.includes('products-view') && (
                            <Link
                                className={isActive === 6 ? cx('active') : ''}
                                onClick={() => {
                                    handleActive(6);
                                }}
                                to={config.routes.adminProducts}
                            >
                                <span className={cx('chevron-down')}>
                                    <FontAwesomeIcon icon={faCircle} fontSize={6} />
                                </span>
                                <p>Danh sách</p>
                            </Link>
                        )}
                        {permissions.includes('products-category-view') && (
                            <Link
                                className={isActive === 7 ? cx('active') : ''}
                                onClick={() => {
                                    handleActive(7);
                                }}
                                to={config.routes.adminProductsCategory}
                            >
                                <span className={cx('chevron-down')}>
                                    <FontAwesomeIcon icon={faCircle} fontSize={6} />
                                </span>
                                <p> Danh mục</p>
                            </Link>
                        )}
                    </div>
                    <Link
                        className={isActive === 8 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(8);
                        }}
                        to={config.routes.adminOrder}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <p> Đơn hàng</p>
                    </Link>
                    <Link
                        className={isActive === 9 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(9);
                        }}
                        to={config.routes.adminReport}
                    >
                        <span>
                            <FontAwesomeIcon icon={faFileSignature} />
                        </span>
                        <p>Báo cáo</p>
                    </Link>
                </li>
                {/* end products  */}

                {/* customers */}
                <li className={cx('list-block')}>
                    <p>Khách hàng </p>
                    <Link
                        className={isActive === 10 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(10);
                        }}
                        to={config.routes.adminAuth}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        <p> Khách hàng</p>
                    </Link>
                    <Link
                        className={isActive === 11 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(11);
                        }}
                    >
                        <span>
                            <FontAwesomeIcon icon={faComments} />
                        </span>
                        <p> Đánh giá</p>
                    </Link>
                </li>
                {/* end customers */}

                {/* <li>
                    {permissions.includes('role-view') && (
                        <Link
                            className={isActive === 3 ? cx('active') : ''}
                            onClick={() => {
                                handleActive(3);
                            }}
                            to={config.routes.adminPermissionGroup}
                        >
                            <span>
                                <FontAwesomeIcon icon={faLayerGroup} />
                            </span>
                            Nhóm quyền
                        </Link>
                    )}
                </li>
                <li>
                    {permissions.includes('role-view') && (
                        <Link
                            className={isActive === 4 ? cx('active') : ''}
                            onClick={() => {
                                handleActive(4);
                            }}
                            to={config.routes.adminRole}
                        >
                            <span>
                                <FontAwesomeIcon icon={faUsersLine} />
                            </span>
                            Phân quyền
                        </Link>
                    )}
                </li>
                <li>
                    {permissions.includes('accounts-view') && (
                        <Link
                            className={isActive === 5 ? cx('active') : ''}
                            onClick={() => {
                                handleActive(5);
                            }}
                            to={config.routes.adminAccount}
                        >
                            <span>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            Danh sách tài khoản
                        </Link>
                    )}
                </li> */}

                <li className={cx('list-block')}>
                    <Link to={config.routes.adminSettings}>
                        <span>
                            <FontAwesomeIcon icon={faGears} />
                        </span>
                        <p> Cài đặt chung</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
