import styles from '../Products.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productService from '~/services/productService';

import config from '~/config';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Detail() {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const detail = await productService.detailProduct(id);
            setData(detail);
        };
        fetch();
    }, [id]);

    return (
        <div className={cx('wrapper-detail')}>
            <div className={cx('container-detail')}>
                <div className={cx('detail')}>
                    <div>
                        Tiêu đề: <b>{data.title}</b>
                    </div>
                    <div>
                        Danh mục sản phẩm: <b>{data.titleParent}</b>
                    </div>
                    <div>
                        Giá: <b>{data.price}$</b>
                    </div>
                    <div>
                        Giảm giá: <b>{data.discountPercentage}</b>
                    </div>
                    <div>
                        Vị trí sản phẩm: <b>{data.position}</b>
                    </div>
                    <div>
                        URL: <b>{data.demo_url}</b>
                    </div>
                    <div>
                        Sản phẩm nổi bật: <b>{data.featured ? 'có' : 'Không'}</b>
                    </div>
                    <div>
                        Trạng thái hoạt động:{' '}
                        <b
                            className={`${cx(
                                `${data.status === 'active' ? 'change-status-active' : 'change-status-inActive'}`,
                            )} ${styles.changeStatus}`}
                        >
                            {data.status ? 'Hoạt động' : 'Dừng hoạt động'}
                        </b>
                    </div>
                    <div>Mô tả: {data.description}</div>

                    <Link onClick={() => navigate(-1)} className={`${cx('btn-back')} ${styles.btn}`}>
                        Quay lại
                    </Link>
                    <Button to={config.routes.adminEditProducts.replace(':id', id)} state={{ product: data }} btnEdit>
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Detail;
