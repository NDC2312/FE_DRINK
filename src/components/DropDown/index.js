import classNames from 'classnames/bind';
import styles from './DropDown.module.scss';

import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const cx = classNames.bind(styles);

function DropDown({ options, selected, setSelected }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div onClick={() => setIsActive(!isActive)} className={cx('selected')}>
                <div className={cx('name')}>{selected}</div>
                <KeyboardArrowDownIcon />
            </div>
            {isActive && (
                <div className={cx('drop-down')}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelected(option);
                                setIsActive(!isActive);
                            }}
                            className={cx('item')}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropDown;
