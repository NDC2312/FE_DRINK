import classNames from 'classnames/bind';
import styles from './CoffeeAtHome.module.scss';
import { Grid, Button } from '@mui/material';
import { useState } from 'react';

import Coffee from '..';
import { drinksCoffeeData } from '~/utils/imageCoffee';
import Menu from '~/components/Menu';

const cx = classNames.bind(styles);

function CoffeeAtHome() {
    const [isOpen, setIsOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const toggleOpen = (data) => {
        setIsOpen(true);
        setItemData(data);
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <>
            <Coffee />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <h2 className={cx('title')}>Cà phê tại nhà dành cho bạn</h2>
                    <Grid container spacing={0}>
                        {drinksCoffeeData.map((data, index) => (
                            <Grid key={index} item xs={6} md={3}>
                                <div className={cx('coffee')}>
                                    <div className={cx('item-coffee')}>
                                        <div className={cx('item-img')}>
                                            <img src={data.img} alt="" />
                                        </div>
                                        <div className={cx('item-infor')}>
                                            <div className={cx('item-name')}>{data.name}</div>
                                            <div className={cx('item-desc')}>{data.desc}</div>
                                            <div className={cx('item-price')}>{VND.format(data.price)}</div>
                                            <Button
                                                variant="outlined"
                                                size="medium"
                                                sx={{
                                                    marginTop: '7px',
                                                    fontSize: '1.3rem',
                                                    backgroundColor: '#fff',
                                                    color: '#006241',
                                                    borderColor: '#006241',
                                                    '&:hover': {
                                                        backgroundColor: '#006241',
                                                        color: '#fff',
                                                    },
                                                }}
                                                onClick={() => toggleOpen(data)}
                                            >
                                                Đặt hàng
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    {isOpen && <Menu isOpen={setIsOpen} data={itemData} />}
                    {console.log(isOpen)}
                    {console.log(itemData)}
                </div>
            </div>
        </>
    );
}

export default CoffeeAtHome;
