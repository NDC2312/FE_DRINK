import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as BlogClient from '~/services/b-clientService';

const cx = classNames.bind(styles);

function BlogDetail() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    console.log(slug);
    useEffect(() => {
        const fetch = async () => {
            const res = await BlogClient.detailProduct(slug);
            setData(res);
        };
        fetch();
    }, [slug]);

    // console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('menu')}>
                    <div
                        className={cx('content')}
                        dangerouslySetInnerHTML={{ __html: data.content }} // Render nội dung HTML
                    />
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
