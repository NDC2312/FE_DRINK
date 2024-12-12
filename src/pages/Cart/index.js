import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as CartProducts from '~/services/cartService';
import Button from '~/components/Button';
import { cartempty } from '~/utils/imageHome';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setData(await CartProducts.getCart());
        };
        fetch();
    }, []);
    console.log('data.products', data.products);

    const handleRemove = async (productId) => {
        await CartProducts.removeProduct(productId);
        setData((prevData) => ({
            ...prevData,
            products: prevData.products.filter((item) => item.product_id !== productId),
        }));
    };

    const handleDecrease = (item) => {};

    const handleIncreaseQty = (item) => {};

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {data.products?.length > 0 ? (
                    <Grid container justify="space-around" spacing={1}>
                        <Grid item xs={12} md={12}>
                            <div className={cx('table')}>
                                <table>
                                    <thead className={cx('header')}>
                                        <tr>
                                            <th className={cx('h-product')}>Hình ảnh</th>
                                            <th className={cx('h-information')}>Thông tin sản phẩm</th>
                                            <th className={cx('h-price')}>Đơn giá</th>
                                            <th className={cx('h-qty')}>Số lượng</th>
                                            <th className={cx('h-total')}>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.products &&
                                            data.products.map((item) => (
                                                <tr key={item._id} className={cx('item-info')}>
                                                    <td className={cx('item-product')}>
                                                        <div className={cx('item-name')}>
                                                            <div className={cx('item-image')}>
                                                                <img
                                                                    src={item.productInfo.thumbnail}
                                                                    alt={item.productInfo.title}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={cx('item-information')}>
                                                        <p className={cx('name')}>{item.productInfo.title}</p>
                                                        <p
                                                            className={cx('btn-remove')}
                                                            onClick={() => handleRemove(item.product_id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                        </p>
                                                    </td>
                                                    <td className={cx('item-price')}>
                                                        <span>{VND.format(item.priceNew)}</span>
                                                        <span className={cx('discountPercent')}></span>
                                                    </td>
                                                    <td className={cx('item-qty')}>
                                                        <div className={cx('qty')}>
                                                            <span
                                                                // onClick={() => handleDecrease(item)}
                                                                className={cx('item-decrease')}
                                                            >
                                                                -
                                                            </span>
                                                            <span className={cx('qty-number')}>{item.quantity}</span>
                                                            <span
                                                                // onClick={() => handleIncreaseQty(item)}
                                                                className={cx('item-increase')}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className={cx('total')}>
                                                        <span>{VND.format(item.totalPriceProduct)}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('last')}>
                                <Link to={config.routes.categoryProducts} className={cx('back')}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    <p className={cx('text')}> Tiếp tục mua hàng</p>
                                </Link>

                                <div className={cx('payment')}>
                                    {data.products && (
                                        <div className={cx('sum-price')}>
                                            <span>Tổng tiền thanh toán : </span>
                                            <span className={cx('total')}>
                                                {VND.format(data.products[0].totalPrice)}
                                            </span>
                                        </div>
                                    )}
                                    <Button to={config.routes.paymentInfor} large>
                                        Tiến hành thanh toán
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                ) : (
                    <div className={cx('cart-empty')}>
                        <h2>Chưa có sản phẩm nào trong giỏ hàng</h2>
                        <img src={cartempty} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
