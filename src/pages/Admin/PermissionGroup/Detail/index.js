import styles from '../PermissionGroup.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as PermissionGroupService from '~/services/permission-groupService';
import config from '~/config';
import { useParams, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Detail() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await PermissionGroupService.detailPermissionGroup(id);
            setData(res);
        };
        fetchData();
    }, [id]);

    console.log(data);
    return (
        <div className={cx('wrapper-detail')}>
            <div className={cx('container-detail')}>
                {data &&
                    data.map((item) => (
                        <div key={item._id} className={cx('detail')}>
                            <h3>Tiêu đề: {item.title}</h3>
                            <div>Mô tả ngắn: {item.description}</div>
                            <Link onClick={() => navigate(-1)} className={`${cx('btn-back')} ${styles.btn}`}>
                                Quay lại
                            </Link>
                            <Link
                                to={config.routes.adminEditPermissionGroup.replace(':id', id)}
                                state={{ product: item }}
                                className={`${cx('btn-edit')} ${styles.btn}`}
                            >
                                Chỉnh sửa
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Detail;
