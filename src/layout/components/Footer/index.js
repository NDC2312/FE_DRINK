import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkedAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Grid, Button } from '@mui/material';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('footer')}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.772663893038!2d106.6728993113795!3d10.980524689135786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1085e2b1c37%3A0x73bfa5616464d0ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7pyBE4bqndSBN4buZdA!5e0!3m2!1svi!2s!4v1727710395368!5m2!1svi!2s"
                            width="500"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid item xs={12}>
                            <div className={cx('about')}>
                                <span className={cx('title')}>Chúng tôi là Coffee NTK</span>
                                <div className={cx('content-us')}>
                                    <div>
                                        <span>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} />
                                        </span>
                                        Trụ sở chính: Tầng 6 toà nhà Ladeco, 266 Đội Cấn, phường Liễu Giai, Hà Nội
                                    </div>
                                    <div>
                                        <span>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        Email: tnn231223@gmail.com
                                    </div>
                                    <div>
                                        <span>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        Liên hệ: +84 382 284 203
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx('about')}>
                                <div className={cx('about-follow')}>
                                    <span className={cx('title')}>Theo dõi chúng tôi:</span>
                                    <div className={cx('content')}>
                                        <div className={cx('socials')}>
                                            <span>
                                                <FontAwesomeIcon icon={faFacebook} className={cx('fb')} />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faInstagram} className={cx('ig')} />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faTiktok} className={cx('tk')} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={cx('services')}>
                                <div className={cx('service')}>
                                    <span className={cx('title')}>Dịch vụ khách hàng</span>
                                    <div className={cx('content')}>
                                        <ul>
                                            <li>Trang chủ</li>
                                            <li>Giới thiệu</li>
                                            <li>Sản phẩm</li>
                                            <li>Dịch vụ</li>
                                            <li>Tin tức</li>
                                            <li>Liên hệ</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={cx('service')}>
                                    <span className={cx('title')}>Thông tin mới</span>
                                    <div className={cx('content')}>
                                        <ul>
                                            <li>Trang chủ</li>
                                            <li>Giới thiệu</li>
                                            <li>Sản phẩm</li>
                                            <li>Dịch vụ</li>
                                            <li>Tin tức</li>
                                            <li>Liên hệ</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className={cx('copyright')}>© 2024 Coffee House. Mọi quyền được bảo lưu.</div>
        </footer>
    );
}

export default Footer;
