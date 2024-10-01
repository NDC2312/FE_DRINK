import classNames from 'classnames/bind';
import styles from './UploadToCloudinary.module.scss';

import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'p2qqbz5d');

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dn2u3dcrh/upload`, formData);
        return response.data.secure_url;
    } catch (error) {
        console.error(error);
    }
};

const UploadToCloudinary = ({ handleImageChange, currentImage }) => {
    const [imagePreview, setImagePreview] = useState(`${currentImage ? currentImage : ''}`);
    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        handleImageChange(file);
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <div>
            <input type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleImagePreview} />
            <div
                style={{
                    width: '200px',
                    height: '200px',
                    border: '1px solid #000',
                }}
            >
                {imagePreview && (
                    <div
                        style={{
                            padding: '20px',
                        }}
                    >
                        <img style={{ width: '100%', height: '100%' }} src={imagePreview} alt="Upload" />
                    </div>
                )}
            </div>
        </div>
    );
};

export { UploadToCloudinary, uploadImageToCloudinary };
