{
    /* <div className={cx('over-view')}>
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
            </div> */
}

const data = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    datasets: [
        {
            label: 'Monthly Revenue (in $)',
            data: [12000, 19000, 3000, 5000, 22000, 30000, 15000, 25000, 10000, 18000, 27000, 35000],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

// Tùy chỉnh biểu đồ
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            enabled: true,
        },
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
                text: 'Months',
            },
        },
    },
};
