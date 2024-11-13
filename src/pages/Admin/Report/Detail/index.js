import styles from '../Acount.module.scss';
import classNames from 'classnames/bind';
import * as AccountService from '~/services/accountService';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useParams, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Detail() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const res = await AccountService.detailAccount(id);
            setData(res);
        };
        fetch();
    }, [id]);
    console.log(data);

    return (
        <div className={cx('wrapper-detail')}>
            {data &&
                data.map((item) => (
                    <div key={item._id} className={cx('container-detail')}>
                        <img src={item.avatar} alt={item.title} width="500px" height="500px" />
                        <div className={cx('detail')}>
                            <div>Họ và Tên: {item.fullName}</div>
                            <div>
                                Email: <b>{item.email}</b>
                            </div>
                            <div>
                                Số điện thoại: <b>{item.phone}</b>
                            </div>
                            <div>
                                Trạng thái hoạt động:{' '}
                                <b
                                    className={`${cx(
                                        `${
                                            item.status === 'active' ? 'change-status-active' : 'change-status-inActive'
                                        }`,
                                    )} ${styles.changeStatus}`}
                                >
                                    {item.status ? 'Hoạt động' : 'Dừng hoạt động'}
                                </b>
                            </div>

                            <Link onClick={() => navigate(-1)} className={`${cx('btn-back')} ${styles.btn}`}>
                                Quay lại
                            </Link>
                            <Link
                                to={config.routes.adminEditAccount.replace(':id', id)}
                                state={{ account: data }}
                                className={`${cx('btn-edit')} ${styles.btn}`}
                            >
                                Chỉnh sửa
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Detail;
