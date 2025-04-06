import classNames from 'classnames/bind';
import styles from './UploadToCloudinary.module.scss';

import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

const uploadImageToCloudinary = async (image, folderName) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'p2qqbz5d');
    if (folderName) {
        formData.append('folder', folderName);
    }
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dn2u3dcrh/upload`, formData);
        return response.data.secure_url;
    } catch (error) {
        console.error(error);
    }
};

const uploadMultipleImagesToCloudinary = async (images, folderName) => {
    const filesToUpload = images.slice(0, 5);
    const uploadPromises = filesToUpload.map((image) => uploadImageToCloudinary(image, folderName));
    return await Promise.all(uploadPromises);
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
                    width: '100px',
                    height: '100px',
                    border: '1px solid #000',
                    overflow: 'hidden',
                }}
            >
                {imagePreview && (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <img style={{ width: '100%', height: '100%' }} src={imagePreview} alt="Upload" />
                    </div>
                )}
            </div>
        </div>
    );
};

export { UploadToCloudinary, uploadImageToCloudinary, uploadMultipleImagesToCloudinary };
