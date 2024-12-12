import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import * as ProductClient from '~/services/p-clientService';
import { useParams } from 'react-router-dom';
import { slider2 } from '~/utils/imageHome';
import SliderBanner from '~/components/Slider';
import config from '~/config';

const cx = classNames.bind(styles);

function Products() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    console.log(slug);
    useEffect(() => {
        const fetch = async () => {
            const res = await ProductClient.getProductsCategorySlug(slug);
            setData(res);
        };
        fetch();
    }, [slug]);

    const slugToTitleMap = {
        'ca-phe-the-gioi': 'Cà phê thế giới',
        'ca-phe-viet': 'Cà phê việt',
        'tra-viet': 'Trà việt',
        'do-uong-nuoc-giai-khat': 'Đồ uống nước giải khát',
        'do-an': 'Đồ ăn',
        'do-an-ngot': 'Đồ ăn ngọt',
        'do-an-vat': 'Đồ ăn vặt',
        // Thêm các mục khác
    };

    const convertSlugToTitle = (slug) => slugToTitleMap[slug] || 'Không tìm thấy tiêu đề';

    const title = convertSlugToTitle(slug);

    console.log(data);

    const VND = new Intl.NumberFormat('vi-Vn', { style: 'currency', currency: 'VND' });
    return (
        <>
            {/* <SliderBanner image={slider2} /> */}
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('menu')}>
                        <div className={cx('products')}>
                            <Grid container>
                                <div className={cx('coffee-favorite')}>{title}</div>
                                {data &&
                                    data.map((item) => (
                                        <Grid key={item._id} item xs={6} md={3}>
                                            <div className={cx('list')}>
                                                <div className={cx('sale')}>{item.discountPercentage} %</div>
                                                <div className={cx('list-img')}>
                                                    <img src={item.thumbnail} alt={item.title} />
                                                </div>
                                                <div className={cx('list-infor')}>
                                                    <span className={cx('name')}>{item.title}</span>
                                                    <span className={cx('price')}>{VND.format(item.priceNew)}</span>
                                                    <Button
                                                        small
                                                        iconRight={
                                                            <FontAwesomeIcon icon={faAngleRight} fontSize={12} />
                                                        }
                                                        to={config.routes.detail.replace(':slugProduct', item.slug)}
                                                    >
                                                        Xem chi tiết
                                                    </Button>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
