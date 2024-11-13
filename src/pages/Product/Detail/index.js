import classNames from 'classnames/bind';
import styles from './Detail.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import * as clientService from '~/services/p-clientService';
import * as CartService from '~/services/cartService';

const cx = classNames.bind(styles);

function Detail() {
    const [data, setData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { slugProduct } = useParams();
    console.log(slugProduct);
    useEffect(() => {
        const fetch = async () => {
            const detail = await clientService.detailProduct(slugProduct);
            setData(detail);
        };
        fetch();
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
        console.log(productId);
        console.log(quantity);

        await CartService.addProduct(productId, quantity);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')}>
                <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <Link>Quay lại</Link>
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
                            <button onClick={handleDecrease}>-</button>
                            <input type="text" value={quantity} onChange={handleQuantityChange} onBlur={handleBlur} />
                            <button onClick={handleIncrease}>+</button>
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
        </div>
    );
}

export default Detail;
