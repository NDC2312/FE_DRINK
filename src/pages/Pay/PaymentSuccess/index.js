import classNames from 'classnames/bind';
import styles from './PaymentSuccess.module.scss';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import config from '~/config';
import success from '~/assets/Payment/success.jpg';
import { clearCart } from '~/redux/features/cartsSlice';

const cx = classNames.bind(styles);

function PaymentSuccess() {
    const data = useSelector((state) => state.dataCustomer.customerInfor);
    const total = useSelector((state) => state.carts.cartTotalAmount);
    const cart = useSelector((state) => state.carts.cartItem);

    const dispatch = useDispatch();

    const VND = Intl.NumberFormat('vi-vn', {
        style: 'currency',
        currency: 'VND',
    });

    const handleOnclick = () => {
        dispatch(clearCart());
    };

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
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <AccountBalanceIcon />
                            </div>
                            <p className={cx('text')}>Thanh toán</p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item', 'active')}>
                            <div className={cx('icon')}>
                                <CheckCircleIcon />
                            </div>
                            <p className={cx('text')}>Hoàn tất đặt hàng</p>
                        </div>
                    </li>
                </ul>
                <div className={cx('customer-information')}>
                    <div className={cx('c-information')}>
                        <div className={cx('success-img')}>
                            <img src={success} alt="" />
                        </div>
                        <div className={cx('success')}>
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
                                <span className={cx('name', 'total')}>{VND.format(total - discount)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('my-products')}>
                        <h3 className={cx('p-header')}>Sản phẩm bạn đã mua</h3>
                        <div className={cx('products')}>
                            {cart.map((item, index) => (
                                <div key={index} className={cx('c-wrapper')}>
                                    <div className={cx('item')}>
                                        <img src={item.img} alt="" />
                                        <div className={cx('item-infor')}>
                                            <span>{item.name}</span>
                                            <span>Giá: {VND.format(item.price)}</span>
                                            <span>Số lượng: {item.cartQuantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link to={config.routes.home}>
                        <Button
                            variant="outline"
                            size="large"
                            sx={{
                                width: '100%',

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
                            onClick={handleOnclick}
                        >
                            Tiếp tục mua hàng
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
