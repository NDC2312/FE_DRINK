import classNames from 'classnames/bind';
import styles from './Device.module.scss';
import { Grid } from '@mui/material';

import { bgCoffee } from '~/utils/imageHome';

const cx = classNames.bind(styles);

function Device() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Grid container rowSpacing={0}>
                    <Grid item xs={12} md={6}>
                        <div className={cx('content')}>
                            <h2 className={cx('title')}>Thiết bị tốt nhất</h2>
                            <div className={cx('img')}>
                                <img src={bgCoffee} alt="" />
                            </div>
                            <div className={cx('text')}>
                                <p>
                                    Để pha một cốc cà phê hoàn hảo, nhân viên pha chế của chúng tôi cần có thiết bị tốt
                                    nhất. Không có gì quan trọng hơn máy pha cà phê espresso được thiết kế tùy chỉnh của
                                    chúng tôi. Với độ chính xác tuyệt đối, máy pha cà phê espresso xay và đổ các thành
                                    phần theo thời gian chính xác cần thiết để có hương vị ngon nhất. Điều này cho phép
                                    nhân viên pha chế của chúng tôi tập trung vào việc pha chế cho bạn cốc cà phê theo
                                    đúng cách bạn thích.
                                </p>
                                <p>
                                    Chúng tôi cũng đã sử dụng các bình đựng sữa cải tiến mới do chúng tôi thiết kế đặc
                                    biệt. Loại bình này giúp nhân viên pha chế của chúng tôi chuyển sữa lạnh thành sữa
                                    nóng ngọt vị kem với lớp bọt dày màu sẫm vị ngon nhất.
                                </p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Device;
