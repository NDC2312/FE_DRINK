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
    full = false,
    btnDetail = false,
    btnEdit = false,
    btnDelete = false,
    btnAddNew = false,
    btnConfirm = false,
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
        btnDelete,
        btnAddNew,
        btnDetail,
        btnEdit,
        btnConfirm,
    });

    return (
        <Comp className={classes} {...props}>
            {iconLeft && <span className={cx('icon-left')}>{iconLeft}</span>}
            {children}
            {iconRight && <span className={cx('icon-right')}>{iconRight}</span>}
        </Comp>
    );
}

export default Button;
