import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('over-view')}>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                        <div>Lượt xem hàng ngày</div>
                    </div>
                    <div className={cx('count')}>1500</div>
                </div>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <div>Khách hàng</div>
                    </div>
                    <div className={cx('count')}>1500</div>
                </div>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </span>
                        <div>Thu nhập trong tháng</div>
                    </div>
                    <div className={cx('count')}>1500</div>
                </div>
                <div className={cx('achievements')}>
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                        <div>Lượt xem hàng ngày</div>
                    </div>
                    <div className={cx('count')}>1500</div>
                </div>
            </div>
            {/* <div className={cx('statistics')}>
                <div style={{ maxWidth: '650px' }}>
                    <Bar
                        data={{
                            labels: ['1st bar', '2nd bar', '3rd bar', '4th bar'],
                            datasets: [
                                {
                                    label: 'total count/value',
                                    data: [1552, 1319, 613, 1400],
                                    backgroundColor: ['aqua', 'green', 'red', 'yellow'],
                                    borderColor: ['aqua', 'green', 'red', 'yellow'],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            legend: {
                                labels: {
                                    fontSize: 15,
                                },
                            },
                        }}
                    />
                </div>
            </div> */}
        </div>
    );
}

export default Dashboard;
