import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import cookie from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '~/actions/authAction';
import * as AuthService from '~/services/authService';
import Cart from '~/components/Cart';
import config from '~/config';
import noAvatar from '~/assets/SignIn/no-avatar.png';
import Search from './Search';
import * as ProductClient from '~/services/p-clientService';
import * as BlogClient from '~/services/b-clientService';

const cx = classNames.bind(styles);

function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const menuRef = useRef();
    const [data, setData] = useState([]);
    const [blog, setBlog] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        const fetch = async () => {
            const res = await ProductClient.getProductsCategory();
            const blog = await BlogClient.getBlogCategory();
            setData(res);
            setBlog(blog);
            const tokenAuth = await cookie.load('tokenAuth');
            if (tokenAuth) {
                await AuthService.myAuth(tokenAuth);
            }
        };
        fetch();
    }, []);

    const tree = (data) => {
        return (
            <ul>
                {data.map((item) => {
                    return (
                        <li key={item._id}>
                            <Link to={`/category-products/${item.slug}`}>{item.title}</Link>
                            {item.children && tree(item.children)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const treeBlog = (data) => {
        return (
            <ul>
                {data.map((item) => {
                    return (
                        <li key={item._id}>
                            <Link to={`/about-us/${item.slug}`}>{item.title}</Link>
                            {item.children && treeBlog(item.children)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const handleLogout = async () => {
        dispatch(logout());
        cookie.remove('tokenAuth');
    };
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(blog);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('h-top')}>
                <div className={cx('inner')}>
                    {/* <span onClick={toggleMenu} className={cx('menu-btn')}>
                        <FontAwesomeIcon icon={faBars} />
                    </span> */}

                    <span>Chào mừng bạn đến với Coffee NTK.</span>

                    <div className={cx('action')}>
                        {isLoggedIn ? (
                            <div className={cx('userLogin')}>
                                <img className={cx('img-user')} src={noAvatar} alt="" />
                                {/* <div className={cx('user')}>Xin chào: {auth.fullName}</div> */}

                                <ul className={cx('menu')}>
                                    <li>
                                        <Link to={config.routes.myAuth}>Thông tin cá nhân</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Đăng xuất</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <Link to={config.routes.signIn} className={cx('account')}>
                                    <span>Đăng nhập / </span>
                                </Link>
                                <Link to={config.routes.signUp} className={cx('account')}>
                                    <span>Đăng kí</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={cx('user-phone')}>
                        {/* {user ? (
                            <div className={cx('userLogin')}>
                                <img className={cx('img-user')} src={user.photoURL ? user.photoURL : noAvatar} alt="" />
                                <Link to="/" className={cx('log-out')} onClick={singOutHandler}>
                                    <div className={cx('logout-text')}> Đăng xuất</div>
                                </Link>
                            </div>
                        ) : (
                            <Link to={config.routes.sigin} className={cx('account')}>
                                <span>Đăng nhập</span>
                            </Link>
                        )} */}
                    </div>
                </div>
            </div>

            <div className={cx('h-menu')}>
                <div className={cx('container')}>
                    <ul className={`${styles.menu} ${showMenu ? styles['menu-open'] : ''} `} ref={menuRef}>
                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.home}
                                style={({ isActive }) => ({
                                    color: isActive ? ' var(--primary-text)' : '',
                                })}
                            >
                                Trang Chủ
                            </NavLink>
                        </li>
                        {/* <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.coffeeAtHome}
                                style={({ isActive }) => ({
                                    color: isActive ? ' var(--primary-text)' : '',
                                })}
                            >
                                Cà Phê
                            </NavLink>
                            <div className={cx('item-child')}>
                                <ul className={cx('list')}>
                                    <li>
                                        <Link to={config.routes.coffeeAtHome}>Cà phê tại nhà</Link>
                                    </li>
                                    <li>
                                        <Link to={config.routes.coffeeDamViCaPhe}>Hạt cà phê chất lượng</Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.categorySnacks}
                                style={({ isActive }) => ({
                                    color: isActive ? ' var(--primary-text)' : '',
                                })}
                            >
                                Menu
                            </NavLink>
                            {tree(data)}
                        </li>
                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.device}
                                style={({ isActive }) => ({
                                    color: isActive ? ' var(--primary-text)' : '',
                                })}
                            >
                                Giới thiệu
                            </NavLink>
                        </li>
                        {/* </ul> */}

                        {/* <ul className={`${styles.menu} ${showMenu ? styles['menu-open'] : ''} `} ref={menuRef}>
                        <li className={cx('nav-logo')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.store}
                                style={({ isActive }) => ({
                                    color: isActive ? '#006421' : '',
                                })}
                            >
                                NTK
                            </NavLink>
                        </li>
                    </ul> */}
                        {/* <ul className={`${styles.menu} ${showMenu ? styles['menu-open'] : ''} `} ref={menuRef}> */}

                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.store}
                                style={({ isActive }) => ({
                                    color: isActive ? ' var(--primary-text)' : '',
                                })}
                            >
                                Cửa hàng
                            </NavLink>
                        </li>

                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.aboutUs}
                                style={({ isActive }) => ({
                                    color: isActive ? ' var(--primary-text)' : '',
                                })}
                            >
                                Bài viết
                            </NavLink>
                            {treeBlog(blog)}
                        </li>
                    </ul>
                    <div className={cx('cart')}>
                        <div className={cx('search')}>
                            <Search />
                        </div>
                        <Cart />
                    </div>
                    <div onClick={toggleMenu} className={showMenu ? styles['menu-overlay'] : ''}></div>
                </div>
            </div>
            <div className={cx('cart-mobile')}>
                <div className={cx('mobile-qty')}>
                    <span className={cx('title-cart')}>Giỏ hàng của bạn: </span>
                    {/* <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: ' var(--primary-text)' }} /> */}
                    <span className={cx('cart-number')}>{}</span>
                </div>
                <div className={cx('mobile-total')}>
                    <span className={cx('title-cart')}>Tổng tiền: </span>
                    <span className={cx('total-number')}>{VND.format()}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
