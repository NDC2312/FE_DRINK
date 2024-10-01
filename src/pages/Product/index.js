import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { NavLink } from 'react-router-dom';

import { logo } from '~/utils/imageHome';
import config from '~/config';

const cx = classNames.bind(styles);

function Product() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h2>Cà phê Starbucks</h2>
                    <img src={logo} alt="" />
                </div>
                <ul className={cx('list-coffee')}>
                    <li>
                        <NavLink
                            to={config.routes.categoryProducts}
                            style={({ isActive }) => ({
                                padding: '10px 15px',
                                color: isActive ? '#fff' : '#555',
                                background: isActive ? '#006251' : '',
                                borderRadius: isActive ? '8px' : '',
                                boxShadow: isActive ? '0 0 12px 0 #006251' : '',
                            })}
                        >
                            Thức uống
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.routes.categorySnacks}
                            style={({ isActive }) => ({
                                padding: '10px 15px',
                                color: isActive ? '#fff' : '#555',
                                background: isActive ? '#006251' : '',
                                borderRadius: isActive ? '8px' : '',
                                boxShadow: isActive ? '0 0 12px 0 #006251' : '',
                            })}
                        >
                            Snacks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.routes.categoryFood}
                            style={({ isActive }) => ({
                                padding: '10px 15px',
                                color: isActive ? '#fff' : '#555',
                                background: isActive ? '#006251' : '',
                                borderRadius: isActive ? '8px' : '',
                                boxShadow: isActive ? '0 0 12px 0 #006251' : '',
                            })}
                        >
                            Food
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Product;
