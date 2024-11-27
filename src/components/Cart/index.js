import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import * as CartQuantity from '~/services/cartService';
import { useSelector } from 'react-redux';

import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    const [quantity, setQuantity] = useState(0);
    const cartUpdated = useSelector((state) => state.cart.updated);

    const fetchQuantity = useCallback(async () => {
        setQuantity(await CartQuantity.totalQuantity());
    }, []);

    useEffect(() => {
        fetchQuantity();
    }, [cartUpdated, fetchQuantity]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-shop')}>
                <Link to={config.routes.cart}>
                    <FontAwesomeIcon icon={faCartShopping} fontSize={20} />
                </Link>
                <div className={cx('cart-number')}>{quantity}</div>
            </div>
        </div>
    );
}

export default Cart;
