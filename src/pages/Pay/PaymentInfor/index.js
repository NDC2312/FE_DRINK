import classNames from 'classnames/bind';
import styles from './PaymentInfor.module.scss';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import config from '~/config';

const cx = classNames.bind(styles);

function PaymentInfor() {
    const initialValues = { name: '', phone: '', address: '' };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleBlur = () => {
        setError(validate(values));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validate(values));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(error).length === 0 && isSubmit) {
            navigate(config.routes.paymentInformation);
        }
    }, [error]);

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Họ tên không được để trống';
        }
        if (!values.phone) {
            errors.phone = 'Số điện thoại không được để chống';
        } else if (values.phone.length < 10) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!values.address) {
            errors.address = 'Địa chỉ không được để chống';
        }
        return errors;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ul className={cx('list')}>
                    <li>
                        <div className={cx('item', 'active')}>
                            <div className={cx('icon')}>
                                <ContactEmergencyIcon />
                            </div>
                            <p className={cx('text')}>Thông tin đơn hàng</p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <AccountBalanceIcon />
                            </div>
                            <p className={cx('text')}>Thanh toán</p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <CheckCircleIcon />
                            </div>
                            <p className={cx('text')}>Hoàn tất đặt hàng</p>
                        </div>
                    </li>
                </ul>
                <div className={cx('customer')}>
                    <div className={cx('customer-information')}>
                        <h5 className={cx('title')}>Thông tin khách hàng</h5>
                        <input
                            onBlur={handleBlur}
                            type="text"
                            name="name"
                            values={initialValues.name}
                            onChange={handleChange}
                            placeholder="Họ và tên (VD: Trần Nhật Nam)"
                        />
                        <p className={cx('error')}>{error.name}</p>

                        <input
                            onBlur={handleBlur}
                            name="phone"
                            type="text"
                            placeholder="Số điện thoại(bắt buộc)"
                            onChange={handleChange}
                            values={initialValues}
                        />
                        <p className={cx('error')}>{error.phone}</p>
                        <h5 className={cx('title')}>Nhập địa chỉ của bạn </h5>
                        <input
                            onBlur={handleBlur}
                            type="text"
                            name="address"
                            placeholder="Địa chỉ nhận hàng(bắt buộc)"
                            onChange={handleChange}
                            values={initialValues}
                        />
                        <p className={cx('error')}>{error.address}</p>
                        <input type="text" placeholder="Ghi chú" className={cx('notes')} />
                    </div>
                    <div className={cx('btn')}>
                        <Link to={config.routes.categoryProducts}>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: 'var(--white)',
                                    background: 'var(--background)',
                                    fontSize: '1.3rem',
                                    borderColor: 'var(--background)',
                                    '&:hover': {
                                        color: 'var(--white)',
                                        background: 'var(--background)',
                                        borderColor: 'var(--background)',
                                    },
                                }}
                            >
                                <span className={cx('icon-l')}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </span>
                                Mua thêm sản phẩm
                            </Button>
                        </Link>
                        <Link to={config.routes.paymentInformation}>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: 'var(--white)',
                                    background: 'var(--background)',
                                    borderColor: 'var(--background)',
                                    fontSize: '1.3rem',
                                    '&:hover': {
                                        color: 'var(--white)',
                                        background: 'var(--background)',
                                        borderColor: 'var(--background)',
                                    },
                                }}
                                onClick={handleSubmit}
                            >
                                Tiếp tục
                                <span className={cx('icon-r')}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentInfor;
