import classNames from 'classnames/bind';
import styles from './Snacks.module.scss';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import * as ProductClient from '~/services/p-clientService';
import { useParams } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import config from '~/config';

const cx = classNames.bind(styles);

function Products() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    console.log(slug);
    useEffect(() => {
        let params = {};
        if (currentPage) params.page = currentPage;
        const fetch = async () => {
            const res = await ProductClient.getProducts(params);
            setData(res.products);
            setTotalPages(Math.ceil(res.countTotalPage / 4));
        };
        fetch();
    }, [slug, currentPage]);

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

    const convertSlugToTitle = (slug) => slugToTitleMap[slug] || 'Tất cả sản phẩm';

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
                                                        btn_border
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
                        {totalPages && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                countTotalPage={totalPages}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
