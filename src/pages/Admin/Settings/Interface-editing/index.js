import classNames from 'classnames/bind';
import styles from './Interface-editing.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAmerica,
    faCity,
    faPhone,
    faEnvelope,
    faLocationDot,
    faCopyright,
    faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { faTiktok, faYoutube, faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { UploadToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';
import { fetchData, fetchDataUpdate } from '~/actions/settingAction';

const cx = classNames.bind(styles);

function InterfaceEditing() {
    const [settings, setSettings] = useState({
        nameWebsite: '',
        nameCompany: '',
        phone: '',
        email: '',
        address: '',
        copyright: '',
        favicon: '',
        logoWebsite: '',

        // social
        facebook: '',
        tiktok: '',
        instagram: '',
        zalo: '',
        youtube: '',
        twitter: '',
    });
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.settingReducer);
    console.log(settings);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setSettings(data);
        }
    }, [data]);

    const handleOnchangeSettings = (field, value) => {
        setSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageChange = (field, imageUrl) => {
        setSettings((prev) => ({
            ...prev,
            [field]: imageUrl,
        }));
    };

    const handleUpdateSettings = async () => {
        console.log('guilen', settings);
        dispatch(fetchDataUpdate(settings));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>Thông tin website</h2>
                    <Button className={cx('btn-add-new')} onClick={handleUpdateSettings}>
                        Cập nhật
                    </Button>
                </div>

                {/* editing */}
                <div className={cx('editing')}>
                    <div className={cx('sub-title')}>Thông tin chính</div>
                    <div className={cx('edit')}>
                        <div>
                            <div className={cx('input-group')}>
                                <p>Tên website</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faEarthAmerica} />
                                    </span>
                                    <input
                                        type="text"
                                        name="nameWebsite"
                                        id="nameWebsite"
                                        value={settings.nameWebsite || ''}
                                        onChange={(e) => handleOnchangeSettings('nameWebsite', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Tên công ty</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faCity} />
                                    </span>
                                    <input
                                        type="text"
                                        name="nameCompany"
                                        id="nameCompany"
                                        value={settings.nameCompany || ''}
                                        onChange={(e) => handleOnchangeSettings('nameCompany', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Số điện thoại</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={settings.phone || ''}
                                        onChange={(e) => handleOnchangeSettings('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Email</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={settings.email || ''}
                                        onChange={(e) => handleOnchangeSettings('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Địa chỉ</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </span>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={settings.address || ''}
                                        onChange={(e) => handleOnchangeSettings('address', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Copyright</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faCopyright} />
                                    </span>
                                    <input
                                        type="text"
                                        name="copyright"
                                        id="copyright"
                                        value={settings.copyright || ''}
                                        onChange={(e) => handleOnchangeSettings('copyright', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('edit-logo')}>
                            <div className={cx('input-group')}>
                                <p>Favicon</p>
                                <UploadToCloudinary
                                    handleImageChange={(url) => handleImageChange('favicon', url)}
                                    currentImage={settings.favicon}
                                />
                                {/* <div className={cx('input')}></div> */}
                            </div>
                            {/* <div className={cx('input-group')}>
                                <p>Logo website</p>
                                <UploadToCloudinary
                                    handleImageChange={handleImageChange}
                                    currentImage={settings.logoWebsite}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* social */}
                <div className={cx('socials')}>
                    <div className={cx('sub-title')}>Mạng xã hội</div>
                    <div className={cx('social')}>
                        <div>
                            <div className={cx('input-group')}>
                                <p>Facebook</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </span>
                                    <input
                                        type="text"
                                        name="facebook"
                                        id="facebook"
                                        value={settings.facebook || ''}
                                        onChange={(e) => handleOnchangeSettings('facebook', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Instagram</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </span>
                                    <input
                                        type="text"
                                        name="instagram"
                                        id="instagram"
                                        value={settings.instagram || ''}
                                        onChange={(e) => handleOnchangeSettings('instagram', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Tiktok</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </span>
                                    <input
                                        type="text"
                                        name="tiktok"
                                        id="tiktok"
                                        value={settings.tiktok || ''}
                                        onChange={(e) => handleOnchangeSettings('tiktok', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Zalo</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faShareNodes} />
                                    </span>
                                    <input
                                        type="email"
                                        name="zalo"
                                        id="zalo"
                                        value={settings.zalo || ''}
                                        onChange={(e) => handleOnchangeSettings('zalo', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('edit-logo')}>
                            <div className={cx('input-group')}>
                                <p>Twitter</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </span>
                                    <input
                                        type="text"
                                        name="twitter"
                                        id="twitter"
                                        value={settings.twitter || ''}
                                        onChange={(e) => handleOnchangeSettings('twitter', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <p>Youtube</p>
                                <div className={cx('input')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </span>
                                    <input
                                        type="text"
                                        name="youtube"
                                        id="youtube"
                                        value={settings.youtube || ''}
                                        onChange={(e) => handleOnchangeSettings('youtube', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InterfaceEditing;
