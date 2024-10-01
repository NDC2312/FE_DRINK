import classNames from 'classnames/bind';
import styles from './Coffee.module.scss';
import { NavLink } from 'react-router-dom';

import SliderBanner from '~/components/Slider';
import { bgCf } from '~/utils/imageCoffee';
import { logo } from '~/utils/imageHome';
import config from '~/config';

const cx = classNames.bind(styles);

function Coffee() {
    return (
        <>
            <SliderBanner image={bgCf} />
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h2>Cà phê Starbucks</h2>
                    <img src={logo} alt="" />
                </div>
                <ul className={cx('list-coffee')}>
                    <li>
                        <NavLink
                            to={config.routes.coffeeAtHome}
                            style={({ isActive }) => ({
                                padding: '10px 15px',
                                color: isActive ? '#fff' : '#555',
                                background: isActive ? '#006251' : '',
                                borderRadius: isActive ? '8px' : '',
                                boxShadow: isActive ? '0 0 12px 0 #006251' : '',
                            })}
                        >
                            Cà phê tại nhà
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.routes.coffeeDamViCaPhe}
                            style={({ isActive }) => ({
                                padding: '10px 15px',
                                color: isActive ? '#fff' : '#555',
                                background: isActive ? '#006251' : '',
                                borderRadius: isActive ? '8px' : '',
                                boxShadow: isActive ? '0 0 12px 0 #006251' : '',
                            })}
                        >
                            Hạt cà phê chất lượng
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Coffee;
