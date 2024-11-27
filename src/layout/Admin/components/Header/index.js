import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removePermission } from '~/actions/permissionsAction';
import config from '~/config';
import Button from '~/components/Button';

import cookie from 'react-cookies';

const cx = classNames.bind(styles);

function Header({ headerText }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTime = new Date();
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode' === 'true'));

    const handleLogout = () => {
        cookie.remove('token');
        dispatch(removePermission);
        localStorage.removeItem('isActive');
        navigate(config.routes.admin);
    };

    // useEffect(() => {
    //     localStorage.setItem('darkMode', darkMode);
    // }, [darkMode]);

    const handleSwitch = () => {
        setDarkMode(!darkMode);
    };

    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <header className={darkMode ? styles.dark : ''}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('header-text')}>
                        {/* <h1>{headerText}</h1> */}
                        <span className={cx('date-now')}>{formatter.format(currentTime).replace(/\s+/g, ' ')}</span>
                    </div>
                    <div className={cx('h-right')}>
                        {/* <div className={cx('header-btn-switch')}>
                            <button className={cx('btn-switch')} onClick={handleSwitch}>
                                {darkMode ? (
                                    <span className={cx('icon-moon')}>
                                        <FontAwesomeIcon icon={faMoon} />
                                    </span>
                                ) : (
                                    <span className={cx('icon-sun')}>
                                        <FontAwesomeIcon icon={faSun} />
                                    </span>
                                )}
                            </button>
                        </div> */}
                        <div>
                            <Button onClick={handleLogout} small>
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
