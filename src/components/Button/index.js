import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    children,
    primary = false,
    large = false,
    small = false,
    btn_border = false,
    full = false,
    btnDetail = false,
    btnEdit = false,
    btnDelete = false,
    btnAddNew = false,
    btnConfirm = false,
    circle = false,
    className,
    iconLeft,
    iconRight,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = 'a';
    }

    const props = {
        onClick,
        to,
        ...passProps,
    };

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        large,
        small,
        full,
        circle,
        btnDelete,
        btnAddNew,
        btnDetail,
        btnEdit,
        btnConfirm,
        btn_border,
    });

    return (
        <Comp className={classes} {...props}>
            <span className={cx('btn_content')}>
                {iconLeft && <span className={cx('icon-left')}>{iconLeft}</span>}
                {children}
                {iconRight && <span className={cx('icon-right')}>{iconRight}</span>}
            </span>
        </Comp>
    );
}

export default Button;
