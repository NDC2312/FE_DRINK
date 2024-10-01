import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { useRef } from 'react';

// swiper
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

// img
import { sliderHomeData, sliderHomeCustommer } from '~/utils/imageHome';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SliderHome() {
    const swiperPrevIcon = useRef(null);
    const swiperNextIcon = useRef(null);

    return (
        <div className={cx('container')}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                effect
                speed={1000}
                slidesPerView={1}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperPrevIcon.current;
                    swiper.params.navigation.nextEl = swiperNextIcon.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className={cx('wrapper')}
            >
                {sliderHomeData.map((data, index) => (
                    <SwiperSlide key={index} className={cx('swiper-slider')}>
                        <div className={cx('title')}>
                            <div>{data.title}</div>
                        </div>
                        <img src={data.img} alt={data.name} />
                    </SwiperSlide>
                ))}

                <div className={cx('prevIcon')} ref={swiperPrevIcon}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className={cx('nextIcon')} ref={swiperNextIcon}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </Swiper>
        </div>
    );
}

export const SliderCustomers = () => {
    const swiperPrevIcon = useRef(null);
    const swiperNextIcon = useRef(null);

    return (
        <div className={cx('container')}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                effect
                speed={3000}
                slidesPerView={1}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperPrevIcon.current;
                    swiper.params.navigation.nextEl = swiperNextIcon.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className={cx('wrapper-customer')}
            >
                {sliderHomeCustommer.map((data, index) => (
                    <SwiperSlide key={index} className={cx('swiper-slider')}>
                        <div>
                            <img src={data.img} alt={data.name} />
                            <p>{data.name}</p>
                            <div>{data.comment}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderHome;
