import classNames from 'classnames/bind';
import styles from './Store.module.scss';
import { Grid, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

import store from '~/assets/store.jpg';
import DropDown from '~/components/DropDown';
import { useState, useEffect } from 'react';
import { locations } from '~/utils/imageStore';

const cx = classNames.bind(styles);

function Store() {
    const [city, setCity] = useState('Thành phố Hồ Chí Minh');
    const [district, setDistrict] = useState('Quận');

    useEffect(() => {
        setDistrict('Quận 1');
    }, [city]);

    const listCity = [
        'Thành phố Hồ Chí Minh',
        'Tỉnh Bình Dương',
        'Tỉnh Thái Nguyên',
        'Thành phố Hải phòng',
        'Tỉnh Bắc Giang',
        'Tỉnh Vĩnh Phúc',
        'Tỉnh Thanh Hóa',
        'Tỉnh Quảng Nam',
        'Tỉnh Khánh Hòa',
        'Tỉnh Đồng Nai',
        'Tỉnh Tiền Giang',
        'Tỉnh Bến Tre',
    ];

    let listDistrict = [];

    if (city === 'Thành phố Hồ Chí Minh') {
        listDistrict = [
            'Quận 1',
            'Quận 2',
            'Quận 3',
            'Quận 4',
            'Quận 5',
            'Quận 6',
            'Quận 7',
            'Quận 8',
            'Quận 9',
            'Quận 10',
        ];
    }

    if (city === 'Tỉnh Bình Dương') {
        listDistrict = ['Đại lộ Bình Dương'];
    }

    const address = locations.map((location) => location.address);
    const Filter = locations.filter((location, index) => {
        return address[index].includes(city) && address[index].includes(district);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-store')}>
                <img src={store} alt="store" />
            </div>
            <div className={cx('container')}>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={3}>
                        <div className={cx('area')}>
                            <p className={cx('area-where')}>Theo khu vực</p>
                            <DropDown options={listCity} selected={city} setSelected={setCity} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <div className={cx('district')}>
                            <DropDown options={listDistrict} selected={district} setSelected={setDistrict} />
                        </div>
                        <div className={cx('map')}>
                            {Filter.map((data, index) => (
                                <div key={index} className={cx('map-item')}>
                                    <div className={cx('img')}>
                                        <img src={data.img} alt="" />
                                    </div>
                                    <div className={cx('map-info')}>
                                        <div className={cx('name')}>{data.title}</div>
                                        <div className={cx('address')}>
                                            <FontAwesomeIcon icon={faLocationDot} /> {data.address}
                                        </div>
                                        <div className={cx('phone')}>
                                            <FontAwesomeIcon icon={faPhone} /> {data.phone}
                                        </div>
                                        <div className={cx('hour')}>
                                            <FontAwesomeIcon icon={faClock} /> {data.hour}
                                        </div>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                fontSize: '1.5rem',
                                                background: 'var(--background)',
                                                color: 'var(--white)',
                                                borderColor: 'var(--background)',
                                                '&:hover': {
                                                    background: 'white',
                                                    color: 'var(--primary-text)',
                                                    borderColor: 'var(--background)',
                                                },
                                            }}
                                            onClick={() => window.open(data.url, '_blank')}
                                        >
                                            Chỉ đường
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Store;
