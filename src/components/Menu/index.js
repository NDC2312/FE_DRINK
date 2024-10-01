import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Grid, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/redux/features/cartsSlice';

const cx = classNames.bind(styles);

function Menu({ isOpen, data }) {
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(data.price);
    const dispatch = useDispatch();

    const newData = { ...data, qty: quantity, total: total };

    const handleAddCart = () => {
        isOpen(false);
        dispatch(addToCart(newData));
    };

    const handleSubtract = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity((prev) => prev - 1);
            setTotal((prev) => prev - data.price);
        }
    };

    const handlePlus = () => {
        setQuantity((prev) => prev + 1);
        setTotal((prev) => prev + data.price);
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className={cx('wrapper')} onClick={() => isOpen(false)}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => isOpen(false)}>
                    <FontAwesomeIcon className={cx('btn-close')} icon={faClose} />
                </button>
                <div className={cx('content')}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={5}>
                            <div className={cx('item-product')}>
                                <div className={cx('item-img')}>
                                    <img src={data.img} alt="" />
                                </div>
                                <div className={cx('item-info')}>
                                    <div className={cx('item-name')}>{data.name}</div>
                                    <div className={cx('item-price')}>{VND.format(data.price)}</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div className={cx('product')}>
                                <div className={cx('product-title')}>{data.name}</div>
                                <div className={cx('product-size')}>
                                    <span>Kích thước:</span>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            fontSize: '1.5rem',
                                            color: '#fff',
                                            background: 'var(--background)',
                                            borderColor: 'white',
                                            marginLeft: '20px',
                                            '&:hover': {
                                                background: 'var(--background)',
                                                color: 'white',
                                                borderColor: 'var(--background)',
                                            },
                                        }}
                                        className={cx('size')}
                                    >
                                        M
                                    </Button>
                                    <div className={cx('size-children')}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                fontSize: '1.5rem',
                                                color: 'var(--primary-text)',
                                                background: 'white',
                                                borderColor: 'black',

                                                '&:hover': {
                                                    background: 'var(--background)',
                                                    color: 'white',
                                                    borderColor: 'var(--background)',
                                                },
                                            }}
                                        >
                                            L
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                fontSize: '1.5rem',
                                                color: 'var(--primary-text)',
                                                background: 'white',
                                                borderColor: 'black',

                                                '&:hover': {
                                                    background: 'var(--background)',
                                                    color: 'white',
                                                    borderColor: 'var(--background)',
                                                },
                                            }}
                                        >
                                            XL
                                        </Button>
                                    </div>
                                </div>

                                {/* So luong */}
                                <div className={cx('product-quantity')}>
                                    <span>Số lượng:</span>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            fontWeight: '900',
                                            fontSize: '1.5rem',
                                            color: 'var(--primary-text)',
                                            background: 'white',
                                            borderColor: 'white',
                                            marginLeft: '20px',
                                            '&:hover': {
                                                background: 'var(--background)',
                                                color: 'white',
                                                borderColor: 'var(--background)',
                                            },
                                        }}
                                        onClick={() => handleSubtract()}
                                    >
                                        -
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontWeight: '900',
                                            color: 'var(--primary-text)',
                                            background: 'white',
                                            borderColor: 'white',

                                            '&:hover': {
                                                background: 'var(--background)',
                                                color: 'white',
                                                borderColor: 'var(--background)',
                                            },
                                        }}
                                    >
                                        {quantity}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            fontWeight: '900',
                                            fontSize: '1.5rem',
                                            color: 'var(--primary-text)',
                                            background: 'white',
                                            borderColor: 'white',

                                            '&:hover': {
                                                background: 'var(--background)',
                                                color: 'white',
                                                borderColor: 'var(--background)',
                                            },
                                        }}
                                        onClick={() => handlePlus()}
                                    >
                                        +
                                    </Button>
                                </div>

                                <div className={cx('notes')}>
                                    <span>Ghi Chú:</span>
                                    <div className={cx('input')}>
                                        <input placeholder="Bạn có muốn thêm topping gì không" />
                                    </div>
                                </div>
                                <div className={cx('total')}>
                                    <span>Tổng:</span>
                                    <div className={cx('cnt-total')}>{VND.format(total)}</div>
                                </div>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        fontSize: '1.8rem',
                                        color: '#fff',
                                        background: 'var(--background)',
                                        marginTop: '20px',
                                        '&:hover': {
                                            background: 'var(--background)',
                                            color: 'white',
                                        },
                                    }}
                                    onClick={handleAddCart}
                                >
                                    Đặt hàng
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Menu;
