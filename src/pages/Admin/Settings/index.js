import classNames from 'classnames/bind';
import styles from './Settings.module.scss';

import { Link } from 'react-router-dom';
import { faBoxOpen, faLayerGroup, faUsersLine, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Settings() {
    const { permissions } = useSelector((state) => state.permissionReducer);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('settings')}>
                <ul>
                    <li className={cx('list-block')}>
                        <p>Giao diện</p>
                        <div>
                            <Link to={config.routes.adminAddProducts}>
                                <span>
                                    <FontAwesomeIcon icon={faBoxOpen} />
                                </span>
                                Chỉnh sửa giao diện
                            </Link>
                        </div>
                    </li>
                    <li className={cx('list-block')}>
                        <p>Tài khoản</p>
                        {permissions.includes('accounts-view') && (
                            <Link to={config.routes.adminAccount}>
                                <span>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                Danh sách tài khoản
                            </Link>
                        )}
                    </li>
                    <li className={cx('list-block')}>
                        <p>Nhóm quyền</p>
                        {permissions.includes('role-view') && (
                            <Link to={config.routes.adminPermissionGroup}>
                                <span>
                                    <FontAwesomeIcon icon={faLayerGroup} />
                                </span>
                                Nhóm quyền
                            </Link>
                        )}
                    </li>
                    <li className={cx('list-block')}>
                        <p>Phân quyền</p>
                        {permissions.includes('role-view') && (
                            <Link to={config.routes.adminRole}>
                                <span>
                                    <FontAwesomeIcon icon={faUsersLine} />
                                </span>
                                Phân quyền
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Settings;
