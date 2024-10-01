import classNames from 'classnames/bind';
import styles from './Advise.module.scss';

import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import Search from '~/layout/components/Search';
import * as adviseService from '~/services/adviseService';
const cx = classNames.bind(styles);

function Advise() {
    const [data, setData] = useState([]);
    const [countAdvise, setCountAdvise] = useState(0);
    const [status, setStatus] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const fetch = async () => {
            let params = {};
            if (status) params.status = status;
            if (keyword) params.keyword = keyword;
            const res = await adviseService.getAdvise(params);
            setData(res.customer);
            setCountAdvise(res.countSpending);
        };
        fetch();
    }, [status, keyword]);

    let filterStatus = [
        {
            name: 'Tất cả',
            status: '',
        },
        {
            name: 'Đang xử lý',
            status: 'spending',
            count: countAdvise,
        },
        {
            name: 'Đã hoàn thành',
            status: 'finished',
        },
        {
            name: 'Hủy',
            status: 'cancel',
        },
    ];

    const handleConfirm = async (id, status) => {
        await adviseService.changeStatusAdvise(id, status);
        const index = data.findIndex((item) => item._id === id);
        if (index !== -1) {
            data[index].status = status;
            data[index].updatedAt = Date.now();
            setData([...data]);
        }
    };
    console.log(countAdvise);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('advise')}>
                <div className={cx('advise-header')}>
                    <div>Danh sách yêu cầu tư vấn</div>
                    <div className={cx('act-advise')}>
                        <div className={cx('filter-status')}>
                            <span className={cx('title')}>Trạng thái: </span>
                            {filterStatus.map((item, index) => (
                                <button
                                    key={index}
                                    className={`${styles.btnStatus} ${cx(`${item.status === status ? 'active' : ''}`)}`}
                                    onClick={() => setStatus(item.status)}
                                >
                                    {item.name}
                                    {item.count && <span>{item.count}</span>}
                                </button>
                            ))}
                        </div>
                        <Search setKeyword={setKeyword} />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Nội dung</th>
                            <th>Ngày gửi</th>
                            <th>Trạng thái</th>
                            <th>Ngày phản hồi</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <div>{item.description}</div>
                                    </td>
                                    <td>
                                        {new Date(item.createdAt).toLocaleTimeString() +
                                            '  ' +
                                            new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <span
                                            className={`${cx(
                                                `${
                                                    item.status === 'spending'
                                                        ? 'change-status-spending'
                                                        : `${
                                                              item.status === 'finished'
                                                                  ? 'change-status-finished'
                                                                  : 'change-status-cancel'
                                                          }`
                                                }`,
                                            )} ${styles.changeStatus}`}
                                        >
                                            {item.status === 'spending'
                                                ? 'Đang xử lý'
                                                : `${item.status === 'finished' ? 'Đã hoàn thành' : 'Đã hủy'}`}
                                        </span>
                                    </td>
                                    <td>
                                        {item.status !== 'spending' &&
                                            `${
                                                new Date(item.updatedAt).toLocaleTimeString() +
                                                '  ' +
                                                new Date(item.updatedAt).toLocaleDateString()
                                            }`}
                                    </td>
                                    <td>
                                        {item.status !== 'finished' && item.status !== 'cancel' && (
                                            <div>
                                                <Button btnConfirm onClick={() => handleConfirm(item._id, 'finished')}>
                                                    Xác nhận
                                                </Button>
                                                <Button onClick={() => handleConfirm(item._id, 'cancel')} btnDelete>
                                                    Hủy
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Advise;
