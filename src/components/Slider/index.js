import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function SliderBanner({ image }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-slider')}>
                <img src={image} alt="bg" className={cx('img-slider')} />
            </div>
        </div>
    );
}

export const SliderCustomer = (img, name, comment) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-slider')}>
                <img src={img} alt="bg" className={cx('img-slider')} />
                <p className={cx('name')}>{name}</p>
                <span>{comment}</span>
            </div>
        </div>
    );
};

export default SliderBanner;
