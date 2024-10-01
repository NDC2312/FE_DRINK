import classNames from 'classnames/bind';
import styles from './Snacks.module.scss';
import { Grid, Button } from '@mui/material';
import { useState } from 'react';

import { productSnacks } from '~/utils/imageProducts';
import Product from '..';
import { bgs } from '~/utils/imageProducts';
import Menu from '~/components/Menu';
import SliderBanner from '~/components/Slider';

const cx = classNames.bind(styles);

function Snacks() {
    const [isOpen, setIsOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const toggleOpen = (data) => {
        setIsOpen(!isOpen);
        setItemData(data);
    };

    const VND = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <>
            <SliderBanner image={bgs} />
            <Product />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <Grid container rowSpacing={5} spacing={0}>
                        {productSnacks.map((data, index) => (
                            <Grid key={index} item xs={6} md={3}>
                                <div className={cx('item')}>
                                    <div className={cx('item-img')}>
                                        <img src={data.img} alt="" />
                                    </div>
                                    <div className={cx('item-info')}>
                                        <div className={cx('item-name')}>{data.name}</div>
                                        <div className={cx('item-desc')}>{data.desc}</div>
                                        <div className={cx('item-price')}>{VND.format(data.price)}</div>
                                        <Button
                                            variant="outlined"
                                            size="medium"
                                            sx={{
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
                            </Grid>
                        ))}
                        {isOpen && <Menu isOpen={setIsOpen} data={itemData} />}
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default Snacks;
