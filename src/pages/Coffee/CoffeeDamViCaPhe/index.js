import classNames from 'classnames/bind';
import styles from './CoffeeDamViCaPhe.module.scss';

import Coffee from '..';
import { Grid } from '@mui/material';
import { bgRangXay1, bgRangXay2 } from '~/utils/imageCoffee';

const cx = classNames.bind(styles);

function CoffeeDamViCaPhe() {
    return (
        <>
            <Coffee />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={6}>
                            <img src={bgRangXay1} alt="bgRangXay1" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={cx('item')}>
                                <span className={cx('title')}>Tìm kiếm Cà phê</span>
                                <p className={cx('text')}>
                                    Những bậc thầy về cà phê của chúng tôi đã đúc kết nhiều năm kinh nghiệm nếm thử cà
                                    phê của họ trong ba câu hỏi đơn giản để giúp bạn tìm loại cà phê mà bạn chắc hẳn sẽ
                                    thích.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={cx('item')}>
                                <p className={cx('title')}>Mỗi loại cà phê có hương vị riêng biệt:</p>
                                <p className={cx('text')}>
                                    Có nhiều cấp độ rang: từ Blonde (nhẹ) đến French Roast (đậm), đáp ứng sở thích đa
                                    dạng.
                                </p>
                                <p className={cx('text')}>
                                    Sử dụng 100% hạt Arabica, mang đến hương vị thơm ngon, chất lượng cao.
                                </p>
                                <p className={cx('text')}>
                                    Pike Place Roast: Vị cân bằng, mượt mà, là loại cà phê bán chạy nhất của Starbucks.
                                    <br />
                                    Dark Roast: Vị đậm đà, mạnh mẽ, thích hợp cho người thích cà phê đậm.
                                    <br /> Medium Roast:
                                    <br /> Medium Roast: Vị cân bằng giữa chua và đắng, phù hợp cho người mới bắt đầu
                                    uống cà phê.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={bgRangXay2} alt="bgRangXay2" />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default CoffeeDamViCaPhe;
