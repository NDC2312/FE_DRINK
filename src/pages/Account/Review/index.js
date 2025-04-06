import classNames from 'classnames/bind';
import styles from './Review.module.scss';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faStar, faCamera, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import * as AuthService from '~/services/p-clientService';
import { uploadMultipleImagesToCloudinary, uploadImageToCloudinary } from '~/components/UploadToCloudinary';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Review({ isOpen, data }) {
    const [form, setForm] = useState({
        product_id: data.product_id,
        order_id: data.order_id,
        user_id: data.user_id,
        rating_product: 0,
        rating_transport: 0,
        comment: '',
        images: [],
        video: '',
        hide_name: true,
    });

    const handleOnchangeReview = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleRating = (field, star) => {
        setForm((prev) => ({
            ...prev,
            [field]: star,
        }));
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const removeImage = (index) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveVideo = () => {
        setForm((prev) => ({
            ...prev,
            video: '',
        }));
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0] || null;
        handleOnchangeReview('video', file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('form', form);
        let uploadedImageUrls = [];
        if (form.images.length > 0) {
            uploadedImageUrls = await uploadMultipleImagesToCloudinary(form.images, 'reviews/images');
        }
        let uploadedVideoUrl = '';
        if (form.video) {
            uploadedVideoUrl = await uploadImageToCloudinary(form.video, 'reviews/videos');
        }
        const reviewData = {
            ...form,
            images: uploadedImageUrls,
            video: uploadedVideoUrl,
        };
        await AuthService.addReview(reviewData);
        isOpen(false);
    };

    return (
        <div className={cx('wrapper')} onClick={() => isOpen(false)}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <div onClick={() => isOpen(false)} className={cx('btn-close')}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('content')}>
                        <Grid container spacing={0}>
                            <h3>Đánh giá sản phẩm</h3>
                            <div className={cx('information-product')}>
                                <div className={cx('product-thumbnail')}>
                                    <img src={data.thumbnail} alt={data.tittle} />
                                </div>
                                <div className={cx('product-title')}>
                                    <p>{data.title}</p>
                                    <span>Thành tiền: {data.totalPrice} VND</span>
                                </div>
                            </div>
                            <div className={cx('item-product')}>
                                <div className={cx('stars')}>
                                    <div className={cx('sub-title')}>Chất lượng sản phẩm: </div>
                                    <div>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FontAwesomeIcon
                                                key={star}
                                                icon={faStar}
                                                className={cx('star', { active: star <= form.rating_product })}
                                                onClick={() => handleRating('rating_product', star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('description-product')}>
                                    <div className={cx('sub-title')}>Mô tả sản phẩm</div>
                                    <textarea
                                        style={{ padding: '10px' }}
                                        placeholder="Viết nhận xét của bạn..."
                                        onChange={(e) => handleOnchangeReview('comment', e.target.value)}
                                    />

                                    {/* Show selected images  */}
                                    <div style={{ display: 'flex', columnGap: '10px' }}>
                                        <div className={cx('selected-images')}>
                                            {form.images.map((image, index) => (
                                                <div key={index} className={cx('selected-image')}>
                                                    <img src={URL.createObjectURL(image)} alt="preview" />
                                                    <button onClick={() => removeImage(index)}>✕</button>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Hiển thị video đã chọn */}
                                        <div className={cx('selected-images')}>
                                            {form.video && (
                                                <div className={cx('selected-image')}>
                                                    <video width="50px" height="50px" controls>
                                                        <source
                                                            src={URL.createObjectURL(form.video)}
                                                            type={form.video.type}
                                                        />
                                                    </video>
                                                    <button onClick={() => handleRemoveVideo()}>✕</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={cx('btn-description-product')}>
                                        {/* Show images, hide if five are already present */}
                                        {form.images.length < 5 && (
                                            <label className={cx('btn-add-image')}>
                                                <FontAwesomeIcon icon={faCamera} fontSize={18} />
                                                Thêm Hình Ảnh
                                                <span>{form.images.length}/5</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImagesChange}
                                                    multiple
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        )}
                                        {!form.video && (
                                            <label className={cx('btn-add-image')}>
                                                <FontAwesomeIcon icon={faVideo} fontSize={18} />
                                                Thêm Video
                                                {/* <span>{form.video.length}/1</span> */}
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleVideoChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <div className={cx('hide-name')}>
                                    <input
                                        type="checkbox"
                                        name="hide-name"
                                        checked={form.hide_name}
                                        onChange={() => handleOnchangeReview('hide_name', !form.hide_name)}
                                    />
                                    <div>
                                        <div>Hiển thị tên đăng nhập trên đánh giá này</div>
                                        <p>Tên tài khoản sẽ được hiện thị {data.fullName}</p>
                                    </div>
                                </div>
                                <div className={cx('service')}>
                                    <div className={cx('sub-title')}>Về dịch vụ</div>
                                    <div className={cx('service-transport')}>
                                        <span>Dịch vụ vận chuyển:</span>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FontAwesomeIcon
                                                key={star}
                                                icon={faStar}
                                                className={cx('service', { active: star <= form.rating_transport })}
                                                onClick={() => handleRating('rating_transport', star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('submit')}>
                                    <Button small type="submit" className={cx('btn-submit')}>
                                        Hoàn thành
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Review;
