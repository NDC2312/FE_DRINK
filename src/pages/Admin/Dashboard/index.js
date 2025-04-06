import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faMoneyBill, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import httpRequest from '~/components/utils/httpRequest';

import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, ArcElement, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const cx = classNames.bind(styles);

function Dashboard() {
    const [revenueData, setRevenueData] = useState([]);
    const [overview, setOverview] = useState({});
    const [weeklyRevenue, setWeeklyRevenue] = useState([]);
    useEffect(() => {
        // Gọi API để lấy doanh thu 12 tháng
        const fetchRevenue = async () => {
            try {
                const response = await httpRequest.get('dashboard');
                const overview = await httpRequest.get('dashboard/overview');
                const weeklyRevenue = await httpRequest.get('dashboard/weeklyRevenue');
                setRevenueData(response.data.monthlyRevenue);
                setOverview(overview.data);
                setWeeklyRevenue(weeklyRevenue.data.revenueData);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenue();
    }, []);
    console.log(weeklyRevenue);

    const data = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Doanh thu',
                data: revenueData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 69, 0, 0.2)',
                    'rgba(34, 139, 34, 0.2)',
                    'rgba(30, 144, 255, 0.2)',
                    'rgba(255, 215, 0, 0.2)',
                    'rgba(75, 0, 130, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 69, 0)',
                    'rgb(34, 139, 34)',
                    'rgb(30, 144, 255)',
                    'rgb(255, 215, 0)',
                    'rgb(75, 0, 130)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh thu',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
        },
    };
    const optionsTuan = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tuần',
                },
            },
        },
    };
    const dataTron = {
        labels: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        datasets: [
            {
                label: 'Votes',
                data: weeklyRevenue,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className={cx('wrapper')}>
            <h2>Tổng Quan</h2>
            <div className={cx('over-view')}>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <div>Đơn hàng</div>
                    </div>
                    <div className={cx('count')}>{overview.completedOrders}</div>
                </div>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <div>Khách hàng</div>
                    </div>
                    <div className={cx('count')}>{overview.totalUsers}</div>
                </div>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </span>
                        <div>Doanh thu trong tháng</div>
                    </div>
                    <div className={cx('count')}>{VND.format(overview.totalRevenue)}</div>
                </div>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                        <div>Đơn hàng bị hủy</div>
                    </div>
                    <div className={cx('count')}>{overview.cancelledOrders}</div>
                </div>
            </div>
            <div className={cx('chart', 'bar')}>
                <div className={cx('bar')}>
                    <Bar data={data} options={options} />
                </div>
                <div className={cx('pie')}>
                    <Pie data={dataTron} options={optionsTuan} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
