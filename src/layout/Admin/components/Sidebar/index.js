import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AccountService from '~/services/accountService';

import { fetchCountAdviseAction } from '~/actions/countAdviseAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDashboard,
    faFileSignature,
    faBoxOpen,
    faUsers,
    faComments,
    faLayerGroup,
    faUsersLine,
    faGears,
    faChevronDown,
    faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar({ setHeaderText }) {
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
        dispatch(fetchCountAdviseAction());
        // localStorage.setItem('isActive', isActive);
        const fetchMyAccount = async () => {
            const res = await AccountService.myAccount();
            setUser(res);
        };
        fetchMyAccount();
        // switch (isActive) {
        //     case 0:
        //          setHeaderText('Tổng Quan');
        //     case 1:
        //          setHeaderText('Danh mục sản phẩm');
        //     case 2:
        //          setHeaderText('Danh sách sản phẩm');
        //     case 3:
        //          setHeaderText('Nhóm quyền');
        //     case 4:
        //          setHeaderText('Phân quyền');
        //     case 5:
        //          setHeaderText('Danh sách tài khoản');
        //     case 6:
        //          setHeaderText('Tư vấn');
        //     default:
        //          break;
        // }
    }, [isActive, setHeaderText, dispatch]);
    const handleActive = (index) => {
        setIsActive(index);
    };

    return (
        <div className={cx('container')}>
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
                            <FontAwesomeIcon icon={faDashboard} />
                        </span>
                        Tổng quan
                    </Link>
                </li>
                {/* end dashboard  */}

                {/* blog  */}
                <li className={cx('list-block')}>
                    <p>Bài viết</p>
                    <button className={cx('btn-open', { 'btn-active': show === 0 })} onClick={() => handleShow(0)}>
                        <span>
                            <FontAwesomeIcon icon={faFileSignature} />
                        </span>
                        Bài viết
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
                                Thêm mới
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
                                Danh sách
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
                                Danh mục
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
                        Sản phẩm
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
                                Thêm mới
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
                                Danh sách
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
                                Danh mục
                            </Link>
                        )}
                    </div>
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
                        Thêm mới
                    </Link>
                </li>
                {/* end products  */}

                {/* customers */}
                <li className={cx('list-block')}>
                    <p>Khách hàng </p>
                    <Link
                        className={isActive === 8 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(8);
                        }}
                        to={config.routes.adminAdvise}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        Khách hàng
                    </Link>
                    <Link
                        className={isActive === 9 ? cx('active') : ''}
                        onClick={() => {
                            handleActive(9);
                        }}
                        to={config.routes.adminAdvise}
                    >
                        <span>
                            <FontAwesomeIcon icon={faComments} />
                        </span>
                        Đánh giá
                    </Link>
                </li>
                {/* end customers */}

                <li>
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
                </li>

                <li className={cx('list-block')}>
                    <Link>
                        <span>
                            <FontAwesomeIcon icon={faGears} />
                        </span>
                        Cài đặt chung
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
