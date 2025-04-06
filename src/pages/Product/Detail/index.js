import classNames from 'classnames/bind';
import styles from './Detail.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCart as updateCartAction } from '~/actions/cartActions';
import { useNavigate } from 'react-router-dom';

import * as clientService from '~/services/p-clientService';
import * as CartService from '~/services/cartService';
import config from '~/config';

const cx = classNames.bind(styles);

function Detail() {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [review, setReview] = useState([]);
    const { slugProduct } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            const detail = await clientService.detailProduct(slugProduct);
            const id = detail._id;
            setData(detail);
            const getAllById = await clientService.getReviewAll(id);
            setReview(getAllById);
        };
        fetch();
        // if (data.length > 0) {
        // }
    }, [slugProduct]);

    const VND = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleIncrease = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99));
    };
    const handleDecrease = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 99) {
            setQuantity(value);
        } else if (e.target.value === '') {
            setQuantity('');
        }
    };
    const handleBlur = () => {
        if (quantity === '' || Number(quantity) < 1) setQuantity(1);
    };

    const handleOrder = async (productId, quantity) => {
        await CartService.addProduct(productId, quantity);
        dispatch(updateCartAction());
    };

    console.log('review', review);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')}>
                <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                    Quay lại
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('product-image')}>
                    <img src={data.thumbnail} alt="Cà phê Cappuccino" />
                </div>

                <div className={cx('product-details')}>
                    <h1>{data.title}</h1>
                    <div className={cx('price')}>
                        <p className={cx('price-old')}>{VND.format(data.price)}</p>- {data.discountPercentage}%
                    </div>
                    <p className={cx('price-new')}>{VND.format(data.priceNew)}</p>
                    <div className={cx('order')}>
                        <div className={cx('quantity')}>
                            <button onClick={handleDecrease} className={cx('ooo')}>
                                -
                            </button>
                            <input type="text" value={quantity} onChange={handleQuantityChange} onBlur={handleBlur} />
                            <button onClick={handleIncrease} className={cx('ooo')}>
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                handleOrder(data._id, quantity);
                            }}
                            className={cx('order-button')}
                        >
                            ĐẶT HÀNG
                        </button>
                    </div>
                    <div className={cx('info')}>
                        <b>Thông tin</b>
                        <p className={cx('description')}>Thông tin sản phẩm đang được cập nhật</p>
                    </div>
                </div>
            </div>
            <div className={cx('review')}>
                <h3> Đánh giá sản phẩm </h3>
                <div className={cx('review-detail')}>
                    {review &&
                        review.map((item) => (
                            <div key={item._id} className={cx('detail')}>
                                <div className={cx('review-name')}>
                                    <p className={cx('fullName')}>{item.hide_name ? item.fullName : '*********'}</p>
                                    <div className={cx('stars')}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FontAwesomeIcon
                                                key={star}
                                                icon={faStar}
                                                className={cx('star', { active: star <= item.rating_product })}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('time')}> {new Date(item.createdAt).toLocaleString()}</div>
                                <div className={cx('comment')}>{item.comment}</div>

                                <div className={cx('images')}>
                                    {item.images &&
                                        item.images.length > 0 &&
                                        item.images.map((img, index) => (
                                            <img key={index} src={img} alt={`Hình ảnh ${index}`} />
                                        ))}
                                    {
                                        console.log('URL video:', item.video) // Kiểm tra URL trước khi render
                                    }
                                    {item.video && (
                                        <video
                                            id={`video-${item._id}`}
                                            width="72px"
                                            height="72px"
                                            controls
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            // onClick={(e) => {
                                            //     // Kiểm tra nếu click vào chính video (không phải controls)
                                            //     if (e.target === e.currentTarget) {
                                            //         console.log('Click vào video!');

                                            //         const videoElement = e.target;
                                            //         if (videoElement.requestFullscreen) {
                                            //             videoElement.requestFullscreen();
                                            //         } else if (videoElement.webkitRequestFullscreen) {
                                            //             videoElement.webkitRequestFullscreen();
                                            //         } else if (videoElement.mozRequestFullScreen) {
                                            //             videoElement.mozRequestFullScreen();
                                            //         } else if (videoElement.msRequestFullscreen) {
                                            //             videoElement.msRequestFullscreen();
                                            //         }
                                            //         videoElement.play();
                                            //     }
                                            // }}
                                        >
                                            <source src={item.video} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Detail;
