import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { logo } from '~/utils/imageHome';
import Cart from '~/components/Cart';
import config from '~/config';
import noAvatar from '~/assets/SignIn/no-avatar.png';
import Search from './Search';

const cx = classNames.bind(styles);

function Header() {
    const menuRef = useRef();

    const [user, setUser] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    const qty = useSelector((state) => state.carts.cartTotalQuantity);
    const total = useSelector((state) => state.carts.cartTotalAmount);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('h-top')}>
                <div className={cx('inner')}>
                    <span onClick={toggleMenu} className={cx('menu-btn')}>
                        <FontAwesomeIcon icon={faBars} />
                    </span>

                    <span>Chào mừng bạn đến với Coffee NTK.</span>

                    {/* <form className={cx('search')}>
                        <input placeholder="Tìm kiếm..." />
                        
                    </form> */}
                    {/* <Search /> */}
                    <div className={cx('action')}>
                        {user ? (
                            <div className={cx('userLogin')}>
                                <img className={cx('img-user')} src={user.photoURL ? user.photoURL : noAvatar} alt="" />
                                <Link to="/" className={cx('log-out')}>
                                    <div className={cx('logout-text')}> Đăng xuất</div>
                                </Link>
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
                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.coffeeAtHome}
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--primary-text)' : '',
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
                        </li>
                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.device}
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--primary-text)' : '',
                                })}
                            >
                                Giới thiệu
                            </NavLink>
                        </li>
                    </ul>

                    <ul className={`${styles.menu} ${showMenu ? styles['menu-open'] : ''} `} ref={menuRef}>
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
                    </ul>
                    <ul className={`${styles.menu} ${showMenu ? styles['menu-open'] : ''} `} ref={menuRef}>
                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.categoryProducts}
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--primary-text)' : '',
                                })}
                            >
                                Sản phẩm
                            </NavLink>
                            <div className={cx('item-child')}>
                                <ul className={cx('list')}>
                                    <li>
                                        <Link to={config.routes.categoryProducts}>Đồ uống</Link>
                                    </li>
                                    <li>
                                        <Link to={config.routes.categorySnacks}>Đồ ăn tráng miệng</Link>
                                    </li>
                                    <li>
                                        <Link to={config.routes.categoryFood}>Đồ ăn ngọt</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className={cx('item')}>
                            <NavLink
                                onClick={toggleMenu}
                                to={config.routes.store}
                                style={({ isActive }) => ({
                                    color: isActive ? '#006421' : '',
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
                                    color: isActive ? '#006421' : '',
                                })}
                            >
                                Bài viết
                            </NavLink>
                            {/* <ul className={cx('item-about')}>
                                <li className={cx('list-item')}>
                                    <Link to={config.routes.notThing}>
                                        <h6 className={cx('item-tittle')}>Di Sản </h6>
                                    </Link>
                                    <ul className={cx('item-intro')}>
                                        <li>Cà phê</li>
                                        <li>Dịch vụ khách hàng</li>
                                        <li>Tầm nhìn</li>
                                        <li>Cam kết với cộng đồng</li>
                                    </ul>
                                </li>
                                <li className={cx('list-item')}>
                                    <Link to={config.routes.notThing}>
                                        <h6 className={cx('item-tittle')}>Công ty</h6>
                                    </Link>
                                    <ul className={cx('item-intro')}>
                                        <li>Tuyên bố về sứ mệnh</li>
                                        <li>Đạo đức và Tuân thủ trong kinh doanh</li>
                                        <li>Sự đa dạng tại starbucks</li>
                                        <li>Chính sách trực tuyến</li>
                                    </ul>
                                </li>
                                <li className={cx('list-item')}>
                                    <Link to={config.routes.notThing}>
                                        <h6 className={cx('item-tittle')}>Cơ hội nghề nghiệp</h6>
                                    </Link>
                                    <ul className={cx('item-intro')}>
                                        <li>Nhân viên pha chế</li>
                                        <li>Giám sát ca</li>
                                        <li>Quản lý của hanhg</li>
                                        <li>Các vị trí khác</li>
                                    </ul>
                                </li>
                            </ul> */}
                        </li>
                    </ul>
                    <div className={cx('cart')}>
                        <div className={cx('search')}>
                            <span>
                                <FontAwesomeIcon icon={faSearch} fontSize={20} />
                            </span>
                        </div>
                        <Cart />
                    </div>
                    <div onClick={toggleMenu} className={showMenu ? styles['menu-overlay'] : ''}></div>
                </div>
            </div>
            <div className={cx('cart-mobile')}>
                <div className={cx('mobile-qty')}>
                    <span className={cx('title-cart')}>Giỏ hàng của bạn: </span>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: ' var(--primary-text)' }} />
                    <span className={cx('cart-number')}>{qty}</span>
                </div>
                <div className={cx('mobile-total')}>
                    <span className={cx('title-cart')}>Tổng tiền: </span>
                    <span className={cx('total-number')}>{VND.format(total)}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
