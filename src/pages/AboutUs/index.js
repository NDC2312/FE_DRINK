import classNames from 'classnames/bind';
import styles from './AboutUs.module.scss';
import { Button } from '@mui/material';

import aboutus from '~/assets/AboutUs/aboutcompany.jpg';
import disan from '~/assets/AboutUs/disan.jpg';
import cf from '~/assets/AboutUs/cf.jpg';

const cx = classNames.bind(styles);

function AboutUs() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('about')}>
                        <h2 className={cx('title')}>Về công ty của chúng tôi</h2>
                        <div className={cx('img')}>
                            <img src={aboutus} alt="" />
                        </div>
                    </div>
                    <div className={cx('about')}>
                        <h2 className={cx('title')}>Về di san của chúng tôi</h2>
                        <div className={cx('text')}>
                            <span>
                                Câu chuyện của chúng tôi bắt đầu vào năm 1971 dọc theo những con đường lát đá cuội của
                                Chợ Pike Place lịch sử của Seattle. Đây chính là nơi Starbucks mở cửa hàng đầu tiên,
                                cung cấp hạt cà phê mới rang, trà và gia vị từ khắp nơi trên thế giới để khách hàng mang
                                về nhà. Tên của chúng tôi được lấy cảm hứng từ câu chuyện cổ điển “Moby-Dick”, gợi lên
                                truyền thống đi biển của những người buôn cà phê thời kỳ đầu.
                            </span>
                            <span>
                                Mười năm sau, một thanh niên New York tên Howard Schultz bước qua cánh cửa này và bị say
                                mê với cà phê Starbucks ngay từ ngụm đầu tiên. Sau khi gia nhập công ty vào năm 1982,
                                một con đường rải sỏi khác đã dẫn ông đến một khám phá khác. Trong chuyến đi đến Milan
                                vào năm 1983, Howard lần đầu tiên trải nghiệm các quán cà phê ở Ý và anh trở về Seattle
                                với cảm hứng mang sự ấm áp và tính nghệ thuật của văn hóa cà phê đến Starbucks. Đến năm
                                1987, chúng tôi đổi tạp dề màu nâu lấy tạp dề màu xanh lá cây và bắt tay vào chương tiếp
                                theo với tư cách là một quán cà phê.
                            </span>
                            <span>
                                Starbucks sẽ sớm mở rộng tới Chicago và Vancouver, Canada, sau đó tới California,
                                Washington, D.C. và New York. Đến năm 1996, chúng tôi vượt Thái Bình Dương để mở cửa
                                hàng đầu tiên tại Nhật Bản, tiếp theo là Châu Âu vào năm 1998 và Trung Quốc vào năm
                                1999. Trong hai thập kỷ tiếp theo, chúng tôi sẽ phát triển để chào đón hàng triệu khách
                                hàng mỗi tuần và trở thành một phần cơ cấu của hàng chục ngàn khu dân cư trên khắp thế
                                giới. Trong mọi việc chúng tôi làm, chúng tôi luôn tận tâm với Sứ mệnh của mình: Với mỗi
                                chiếc cốc, mỗi cuộc trò chuyện, với mỗi cộng đồng - chúng tôi nuôi dưỡng khả năng kết
                                nối vô hạn của con người.
                            </span>
                        </div>
                        <div className={cx('img')}>
                            <img src={disan} alt="" />
                        </div>
                    </div>
                    <div className={cx('about')}>
                        <h2 className={cx('title')}>Về cafe của chúng tôi</h2>
                        <div className={cx('text')}>
                            <span>
                                Cần rất nhiều bàn tay để tạo ra tách cà phê hoàn hảo – từ những người nông dân chăm sóc
                                những quả cà phê chín đỏ, đến những nhà rang xay bậc thầy, những người tạo ra những gì
                                ngon nhất từ ​​mỗi hạt cà phê, và đến những người pha chế cà phê phục vụ nó một cách cẩn
                                thận. Chúng tôi cam kết đạt tiêu chuẩn cao nhất về chất lượng và dịch vụ, trân trọng di
                                sản của mình đồng thời đổi mới để tạo ra những trải nghiệm mới để thưởng thức.
                            </span>
                            <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                    width: '100px',
                                    background: 'var(--background)',
                                    color: 'var(--white)',
                                    borderColor: 'var(--background)',
                                    '&:hover': {
                                        background: 'var(--background)',
                                        color: 'var(--white)',
                                    },
                                }}
                            >
                                Learn more
                            </Button>
                        </div>
                        <div className={cx('img')}>
                            <img src={cf} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
