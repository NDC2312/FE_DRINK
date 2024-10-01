import classNames from 'classnames/bind';
import styles from './PaymentInformation.module.scss';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import config from '~/config';
import gotIt from '~/assets/Payment/gotIt.png';
import bank from '~/assets/Payment/bank.webp';
import momo from '~/assets/Payment/momo.jpg';
import zalopay from '~/assets/Payment/zaloPay.jpg';

const cx = classNames.bind(styles);

function PaymentInformation() {
    const data = useSelector((state) => state.dataCustomer.customerInfor);
    const total = useSelector((state) => state.carts.cartTotalAmount);

    let discount = 0;

    if (total >= 200000) {
        discount = 10000;
    }
    if (total >= 300000) {
        discount = 15000;
    }
    if (total >= 400000) {
        discount = 20000;
    }
    if (total >= 450000) {
        discount = 25000;
    }
    if (total >= 500000) {
        discount = 30000;
    }
    if (total >= 550000) {
        discount = 35000;
    }
    if (total >= 600000) {
        discount = 40000;
    }
    if (total >= 650000) {
        discount = 45000;
    }
    if (total >= 700000) {
        discount = 50000;
    }
    if (total >= 750000) {
        discount = 55000;
    }
    if (total >= 800000) {
        discount = 60000;
    }
    if (total >= 900000) {
        discount = 70000;
    }
    if (total >= 1000000) {
        discount = 100000;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ul className={cx('list')}>
                    <li>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <ContactEmergencyIcon />
                            </div>
                            <p className={cx('text')}>Thông tin đơn hàng</p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item', 'active')}>
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
                <div className={cx('customer-information')}>
                    <div className={cx('c-information')}>
                        <h2 className={cx('title')}>Thông tin đơn hàng</h2>
                        <div className={cx('infor')}>
                            <span className={cx('text')}>Mã đơn hàng:</span>
                            <span className={cx('name')}>23122003</span>
                        </div>
                        <div className={cx('infor')}>
                            <span className={cx('text')}>Khách đặt hàng:</span>
                            <span className={cx('name')}>{data.name}</span>
                        </div>
                        <div className={cx('infor')}>
                            <span className={cx('text')}>Số điện thoại:</span>
                            <span className={cx('name')}>{data.phone}</span>
                        </div>
                        <div className={cx('infor')}>
                            <span className={cx('text')}>Giao tới:</span>
                            <span className={cx('name')}>{data.address}</span>
                        </div>
                        <div className={cx('infor')}>
                            <span className={cx('text')}>Phiếu giảm giá:</span>
                            <span className={cx('name')}>{discount}</span>
                        </div>
                        <div className={cx('infor')}>
                            <span className={cx('text')}>Tổng:</span>
                            <span className={cx('name')}>{total - discount}</span>
                        </div>
                    </div>
                    <div className={cx('c-check')}>
                        <h3 className={cx('check-title')}>Chọn hình thức thanh toán</h3>
                        <div className={cx('check-out')}>
                            <div className={cx('check')}>
                                <div className={cx('check-img')}>
                                    <img src={gotIt} alt="" />
                                </div>
                                <p>Thanh toán khi nhân hàng</p>
                            </div>

                            <div className={cx('check')}>
                                <div className={cx('check-img')}>
                                    <img src={bank} alt="" />
                                </div>
                                <p>Thanh toán qua chuyển khoản</p>
                            </div>

                            <div className={cx('check')}>
                                <div className={cx('check-img')}>
                                    <img src={momo} alt="" />
                                </div>
                                <p>Thanh toán qua Momo</p>
                            </div>

                            <div className={cx('check')}>
                                <div className={cx('check-img')}>
                                    <img src={zalopay} alt="" />
                                </div>
                                <p>Thanh toán qua Zalo Pay</p>
                            </div>
                        </div>

                        <Link to={config.routes.paymentSuccess}>
                            <Button
                                variant="outline"
                                size="large"
                                sx={{
                                    width: '100%',
                                    marginTop: '20px',
                                    color: 'var(--white)',
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'none',
                                    fontSize: '1.4rem',

                                    '&:hover': {
                                        color: 'var(--white)',
                                        backgroundColor: 'var(--background)',
                                        borderColor: 'none',
                                    },
                                }}
                            >
                                Hoàn tất đơn hàng
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentInformation;
