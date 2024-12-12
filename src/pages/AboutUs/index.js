import classNames from 'classnames/bind';
import styles from './AboutUs.module.scss';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import config from '~/config';
import * as BlogClient from '~/services/b-clientService';

const cx = classNames.bind(styles);

function AboutUs() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    console.log(slug);
    useEffect(() => {
        const fetch = async () => {
            const res = await BlogClient.getBlogCategorySlug(slug);
            setData(res);
        };
        fetch();
    }, [slug]);

    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('menu')}>
                    <div className={cx('blog')}>
                        <Grid container>
                            <div className={cx('coffee-favorite')}>Danh sách bài viết</div>
                            {data &&
                                data.map((item) => (
                                    <Grid key={item._id} item xs={12} md={4}>
                                        <div className={cx('blog-card')}>
                                            <div className={cx('blog-img')}>
                                                <img src={item.thumbnail} alt={item.title} />
                                            </div>
                                            <div className={cx('content')}>
                                                <div className={cx('date-time')}>
                                                    <span className={cx('time')}>
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span> {new Date(item.createdAt).toLocaleDateString()} </span>
                                                    </span>
                                                    |
                                                    <span className={cx('date')}>
                                                        <FontAwesomeIcon icon={faCalendar} />
                                                        <span> {new Date(item.createdAt).toLocaleTimeString()}</span>
                                                    </span>
                                                </div>
                                                <Link to={config.routes.blogDetail.replace(':slug', item.slug)}>
                                                    {item.title}
                                                </Link>
                                                <p>{item.description}</p>
                                                {/* <Button
                                                    small
                                                    iconRight={<FontAwesomeIcon icon={faAngleRight} fontSize={12} />}
                                                    to={config.routes.detail.replace(':slugProduct', item.slug)}
                                                >
                                                    Xem chi tiết
                                                </Button> */}
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
