import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal, removeCart } from '~/redux/features/cartsSlice';
import { useEffect } from 'react';

import { cartempty } from '~/utils/imageHome';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();

    const carts = useSelector((state) => state.carts.cartItem);

    useEffect(() => {
        dispatch(getTotal());
    }, [carts]);

    const removeItem = (item) => {
        dispatch(removeCart(item));
    };

    const quantityTotal = useSelector((state) => state.carts.cartTotalQuantity);
    const priceTotal = useSelector((state) => state.carts.cartTotalAmount);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('cart-shop')}>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 25 }} />
                    <div className={cx('cart-number')}>{quantityTotal}</div>
                </div>

                <div className={cx('cart')}>
                    <div className={cx('cart-content')}>
                        <div className={cx('cart-infor')}>
                            <span>Giỏ hàng của bạn</span>
                        </div>
                        {carts.length !== 0 ? (
                            <div className={cx('scroll-content')}>
                                {carts.map((item, index) => (
                                    <div key={index} className={cx('cart-list')}>
                                        <div className={cx('item-thumb')}>
                                            <img src={item.img} alt="" />
                                        </div>

                                        <div className={cx('item-title')}>
                                            <div className={cx('item-name')}>{item.name}</div>
                                            <div className={cx('item-size')}>Ice Regular</div>
                                            <div className={cx('item-total')}>
                                                <span className={cx('item-quantity')}>{item.cartQuantity}</span> X
                                                <span className={cx('item-price')}>
                                                    {' '}
                                                    {VND.format(item.price * item.cartQuantity)}{' '}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            className={cx('btn-close')}
                                            onClick={() => {
                                                removeItem(item);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('nothing-in-cart')}>
                                <img src={cartempty} alt="nothing" />
                            </div>
                        )}
                        {carts.length !== 0 ? (
                            <div className={cx('cart-total')}>
                                <span>Tổng: </span>
                                <span className={cx('price-total')}>{VND.format(priceTotal)}</span>
                            </div>
                        ) : (
                            <div className={cx('cart-empty')}>
                                <span>Chưa có đơn hàng nào</span>
                            </div>
                        )}
                        <Link to={config.routes.cart}>
                            <Button
                                variant="outlined"
                                size="large"
                                endIcon={<FontAwesomeIcon icon={faAngleRight} className="endicon" />}
                                sx={{
                                    width: '100%',
                                    fontSize: '1.5rem',
                                    backgroundColor: '#fff',
                                    color: '#006241',
                                    borderColor: '#006241',
                                    '&:hover': {
                                        backgroundColor: '#006241',
                                        color: '#fff',
                                    },
                                }}
                            >
                                Xem Chi Tiết
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
