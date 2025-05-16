import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faSearch, faMugSaucer, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';

import Slider from '~/layout/components/Slider';
import Button from '~/components/Button';
import { SliderCustomers } from '~/layout/components/Slider';
import * as homeService from '~/services/homeService';
import * as BlogService from '~/services/b-clientService';
import config from '~/config';
import {
    coffeeHouse,
    space1,
    space2,
    space3,
    blog1,
    blog2,
    blog3,
    gallery,
    gallery_1,
    gallery_2,
    gallery_3,
    gallery_4,
    bannerHoursBook,
} from '~/utils/imageHome';
import Menu from '~/components/Menu';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [itemData, setItemData] = useState({});
    const [showImg, setShowImg] = useState(false);
    const [showImgSrc, setShowImgSrc] = useState('');
    const token = cookie.load('tokenAuth');
    useEffect(() => {
        const fetch = async () => {
            const res = await homeService.getFeatured();
            const blogs = await BlogService.getBlogNews();
            setData(res.products);
            setBlogs(blogs);
        };
        fetch();
    }, [token]);

    const hanleShowImgSrc = (src) => {
        setShowImgSrc(src);
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    console.log(blogs);
    return (
        <>
            <Slider />
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-top')}>
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item md={6} xs={12}>
                            <div className={cx('coffee-img')}>
                                <img src={coffeeHouse} alt="coffeeHouse" width="653px" height="332px" />
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className={cx('coffee-content')}>
                                <div className={cx('heading')}>
                                    <h2>Chúng tôi là</h2>
                                    <span>Coffee NTK</span>
                                </div>
                                <div className={cx('day-time')}>
                                    Thứ hai đến Thứ bảy <b>7:00am - 11:00pm</b> <span>| </span>
                                    Hotline:
                                    <a href="tel:19000211">1900 0211</a>
                                </div>
                                <span>
                                    Chúng tôi đi khắp thế giới để tìm kiếm cà phê tuyệt vời. Trong quá trình đó, chúng
                                    tôi phát hiện ra những hạt đậu đặc biệt và hiếm đến nỗi chúng tôi có thể chờ đợi để
                                    mang chúng về..
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={cx('menu')}>
                    <div className={cx('products')}>
                        <div className={cx('coffee-favorite')}>
                            Những món cà phê được yêu thích nhất <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <div className={cx('list-wrapper')}>
                            {data &&
                                data.map((item) => (
                                    <div key={item._id} className={cx('list')}>
                                        <div className={cx('sale')}>{item.discountPercentage} %</div>
                                        <div className={cx('list-img')}>
                                            <img src={item.thumbnail} alt={item.title} />
                                        </div>
                                        <div className={cx('list-infor')}>
                                            <div className={cx('name')}>{item.title}</div>
                                            <div className={cx('price')}>{VND.format(item.priceNew)}</div>
                                            <Button
                                                btn_border
                                                iconRight={<FontAwesomeIcon icon={faAngleRight} fontSize={12} />}
                                                to={config.routes.detail.replace(':slugProduct', item.slug)}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className={cx('view-more')}>
                            <Link to={config.routes.categoryProducts}>Xem thêm</Link>
                        </div>
                    </div>
                </div>
                {isOpen && <Menu isOpen={setIsOpen} data={itemData} />}
                <div className={cx('wrapper-top')}>
                    <Grid container>
                        <Grid item xs={12} md={12} className={cx('title')}>
                            <h2>
                                {' '}
                                Hình ảnh tại quán coffee <FontAwesomeIcon icon={faMugSaucer} />
                            </h2>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div
                                className={cx('gallery-img-l')}
                                onClick={() => {
                                    setShowImg(!showImg);
                                    hanleShowImgSrc(gallery_2);
                                }}
                            >
                                <img src={gallery_2} alt="gallery_2" width="555px" height="555px" />
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faSearch} fontSize={30} />
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={cx('gallery_right')}>
                                <div
                                    className={cx('gallery-img-r')}
                                    onClick={() => {
                                        setShowImg(!showImg);
                                        hanleShowImgSrc(gallery_1);
                                    }}
                                >
                                    <img src={gallery_1} alt="gallery" width="260" height="260" />
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faSearch} fontSize={30} />
                                    </span>
                                </div>
                                <div
                                    className={cx('gallery-img-r')}
                                    onClick={() => {
                                        setShowImg(!showImg);
                                        hanleShowImgSrc(gallery);
                                    }}
                                >
                                    <img src={gallery} alt="gallery" width="260" height="260" />
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faSearch} fontSize={30} />
                                    </span>
                                </div>
                                <div
                                    className={cx('gallery-img-r')}
                                    onClick={() => {
                                        setShowImg(!showImg);
                                        hanleShowImgSrc(gallery_3);
                                    }}
                                >
                                    <img src={gallery_3} alt="gallery" width="260" height="260" />
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faSearch} fontSize={30} />
                                    </span>
                                </div>
                                <div
                                    className={cx('gallery-img-r')}
                                    onClick={() => {
                                        setShowImg(!showImg);
                                        hanleShowImgSrc(gallery_4);
                                    }}
                                >
                                    <img src={gallery_4} alt="gallery" width="260" height="260" />
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faSearch} fontSize={30} />
                                    </span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {showImg && (
                    <div className={cx('gallery-img-full')} onClick={() => setShowImg(false)}>
                        <div className={cx('img-full')} onClick={(e) => e.stopPropagation()}>
                            <img src={showImgSrc} alt="" width="650" height="650" />
                        </div>
                    </div>
                )}
                <div className={cx('slider-customers')}>
                    <h2>
                        Khách hàng nói gì <FontAwesomeIcon icon={faUser} />
                    </h2>
                    <SliderCustomers />
                </div>
                <div className={cx('hours-book')}>
                    <div className={cx('hours-book-container')}>
                        <div className={cx('hours-book-l')}>
                            <div className={cx('hours-book-title')}>Chào mừng bạn!</div>
                            <p>
                                Hãy đến và trải nghiệm không gian ấm cúng, những ly cafe hảo hạng cùng với thực đơn
                                phong phú. Đặc biệt, chúng tôi có chương trình khuyến mãi hấp dẫn: Giảm 20% cho đơn hàng
                                đầu tiên khi bạn đặt trực tuyến! Đừng bỏ lỡ cơ hội thưởng thức những khoảnh khắc tuyệt
                                vời bên bạn bè và gia đình. Hãy đặt bàn ngay hôm nay và khám phá hương vị tuyệt vời của
                                chúng tôi!
                            </p>
                            <div className={cx('phone-contact')}>
                                <div>Số điện thoại</div>
                                <span>+84 382 284 203</span>
                            </div>
                        </div>
                        <div className={cx('hours-book-r')}>
                            <div className={cx('book-img')}>
                                <img src={bannerHoursBook} alt="" width="500" />
                                <Link to={config.routes.categorySnacks}>Đặt hàng</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-bottom')}>
                    <h2 className={cx('blog-title')}>Blog</h2>
                    <div className={cx('blog')}>
                        {blogs &&
                            blogs.map((item) => (
                                <div key={item._id} className={cx('blog-card')}>
                                    <div className={cx('blog-img')}>
                                        <img src={item.thumbnail} alt={item.title} />
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('date-time')}>
                                            <span className={cx('time')}>
                                                <FontAwesomeIcon icon={faClock} />
                                                <span> {new Date(item.createdAt).toLocaleDateString()} </span>
                                            </span>
                                            |
                                            <span className={cx('date')}>
                                                <FontAwesomeIcon icon={faCalendar} />
                                                <span> {new Date(item.createdAt).toLocaleTimeString()}</span>
                                            </span>
                                        </div>
                                        <Link to={config.routes.blogDetail.replace(':slug', item.slug)}>
                                            {item.title}
                                        </Link>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
